<?php

namespace Database\Seeders;

use App\Models\EquipUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquipUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /*
        EquipUser::create([
            'equip_id' => 1,
            'user_id' => 1
        ]);

        EquipUser::create([
            'equip_id' => 1,
            'user_id' => 2
        ]);

        EquipUser::create([
            'equip_id' => 2,
            'user_id' => 3
        ]);

        EquipUser::create([
            'equip_id' => 2,
            'user_id' => 4
        ]);
        */

        EquipUser::create([
            'equip_id' => 3,
            'user_id' => 1
        ]);

        EquipUser::create([
            'equip_id' => 4,
            'user_id' => 3
        ]);

        EquipUser::create([
            'equip_id' => 5,
            'user_id' => 2
        ]);

        EquipUser::create([
            'equip_id' => 6,
            'user_id' => 4
        ]);
    }
}
