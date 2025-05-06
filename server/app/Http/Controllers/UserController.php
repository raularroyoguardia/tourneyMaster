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
                'apellido1' => 'required|string',
                'apellido2' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'telefon' => 'required|string|max:9',
                'password' => 'string|required|min:6',
                'data_naixement' => 'required|date',
            ],
            [
                'name.required' => 'El nom és obligatori',
                'name.max' => 'El nom no pot superar els 10 caràcters',
                'apellido1.required' => 'El primer apellido es obligatorio',
                'apellido2.required' => 'El segundo apellido es obligatorio',
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

        $user->name = $request->name;
        $user->email = $request->email;
        $user->telefon = $request->telefon;
        $user->password = bcrypt($request->password);
        $user->data_naixement = $request->data_naixement;
        $user->data_registre = now();
        $user->save();

        // Crear el equipo individual asociado
        $equip = new Equip();
        $equip->nom = $user->name . ' Individual';
        $equip->regio = 'Europa';
        $equip->foto_equip = 'default.jpg';
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

        if ($user->foto_perfil && File::exists(public_path('uploads/fotoUser/' . $user->foto_perfil))) {
            File::delete(public_path('uploads/fotoUser/' . $user->foto_perfil));
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->telefon = $request->telefon;
        $user->foto_perfil = $request->foto_perfil;
        $user->save();

        if ($request->hasFile('foto_perfil')) {
            if ($user->foto_perfil && File::exists(public_path('uploads/fotoUser/' . $user->foto_perfil))) {
                File::delete(public_path('uploads/fotoUser/' . $user->foto_perfil));
            }

            $file = $request->file('foto_perfil');
            $extension = $file->getClientOriginalExtension();
            $filename = strtolower($user->name . '.' . $extension);
            $file->move(public_path('uploads/fotoUser/'), $filename);
            $user->foto_perfil = $filename;
            $user->save();
        }
        return response()->json($user);
    }

    public function show($id)
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
}
