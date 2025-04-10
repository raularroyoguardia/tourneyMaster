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
        /*
        Equip::create([
            'nom' => 'Pruebas',
            'regio' => 'Europa',
            'foto_equip' => 'equip.jpg',
            'trofeus' => 0,
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo que se ha creado para hacer pruebas en el frontend al inicio del proyecto. Sus participantes son los creadores del proyecto.',
            'maxim_integrants' => 2
        ]);

        Equip::create([
            'nom' => 'Pruebas 2222',
            'regio' => 'Europa',
            'foto_equip' => 'equip.jpg',
            'trofeus' => 0,
            'data_creacio' => now(),
            'descripcio' => 'Este es otro equipo que se ha creado para hacer pruebas en el frontend al inicio del proyecto. Sus participantes son los creadores del proyecto.',
            'maxim_integrants' => 2
        ]);
        */

        Equip::create([
            'nom' => 'Carlos indiviual',
            'regio' => 'Europa',
            'foto_equip' => 'equip.jpg',
            'trofeus' => 0,
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo individual en el que pertenece solo un equipo.',
            'maxim_integrants' => 1
        ]);

        Equip::create([
            'nom' => 'Pere Individual',
            'regio' => 'Europa',
            'foto_equip' => 'equip.jpg',
            'trofeus' => 0,
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo individual en el que pertenece solo un equipo.',
            'maxim_integrants' => 1
        ]);

        Equip::create([
            'nom' => 'Raúl Individual',
            'regio' => 'Europa',
            'foto_equip' => 'equip.jpg',
            'trofeus' => 0,
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo individual en el que pertenece solo un equipo.',
            'maxim_integrants' => 1
        ]);

        Equip::create([
            'nom' => 'Fran',
            'regio' => 'Europa',
            'foto_equip' => 'equip.jpg',
            'trofeus' => 0,
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo individual en el que pertenece solo un equipo.',
            'maxim_integrants' => 1
        ]);
    }
}
