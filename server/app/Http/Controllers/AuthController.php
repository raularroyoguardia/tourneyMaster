<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Equip;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        if (! Auth::attempt($request->validated())) {
            return response()->json([
                'errors' => 'Credenciales incorrectas.'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = $request->user();
        $userToken = $user->createToken('AppToken')->plainTextToken;

        return response()->json([
            'message' => 'Se ha iniciado sesión correctamente.',
            'token' => $userToken,
            'user' => $user
        ], Response::HTTP_OK);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        // Crear el usuario sin la foto inicialmente
        $user = User::create($request->except('foto_perfil'));

        // Guardar la imagen si fue enviada
        if ($request->hasFile('foto_perfil')) {
            $file = $request->file('foto_perfil');
            $extension = $file->getClientOriginalExtension();
            $filename = strtolower($user->name . '.' . $extension);
            $file->move(public_path('uploads/fotoUsuari'), $filename);
            $user->foto_perfil = $filename;
            $user->save();
        }

        //Crear el equipo individual para el usuario registrado
        $equip = new Equip();
        $equip->nom = $user->name . ' Individual';
        $equip->regio = 'Europa';
        $equip->foto_equip = 'default.jpg';
        $equip->data_creacio = now();
        $equip->descripcio = 'Equipo individual ' . $user->name;
        $equip->maxim_integrants = 1;
        $equip->save();

        return response()->json([
            'message' => 'Usuario registrado correctamente.'
        ], Response::HTTP_CREATED);
    }


    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Se ha cerrado sesión correctamente.'
        ], Response::HTTP_OK);
    }
}
