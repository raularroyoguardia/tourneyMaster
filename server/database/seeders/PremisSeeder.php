<?php

namespace Database\Seeders;

use App\Models\Premi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PremisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Rocket League
        Premi::create([
            'posicio_premi' => 1,
            'valor' => 100,
            'torneig_id' => 1
        ]);
        Premi::create([
            'posicio_premi' => 1,
            'valor' => 100,
            'torneig_id' => 2
        ]);
        Premi::create([
            'posicio_premi' => 1,
            'valor' => 100,
            'torneig_id' => 3
        ]);
        //Clash Royale
        Premi::create([
            'posicio_premi' => 1,
            'valor' => 75,
            'torneig_id' => 4
        ]);
    }
}


//id	posicio_premi	valor torneig_id
