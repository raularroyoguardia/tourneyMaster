<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\EquipUser;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Equip;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

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
        $user = User::create($request->all());

        $filename = null;

        // Guardar la imagen si fue enviada
        if ($request->hasFile('foto_perfil')) {
            $file = $request->file('foto_perfil');
            $extension = $file->getClientOriginalExtension();
            $filename = strtolower($user->name . '.' . $extension);

            // Asegurar que el directorio existe
            $userPath = public_path('uploads/fotoUsuari');
            $file->move($userPath, $filename);
            $user->foto_perfil = $filename;
            $user->save();
        }

        // Crear el nombre del equipo
        $equipNom = $user->name . ' ' . mb_substr($user->apellido1, 0, 1) . mb_substr($user->apellido2, 0, 1);

        // Crear el nombre del archivo para el equipo
        $equipFoto = Str::slug($equipNom, '_') . '.' . $extension;

        // Copiar la imagen del usuario a la carpeta del equipo
        $sourcePath = public_path('uploads/fotoUsuari/' . $filename);
        $destinationDir = public_path('uploads/fotosEquips');
        if (!File::exists($destinationDir)) {
            File::makeDirectory($destinationDir, 0755, true);
        }
        File::copy($sourcePath, $destinationDir . '/' . $equipFoto);

        // Crear el equipo individual
        $equip = new Equip();
        $equip->nom = $equipNom;
        $equip->regio = 'Europa';
        $equip->foto_equip = $equipFoto;
        $equip->data_creacio = now();
        $equip->descripcio = 'Equipo individual ' . $user->name;
        $equip->maxim_integrants = 1;
        $equip->save();

        //Añadir el usuario a su equipo individual
        $equip_user = new EquipUser();
        $equip_user->equip_id = $equip->id;
        $equip_user->user_id = $user->id;
        $equip_user->save();

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
