<?php

namespace App\Http\Controllers;
use App\Models\Partida;
use Illuminate\Http\Request;
use App\Models\Torneig;

class PartidaController extends Controller
{
    public Function list() {
        $partides = Partida::with('torneig');
        return response()->json($partides);
    }

    public function new(Request $request) {
        if($request->isMethod('post')) {
            $partida = new Partida();
            $request->validate([
                'data_hora' => 'required|datetime',
                'resultat' => 'required'
            ], [
                'data_hora.required' => 'La data de la partida es obligatòria',
                'resultat.required' => 'El resultat de la partida es obligatòri'
            ]);
            $partida->data_hora = $request->data_hora;
            $partida->resultat = $request->resultat;

            $partida->save();
        }
        return response()->json($partida);
    }

    public function show($id) {
        $partida = Partida::findOrFail($id);
        return response()->json($partida);
    }

    public function edit(Request $request, $id) {
        if($request->isMethod('post')) {
            $partida = Partida::findOrFail($id);
            $request->validate([
                'data_hora' => 'required|datetime',
                'resultat' => 'required'
            ], [
                'data_hora.required' => 'La data de la partida es obligatòria',
                'resultat.required' => 'El resultat de la partida es obligatòri'
            ]);
            $partida->data_hora = $request->data_hora;
            $partida->resultat = $request->resultat;

            $partida->save();
        }
        return response()->json($partida);
    }

        
    public function delete($id) {
        $partida = Partida::findOrFail($id);
        $partida->delete();
        return response()->json('La partida del torneig ' . $partida->torneig->nom . ' s\'ha eliminat');
    }

    public function addtoTorneig(Request $request, $id) {
        $partida = Partida::findOrFail($id);
        $torneig = Torneig::findOrFail($request->id);
        $torneig->equips()->attach($partida->id);
        return response()->json('Partida ' . $partida->id . ' afegit al torneig ' . $torneig->nom);
    }
}
