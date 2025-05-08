<?php

namespace App\Http\Controllers;

use App\Models\Partida;
use Illuminate\Http\Request;
use App\Models\Torneig;

class PartidaController extends Controller
{
    public function list()
    {
        $partides = Partida::with('torneig')->get();
        return response()->json($partides);
    }

    public function new(Request $request)
    {
        $partida = new Partida();
        $request->validate([
            'data_hora' => 'required',
            'posicio_partida' => 'required',
            'torneig_id' => 'required'
        ], [
            'data_hora.required' => 'La data de la partida es obligatòria',
            'posicio_partida.required' => 'La posicio de la partida és obligatòria',
            'torneig_id.required' => 'Assigna la partida a un torneig'
        ]);
        $partida->data_hora = $request->data_hora;
        $partida->posicio_partida = $request->posicio_partida;
        $partida->resultat_equip_id = NULL;
        $partida->torneig_id = $request->torneig_id;

        $partida->save();
        return response()->json($partida);
    }

    public function show($id)
    {
        $partida = Partida::with('torneig')->findOrFail($id);
        return response()->json($partida);
    }

    public function delete($id)
    {
        $partida = Partida::findOrFail($id);
        $partida->delete();
        return response()->json('La partida ' . $partida->posicio_partida . ' del torneig ' . $partida->torneig->nom . ' s\'ha eliminat');
    }
    public function update(Request $request, $id)
    {
        $partida = Partida::findOrFail($id);
        $partida->resultat_equip_id = $request->input('resultat_equip_id');
        $partida->save();

        return response()->json(['message' => 'Resultat actualitzat correctament']);
    }
}
