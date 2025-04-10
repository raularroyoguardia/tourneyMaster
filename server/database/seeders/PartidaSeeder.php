<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Partida;
class PartidaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Partida::create([
            'data_hora' => '2025-06-06 11:00:00',
            'posicio_partida' => 1,
            'torneig_id' => 1 
        ]);

        Partida::create([
            'data_hora' => '2025-06-20 11:00:00',
            'posicio_partida' => 2,
            'torneig_id' => 1 
        ]);

        Partida::create([
            'data_hora' => '2025-07-12 11:00:00',
            'posicio_partida' => 3,
            'torneig_id' => 2 
        ]);

        //TORNEIG 2
        Partida::create([
            'data_hora' => '2025-04-01 10:00:00',
            'posicio_partida' => 1,
            'resultat_equip_id' => 1,
            'torneig_id' => 2 
        ]);

        Partida::create([
            'data_hora' => '2025-05-10 11:00:00',
            'posicio_partida' => 2,
            'torneig_id' => 2 
        ]);

        Partida::create([
            'data_hora' => '2025-08-20 11:00:00',
            'posicio_partida' => 3,
            'torneig_id' => 2 
        ]);

        //TORNEIG 3
        Partida::create([
            'data_hora' => '2025-01-01 10:00:00',
            'posicio_partida' => 1,
            'resultat_equip_id' => 1,
            'torneig_id' => 3
        ]);

        Partida::create([
            'data_hora' => '2025-01-15 10:00:00',
            'posicio_partida' => 1,
            'resultat_equip_id' => 2,
            'torneig_id' => 3 
        ]);

        Partida::create([
            'data_hora' => '2025-01-30 10:00:00',
            'posicio_partida' => 1,
            'resultat_equip_id' => 1,
            'torneig_id' => 3 
        ]);

        //TORNEIG 4
        Partida::create([
            'data_hora' => '2025-04-01 10:00:00',
            'posicio_partida' => 1,
            'resultat_equip_id' => 6,
            'torneig_id' => 4 
        ]);

        Partida::create([
            'data_hora' => '2025-04-01 10:00:00',
            'posicio_partida' => 1,
            'torneig_id' => 4 
        ]);

        Partida::create([
            'data_hora' => '2025-04-01 10:00:00',
            'posicio_partida' => 1,
            'torneig_id' => 4 
        ]);
    }
}
