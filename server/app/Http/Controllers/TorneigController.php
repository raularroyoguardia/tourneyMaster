<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Torneig;
use Illuminate\Support\Facades\DB;

class TorneigController extends Controller
{
    public function list() {
        // $torneigs = Torneig::all();
        $torneigs = DB::select("
        SELECT 
            torneigs.*, 
            jocs.foto AS joc_foto 
        FROM torneigs
        JOIN mode_jocs ON torneigs.modeJoc_id = mode_jocs.id
        JOIN jocs ON mode_jocs.jocId = jocs.id
    ");
        return response()->json($torneigs);
    }

    public function new(Request $request) {
        if($request->isMethod('post')) {
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

    public function show($id) {
        $torneig = Torneig::findOrFail($id);
        return response()->json($torneig);
    }

    public function edit(Request $request, $id) {
        if($request->isMethod('post')) {
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

    public function delete($id) {
        $torneig = Torneig::findOrFail($id);
        $torneig->delete();

        return response()->json('El torneig ' . $torneig->nom . ' s\'ha eliminat');
    }
}
