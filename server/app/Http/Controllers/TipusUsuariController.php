<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TipusUsuari;

class TipusUsuariController extends Controller
{
   public function list (){
        $tipus_usuari = TipusUsuari::all();
        return response()->json($tipus_usuari);
    }
    
    public function new(Request $request) {
        if($request->isMethod('post')) {
            $tipus_usuari = new TipusUsuari();
            $request->validate([
                'tipus' => 'required'
            ], [
                'tipus.required' => 'El tipus és obligatori'
            ]);
            $tipus_usuari->tipus = $request->tipus;
            $tipus_usuari->permisos = $request->permisos;
            $tipus_usuari->save();
        }
        return response()->json($tipus_usuari);
    }

    public function show($id) {
        $tipus_usuari = TipusUsuari::findOrFail($id);
        return response()->json($tipus_usuari);
    }
    
    public function edit(Request $request, $id) {
        if($request->isMethod('post')) {
            $tipus_usuari = TipusUsuari::findOrFail($id);
            $request->validate([
                'tipus' => 'required'
            ], [
                'tipus.required' => 'El tipus és obligatori'
            ]);
            $tipus_usuari->tipus = $request->tipus;
            $tipus_usuari->permisos = $request->permisos;
            $tipus_usuari->save();
        }
        return response()->json($tipus_usuari);
    }

    public function delete($id) {
        $tipus_usuari = TipusUsuari::findOrFail($id);
        $tipus_usuari->delete();
        return response()->json('El tipus d\'usuari ' . $tipus_usuari->tipus . ' s\'ha eliminat');
    }
}