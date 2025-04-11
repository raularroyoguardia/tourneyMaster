<?php

namespace App\Http\Controllers;

use App\Models\Equip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Models\Torneig;
use Illuminate\Support\Str;
use function Pest\Laravel\json;
use Illuminate\Support\Facades\DB;

class EquipController extends Controller
{
    public function list()
    {
        $equips = Equip::all();
        return response()->json($equips);
    }

    public function new(Request $request)
    {
        if ($request->isMethod('post')) {
            $equip = new Equip();
            $request->validate([
                'nom' => 'required|string|max:20',
                'regio' => 'required|string',
                'descripcio' => 'required|string|max:255',
                'maxim_integrants' => 'required|max:5'
            ], [
                'nom.required' => 'El nom és obligatòri',
                'nom.max' => 'El nom de l\'equip no pot superar els 20 caràcters.',
                'regio.required' => 'La regió és obligatòria',
                'descripcio.required' => 'La descripció és obligatòria',
                'descripcio.max' => 'La descripció no pot superar els 255 caràcters.',
                'maxim_integrants.required' => 'El màxim d\'integrants és obligatori',
                'maxim_integrants.max' => 'El màxim d\'integrants no pot superar 5 persones.'
            ]);

            $equip->nom = $request->nom;
            $equip->regio = $request->regio;
            $equip->data_creacio = now();
            $equip->descripcio = $request->descripcio;
            $equip->maxim_integrants = $request->maxim_integrants;

            $equip->save();

            if ($request->hasFile('foto_equip')) {
                $file = $request->file('foto_equip');
                $extension = $file->getClientOriginalExtension();
                $filename = strtolower(Str::snake($equip->nom) . '.' . $extension);
                $file->move(public_path('uploads/fotoEquips/'), $filename);
                $equip->foto_equip = $filename;
                $equip->save();
            }
        }
        return response()->json($equip);
    }

    public function show($id)
    {
        $equip = Equip::findOrFail($id);

        return response()->json($equip);
    }

    public function edit(Request $request, $id)
    {
        $equip = Equip::findOrFail($id);

        if ($request->isMethod('post')) {
            $equip = Equip::find($id);
            $request->validate([
                'nom' => 'required|string|max:20',
                'regio' => 'required|string',
                'descripcio' => 'required|string|max:255',
                'maxim_integrants' => 'required|max:5'
            ], [
                'nom.required' => 'El nom és obligatòri',
                'nom.max' => 'El nom de l\'equip no pot superar els 20 caràcters',
                'regio.required' => 'La regió és obligatòria',
                'descripcio.required' => 'La descripció és obligatòria',
                'descripcio.max' => 'La descripció no pot superar els 255 caràcters',
                'maxim_integrants.required' => 'El màxim d\'integrants és obligatori',
                'maxim_integrants.max' => 'El màxim d\'integrants no pot superar 5 persones'
            ]);

            $equip->nom = $request->nom;
            $equip->descripcio = $request->descripcio;
            $equip->maxim_integrants = $request->maxim_integrants;

            $equip->save();

            if ($request->hasFile('foto_equip')) {

                if ($equip->foto_equip && File::exists(public_path('uploads/fotoEquips/' . $equip->foto_equip))) {
                    File::delete(public_path('uploads/fotoEquips/' . $equip->foto_equip));
                }

                $file = $request->file('foto_equip');
                $extension = $file->getClientOriginalExtension();
                $filename = strtolower($equip->nom . '.' . $extension);
                $file->move(public_path('uploads/fotoEquips/'), $filename);
                $equip->foto_equip = $filename;
                $equip->save();
            }
        }

        return response()->json($equip);
    }

    public function delete($id)
    {
        $equip = Equip::findOrFail($id);
        if ($equip->foto_equip && File::exists(public_path('uploads/fotoEquips/' . $equip->foto_equip))) {
            File::delete(public_path('uploads/fotoEquips/' . $equip->foto_equip));
        }
        $equip->delete();
        return response()->json('Equip ' . $equip->nom . ' eliminat');
    }

    public function addtoTorneig(Request $request, $id)
    {
        $equip = Equip::findOrFail($id);
        $torneig = Torneig::findOrFail($request->id);
        $torneig->equips()->attach($equip->id);
        return response()->json('Equip ' . $equip->nom . ' afegit al torneig ' . $torneig->nom);
    }

    // public function getIndividual()
    // {
    //     $individual = DB::select("SELECT * FROM `equips` WHERE maxim_integrants = 1 ORDER BY trofeus desc;");
    //     return response()->json($individual);
    // }

    public function getIndividual()
    {
        $individual = DB::select("
        SELECT equips.*, users.name AS user_name FROM equips JOIN equips_users ON equips.id = equips_users.equip_id JOIN users ON equips_users.user_id = users.id WHERE equips.maxim_integrants = 1 ORDER BY equips.trofeus DESC;");
        return response()->json($individual);
    }
    public function getCollective()
    {
        $collective = DB::select("SELECT * FROM `equips` WHERE maxim_integrants > 1 ORDER BY trofeus desc;");
        return response()->json($collective);
    }
}


// col·lectiu
//SELECT * FROM `equips` WHERE maxim_integrants > 1 ORDER BY trofeus desc;


// individual
// SELECT * FROM `equips` WHERE maxim_integrants = 1 ORDER BY trofeus desc;