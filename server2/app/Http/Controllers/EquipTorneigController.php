<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Torneig;
use App\Models\Equip;

class EquipTorneigController extends Controller
{
    public function addtoTorneig(Request $request, $id)
    {
        $equip = Equip::findOrFail($id);
        $torneig = Torneig::findOrFail($request->id);
        $torneig->equips()->attach($equip->id);
        return response()->json('Equip ' . $equip->nom . ' afegit al torneig ' . $torneig->nom);
    }
}
