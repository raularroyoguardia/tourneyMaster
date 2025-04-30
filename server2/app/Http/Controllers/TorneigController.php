<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Torneig;
use Illuminate\Support\Facades\DB;

class TorneigController extends Controller
{
    public function list()
    {
        $torneigs = DB::select("
        SELECT 
            torneigs.*, mode_jocs.descripcio, 
            jocs.foto AS joc_foto, jocs.nom as joc_nom 
        FROM torneigs
        JOIN mode_jocs ON torneigs.modeJoc_id = mode_jocs.id
        JOIN jocs ON mode_jocs.joc_id = jocs.id");
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
            'numero_equips' => 'required',
            'modeJoc_id' => 'required|integer',
            'mapa_id' => 'required',
            'premi_id' => 'required'
        ], [
            'nom.required' => 'El nom és obligatori',
            'participants.required' => 'El nombre de participants és obligatori',
            'tipus.required' => 'El tipus de torneig és obligatori',
            'data_inici.required' => 'La data d\'inici és obligatòria',
            'data_fi.required' => 'La data de finalització és obligatòria',
            'numero_equips.required' => 'S\'ha d\'assignar un número d\'equips',
            'modeJoc_id.required' => 'El mòde de joc es obligatòri',
            'quantitat_partides.required' => 'La quantitat de partides es obligatòria',
            'mapa_id.required' => 'Selecciona un mapa',
            'premi_id.required' => 'Selecciona un premi'
        ]);

        $torneig->nom = $request->nom;
        $torneig->participants = $request->participants;
        $torneig->tipus = $request->tipus;
        $torneig->data_inici = $request->data_inici;
        $torneig->data_fi = $request->data_fi;
        $torneig->numero_equips = $request->numero_equips;
        $torneig->modeJoc_id = $request->modeJoc_id;
        $torneig->mapa_id = $request->mapa_id;
        $torneig->premi_id = $request->premi_id;

        $torneig->save();
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
            'data_fi' => 'required',
            'numero_equips' => 'required',
            'modeJoc_id' => 'required|integer',
        ], [
            'nom.required' => 'El nom és obligatori',
            'participants.required' => 'El nombre de participants és obligatori',
            'tipus.required' => 'El tipus de torneig és obligatori',
            'data_inici.required' => 'La data d\'inici és obligatòria',
            'data_fi.required' => 'La data de finalització és obligatòria',
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
}
