<?php

namespace App\Http\Controllers;

use App\Models\Equip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\Torneig;
use App\Models\User;

class EquipController extends Controller
{

    public function list()
    {
        DB::statement("
            UPDATE equips e
            JOIN (
                SELECT eu.equip_id, SUM(CAST(u.trofeus AS UNSIGNED)) AS total_trofeus
                FROM equips_users eu
                JOIN users u ON eu.user_id = u.id
                GROUP BY eu.equip_id
            ) AS resumen ON e.id = resumen.equip_id
            SET e.trofeus = resumen.total_trofeus
        ");

        $equips = Equip::all();

        return response()->json($equips);
    }


    public function new(Request $request)
    {
        $user = $request->user();
        $equip = new Equip();
        $request->validate([
            'nom' => 'required|string|max:20',
            'regio' => 'required|string',
            'descripcio' => 'required|string|max:255',
            'maxim_integrants' => 'required|integer|max:5',
            'foto_equip' => 'required|image',
            'data_creacio' => 'required|date',
            'trofeus' => 'required|integer'
        ], [
            'nom.required' => 'El nom és obligatòri',
            'nom.max' => 'El nom de l\'equip no pot superar els 20 caràcters.',
            'regio.required' => 'La regió és obligatòria',
            'descripcio.required' => 'La descripció és obligatòria',
            'descripcio.max' => 'La descripció no pot superar els 255 caràcters.',
            'maxim_integrants.required' => 'El màxim d\'integrants és obligatori',
            'maxim_integrants.max' => 'El màxim d\'integrants no pot superar 5 persones.',
            'foto_equip.required' => 'La foto de l\'equip és obligatòria',
            'foto_equip.image' => 'El fitxer ha de ser una imatge',
            'data_creacio.required' => 'La data de creació és obligatòria',
        ]);

        $equip->nom = $request->nom;
        $equip->regio = $request->regio;
        $equip->foto_equip = $request->foto_equip;
        $equip->data_creacio = now();
        $equip->descripcio = $request->descripcio;
        $equip->maxim_integrants = $request->maxim_integrants;
        $equip->trofeus = $request->trofeus;

        if ($request->hasFile('foto_equip')) {
            $file = $request->file('foto_equip');
            $extension = $file->getClientOriginalExtension();
            $filename = strtolower(Str::snake($equip->nom) . '.' . $extension);
            $file->move(public_path('uploads/fotosEquips/'), $filename);
            $equip->foto_equip = $filename;
        }

        $equip->save();

        DB::table('equips_users')->insert([
            'user_id' => $user->id,
            'equip_id' => $equip->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);


        return response()->json($equip);
    }

    public function show($id)
    {
        $equip = Equip::findOrFail($id);
        return response()->json($equip);
    }

    public function edit(Request $request, $id)
    {
        $equip = Equip::findOrFail($id);
        $request->validate([
            'nom' => 'required|string|max:20',
            'descripcio' => 'required|string|max:255',
        ], [
            'nom.required' => 'El nom és obligatòri',
            'nom.max' => 'El nom de l\'equip no pot superar els 20 caràcters',
            'descripcio.required' => 'La descripció és obligatòria',
            'descripcio.max' => 'La descripció no pot superar els 255 caràcters',
        ]);

        if ($equip->foto_equip && File::exists(public_path('uploads/fotoEquips/' . $equip->foto_equip))) {
            File::delete(public_path('uploads/fotoEquips/' . $equip->foto_equip));
        }

        $equip->nom = $request->nom;
        $equip->foto_equip = $request->foto_equip;
        $equip->descripcio = $request->descripcio;

        $equip->save();

        if ($request->hasFile('foto_equip')) {
            $file = $request->file('foto_equip');
            $extension = $file->getClientOriginalExtension();
            $filename = strtolower(Str::snake($equip->nom) . '.' . $extension);
            $file->move(public_path('uploads/fotoEquips/'), $filename);
            $equip->foto_equip = $filename;
            $equip->save();
        }
        return response()->json($equip);
    }

    public function delete($id)
    {
        $equip = Equip::findOrFail($id);
        if ($equip->foto_equip && File::exists(public_path('uploads/fotoEquips/' . $equip->foto_equip))) {
            File::delete(public_path('uploads/fotoEquips/' . $equip->foto_equip));
        }
        $equip->delete();
        return response()->json($equip);
    }

    // public function getEquipsForAuthenticatedUser(Request $request)
    // {

    //     DB::statement("
    //     UPDATE equips e
    //     JOIN (
    //         SELECT eu.equip_id, SUM(CAST(u.trofeus AS UNSIGNED)) AS total_trofeus
    //         FROM equips_users eu
    //         JOIN users u ON eu.user_id = u.id
    //         GROUP BY eu.equip_id
    //     ) AS resumen ON e.id = resumen.equip_id
    //     SET e.trofeus = resumen.total_trofeus
    // ");


    //     $user = $request->user();

    //     $equips = $user->equips()
    //         ->with(['users' => function ($query) {
    //             $query->orderBy('trofeus', 'desc'); // orden descendente
    //         }])
    //         ->orderBy('trofeus', 'desc') // <-- aquí se ordenan los equips
    //         ->get();


    //     return response()->json($equips);
    // }

    public function getEquipsForAuthenticatedUser(Request $request)
    {
        DB::statement("
        UPDATE equips e
        JOIN (
            SELECT eu.equip_id, SUM(CAST(u.trofeus AS UNSIGNED)) AS total_trofeus
            FROM equips_users eu
            JOIN users u ON eu.user_id = u.id
            GROUP BY eu.equip_id
        ) AS resumen ON e.id = resumen.equip_id
        SET e.trofeus = resumen.total_trofeus
    ");

        $user = $request->user();

        $equips = $user->equips()
            ->with(['users']) // Eliminamos la ordenación aquí
            ->get();

        return response()->json($equips);
    }

    public function equipsDisponibles()
    {
        $equipsDisponibles = Equip::withCount('users')
            ->where('maxim_integrants', '>', 1)
            ->having('users_count', '<', DB::raw('maxim_integrants'))
            ->get();

        return response()->json($equipsDisponibles);
    }

    public function unirseATorneig(Request $request)
    {
        $request->validate([
            'equip_id' => 'required|exists:equips,id',
            'torneig_id' => 'required|exists:torneigs,id'
        ]);

        $user = $request->user();

        // Primero, verifica si ya pertenece a ese equipo en ese torneo
        $existe = DB::table('equips_torneigs')
            ->where('equip_id', $request->equip_id)
            ->where('torneig_id', $request->torneig_id)
            ->exists();

        if ($existe) {
            return response()->json(['message' => 'Ya estás en este torneo.'], 409);
        }

        // Inserta el registro en la tabla pivot equips_torneigs
        DB::table('equips_torneigs')->insert([
            'equip_id' => $request->equip_id,
            'torneig_id' => $request->torneig_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Te has unido al torneo correctamente.']);
    }

    public function unirseIndividual($torneigId, Request $request)
    {
        $usuariId = $request->input('usuari_id');

        $torneig = Torneig::findOrFail($torneigId);

        if ($torneig->tipus !== 'Individual') {
            return response()->json(['message' => 'Aquest torneig no és individual.'], 400);
        }

        // Comprovem si l'usuari ja està inscrit
        $existeix = DB::table('torneig_usuari')
            ->where('torneig_id', $torneigId)
            ->where('usuari_id', $usuariId)
            ->exists();

        if ($existeix) {
            return response()->json(['message' => 'Ja estàs inscrit en aquest torneig.'], 400);
        }

        // Relacionem l'usuari amb el torneig
        DB::table('torneig_usuari')->insert([
            'torneig_id' => $torneigId,
            'usuari_id' => $usuariId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'T\'has inscrit correctament al torneig.']);
    }



    public function unirseAEquip(Request $request)
    {
        $request->validate([
            'equip_id' => 'required|exists:equips,id'
        ]);

        $user = $request->user();

        $yaPertenece = DB::table('equips_users')
            ->where('user_id', $user->id)
            ->where('equip_id', $request->equip_id)
            ->exists();

        if ($yaPertenece) {
            return response()->json(['message' => 'Ya formas parte de este equipo.'], 409);
        }

        DB::table('equips_users')->insert([
            'user_id' => $user->id,
            'equip_id' => $request->equip_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Te has unido al equipo correctamente.']);
    }

    public function getUsuaris($id)
    {
        $usuaris = DB::table('users')
            ->join('equips_users', 'users.id', '=', 'equips_users.user_id')
            ->where('equips_users.equip_id', $id)
            ->select('users.*')
            ->get();

        return response()->json($usuaris);
    }
    public function getEquipsForUser($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user->equips);
    }

    public function assignarAdmin(Request $request, $equipId)
{
    $user = auth()->user();

    if (!$user) {
        return response()->json(['message' => 'No autenticat.'], 401);
    }
    // Actualizar tipus_usuari_id
    $user->tipus_usuari_id = 2;
    $user->save();

    return response()->json(['message' => 'Assignat com a administrador del equip.'], 200);
}

}
