<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TorneigStatsController extends Controller
{
    public function index()
    {
        $stats = DB::table('torneigs as t')
            ->leftJoin('equips_torneigs as et', 'et.torneig_id', '=', 't.id')
            ->leftJoin('equips as e', 'et.equip_id', '=', 'e.id')
            ->select(
                't.id as torneig_id',
                DB::raw('COUNT(et.equip_id) as total_equips'),
                't.numero_equips'
            )
            ->groupBy('t.id', 't.numero_equips')
            ->get();

        return response()->json($stats);
    }
}
