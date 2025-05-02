<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Models\Joc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class JocController extends Controller
{
    public function list()
    {
        $jocs = Joc::with(['modeJocs.mapas'])->get();
        return response()->json($jocs);
    }

    public function new(Request $request)
    {
        $joc = new Joc();
        $request->validate([
            'nom' => 'required|string',
            'categoria' => 'required|string',
            'plataforma' => 'required|string',
            'foto' => 'required'
        ], [
            'nom.required' => 'El nom és obligatori',
            'categoria.required' => 'La categoria és obligatoria',
            'plataforma.required' => 'La plataforma és obligatoria',
            'foto.required' => 'La foto és obligatoria'
        ]);

        $joc->nom = $request->nom;
        $joc->categoria = $request->categoria;
        $joc->plataforma = $request->plataforma;
        $joc->foto = $request->foto;

        $joc->save();

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $extension = $file->getClientOriginalExtension();
            $filename = strtolower(Str::snake($joc->nom) . '.' . $extension);
            $file->move(public_path('uploads/fotoJocs'), $filename);
            $joc->foto = $filename;
            $joc->save();
        }
        return response()->json($joc);
    }

    public function show($id)
    {
        $joc = Joc::findOrFail($id);
        return response()->json($joc);
    }

    public function edit(Request $request, $id)
    {
        $joc = Joc::find($id);
        $request->validate([
            'nom' => 'required|string',
            'categoria' => 'required|string',
            'plataforma' => 'required|string',
            'foto' => 'required'
        ], [
            'nom.required' => 'El nom és obligatori',
            'categoria.required' => 'La categoria és obligatoria',
            'plataforma.required' => 'La plataforma és obligatoria',
            'foto.required' => 'La foto és obligatoria'
        ]);

        if ($joc->foto && File::exists(public_path('uploads/fotoJocs/' . $joc->foto))) {
            File::delete(public_path('uploads/fotoJocs/' . $joc->foto));
        }

        $joc->nom = $request->nom;
        $joc->categoria = $request->categoria;
        $joc->plataforma = $request->plataforma;
        $joc->foto = $request->foto;

        $joc->save();

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $extension = $file->getClientOriginalExtension();
            $filename = strtolower($joc->nom . '.' . $extension);
            $file->move(public_path('uploads/fotoJocs'), $filename);
            $joc->foto = $filename;
            $joc->save();
        }
        return response()->json($joc);
    }

    public function delete($id)
    {
        $joc = Joc::findOrFail($id);
        if ($joc->foto && File::exists(public_path('uploads/fotoJocs/' . $joc->foto))) {
            File::delete(public_path('uploads/fotoJocs/' . $joc->foto));
        }
        $joc->delete();
        return response()->json('Joc ' . $joc->nom . ' eliminat');
    }
}
