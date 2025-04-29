<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Torneig;
use App\Models\Partida;

class PartidaTorneigController extends Controller
{
    public function addtoTorneig(Request $request, $id)
    {
        $partida = Partida::findOrFail($id);
        $torneig = Torneig::findOrFail($request->id);
        $torneig->equips()->attach($partida->id);
        return response()->json('Partida ' . $partida->id . ' afegit al torneig ' . $torneig->nom);
    }
}
