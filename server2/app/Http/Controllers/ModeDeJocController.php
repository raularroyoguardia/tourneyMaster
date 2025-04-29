<?php

namespace App\Http\Controllers;

use App\Models\ModeJoc;
use Illuminate\Http\Request;

class ModeDeJocController extends Controller
{
    public function list()
    {
        $jocs = ModeJoc::with('joc')->get();
        return response()->json($jocs);
    }

    public function new(Request $request)
    {
        $modeJoc = new ModeJoc();
        $request->validate([
            'nom' => 'required|string',
            'descripcio' => 'required|string|max:150',
            'jugadors' => 'required|integer',
            'joc_id' => 'required'
        ], [
            'nom.required' => 'El nom es obligatòri',
            'descripcio.required' => 'La descripció es obligatòria',
            'descripcio.max' => 'La descripció no pot superar els 150 caràcters',
            'jugadors.required' => 'El tipus es obligatòri',
            'joc_id.required' => 'Es obligatori assignar un joc'
        ]);
        $modeJoc->nom = $request->nom;
        $modeJoc->descripcio = $request->descripcio;
        $modeJoc->jugadors = $request->jugadors;
        $modeJoc->joc_id = $request->joc_id;
        $modeJoc->save();
        return response()->json($modeJoc);
    }

    public function show($id)
    {
        $modeJoc = ModeJoc::with('joc')->findOrFail($id);
        return response()->json($modeJoc);
    }
    public function edit(Request $request, $id)
    {
            $modeJoc = ModeJoc::findOrFail($id);
            $request->validate([
                'nom' => 'required|string',
                'descripcio' => 'required|string|max:150',
                'jugadors' => 'required|integer',
                'joc_id' => 'required'
            ], [
                'nom.required' => 'El nom es obligatòri',
                'descripcio.required' => 'La descripció es obligatòria',
                'descripcio.max' => 'La descripció no pot superar els 150 caràcters',
                'jugadors.required' => 'El tipus es obligatòri',
                'joc_id.required' => 'Es obligatori assignar un joc'
            ]);
            $modeJoc->nom = $request->nom;
            $modeJoc->descripcio = $request->descripcio;
            $modeJoc->jugadors = $request->jugadors;
            $modeJoc->joc_id = $request->joc_id;
            $modeJoc->save();
        return response()->json($modeJoc);
    }

    public function delete($id)
    {
        $modeJoc = ModeJoc::findOrFail($id);
        $modeJoc->delete();
        return response()->json('Mode de joc ' . $modeJoc->nom . ' eliminat');
    }
}
