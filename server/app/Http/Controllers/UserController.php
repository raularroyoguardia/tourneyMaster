<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\File;
use App\Models\Equip;

class UserController extends Controller
{
    public function list()
    {
        $users = User::all();
        return $users;
    }

    public function new(Request $request)
    {

        if ($request->isMethod('post')) {

            $user = new User();
            $request->validate(
                [
                    'name' => 'required|string|max:10',
                    'email' => 'required|email',
                    'telefon' => 'required|string|max:9',
                    'data_naixement' => 'required|date',
                    'tipus_usuari' => 'required',
                ],
                [
                    'name.required' => 'El nom és obligatori',
                    'name.max' => 'El nom no pot superar els 10 caràcters',
                    'email.required' => 'El correu és obligatori',
                    'email.email' => 'El correu no és vàlid',
                    'telefon.required' => 'El telèfon és obligatori',
                    'telefon.max' => 'El telèfon no pot superar els 9 caràcters',
                    'data_naixement.required' => 'La data de naixement és obligatòria',
                    'data_naixement.date' => 'La data de naixement no és vàlida',
                    'tipus_usuari.required' => 'El tipus d\'usuari és obligatori',
                ]
            );

            $user->name = $request->name;
            $user->email = $request->email;
            $user->telefon = $request->telefon;
            $user->data_naixement = $request->data_naixement;
            $user->trofeus = $request->trofeus;
            $user->data_registre = now();
            $user->tipus_usuari = $request->tipus_usuari;
            $user->save();

            if ($request->hasFile('foto_usuari')) {
                $file = $request->file('foto_usuari');
                $extension = $file->getClientOriginalExtension();
                $filename = strtolower($user->name . '.' . $extension);
                $file->move(public_path('uploads/fotoUser/'), $filename);
                $user->foto_usuari = $filename;
                $user->save();
            }
        }
        return response()->json($user);
    }

    public function edit(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($request->isMethod('post')) {
            $user = new User();
            $request->validate(
                [
                    'email' => 'required|email',
                    'telefon' => 'required|string|max:9',
                ],
                [
                    'email.required' => 'El correu és obligatori',
                    'email.email' => 'El correu no és vàlid',
                    'telefon.required' => 'El telèfon és obligatori',
                    'telefon.max' => 'El telèfon no pot superar els 9 caràcters',
                ]
            );

            $user->email = $request->email;
            $user->telefon = $request->telefon;
            $user->save();

            if ($request->hasFile('foto_usuari')) {
                if ($user->foto_usuari && File::exists(public_path('uploads/fotoUser/' . $user->foto_usuari))) {
                    File::delete(public_path('uploads/fotoUser/' . $user->foto_usuari));
                }

                $file = $request->file('foto_usuari');
                $extension = $file->getClientOriginalExtension();
                $filename = strtolower($user->name . '.' . $extension);
                $file->move(public_path('uploads/fotoUser/'), $filename);
                $user->foto_usuari = $filename;
                $user->save();
            }
        }
        return response()->json($user);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return $user;
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);
        if ($user->foto_usuari && File::exists(public_path('uploads/fotoUser/' . $user->foto_usuari))) {
            File::delete(public_path('uploads/fotoUser/' . $user->foto_usuari));
        }
        $user->delete();
        return response()->json('Usuari '.$user->name.' eliminat');
    }

    public function addtoEquip($id, Request $request)
    {
        $user = User::findOrFail($id);
        $equip = Equip::findOrFail($request->$id);
        $equip->usuaris()->attach($user->id);
        return response()->json('Usuari '.$user->name.' afegit a l\'equip '.$id);
    }
}
