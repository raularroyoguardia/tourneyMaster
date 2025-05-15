<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\File;
use App\Models\Equip;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{

    public function list()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function new(Request $request)
    {
        $user = new User();
        $request->validate(
            [
                'name' => 'required|string|max:10',
                'email' => 'required|email|unique:users,email',
                'telefon' => 'required|string|max:9',
                'password' => 'string|required|min:6',
                'data_naixement' => 'required|date',
            ],
            [
                'name.required' => 'El nom és obligatori',
                'name.max' => 'El nom no pot superar els 10 caràcters',
                'email.required' => 'El correu és obligatori',
                'email.email' => 'El correu no és vàlid',
                'email.unique' => 'Aquest correu ja existeis',
                'telefon.required' => 'El telèfon és obligatori',
                'telefon.max' => 'El telèfon no pot superar els 9 caràcters',
                'password.required' => 'La contrassenya es obligatória',
                'password.min' => 'La contrassenya ha de ser d\'almenys 6 carácters',
                'data_naixement.required' => 'La data de naixement és obligatòria',
                'data_naixement.date' => 'La data de naixement no és vàlida',
            ]
        );

        // Crear el usuario sin la foto inicialmente
        $user = User::create($request->all());

        // Guardar la imagen si fue enviada
        if ($request->hasFile('foto_perfil')) {
            $file = $request->file('foto_perfil');
            $extension = $file->getClientOriginalExtension();
            $filename = strtolower($user->name . '.' . $extension);
            $file->move(public_path('uploads/fotoUsuari'), $filename);
            $user->foto_perfil = $filename;
            $user->save();
        }

        //Poner la foto del usuario en el equipo individual
        $sourcePath = public_path('uploads/fotoUsuari/' . $filename);
        $destinationPath = public_path('uploads/fotoEquips/' . $filename);
        File::copy($sourcePath, $destinationPath);

        //Crear el equipo individual para el usuario registrado
        $equip = new Equip();
        $equip->nom = $user->name . ' Individual';
        // $equip->name = $user->name . ' ' . mb_substr($user->apellido1, 0, 1) . ' ' . mb_substr($user->apellido2, 0, 1);
        $equip->regio = 'Europa';
        $equip->foto_equip = $filename;
        $equip->data_creacio = now();
        $equip->descripcio = 'Equipo individual ' . $user->name;
        $equip->maxim_integrants = 1;
        $equip->save();

        return response()->json($user);
    }

    public function edit(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate(
            [
                'name' => 'string',
                'email' => 'email',
                'telefon' => 'string|max:9',
            ],
            [
                'email.email' => 'El correu no és vàlid',
                'telefon.max' => 'El telèfon no pot superar els 9 caràcters',
            ]
        );

        // Datos básicos
        $user->name = $request->name;
        $user->apellido1 = $request->apellido1;
        $user->apellido2 = $request->apellido2;
        $user->email = $request->email;
        $user->telefon = $request->telefon;

        // Imagen nueva subida
        if ($request->hasFile('foto_perfil')) {
            // Elimina la anterior si existe
            if ($user->foto_perfil && File::exists(public_path('uploads/fotoUsuari/' . $user->foto_perfil))) {
                File::delete(public_path('uploads/fotoUsuari/' . $user->foto_perfil));
            }

            $file = $request->file('foto_perfil');
            $extension = $file->getClientOriginalExtension();
            $filename = strtolower($user->name . '.' . $extension);
            $file->move(public_path('uploads/fotoUsuari/'), $filename);
            $user->foto_perfil = $filename;
        }

        $user->save();

        return response()->json($user);
    }


    public function show($id)
    {
        $user = User::with('equips.users')->findOrFail($id);

        // Buscar los equipos donde el usuario pertenece y que tengan más de 1 miembro
        $equipCollectiu = $user->equips->first(function ($equip) {
            return $equip->users->count() > 1;
        });

        if (!$equipCollectiu) {
            return response()->json(['message' => 'L\'usuari no forma part de cap equip col·lectiu.'], 404);
        }

        return response()->json($equipCollectiu);
    }

    public function showOne($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);

        // Eliminar la foto del usuario si existe
        if ($user->foto_perfil && File::exists(public_path('uploads/fotoUser/' . $user->foto_perfil))) {
            File::delete(public_path('uploads/fotoUser/' . $user->foto_perfil));
        }

        // Buscar y eliminar el equipo individual del usuario
        $equipName = $user->name . ' Individual';
        $equip = Equip::where('nom', $equipName)->first();
        if ($equip) {
            $equip->delete();
        }

        // Eliminar el usuario
        $user->delete();

        return response()->json('Usuari ' . $user->name . ' i el seu equip han estat eliminats');
    }

    // En UserController.php
    public function afegirTrofeus(Request $request, $id)
    {
        $usuari = User::findOrFail($id);
        $trofeusAFegir = intval($request->input('trofeus', 0));
        $usuari->trofeus += $trofeusAFegir;
        $usuari->save();

        return response()->json(['message' => 'Trofeus afegits correctament.']);
    }

    public function getEquips($id)
    {
        $user = User::with('equips')->findOrFail($id);
        return response()->json($user->equips);
    }
}
