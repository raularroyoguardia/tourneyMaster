<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClassificacioController extends Controller
{
    //CLASSIFICACIÓ INDIVIDUAL
    public function getIndividual()
    {
        $individual = DB::select("
        SELECT equips.*, users.name AS user_name FROM equips JOIN equips_users ON equips.id = equips_users.equip_id JOIN users ON equips_users.user_id = users.id WHERE equips.maxim_integrants = 1 ORDER BY equips.trofeus DESC;");
        return response()->json($individual);
    }

    //CLASSIFICACIÓ COL·LECTIVA
    public function getCollective()
    {
        $collective = DB::select("SELECT * FROM `equips` WHERE maxim_integrants > 1 ORDER BY trofeus desc;");
        return response()->json($collective);
    }
}
