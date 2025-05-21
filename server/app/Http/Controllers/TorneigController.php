<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Torneig;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Partida;

class TorneigController extends Controller
{
    public function list()
    {
        // Paso 1: Obtener la info principal del torneo + mapa
        $torneigs = DB::select("
            SELECT 
                torneigs.*, 
                mode_jocs.descripcio, 
                jocs.foto AS joc_foto, 
                jocs.nom AS joc_nom, 
                premis.valor AS premi_valor,
                mapas.mapa AS foto_mapa,
                mapas.nom AS nom_mapa
            FROM torneigs
            JOIN mode_jocs ON torneigs.modeJoc_id = mode_jocs.id
            JOIN jocs ON mode_jocs.joc_id = jocs.id
            LEFT JOIN premis ON torneigs.premi_id = premis.id
            LEFT JOIN mapas ON torneigs.mapa_id = mapas.id
        ");

        // Paso 2: Obtener los equipos relacionados
        $equipsPorTorneig = DB::select("
            SELECT 
                equips_torneigs.torneig_id,
                equips.*
            FROM equips_torneigs
            JOIN equips ON equips.id = equips_torneigs.equip_id
        ");

        // Paso 3: Agrupar equipos por torneo
        $mapaEquips = [];
        foreach ($equipsPorTorneig as $equip) {
            $mapaEquips[$equip->torneig_id][] = $equip;
        }

        // Paso 4: Añadir los equipos a cada torneo
        foreach ($torneigs as &$torneig) {
            $torneig->equips = $mapaEquips[$torneig->id] ?? [];
        }

        // 🔥 Paso 5: Obtener las partidas de cada torneo
        $partidesPorTorneig = DB::select("
            SELECT * FROM partidas
        ");

        // Agrupar por torneig_id
        $mapaPartides = [];
        foreach ($partidesPorTorneig as $partida) {
            $mapaPartides[$partida->torneig_id][] = $partida;
        }

        // Añadir a cada torneig
        foreach ($torneigs as &$torneig) {
            $torneig->partides = $mapaPartides[$torneig->id] ?? [];
        }

        return response()->json($torneigs);
    }

    public function new(Request $request)
    {
        $torneig = new Torneig();
        $request->validate([
            'nom' => 'required|string',
            'participants' => 'required|integer',
            'tipus' => 'required|string',
            'data_inici' => 'required',
            'data_fi' => 'required',
            'estat' => 'required',
            'numero_equips' => 'required',
            'modeJoc_id' => 'required|integer',
            'mapa_id' => 'required',
            // 'premi_id' => 'required',
        ], [
            'nom.required' => 'El nom és obligatori',
            'participants.required' => 'El nombre de participants és obligatori',
            'tipus.required' => 'El tipus de torneig és obligatori',
            'data_inici.required' => 'La data d\'inici és obligatòria',
            'data_fi.required' => 'La data de finalització és obligatòria',
            'numero_equips.required' => 'S\'ha d\'assignar un número d\'equips',
            'modeJoc_id.required' => 'El mòde de joc es obligatòri',
            'mapa_id.required' => 'Selecciona un mapa',
            // 'premi_id.required' => 'Selecciona un premi'
        ]);

        $torneig->nom = $request->nom;
        $torneig->participants = $request->participants;
        $torneig->tipus = $request->tipus;
        $torneig->data_inici = $request->data_inici;
        $torneig->data_fi = $request->data_fi;
        $torneig->estat = $request->estat;
        $torneig->numero_equips = $request->numero_equips;
        $torneig->modeJoc_id = $request->modeJoc_id;
        $torneig->mapa_id = $request->mapa_id;
        $torneig->premi_id = $request->premi_id ?? 1;
        $torneig->quantitat_partides = 3;  // Asignamos el valor directamente
        $torneig->save();

        $dataInici = \Carbon\Carbon::parse($torneig->data_inici);

        // Crear las 3 partidas
        for ($i = 1; $i <= 3; $i++) {
            Partida::create([
                'torneig_id' => $torneig->id,
                'posicio_partida' => $i,
                'data_hora' => $dataInici->copy()->addWeeks($i - 1)->setTimeFromTimeString('11:00:00'),
            ]);
        }

        return response()->json($torneig);
    }


    public function show($id)
    {
        $torneig = DB::select("
        SELECT 
            torneigs.*, mode_jocs.descripcio, 
            jocs.foto AS joc_foto, jocs.nom as joc_nom
        FROM torneigs
        JOIN mode_jocs ON torneigs.modeJoc_id = mode_jocs.id
        JOIN jocs ON mode_jocs.joc_id = jocs.id
        WHERE torneigs.id = " . $id);
        return response()->json($torneig);
    }

    public function edit(Request $request, $id)
    {
        $torneig = Torneig::findOrFail($id);
        $request->validate([
            'nom' => 'required|string',
            'participants' => 'required|integer',
            'tipus' => 'required|string',
            'data_inici' => 'required',
            'data_fi' => 'requireddate|after_or_equal:data_inici',
            'numero_equips' => 'required',
            'modeJoc_id' => 'required|integer',
        ], [
            'nom.required' => 'El nom és obligatori',
            'participants.required' => 'El nombre de participants és obligatori',
            'tipus.required' => 'El tipus de torneig és obligatori',
            'data_inici.required' => 'La data d\'inici és obligatòria',
            'data_fi.required' => 'La data de finalització és obligatòria',
            'data_fi.after_or_equal' => 'La data de finalització no pot ser anterior a la d\'inici.',
            'numero_equips.required' => 'S\'ha d\'assignar un número d\'equips',
            'modeJoc_id.reuired' => 'El mòde de joc es obligatòri',
            'quantitat_partides.required' => 'La quantitat de partides es obligatòria',
        ]);

        $torneig->nom = $request->nom;
        $torneig->participants = $request->participants;
        $torneig->tipus = $request->tipus;
        $torneig->data_inici = $request->data_inici;
        $torneig->data_fi = $request->data_fi;
        $torneig->numero_equips = $request->numero_equips;
        $torneig->modeJoc_id = $request->modeJoc_id;


        $torneig->save();
        return response()->json($torneig);
    }

    public function delete($id)
    {
        $torneig = Torneig::findOrFail($id);
        $torneig->delete();

        return response()->json('El torneig ' . $torneig->nom . ' s\'ha eliminat');
    }


    public function listPerTipus($tipus)
    {
        // Paso 1: Obtener la info principal del torneo + mapa
        $torneigs = DB::select("
            SELECT 
                torneigs.*, 
                mode_jocs.descripcio, 
                jocs.foto AS joc_foto, 
                jocs.nom AS joc_nom, 
                premis.valor AS premi_valor,
                mapas.mapa AS foto_mapa,
                mapas.nom AS nom_mapa
            FROM torneigs
            JOIN mode_jocs ON torneigs.modeJoc_id = mode_jocs.id
            JOIN jocs ON mode_jocs.joc_id = jocs.id
            LEFT JOIN premis ON torneigs.premi_id = premis.id
            LEFT JOIN mapas ON torneigs.mapa_id = mapas.id
            where torneigs.tipus = '" . $tipus . "'
        ");

        // Paso 2: Obtener los equipos relacionados
        $equipsPorTorneig = DB::select("
            SELECT 
                equips_torneigs.torneig_id,
                equips.*
            FROM equips_torneigs
            JOIN equips ON equips.id = equips_torneigs.equip_id
        ");

        // Paso 3: Agrupar equipos por torneo
        $mapaEquips = [];
        foreach ($equipsPorTorneig as $equip) {
            $mapaEquips[$equip->torneig_id][] = $equip;
        }

        // Paso 4: Añadir los equipos a cada torneo
        foreach ($torneigs as &$torneig) {
            $torneig->equips = $mapaEquips[$torneig->id] ?? [];
        }

        // 🔥 Paso 5: Obtener las partidas de cada torneo
        $partidesPorTorneig = DB::select("
            SELECT * FROM partidas
        ");

        // Agrupar por torneig_id
        $mapaPartides = [];
        foreach ($partidesPorTorneig as $partida) {
            $mapaPartides[$partida->torneig_id][] = $partida;
        }

        // Añadir a cada torneig
        foreach ($torneigs as &$torneig) {
            $torneig->partides = $mapaPartides[$torneig->id] ?? [];
        }

        return response()->json($torneigs);
    }
    public function getTorneigsPerUsuari($usuariId)
    {
        $usuari = User::findOrFail($usuariId);

        // Obtener el tipo de usuario
        $tipusUsuari = $usuari->tipus_usuari_id;

        // Filtrar los torneos según el tipo de usuario
        if ($tipusUsuari == 2 || $tipusUsuari == 1) {
            // Admins de equipo -> colectivos
            $torneigs = $this->list();
        } elseif ($tipusUsuari == 3) {
            // Usuarios individuales -> individuales
            $torneigs = $this->listPerTipus('individual');
        } else {
            return response()->json(['message' => 'Tipo de usuario no soportado.'], 400);
        }

        return $torneigs;
    }

    public function getUserATorneigs($usuariId)
{
    // Paso 1: Obtener el usuario con sus equipos y torneos
    $usuari = User::with('equips.torneigs')->findOrFail($usuariId);

    // Paso 2: Recoger todos los IDs de torneos del usuario
    $torneigIds = collect();

    foreach ($usuari->equips as $equip) {
        foreach ($equip->torneigs as $torneig) {
            $torneigIds->push($torneig->id);
        }
    }

    $torneigIds = $torneigIds->unique()->values();

    if ($torneigIds->isEmpty()) {
        return response()->json([]);
    }

    // Paso 3: Obtener los datos completos de esos torneos (como en list())
    $idsString = $torneigIds->implode(',');

    // Obtener torneo + datos relacionados
    $torneigs = DB::select("
        SELECT 
            torneigs.*, 
            mode_jocs.descripcio, 
            jocs.foto AS joc_foto, 
            jocs.nom AS joc_nom, 
            premis.valor AS premi_valor,
            mapas.mapa AS foto_mapa,
            mapas.nom AS nom_mapa
        FROM torneigs
        JOIN mode_jocs ON torneigs.modeJoc_id = mode_jocs.id
        JOIN jocs ON mode_jocs.joc_id = jocs.id
        LEFT JOIN premis ON torneigs.premi_id = premis.id
        LEFT JOIN mapas ON torneigs.mapa_id = mapas.id
        WHERE torneigs.id IN ($idsString)
    ");

    // Equipos por torneo
    $equipsPorTorneig = DB::select("
        SELECT 
            equips_torneigs.torneig_id,
            equips.*
        FROM equips_torneigs
        JOIN equips ON equips.id = equips_torneigs.equip_id
        WHERE equips_torneigs.torneig_id IN ($idsString)
    ");

    // Agrupar equipos
    $mapaEquips = [];
    foreach ($equipsPorTorneig as $equip) {
        $mapaEquips[$equip->torneig_id][] = $equip;
    }

    // Partidas por torneo
    $partidesPorTorneig = DB::select("
        SELECT * FROM partidas WHERE torneig_id IN ($idsString)
    ");

    // Agrupar partidas
    $mapaPartides = [];
    foreach ($partidesPorTorneig as $partida) {
        $mapaPartides[$partida->torneig_id][] = $partida;
    }

    // Enlazar equipos y partidas a cada torneo
    foreach ($torneigs as &$torneig) {
        $torneig->equips = $mapaEquips[$torneig->id] ?? [];
        $torneig->partides = $mapaPartides[$torneig->id] ?? [];
    }

    return response()->json($torneigs);
}

    public function updateEstat(Request $request, $id)
    {
        $request->validate([
            'estat' => 'required|string|in:No Començat,En Procés,Finalitzat',
        ]);

        $torneig = Torneig::findOrFail($id);
        $torneig->estat = $request->estat;
        $torneig->save();

        return response()->json(['message' => 'Estat actualitzat correctament.']);
    }

    public function getPerEstat($estat)
    {
        // Paso 1: Obtener la info principal del torneo + mapa
        $torneigs = DB::select("
        SELECT 
            torneigs.*, 
            mode_jocs.descripcio, 
            jocs.foto AS joc_foto, 
            jocs.nom AS joc_nom, 
            premis.valor AS premi_valor,
            mapas.mapa AS foto_mapa,
            mapas.nom AS nom_mapa
        FROM torneigs
        JOIN mode_jocs ON torneigs.modeJoc_id = mode_jocs.id
        JOIN jocs ON mode_jocs.joc_id = jocs.id
        LEFT JOIN premis ON torneigs.premi_id = premis.id
        LEFT JOIN mapas ON torneigs.mapa_id = mapas.id
        WHERE torneigs.estat = ?
    ", [$estat]);

        // Paso 2: Obtener los equipos relacionados
        $equipsPorTorneig = DB::select("
        SELECT 
            equips_torneigs.torneig_id,
            equips.*
        FROM equips_torneigs
        JOIN equips ON equips.id = equips_torneigs.equip_id
    ");

        // Paso 3: Agrupar equipos por torneo
        $mapaEquips = [];
        foreach ($equipsPorTorneig as $equip) {
            $mapaEquips[$equip->torneig_id][] = $equip;
        }

        // Paso 4: Añadir los equipos a cada torneo
        foreach ($torneigs as &$torneig) {
            $torneig->equips = $mapaEquips[$torneig->id] ?? [];
        }

        // Paso 5: Obtener las partidas de cada torneo
        $partidesPorTorneig = DB::select("
        SELECT * FROM partidas
    ");

        // Agrupar por torneig_id
        $mapaPartides = [];
        foreach ($partidesPorTorneig as $partida) {
            $mapaPartides[$partida->torneig_id][] = $partida;
        }

        // Añadir a cada torneig
        foreach ($torneigs as &$torneig) {
            $torneig->partides = $mapaPartides[$torneig->id] ?? [];
        }

        return response()->json($torneigs);
    }
}
