<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Torneig;
use Illuminate\Support\Facades\DB;

class TorneigController extends Controller
{
    // public function list()
    // {
    //     $torneigs = DB::select("
    //         SELECT  torneigs.*,  mode_jocs.descripcio,  jocs.foto AS joc_foto, mapas.mapa AS mapa_nom, premis.posicio_premi, 
    //         premis.valor, partidas.posicio_partida, partidas.resultat_equip_id, partidas.data_hora
    //         FROM torneigs
    //         JOIN mode_jocs ON torneigs.modeJoc_id = mode_jocs.id
    //         JOIN jocs ON mode_jocs.jocId = jocs.id
    //         LEFT JOIN mapas ON torneigs.mapa_id = mapas.id
    //         LEFT JOIN premis ON torneigs.id = premis.torneig_id
    //         LEFT JOIN partidas ON torneigs.id = partidas.torneig_id;
    //     ");
    //     return response()->json($torneigs);
    // }
//     public function list()
// {
//     $rawData = DB::select("
//         SELECT 
//             t.id AS torneig_id,
//             t.nom AS torneig_nom,
//             t.participants,
//             t.tipus,
//             t.data_inici,
//             t.data_fi,
//             t.estat,
//             t.quantitat_partides,
//             t.numero_equips,

//             mj.descripcio AS mode_joc,
//             j.foto AS joc_foto,
//             m.mapa AS mapa_nom,

//             p.posicio_premi,
//             p.valor AS premi_valor,

//             pa.posicio_partida,
//             pa.resultat_equip_id,
//             pa.data_hora,

//             et.equip_id,
//             e.nom AS equip_nom
//         FROM torneigs t
//         JOIN mode_jocs mj ON t.modeJoc_id = mj.id
//         JOIN jocs j ON mj.jocId = j.id
//         LEFT JOIN mapas m ON t.mapa_id = m.id
//         LEFT JOIN premis p ON t.id = p.torneig_id
//         LEFT JOIN partidas pa ON t.id = pa.torneig_id
//         LEFT JOIN equips_torneigs et ON t.id = et.torneig_id
//         LEFT JOIN equips e ON et.equip_id = e.id
//         ORDER BY t.id
//     ");

//     $torneigs = [];

//     foreach ($rawData as $row) {
//         $tid = $row->torneig_id;

//         if (!isset($torneigs[$tid])) {
//             $torneigs[$tid] = [
//                 'id' => $tid,
//                 'nom' => $row->torneig_nom,
//                 'participants' => $row->participants,
//                 'tipus' => $row->tipus,
//                 'data_inici' => $row->data_inici,
//                 'data_fi' => $row->data_fi,
//                 'estat' => $row->estat,
//                 'quantitat_partides' => $row->quantitat_partides,
//                 'numero_equips' => $row->numero_equips,
//                 'mode_joc' => $row->mode_joc,
//                 'joc_foto' => $row->joc_foto,
//                 'mapa_nom' => $row->mapa_nom,
//                 'premis' => [],
//                 'partides' => [],
//                 'equips' => [],
//             ];
//         }


//         // Partides
//         if ($row->posicio_partida !== null && $row->resultat_equip_id !== null) {
//             $torneigs[$tid]['partides'][] = [
//                 'posicio_partida' => $row->posicio_partida,
//                 'resultat_equip_id' => $row->resultat_equip_id,
//                 'data_hora' => $row->data_hora,
//             ];
//         }

//         // Equips
//         if ($row->equip_id !== null) {
//             $torneigs[$tid]['equips'][$row->equip_id] = $row->equip_nom;
//         }
//     }

//     // Convertir equips a array plano
//     foreach ($torneigs as &$torneig) {
//         $torneig['equips'] = array_values(array_map(function ($nom, $id) {
//             return ['id' => $id, 'nom' => $nom];
//         }, $torneig['equips'], array_keys($torneig['equips'])));
//     }

//     return response()->json(array_values($torneigs));
// }
public function list()
{
    $rawData = DB::select("
        SELECT 
            t.id AS torneig_id,
            t.nom AS torneig_nom,
            t.participants,
            t.tipus,
            t.data_inici,
            t.data_fi,
            t.estat,
            t.quantitat_partides,
            t.numero_equips,

            mj.descripcio AS mode_joc,
            j.foto AS joc_foto,
            m.mapa AS mapa_nom,

            p.posicio_premi,
            p.valor AS premi_valor,

            pa.posicio_partida,
            pa.resultat_equip_id,
            pa.data_hora,

            et.equip_id,
            e.nom AS equip_nom
        FROM torneigs t
        JOIN mode_jocs mj ON t.modeJoc_id = mj.id
        JOIN jocs j ON mj.jocId = j.id
        LEFT JOIN mapas m ON t.mapa_id = m.id
        LEFT JOIN premis p ON t.id = p.torneig_id
        LEFT JOIN partidas pa ON t.id = pa.torneig_id
        LEFT JOIN equips_torneigs et ON t.id = et.torneig_id
        LEFT JOIN equips e ON et.equip_id = e.id
        ORDER BY t.id
    ");

    $torneigs = [];

    foreach ($rawData as $row) {
        $tid = $row->torneig_id;

        if (!isset($torneigs[$tid])) {
            $torneigs[$tid] = [
                'id' => $tid,
                'nom' => $row->torneig_nom,
                'participants' => $row->participants,
                'tipus' => $row->tipus,
                'data_inici' => $row->data_inici,
                'data_fi' => $row->data_fi,
                'estat' => $row->estat,
                'quantitat_partides' => $row->quantitat_partides,
                'numero_equips' => $row->numero_equips,
                'mode_joc' => $row->mode_joc,
                'joc_foto' => $row->joc_foto,
                'mapa_nom' => $row->mapa_nom,
                // 'premi_posicio' => $row->posicio_premi,
                'premi_valor' => $row->premi_valor,
                'partides' => [],
                'equips' => [],
            ];
        }

        // Partides (Eliminamos duplicados por posicio_partida y resultat_equip_id)
        if ($row->posicio_partida !== null) {
            $partidaId = $row->posicio_partida . '-' . $row->resultat_equip_id;  // Creando una clave única por partida

            // Verificamos si ya existe una partida con esa combinación
            if (!isset($torneigs[$tid]['partides'][$partidaId])) {
                $torneigs[$tid]['partides'][$partidaId] = [
                    'posicio_partida' => $row->posicio_partida,
                    'resultat_equip_id' => $row->resultat_equip_id,
                    'data_hora' => $row->data_hora,
                ];
            }
        }

        // Equips
        if ($row->equip_id !== null) {
            $torneigs[$tid]['equips'][$row->equip_id] = $row->equip_nom;
        }
    }

    // Convertir equips a array plano
    foreach ($torneigs as &$torneig) {
        $torneig['equips'] = array_values(array_map(function ($nom, $id) {
            return ['id' => $id, 'nom' => $nom];
        }, $torneig['equips'], array_keys($torneig['equips'])));

        // Convertir las partidas a un array normal
        $torneig['partides'] = array_values($torneig['partides']);
    }

    return response()->json(array_values($torneigs));
}




    public function new(Request $request)
    {
        if ($request->isMethod('post')) {
            $torneig = new Torneig();
            $request->validate([
                'nom' => 'required|string',
                'participats' => 'required|integer',
                'tipus' => 'required|string',
                'data_inici' => 'required|datetime',
                'data_fi' => 'required|datetime',
                'estat' => 'required|string',
                'modeJoc_id' => 'required|integer',
                'quantitat_partides' => 'required|min:1|max:5'
            ], [
                'nom.required' => 'El nom és obligatori',
                'participats.required' => 'El nombre de participants és obligatori',
                'tipus.required' => 'El tipus de torneig és obligatori',
                'data_inici.required' => 'La data d\'inici és obligatòria',
                'data_fi.required' => 'La data de finalització és obligatòria',
                'estat.required' => 'L\'estat del torneig és obligatori',
                'modeJoc_id.reuired' => 'El mòde de joc es obligatòri',
                'quantitat_partides.required' => 'La quantitat de partides es obligatòria',
                'quantitat_partides.min' => 'Hi ha d\'haver almenys una partida',
                'quantitat_partides.max' => 'No hi poden haver més de 5 partides'
            ]);

            $torneig->nom = $request->nom;
            $torneig->participats = $request->participats;
            $torneig->tipus = $request->tipus;
            $torneig->data_inici = $request->data_inici;
            $torneig->data_fi = $request->data_fi;
            $torneig->estat = $request->estat;
            $torneig->modeJoc_id = $request->modeJoc_id;
            $torneig->quantitat_partides = $request->quantitat_partides;


            $torneig->save();
        }
        return response()->json($torneig);
    }

    public function show($id)
    {
        $torneig = Torneig::findOrFail($id);
        return response()->json($torneig);
    }

    public function edit(Request $request, $id)
    {
        if ($request->isMethod('post')) {
            $torneig = Torneig::findOrFail($id);
            $request->validate([
                'nom' => 'required|string',
                'participats' => 'required|integer',
                'tipus' => 'required|string',
                'data_inici' => 'required|datetime',
                'data_fi' => 'required|datetime',
                'estat' => 'required|string',
                'modeJoc_id' => 'required|integer',
                'quantitat_partides' => 'required|min:1|max:5'
            ], [
                'nom.required' => 'El nom és obligatori',
                'participats.required' => 'El nombre de participants és obligatori',
                'tipus.required' => 'El tipus de torneig és obligatori',
                'data_inici.required' => 'La data d\'inici és obligatòria',
                'data_fi.required' => 'La data de finalització és obligatòria',
                'estat.required' => 'L\'estat del torneig és obligatori',
                'modeJoc_id.reuired' => 'El mòde de joc es obligatòri',
                'quantitat_partides.required' => 'La quantitat de partides es obligatòria',
                'quantitat_partides.min' => 'Hi ha d\'haver almenys una partida',
                'quantitat_partides.max' => 'No hi poden haver més de 5 partides'
            ]);

            $torneig->nom = $request->nom;
            $torneig->participats = $request->participats;
            $torneig->tipus = $request->tipus;
            $torneig->data_inici = $request->data_inici;
            $torneig->data_fi = $request->data_fi;
            $torneig->estat = $request->estat;
            $torneig->modeJoc_id = $request->modeJoc_id;
            $torneig->quantitat_partides = $request->quantitat_partides;


            $torneig->save();
        }
        return response()->json($torneig);
    }

    public function delete($id)
    {
        $torneig = Torneig::findOrFail($id);
        $torneig->delete();

        return response()->json('El torneig ' . $torneig->nom . ' s\'ha eliminat');
    }
}
