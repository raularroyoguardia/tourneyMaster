<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Equip;
use App\Models\User;

class EquipUserController extends Controller
{
    public function listEquipsWithUsers()
    {
        $rawData = DB::select("
        SELECT 
            e.id AS equip_id,
            e.nom AS equip_nom,
            e.regio,
            e.foto_equip,
            e.trofeus AS equip_trofeus,
            e.data_creacio,
            e.descripcio,
            e.maxim_integrants,
        
            u.id AS user_id,
            u.name AS user_name,
            u.email,
            u.telefon,
            u.foto_perfil,
            u.trofeus AS user_trofeus
        FROM equips e
        LEFT JOIN equips_users eu ON e.id = eu.equip_id
        LEFT JOIN users u ON eu.user_id = u.id
        ORDER BY e.id, u.trofeus DESC
        ");

        // Agrupar los datos por equipo
        $equips = [];

        foreach ($rawData as $row) {
            $equipId = $row->equip_id;

            if (!isset($equips[$equipId])) {
                $equips[$equipId] = [
                    'id' => $row->equip_id,
                    'nom' => $row->equip_nom,
                    'regio' => $row->regio,
                    'foto_equip' => $row->foto_equip,
                    'trofeus' => $row->equip_trofeus,
                    'data_creacio' => $row->data_creacio,
                    'descripcio' => $row->descripcio,
                    'maxim_integrants' => $row->maxim_integrants,
                    'users' => []
                ];
            }

            if ($row->user_id !== null) {
                $equips[$equipId]['users'][] = [
                    'id' => $row->user_id,
                    'name' => $row->user_name,
                    'email' => $row->email,
                    'telefon' => $row->telefon,
                    'foto_perfil' => $row->foto_perfil,
                    'trofeus' => $row->user_trofeus,
                ];
            }
        }

        return response()->json(array_values($equips));
    }

    public function addtoEquip($id, Request $request)
    {
        $user = User::findOrFail($id);
        $equip = Equip::findOrFail($request->$id);
        $equip->usuaris()->attach($user->id);
        return response()->json('Usuari ' . $user->name . ' afegit a l\'equip ' . $id);
    }
}
