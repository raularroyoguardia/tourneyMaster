<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Carlos',
            'email' => 'carlos_marinosenra@iescarlesvallbona.cat',
            'password' => bcrypt('123456'),
            'telefon' => 620666465,
            'data_naixement' => '2005-11-26',
            'foto_perfil' => 'carlos.jpg',
            'trofeus' => 0,
            'data_registre' => now(),
        ]);

        User::create([
            'name' => 'Raúl',
            'email' => 'raul_arroyoguardia@iescarlesvallbona.cat',
            'password' => bcrypt('123456'),
            'telefon' => 685324360,
            'data_naixement' => '2005-06-06',
            'foto_perfil' => 'raul.jpg',
            'trofeus' => 0,
            'data_registre' => now(),
        ]);

        User::create([
            'name' => 'Pere',
            'email' => 'pere_ferertarrasco@iescarlesvallbona.cat',
            'password' => bcrypt('123456'),
            'telefon' => 684230145,
            'data_naixement' => '2005-12-22',
            'foto_perfil' => 'pere.jpg',
            'trofeus' => 0,
            'data_registre' => now(),
        ]);

        User::create([
            'name' => 'Fran',
            'email' => 'fran_romanobaez@iescarlesvallbona.cat',
            'password' => bcrypt('123456'),
            'telefon' => 635098076,
            'data_naixement' => '2003-5-29',
            'foto_perfil' => 'fran.jpg',
            'trofeus' => 0,
            'data_registre' => now(),
        ]);
    }
}
