<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mapa;

class MapaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //EA FC 25
        Mapa::create([
            'nom' => 'Manchester City Academy Stadium',
            'mapa' => 'manchestercityacademystadium.jpg',
        ]);

        Mapa::create([
            'nom' => 'Philips Stadion',
            'mapa' => 'philipsstadion.jpg',
        ]);

        Mapa::create([
            'nom' => 'El Sadar',
            'mapa' => 'elsadar.jpg',
        ]);

        Mapa::create([
            'nom' => 'Estadio José Zorrilla',
            'mapa' => 'estadiojosézorrilla.jpg',
        ]);

        Mapa::create([
            'nom' => 'La Bombonera',
            'mapa' => 'labombonera.jpg',
        ]);

        Mapa::create([
            'nom' => 'Allianz Stadium',
            'mapa' => 'allianzstadium.jpg',
        ]);

        //VALORANT
        Mapa::create([
            'nom' => 'Abyss',
            'mapa' => 'abyss.webp',
        ]);

        Mapa::create([
            'nom' => 'Bind',
            'mapa' => 'bind.webp',
        ]);

        Mapa::create([
            'nom' => 'Fracture',
            'mapa' => 'fracture.webp',
        ]);

        Mapa::create([
            'nom' => 'Haven',
            'mapa' => 'haven.webp',
        ]);

        Mapa::create([
            'nom' => 'Lotus',
            'mapa' => 'lotus.webp',
        ]);

        Mapa::create([
            'nom' => 'Pearl',
            'mapa' => 'pearl.webp',
        ]);

        Mapa::create([
            'nom' => 'Split',
            'mapa' => 'split.webp',
        ]);

        //BRAWL STARS SUPERVIVENCIA
        Mapa::create([
            'nom' => 'Arroyo Calavera',
            'mapa' => 'arroyocalavera.webp',
        ]);

        Mapa::create([
            'nom' => 'Lagos Acidos',
            'mapa' => 'lagosacidos.webp',
        ]);

        Mapa::create([
            'nom' => 'Cueva Profunda',
            'mapa' => 'cuevaprofunda.webp',
        ]);

        Mapa::create([
            'nom' => 'Doble Dilema',
            'mapa' => 'dobledilema.webp',
        ]);

        Mapa::create([
            'nom' => 'Nucleo Orbital',
            'mapa' => 'nucleoorbital.webp',
        ]);

        Mapa::create([
            'nom' => 'Arboleda de Nenufares',
            'mapa' => 'arboledadenenufares.webp',
        ]);

        //BRAWV STARS ATRAPAGEMAS
        Mapa::create([
            'nom' => 'Mina Rocosa',
            'mapa' => 'minarocosa.webp',
        ]);

        Mapa::create([
            'nom' => 'Fuerte de Gemas',
            'mapa' => 'fuertedegemas.webp',
        ]);

        Mapa::create([
            'nom' => 'Cueva Subterranea',
            'mapa' => 'cuevasubterranea.webp',
        ]);

        Mapa::create([
            'nom' => 'Brrrum Brrrum',
            'mapa' => 'brrrumbrrrum.webp',
        ]);

        Mapa::create([
            'nom' => 'Ultima Parada',
            'mapa' => 'ultimaparada.webp',
        ]);

        Mapa::create([
            'nom' => 'Claro del Bosque',
            'mapa' => 'clarodelbosque.webp',
        ]);

        //BRAWL STARS BALON BRAWL
        Mapa::create([
            'nom' => 'Estadio Brawl',
            'mapa' => 'estadiobrawl.webp',
        ]);

        Mapa::create([
            'nom' => 'Campos Furitivos',
            'mapa' => 'camposfuritivos.webp',
        ]);

        Mapa::create([
            'nom' => 'Futbol Soleado',
            'mapa' => 'futbolsoleado.webp',
        ]);

        Mapa::create([
            'nom' => 'Triple Drible',
            'mapa' => 'tripledrible.webp',
        ]);

        Mapa::create([
            'nom' => 'Cancha Peleona',
            'mapa' => 'canchapeleona.webp',
        ]);

        Mapa::create([
            'nom' => 'Segundo Intento',
            'mapa' => 'segundointento.webp',
        ]);

        //BRAWL STARS ATRACO
        Mapa::create([
            'nom' => 'Neumaticos Maniaticos',
            'mapa' => 'neumaticosmaniaticos.webp',
        ]);

        Mapa::create([
            'nom' => 'Canon Explosivo',
            'mapa' => 'canonexplosivo.webp',
        ]);

        Mapa::create([
            'nom' => 'Refugio',
            'mapa' => 'refugio.webp',
        ]);

        Mapa::create([
            'nom' => 'Patata Calient',
            'mapa' => 'patatacalient.webp',
        ]);

        Mapa::create([
            'nom' => 'Aguas Turbulentas',
            'mapa' => 'aguasturbulentas.webp',
        ]);

        Mapa::create([
            'nom' => 'Instrucciones Sencillas',
            'mapa' => 'instruccionessencillas.webp',
        ]);
    }
}
