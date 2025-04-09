<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
            'email' => 'carlos_marinosenra2@iescarlesvallbona.cat',
            'password' => 'eyJpdiI6IjR3ZHRVM2lmOVQ0SzcyYm9ObFM3cVE9PSIsInZhbHVlIjoiTG1nSHU1eFJRNFpIYVhENVV0NldLZz09IiwibWFjIjoiZmQ0ZThlMTQ3ZWQ4ZThkM2FmZTU1OTYxMTM2OGM1NGU2ZTBhZTc2NTA4ZTNlOTkxNzQ3OGUyZTQzY2MyNDBmNSIsInRhZyI6IiJ9',
            'telefon' => 620666465,
            'data_naixement' => '2005-11-26',
            'foto_perfil' => 'carlos.jpg',
            'trofeus' => 0,
            'data_registre' => now(),
        ]);

        User::create([
            'name' => 'Raúl',
            'email' => 'raul_arroyoguardia2@iescarlesvallbona.cat',
            'password' => 'eyJpdiI6IjR3ZHRVM2lmOVQ0SzcyYm9ObFM3cVE9PSIsInZhbHVlIjoiTG1nSHU1eFJRNFpIYVhENVV0NldLZz09IiwibWFjIjoiZmQ0ZThlMTQ3ZWQ4ZThkM2FmZTU1OTYxMTM2OGM1NGU2ZTBhZTc2NTA4ZTNlOTkxNzQ3OGUyZTQzY2MyNDBmNSIsInRhZyI6IiJ9',
            'telefon' => 685324360,
            'data_naixement' => '2005-06-06',
            'foto_perfil' => 'raul.jpg',
            'trofeus' => 0,
            'data_registre' => now(),
        ]);
    }
}
