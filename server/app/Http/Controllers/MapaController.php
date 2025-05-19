<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Mapa;
use Illuminate\Support\Facades\File;

class MapaController extends Controller
{
    public function list()
    {
        $mapes = Mapa::all();
        return response()->json($mapes);
    }

    public function new(Request $request)
    {
        $mapa = new Mapa();
        $request->validate([
            'nom' => 'required|max:50',
            'mapa' => 'required|file|image',
            'mode_joc_id' => 'required|exists:mode_jocs,id',
        ], [
            'nom.required' => 'Nom del mapa obligatòri',
            'nom.max' => 'Nom del mapa massa gran',
            'mapa.required' => 'Es requereix pujar una imatge del mapa',
            'mode_joc_id.required' => 'Es obligatori seleccionar un mode de joc',
            'mode_joc_id.exists' => 'Mode de joc no vàlid'
        ]);        

        $mapa->nom = $request->nom;
        $mapa->mapa = $request->mapa;

        $mapa->save();

        if ($request->hasFile('mapa')) {
            $file = $request->file('mapa');
            $extension = $file->getClientOriginalExtension();
            $filename = strtolower(Str::snake($mapa->nom) . '.' . $extension);
            $file->move(public_path('uploads/mapes'), $filename);
            $mapa->mapa = $filename;
            $mapa->save();
        }

        $mapa->modes()->attach($request->mode_joc_id);

        return response()->json($mapa);
    }

    public function delete($id)
    {
        $mapa = Mapa::findOrFail($id);

        if ($mapa->mapa && File::exists(public_path('uploads/mapes/' . $mapa->mapa))) {
            File::delete(public_path('uploads/mapes/' . $mapa->mapa));
        }

        $mapa->delete();

        return response()->json('Mapa ' . $mapa->nom . ' eliminat');
    }
}
