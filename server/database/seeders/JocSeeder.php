<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Joc;

class JocSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Joc::create([
            'nom' => 'EA FC 25',
            'categoria' => 'Futbol',
            'plataforma' => 'PS5, XBOX, PS4, PC',
            'foto' => 'eafc25'
        ]);

        Joc::create([
            'nom' => 'Valorant',
            'categoria' => 'Shooter',
            'plataforma' => 'PC',
        ]);
    }
}
