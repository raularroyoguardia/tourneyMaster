<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Mapa;
use Illuminate\Support\Facades\File;

class MapaController extends Controller
{
    public function list() {
        $mapes = Mapa::all();
        return response()->json($mapes);
    }

    public function new(Request $request) {
        if($request->isMethod('post')) {
            $mapa = new Mapa();
            $request->validate([
                'nom' => 'required|max:50',
                'mapa' => 'required'
            ], [
                'nom.required' => 'Nom del mapa obligatòri',
                'nom.max' => 'Nom del mapa massa gran',
                'mapa.required' => 'Es requereix pujar una imatge del mapa'
            ]);
            $mapa->nom = $request->nom;

            $mapa->save();

            if($request->hasFile('mapa')) {
                $file = $request->file('mapa');
                $extension = $file->getClientOriginalExtension();
                $filename = strtolower(Str::snake($mapa->nom) . '.' . $extension);
                $file->move(public_path('uploads/mapes'), $filename);
                $mapa->mapa = $filename;
                $mapa->save();
            }

            return response()->json($mapa);
        }
    }

    public function delete($id) {
        $mapa = Mapa::findOrFail($id);

        if ($mapa->mapa && File::exists(public_path('uploads/mapes/' . $mapa->mapa))) {
            File::delete(public_path('uploads/mapes/' . $mapa->mapa));
        }

        $mapa->delete();

        return response()->json('Mapa ' . $mapa->nom . ' eliminat');
    }
}
