<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TorneigStatsController extends Controller
{
    public function index()
    {
        $stats = DB::table('equips_torneigs as et')
            ->join('equips as e', 'et.equip_id', '=', 'e.id')
            ->select(
                'et.torneig_id',
                DB::raw('COUNT(et.equip_id) as total_equips'),
                DB::raw('MAX(e.maxim_integrants) as maxim_integrants_permesos'),
                DB::raw('COUNT(et.equip_id) = MAX(e.maxim_integrants) as torneig_ple')
            )
            ->groupBy('et.torneig_id')
            ->get();

        return response()->json($stats);
    }
}
