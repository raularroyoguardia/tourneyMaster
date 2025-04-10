<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EquipTorneig;

class EquipTorneigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EquipTorneig::create([
            'equip_id' => 3,
            'torneig_id' => 4
        ]);

        EquipTorneig::create([
            'equip_id' => 6,
            'torneig_id' => 4
        ]);

        EquipTorneig::create([
            'equip_id' => 1,
            'torneig_id' => 1
        ]);

        EquipTorneig::create([
            'equip_id' => 2,
            'torneig_id' => 1
        ]);

        EquipTorneig::create([
            'equip_id' => 1,
            'torneig_id' => 2
        ]);

        EquipTorneig::create([
            'equip_id' => 2,
            'torneig_id' => 2
        ]);

        EquipTorneig::create([
            'equip_id' => 1,
            'torneig_id' => 3
        ]);

        EquipTorneig::create([
            'equip_id' => 2,
            'torneig_id' => 3
        ]);
    }
}
