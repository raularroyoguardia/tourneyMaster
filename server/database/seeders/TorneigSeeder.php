<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Torneig;
class TorneigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Torneig::create([
            'nom' => 'Torneig de No Començat',
            'participants' => 4,
            'tipus' => 'col·lectiu',
            'data_inici' => '2025-06-06 11:00:00',
            'data_fi' => '2025-07-15 12:00:00',
            'estat' => 'No Començat',
            'quantitat_partides' => 3,
            'numero_equips' => 2,
            'modeJoc_id' => 16
        ]);

        Torneig::create([
            'nom' => 'Torneig En Procès',
            'participants' => 4,
            'tipus' => 'col·lectiu',
            'data_inici' => '2025-04-01 10:00:00',
            'data_fi' => '2025-08-22 19:00:00',
            'estat' => 'En procès',
            'quantitat_partides' => 3,
            'numero_equips' => 2,
            'modeJoc_id' => 16
        ]);

        Torneig::create([
            'nom' => 'Torneig Finalitzat',
            'participants' => 4,
            'tipus' => 'col·lectiu',
            'data_inici' => '2025-01-01 10:00:00',
            'data_fi' => '2025-02-01 11:30:00',
            'estat' => 'Finalitzat',
            'quantitat_partides' => 3,
            'numero_equips' => 2,
            'modeJoc_id' => 16
        ]);

        Torneig::create([
            'nom' => 'Torneig Individual',
            'participants' => 2,
            'tipus' => 'idividual',
            'data_inici' => '2025-04-01 10:00:00',
            'data_fi' => '2025-08-22 19:00:00',
            'estat' => 'En procès',
            'quantitat_partides' => 3,
            'numero_equips' => 2,
            'modeJoc_id' => 21
        ]);
    }
}
