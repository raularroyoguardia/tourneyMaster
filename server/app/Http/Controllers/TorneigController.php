<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Torneig;
use Illuminate\Support\Facades\DB;

class TorneigController extends Controller
{
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

            p.valor AS premi_valor,

            pa.posicio_partida,
            pa.resultat_equip_id,
            pa.data_hora,

            et.equip_id,
            e.nom AS equip_nom,
            e.foto_equip
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
                    'premi_valor' => $row->premi_valor,
                    'partides' => [],
                    'equips' => [],
                ];
            }

            if ($row->posicio_partida !== null) {
                $partidaId = $row->posicio_partida . '-' . $row->resultat_equip_id; 

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
                $torneigs[$tid]['equips'][$row->equip_id] = [
                    'id' => $row->equip_id,
                    'nom' => $row->equip_nom,
                    'foto_equip' => $row->foto_equip
                ];
            }
        }

        foreach ($torneigs as &$torneig) {
            $torneig['equips'] = array_values(array_map(function ($equip) {
                return ['id' => $equip['id'], 'nom' => $equip['nom'], 'foto_equip' => $equip['foto_equip']];
            }, $torneig['equips']));

            $torneig['partides'] = array_values($torneig['partides']);
        }

        return response()->json(array_values($torneigs));
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
            'estat' => 'required|string',
            'modeJoc_id' => 'required|integer',
            'quantitat_partides' => 'required|min:1|max:5',
            'numero_equips' => 'required|min:2|max:5',
        ], [
            'nom.required' => 'El nom és obligatori',
            'participants.required' => 'El nombre de participants és obligatori',
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
        $torneig->participants = $request->participants;
        $torneig->tipus = $request->tipus;
        $torneig->data_inici = $request->data_inici;
        $torneig->data_fi = $request->data_fi;
        $torneig->estat = $request->estat;
        $torneig->modeJoc_id = $request->modeJoc_id;
        $torneig->quantitat_partides = $request->quantitat_partides;
        $torneig->numero_equips = $request->participants;
        $torneig->mapa_id = $request->mapa_id;


        $torneig->save();
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
                'participants' => 'required|integer',
                'tipus' => 'required|string',
                'data_inici' => 'required|datetime',
                'data_fi' => 'required|datetime',
                'estat' => 'required|string',
                'modeJoc_id' => 'required|integer',
                'quantitat_partides' => 'required|min:1|max:5'
            ], [
                'nom.required' => 'El nom és obligatori',
                'participants.required' => 'El nombre de participants és obligatori',
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
            $torneig->participants = $request->participants;
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
