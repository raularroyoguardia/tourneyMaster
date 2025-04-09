<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Equip;

class EquipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Equip::create([
            'nom' => 'Pruebas',
            'regio' => 'Europa',
            'foto_equip' => 'equip.jpg',
            'trofeus' => 0,
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo que se ha creado para hacer pruebas en el frontend al inicio del proyecto. Sus participantes son los creadores del proyecto.',
            'maxim_integrants' => 2
        ]);
    }
}
