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
            'foto' => 'fc25.webp'
        ]);

        Joc::create([
            'nom' => 'Valorant',
            'categoria' => 'Shooter',
            'plataforma' => 'PC',
            'foto' => 'valorant.jpg'
        ]);

        Joc::create([
            'nom' => 'Brawl Stars',
            'categoria' => 'Shooter',
            'plataforma' => 'Mòvil',
            'foto' => 'brawlStars.jpg'
        ]);

        Joc::create([
            'nom' => 'Fortnite',
            'categoria' => 'Shooter',
            'plataforma' => 'PC, PS4, PS5, XBOX, Nintendo Switch',
            'foto' => 'fortnite.jpeg'
        ]);

        Joc::create([
            'nom' => 'Rocket League',
            'categoria' => 'Arcado',
            'plataforma' => 'PC, PS4, PS5, XBOX',
            'foto' => 'rocketLeague.jpeg'
        ]);

        Joc::create([
            'nom' => 'Clash Royale',
            'categoria' => 'Estratègia',
            'plataforma' => 'Mòvil',
            'foto' => 'clashRoyale.jpg'
        ]);

        Joc::create([
            'nom' => 'MarioKart 8 Deluxe',
            'categoria' => 'Carreras',
            'plataforma' => 'Nintendo Switch',
            'foto' => 'marioKart8Deluxe.jpg'
        ]);

        Joc::create([
            'nom' => 'League of Legends',
            'categoria' => 'Arcade',
            'plataforma' => 'PC',
            'foto' => 'leagueOfLegends.jpg'
        ]);
    }
}
