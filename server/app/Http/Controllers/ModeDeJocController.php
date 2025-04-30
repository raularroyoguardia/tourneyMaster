<?php

namespace App\Http\Controllers;

use App\Models\ModeJoc;
use Illuminate\Http\Request;
use App\Models\Joc;

class ModeDeJocController extends Controller
{
    // public function list() {
    //     $jocs = ModeJoc::with('joc')->get();
    //     return response()->json($jocs);
    // }
    public function list() {
        $jocs = Joc::with(['modeJocs' => function($query) {
            $query->with(['mapas' => function($query) {
                $query->select('mapas.id', 'mapas.nom');
            }]);
        }])->get();
    
        return response()->json($jocs);
    }

    public function new(Request $request) {
        if($request->isMethod('post')) {
            $modeJoc = new ModeJoc();
            $request->validate([
               'nom' => 'required|string', 
               'descripcio' => 'required|string|max:150',
               'jocId' => 'required'
            ], [
                'nom.required' => 'El nom es obligatòri',
                'descripcio.required' => 'La descripció es obligatòria',
                'descripcio.max' => 'La descripció no pot superar els 150 caràcters',
                'jocId.required' => 'Es obligatori assignar un joc'
            ]);
            $modeJoc->nom = $request->nom;
            $modeJoc->descripcio = $request->descripcio;
            $modeJoc->jugadors = $request->jugadors;
            $modeJoc->joc_id = $request->joc_id;
            $modeJoc->save();
        }
        return response()->json($modeJoc);
    }

    public function show($id) {
        $modeJoc = ModeJoc::findOrFail($id);
        return response()->json($modeJoc);
    }
    public function edit(Request $request, $id) {
        if($request->isMethod('post')) {
            $modeJoc = ModeJoc::findOrFail($id);
            $request->validate([
                'nom' => 'required|string', 
                'descripcio' => 'required|string|max:150',
                'jocId' => 'required'
             ], [
                 'nom.required' => 'El nom es obligatòri',
                 'descripcio.required' => 'La descripció es obligatòria',
                 'descripcio.max' => 'La descripció no pot superar els 150 caràcters',
                 'jocId.required' => 'Es obligatori assignar un joc'
             ]);
            $modeJoc->nom = $request->nom;
            $modeJoc->descripcio = $request->descripcio;
            $modeJoc->jugadors = $request->jugadors;
            $modeJoc->joc_id = $request->joc_id;
            $modeJoc->save();
        }
        return response()->json($modeJoc);
    }
    
    public function delete($id) {
        $modeJoc = ModeJoc::findOrFail($id);
        $modeJoc->delete();
        return response()->json('Mode de joc' . $modeJoc->nom . ' eliminat');
    }
}
