<?php

namespace App\Http\Controllers;

use App\Models\Premi;
use Illuminate\Http\Request;
use App\Models\Torneig;

class PremiController extends Controller
{
    public function list()
    {
        $premis = Premi::with('torneig');
        return response()->json($premis);
    }

    public function new(Request $request)
    {
        $premi = new Premi();
        $request->validate([
            'valor' => 'required|integer'
        ], [
            'valor.required' => 'Indica la quantitat de trofeus obtinguda en aquest premi'
        ]);
        $premi->valor = $request->valor;

        $premi->save();
        return response()->json($premi);
    }

    public function show($id)
    {
        $premi = Premi::findOrFail($id);

        return response()->json($premi);
    }

    public function edit(Request $request, $id)
    {
        if ($request->isMethod('post')) {
            $premi = Premi::findOrFail($id);
            $request->validate([
                'tipus' => 'required|string',
                'valor' => 'required|integer'
            ], [
                'tipus.required' => 'El guanyador es obligatòri',
                'valor.required' => 'Indica la quantitat de trofeus obtinguda en aquest premi'
            ]);
            $premi->tipus = $request->tipus;
            $premi->valor = $request->valor;

            $premi->save();
        }

        return response()->json($premi);
    }

    public function delete($id)
    {
        $premi = Premi::findOrFail($id);
        $premi->delete();

        return response()->json('El premi de ' . $premi->valor . ' trofeus s\'ha eliminat');
    }

    public function addtoTorneig(Request $request, $id)
    {
        $premi = Premi::findOrFail($id);
        $torneig = Torneig::findOrFail($request->id);
        $torneig->usuaris()->attach($premi->id);
        return response()->json('Premi afegit al torneig ' . $torneig->nom);
    }
}
