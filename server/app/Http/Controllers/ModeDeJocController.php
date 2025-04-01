<?php

namespace App\Http\Controllers;

use App\Models\ModeJoc;
use Illuminate\Http\Request;

class ModeDeJocController extends Controller
{
    public function list() {
        $jocs = ModeJoc::with('joc');
        return response()->json($jocs);
    }

    public function new(Request $request) {
        if($request->isMethod('post')) {
            $modeJoc = new ModeJoc();
            $request->validate([
               'nom' => 'required|string', 
               'descripcio' => 'required|string|max:150',
               'tipus' => 'required|string',
               'jocId' => 'required'
            ], [
                'nom.required' => 'El nom es obligatòri',
                'descripcio.required' => 'La descripció es obligatòria',
                'descripcio.max' => 'La descripció no pot superar els 150 caràcters',
                'tipus.required' => 'El tipus es obligatòri',
                'jocId.required' => 'Es obligatori assignar un joc'
            ]);
            $modeJoc->nom = $request->nom;
            $modeJoc->descripcio = $request->descripcio;
            $modeJoc->tipus = $request->tipus;
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
                'tipus' => 'required|string',
                'jocId' => 'required'
             ], [
                 'nom.required' => 'El nom es obligatòri',
                 'descripcio.required' => 'La descripció es obligatòria',
                 'descripcio.max' => 'La descripció no pot superar els 150 caràcters',
                 'tipus.required' => 'El tipus es obligatòri',
                 'jocId.required' => 'Es obligatori assignar un joc'
             ]);
            $modeJoc->nom = $request->nom;
            $modeJoc->descripcio = $request->descripcio;
            $modeJoc->tipus = $request->tipus;
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
