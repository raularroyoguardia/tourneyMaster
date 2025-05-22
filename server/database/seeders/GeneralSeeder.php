<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\MapaMode;
use App\Models\EquipTorneig;
use App\Models\Partida;
use App\Models\EquipUser;

class GeneralSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //TIPUS USUARI
        DB::table('tipus_usuaris')->insert([
            'tipus' => 'Admin',
            'permisos' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('tipus_usuaris')->insert([
            'tipus' => 'Capità',
            'permisos' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('tipus_usuaris')->insert([
            'tipus' => 'Jugador',
            'permisos' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        
        //USERS
        $carlosUser = DB::table('users')->insertGetId([
            'name' => 'Carlos',
            'apellido1' => 'Mariño',
            'apellido2' => 'Senra',
            'email' => 'carlos_marinosenra@iescarlesvallbona.cat',
            'password' => bcrypt('123456'),
            'telefon' => 620666465,
            'foto_perfil' => 'carlos.jpg',
            'trofeus' => 0,
            'tipus_usuari_id' => 1,
        ]);

        $charlyUser = DB::table('users')->insertGetId([
            'name' => 'Charly',
            'apellido1' => 'Mariño',
            'apellido2' => 'Senra',
            'email' => 'charly_marinosenra@iescarlesvallbona.cat',
            'password' => bcrypt('123456'),
            'telefon' => 620666564,
            'foto_perfil' => 'charly.png',
            'trofeus' => 100,
            'tipus_usuari_id' => 2,
        ]);
        $charly2User = DB::table('users')->insertGetId([
            'name' => 'Charly2',
            'apellido1' => 'Mariño',
            'apellido2' => 'Senra',
            'email' => 'charly2_marinosenra@iescarlesvallbona.cat',
            'password' => bcrypt('123456'),
            'telefon' => 620666565,
            'foto_perfil' => 'charly2.jpg',
            'trofeus' => 1000,
            'tipus_usuari_id' => 3,
        ]);

        $raulUser = DB::table('users')->insertGetId([
            'name' => 'Raúl',
            'apellido1' => 'Arroyo',
            'apellido2' => 'Guardia',
            'email' => 'raul_arroyoguardia@iescarlesvallbona.cat',
            'password' => bcrypt('123456'),
            'telefon' => 685324360,
            'foto_perfil' => 'raul.jpeg',
            'trofeus' => 0,
            'tipus_usuari_id' => 1,
        ]);
        $raulitoUser = DB::table('users')->insertGetId([
            'name' => 'Raúlito',
            'apellido1' => 'Arroyo',
            'apellido2' => 'Guardia',
            'email' => 'raulito_arroyoguardia@iescarlesvallbona.cat',
            'password' => bcrypt('123456'),
            'telefon' => 685324361,
            'foto_perfil' => 'raulito.jpeg',
            'trofeus' => 100,
            'tipus_usuari_id' => 3,
        ]);
        $raulito2User = DB::table('users')->insertGetId([
            'name' => 'Raúlito2',
            'apellido1' => 'Arroyo',
            'apellido2' => 'Guardia',
            'email' => 'raulito2_arroyoguardia@iescarlesvallbona.cat',
            'password' => bcrypt('123456'),
            'telefon' => 685324362,
            'foto_perfil' => 'raulito2.jpeg',
            'trofeus' => 1000,
            'tipus_usuari_id' => 2,
        ]);

        $pereUser = DB::table('users')->insertGetId([
            'name' => 'Pere',
            'apellido1' => 'Ferrer',
            'apellido2' => 'Tarrascó',
            'email' => 'pere_ferertarrasco@iescarlesvallbona.cat',
            'password' => bcrypt('123456'),
            'telefon' => 684230145,
            'foto_perfil' => 'pere.jpeg',
            'trofeus' => 50,
            'tipus_usuari_id' => 2,
        ]);

        $franUser = DB::table('users')->insertGetId([
            'name' => 'Fran',
            'apellido1' => 'Romano',
            'apellido2' => 'Baez',
            'email' => 'fran_romanobaez@iescarlesvallbona.cat',
            'password' => bcrypt('123456'),
            'telefon' => 635098076,
            'foto_perfil' => 'fran.jpg',
            'trofeus' => 75,
            'tipus_usuari_id' => 3,
        ]);
        $nicoUser = DB::table('users')->insertGetId([
            'name' => 'Nico',
            'apellido1' => 'Perez',
            'apellido2' => 'Crespo',
            'email' => 'nico_perezcrespo@iescarlesvallbona.cat',
            'password' => bcrypt('123456'),
            'telefon' => 635569874,
            'foto_perfil' => 'nico.jpg',
            'trofeus' => 50,
            'tipus_usuari_id' => 3,
        ]);
        $ericUser = DB::table('users')->insertGetId([
            'name' => 'Eric',
            'apellido1' => 'Font',
            'apellido2' => 'Mateo',
            'email' => 'eric_fontmateo@iescarlesvallbona.cat',
            'password' => bcrypt('123456'),
            'telefon' => 635526987,
            'foto_perfil' => 'eric.jpg',
            'trofeus' => 100,
            'tipus_usuari_id' => 3,
        ]);
        $ivanUser = DB::table('users')->insertGetId([
            'name' => 'Ivan',
            'apellido1' => 'Morales',
            'apellido2' => 'Criado',
            'email' => 'ivan_moralescriado@iescarlesvallbona.cat',
            'password' => bcrypt('123456'),
            'telefon' => 685352698,
            'foto_perfil' => 'ivan.jpg',
            'trofeus' => 150,
            'tipus_usuari_id' => 3,
        ]);

        //JOCS
        $fc25 = DB::table('jocs')->insertGetId([
            'nom' => 'EA FC 25',
            'categoria' => 'Futbol',
            'plataforma' => 'PS5, XBOX, PS4, PC',
            'foto' => 'fc25.webp'
        ]);

        $valorant = DB::table('jocs')->insertGetId([
            'nom' => 'Valorant',
            'categoria' => 'Shooter',
            'plataforma' => 'PC',
            'foto' => 'valorant.jpg'
        ]);

        $brawlStars = DB::table('jocs')->insertGetId([
            'nom' => 'Brawl Stars',
            'categoria' => 'Shooter',
            'plataforma' => 'Mòvil',
            'foto' => 'brawlStars.jpg'
        ]);

        $fortnite = DB::table('jocs')->insertGetId([
            'nom' => 'Fortnite',
            'categoria' => 'Shooter',
            'plataforma' => 'PC, PS4, PS5, XBOX, Nintendo Switch',
            'foto' => 'fortnite.jpeg'
        ]);

        $rocketLeague = DB::table('jocs')->insertGetId([
            'nom' => 'Rocket League',
            'categoria' => 'Arcado',
            'plataforma' => 'PC, PS4, PS5, XBOX',
            'foto' => 'rocketLeague.jpeg'
        ]);

        $clashRoyale = DB::table('jocs')->insertGetId([
            'nom' => 'Clash Royale',
            'categoria' => 'Estratègia',
            'plataforma' => 'Mòvil',
            'foto' => 'clashRoyale.jpg'
        ]);

        $marioKart8 = DB::table('jocs')->insertGetId([
            'nom' => 'MarioKart 8 Deluxe',
            'categoria' => 'Carreras',
            'plataforma' => 'Nintendo Switch',
            'foto' => 'marioKart8Deluxe.jpg'
        ]);

        $lol = DB::table('jocs')->insertGetId([
            'nom' => 'League of Legends',
            'categoria' => 'Arcade',
            'plataforma' => 'PC',
            'foto' => 'leagueOfLegends.jpg'
        ]);

        //MODES DE JOC
        $partidoRapido = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Partido Rápido',
            'descripcio' => 'El modo Partido Rápido en EA SPORTS FC 25 permite jugar un partido de fútbol inmediato, eligiendo rápidamente equipos, estadio y condiciones.',
            'jugadors' => 2,
            'joc_id' => $fc25
        ]);

        $spikeRush = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Spike Rush',
            'descripcio' => 'Spike Rush es un modo Bo7 5v5 donde todos los jugadores comienzan cada ronda con la misma arma aleatoria. Se generan orbes aleatorios alrededor del mapa que los jugadores pueden recolectar para otorgar beneficios para ellos y/o sus compañeros de equipo o afligir a los enemigos con desventajas.',
            'jugadors' => 10,
            'joc_id' => $valorant
        ]);

        $plantarDefusar = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Plantar/Defusar',
            'descripcio' => 'Plantar/Defusar es un tipo de modo de juego en el que juegas como atacante o defensor. El objetivo del Atacante es plantar la Spike o matar a todos los Defensores vivos, mientras que el objetivo del Defensor es evitar que el Atacante plante la Spike (ya sea matando a todos los Atacantes vivos o impidiendo que los Atacantes planten dentro del límite de tiempo de la ronda), o desactivar la Spike si ya ha sido plantado (matar a todos los Atacantes vivos no es suficiente para ganar la ronda en este caso). Los participantes solo tienen una vida por ronda. Al morir, los jugadores deben esperar a que comience la siguiente ronda o ser revividos por Sage para volver al campo de batalla.',
            'jugadors' => 10,
            'joc_id' => $valorant
        ]);

        $deathmatch = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Deathmatch',
            'descripcio' => 'Deathmatch es un modo de juego de 12 jugadores todos contra todos diseñado para permitir a los jugadores perfeccionar su mecánica de tiro sin habilidades. Los jugadores equipan las armas de su elección y matan a cualquiera que se interponga en su camino hasta que un jugador alcance las 40 muertes o hayan pasado 9 minutos, momento en el que el juego terminará.',
            'jugadors' => 12,
            'joc_id' => $valorant
        ]);

        $guerraDeLaNieve = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Guerra de Nieve',
            'descripcio' => 'Snowball Fight es un modo de combate a muerte por equipos de 5 contra 5 en el que gana el primer equipo en 50 muertes. Todos los jugadores solo tienen acceso a un Lanzador de bolas de nieve que dispara bolas de nieve letales basadas en proyectiles. Los regalos también aparecen en el mapa que contienen potenciadores temporales para el jugador. Estos pueden aumentar la velocidad de disparo del lanzador, aumentar el tamaño de las bolas de nieve, dejar que las bolas de nieve reboten o aumentar la velocidad de movimiento del jugador y la altura máxima de salto.',
            'jugadors' => 10,
            'joc_id' => $valorant
        ]);

        $supervicencia = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Supervivencia',
            'descripcio' => 'El típico "Battle royale", varios jugadores luchan por sobrevivir hasta ser el último en pie. El mapa se va reduciendo con el tiempo, pues se va llenando de nubes tóxicas.',
            'jugadors' => 10,
            'joc_id' => $brawlStars
        ]);

        $atrapagemas = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Atrapagemas',
            'descripcio' => 'Se trata de conseguir gemas que salen del centro del mapa, al llegar a 10 (o más) gemas se carga un contador de 15 segundos cuando se termina el equipo de las 10 gemas gana, si tienes gemas y te matan pierdes las gemas y si el contador estaba activo, se reinicia y no vuelve a cargar hasta que tu equipo vuelva a tener diez gemas.',
            'jugadors' => 6,
            'joc_id' => $brawlStars
        ]);

        $balonBrawl = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Balón Brawl',
            'descripcio' => '¡Un partido al estilo Brawl! ganará quien anote 2 goles o anote la mayor cantidad cuando el tiempo acabe. Si hay empate, habrá un minuto de tiempo extra en el que el primer gol que sea anotado, es el que define el ganador. Si este se termina, la partida acaba en empate.',
            'jugadors' => 6,
            'joc_id' => $brawlStars
        ]);

        $atraco = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Atraco',
            'descripcio' => 'Como su nombre lo indica, tienes que atracar la caja fuerte del enemigo, esto se consigue destruyéndola. Pero ¡cuidado! los rivales también intentarán destruir tu caja fuerte.',
            'jugadors' => 6,
            'joc_id' => $brawlStars
        ]);

        $cazaEstelar = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Caza Estelar',
            'descripcio' => 'Derrota a tus enemigos para ganar estrellas, entre más enemigos derrotes, más estrellas tendrás, ¡pero con cuidado! si te derrotan, le darás todas esas estrellas a tus rivales. Ganará quien, al finalizar el tiempo (2 minutos) haya conseguido más estrellas, o después de que un equipo haya conseguido 20 estrellas.',
            'jugadors' => 6,
            'joc_id' => $brawlStars
        ]);

        $zonaRestringida = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Zona Restringida',
            'descripcio' => 'Hay 1, 2, o 3 zonas en el mapa tienes que entrar en ellas para cargar una barra. El primer equipo en llegar a 100% su equipo gana (si se acaba el tiempo, gana el que tenga la barra más cargada).',
            'jugadors' => 6,
            'joc_id' => $brawlStars
        ]);

        $noqueo = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Noqueo',
            'descripcio' => 'Derrota a tus enemigos en una batalla campal. Pero ¡No dejes que te derroten! si lo hacen, no podrás reaparecer en toda la ronda. Ganará la ronda quien tenga al menos un miembro en pie, y gana la partida quien gane 2 rondas.',
            'jugadors' => 6,
            'joc_id' => $brawlStars
        ]);

        $battleRoyale = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Battle Royale',
            'descripcio' => 'Un máximo de 100 jugadores por partida y con la opción de construir estructura.',
            'jugadors' => 100,
            'joc_id' => $fortnite
        ]);

        $ceroConstruccion = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Cero construcción',
            'descripcio' => 'Si no quieres jugar con estructuras el juego te ofrece la opción de jugar sin la opción de construir en cualquiera de los modos anteriores.',
            'jugadors' => 100,
            'joc_id' => $fortnite
        ]);

        $rocket1 = DB::table('mode_jocs')->insertGetId([
            'nom' => '1 vs 1',
            'descripcio' => 'Un enfrentamiento individual donde cada jugador debe demostrar su habilidad en ataque y defensa sin ayuda. Es el modo más exigente a nivel técnico y estratégico.',
            'jugadors' => 2,
            'joc_id' => $rocketLeague
        ]);

        $rocket2 = DB::table('mode_jocs')->insertGetId([
            'nom' => '2 vs 2',
            'descripcio' => 'Modo basado en trabajo en equipo, donde la comunicación y la sincronización son clave. Cada jugador debe equilibrar ataque y defensa para no dejar la portería desprotegida.',
            'jugadors' => 4,
            'joc_id' => $rocketLeague
        ]);

        $rocket3 = DB::table('mode_jocs')->insertGetId([
            'nom' => '3 vs 3',
            'descripcio' => 'El modo principal y más competitivo de Rocket League, con una dinámica de juego basada en rotaciones entre ataque, medio campo y defensa.',
            'jugadors' => 6,
            'joc_id' => $rocketLeague
        ]);

        $rocket4 = DB::table('mode_jocs')->insertGetId([
            'nom' => '4 vs 4',
            'descripcio' => 'Una versión más caótica del 3vs3 con menos estructura y más acción. Con tantos jugadores en el campo, las jugadas pueden volverse impredecibles y menos estratégicas.',
            'jugadors' => 8,
            'joc_id' => $rocketLeague
        ]);

        $hielo = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Hielo',
            'descripcio' => 'Un modo inspirado en el hockey sobre hielo, donde el balón es reemplazado por un puck que se desliza sobre la superficie. Cambia la física del juego y requiere un enfoque diferente para los tiros y pases.',
            'jugadors' => 6,
            'joc_id' => $rocketLeague
        ]);

        $hoops = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Hoops',
            'descripcio' => 'Un modo en el que las porterías son aros elevados, obligando a los jugadores a realizar tiros aéreos y jugar con precisión para encestar. La dinámica del juego cambia completamente al enfocarse en juego vertical y control del balón en el aire.',
            'jugadors' => 6,
            'joc_id' => $rocketLeague
        ]);

        $clashRoyale1 = DB::table('mode_jocs')->insertGetId([
            'nom' => '1vs1',
            'descripcio' => 'Es el modo clásico de Clash Royale, donde dos jugadores compiten en un duelo uno contra uno. Cada jugador tiene tres torres (dos torres de coronas y una torre del rey) y debe destruir más torres que el oponente antes de que acabe el tiempo. Si un jugador destruye la torre del rey, gana automáticamente.',
            'jugadors' => 2,
            'joc_id' => $clashRoyale
        ]);

        $touchdown = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Touchdown',
            'descripcio' => 'Es un modo especial en el que no hay torres, y el objetivo es llevar una de tus tropas hasta la línea de touchdown del rival. Cada vez que una tropa cruza la línea enemiga, se anota un punto. El primer jugador en marcar dos touchdowns gana la partida.',
            'jugadors' => 2,
            'joc_id' => $clashRoyale
        ]);

        $juegoEnLinea = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Juego en línea',
            'descripcio' => 'Compite contra otros jugadores en los 4 circuitos distintos de cada Grand Prix. Al final de cada carrera se obtiene una puntuación dependiendo de la posición. El jugador que junte más puntos gana la partida',
            'jugadors' => 8,
            'joc_id' => $marioKart8
        ]);

        $grietaDelInvocador = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Grieta del Invocador',
            'descripcio' => 'Dos equipos de cinco jugadores luchan para destruir el Nexo enemigo, atravesando tres líneas (top, mid, bot) y enfrentándose a torres, súbditos y monstruos de la jungla.',
            'jugadors' => 10,
            'joc_id' => $lol
        ]);

        $aram = DB::table('mode_jocs')->insertGetId([
            'nom' => 'ARAM (All Random All Mid)',
            'descripcio' => 'Un modo rápido y caótico en el Abismo de los Lamentos. Solo hay una línea, sin jungla, y los campeones son asignados aleatoriamente. Ideal para combates constantes.',
            'jugadors' => 10,
            'joc_id' => $lol
        ]);

        $modoRotativo = DB::table('mode_jocs')->insertGetId([
            'nom' => 'Modo Rotativo',
            'descripcio' => 'Modos especiales que aparecen temporalmente, como URF (Ultra Rapid Fire) con habilidades sin costo y enfriamientos reducidos.',
            'jugadors' => 10,
            'joc_id' => $lol
        ]);

        //MAPAS
        //EA FC 25
        $manchestercityacademystadium_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Manchester City Academy Stadium',
            'mapa' => 'manchestercityacademystadium.jpg',
        ]);

        $philipsstadion_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Philips Stadion',
            'mapa' => 'philipsstadion.jpg',
        ]);

        $elsadar_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'El Sadar',
            'mapa' => 'elsadar.jpg',
        ]);

        $estadiojosézorrilla_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Estadio José Zorrilla',
            'mapa' => 'estadiojosezorrilla.jpg',
        ]);

        $labombonera_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'La Bombonera',
            'mapa' => 'labombonera.jpg',
        ]);

        $allianzstadium_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Allianz Stadium',
            'mapa' => 'allianzstadium.jpg',
        ]);

        //VALORANT
        $abyss_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Abyss',
            'mapa' => 'abyss.webp',
        ]);

        $bind_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Bind',
            'mapa' => 'bind.webp',
        ]);

        $fracture_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Fracture',
            'mapa' => 'fracture.webp',
        ]);

        $haven_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Haven',
            'mapa' => 'haven.webp',
        ]);

        $lotus_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Lotus',
            'mapa' => 'lotus.webp',
        ]);

        $pearl_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Pearl',
            'mapa' => 'pearl.webp',
        ]);

        $split_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Split',
            'mapa' => 'split.webp',
        ]);

        //BRAWL STARS SUPERVIVENCIA
        $arroyocalavera_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Arroyo Calavera',
            'mapa' => 'arroyocalavera.webp',
        ]);

        $lagosacidos_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Lagos Acidos',
            'mapa' => 'lagosacidos.webp',
        ]);

        $cuevaprofunda_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Cueva Profunda',
            'mapa' => 'cuevaprofunda.webp',
        ]);

        $dobledilema_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Doble Dilema',
            'mapa' => 'dobledilema.webp',
        ]);

        $nucleoorbital_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Nucleo Orbital',
            'mapa' => 'nucleoorbital.webp',
        ]);

        $arboledadenenufares_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Arboleda de Nenufares',
            'mapa' => 'arboledadenenufares.webp',
        ]);

        //BRAWV STARS ATRAPAGEMAS
        $minarocosa_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Mina Rocosa',
            'mapa' => 'minarocosa.webp',
        ]);

        $fuertedegemas_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Fuerte de Gemas',
            'mapa' => 'fuertedegemas.webp',
        ]);

        $cuevasubterranea_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Cueva Subterranea',
            'mapa' => 'cuevasubterranea.webp',
        ]);

        $brrrumbrrrum_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Brrrum Brrrum',
            'mapa' => 'brrrumbrrrum.webp',
        ]);

        $ultimaparada_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Ultima Parada',
            'mapa' => 'ultimaparada.webp',
        ]);

        $clarodelbosque_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Claro del Bosque',
            'mapa' => 'clarodelbosque.webp',
        ]);

        //BRAWL STARS BALON BRAWL
        $estadiobrawl_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Estadio Brawl',
            'mapa' => 'estadiobrawl.webp',
        ]);

        $camposfuritivos_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Campos Furitivos',
            'mapa' => 'camposfuritivos.webp',
        ]);

        $futbolsoleado_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Futbol Soleado',
            'mapa' => 'futbolsoleado.webp',
        ]);

        $tripledrible_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Triple Drible',
            'mapa' => 'tripledrible.webp',
        ]);

        $canchapeleona_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Cancha Peleona',
            'mapa' => 'canchapeleona.webp',
        ]);

        $segundointento_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Segundo Intento',
            'mapa' => 'segundointento.webp',
        ]);

        //BRAWL STARS ATRACO
        $neumaticosmaniaticos_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Neumaticos Maniaticos',
            'mapa' => 'neumaticosmaniaticos.webp',
        ]);

        $canonexplosivo_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Canon Explosivo',
            'mapa' => 'canonexplosivo.webp',
        ]);

        $refugio_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Refugio',
            'mapa' => 'refugio.webp',
        ]);

        $patatacalient_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Patata Calient',
            'mapa' => 'patatacalient.webp',
        ]);

        $aguasturbulentas_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Aguas Turbulentas',
            'mapa' => 'aguasturbulentas.webp',
        ]);

        $instruccionessencillas_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Instrucciones Sencillas',
            'mapa' => 'instruccionessencillas.webp',
        ]);

        //BRAWL STARS CAZA ESTELAR
        $tiroteoestelar_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Tiroteo Estelar',
            'mapa' => 'tiroteoestelar.webp',
        ]);

        $escondite_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Escondite',
            'mapa' => 'escondite.webp',
        ]);

        $crimenorganizado_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Crimen Organizado',
            'mapa' => 'crimenorganizado.webp',
        ]);

        $sequiasanguinaria_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Sequia Sanguinaria',
            'mapa' => 'sequiasanguinaria.webp',
        ]);

        $ningunaexcusa_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Ninguna Excusa',
            'mapa' => 'ningunaexcusa.webp',
        ]);

        $impactoinminente_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Impacto Inminente',
            'mapa' => 'impactoinminente.webp',
        ]);

        //BRAWL STARS ZONA RESTRINGIDA
        $campoabierto_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Campo Abierto',
            'mapa' => 'campoabierto.webp',
        ]);

        $pisaardiente_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Pisa Ardiente',
            'mapa' => 'pisaardiente.webp',
        ]);

        $duelodeescarabajos_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Duelo De Escarabajos',
            'mapa' => 'duelodeescarabajos.webp',
        ]);

        $zonaabierta_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Zona Abierta',
            'mapa' => 'zonaabierta.webp',
        ]);

        $joyasbrillantes_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Joyas Brillantes',
            'mapa' => 'joyasbrillantes.webp',
        ]);

        $pescacomoda_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Pesca Comoda',
            'mapa' => 'pescacomoda.webp',
        ]);

        //BRAWL STARS NOQUEO
        $rocadebelle_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Roca De Belle',
            'mapa' => 'rocadebelle.webp',
        ]);

        $hastaelfondo_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Hasta El Fondo',
            'mapa' => 'hastaelfondo.webp',
        ]);

        $alainterperie_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'A La Interperie',
            'mapa' => 'alainterperie.webp',
        ]);

        $terminomediosano_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Termino Medio Sano',
            'mapa' => 'terminomediosano.webp',
        ]);

        $nuevoshorizontes_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Nuevos Horizontes',
            'mapa' => 'nuevoshorizontes.webp',
        ]);

        $crucemusgoso_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Cruce Musgoso',
            'mapa' => 'crucemusgoso.webp',
        ]);

        //FORTNITE BATTLE ROYALE
        $construccion_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Capitulo 5:Temporada 2',
            'mapa' => 'capitulo5_temporada2.webp',
        ]);

        //FORTNITE CERO CONSTRUCCIÓN
        $ceroConstruccion_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Capitulo 5:Temporada 2',
            'mapa' => 'capitulo5_temporada2.webp',
        ]);

        //ROCKET LEAGUE 1v1 2v2 3v3 4v4
        $championsfield_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Champions Field',
            'mapa' => 'championsfield.webp',
        ]);

        $neotokyo_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Neo Tokyo',
            'mapa' => 'neotokyo.webp',
        ]);

        $deadeyecanyon_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Deadeye Canyon',
            'mapa' => 'deadeyecanyon.webp',
        ]);

        $saltyshores_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Salty Shores',
            'mapa' => 'saltyshores.webp',
        ]);

        $farmstead_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Farmstead',
            'mapa' => 'farmstead.webp',
        ]);

        $starbasearc_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Starbase ARC',
            'mapa' => 'starbasearc.webp',
        ]);

        //ROCKET LEAGUE SNOWW DAY
        $beckwithpark_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Beckwith Park',
            'mapa' => 'beckwithpark.webp',
        ]);

        $dfhstadium_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'DFH Stadium',
            'mapa' => 'dfhstadium.webp',
        ]);

        $mannfield_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Mannfield',
            'mapa' => 'mannfield.webp',
        ]);

        $throwbackstadium_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Throwback Stadium',
            'mapa' => 'throwbackstadium.webp',
        ]);

        $utopiacoliseum_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Utopia Coliseum',
            'mapa' => 'utopiacoliseum.webp',
        ]);

        //ROCKET LEAGUE HOOPS
        $dunkhouse_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Dunk House',
            'mapa' => 'dunkhouse.webp',
        ]);

        $theblock_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'The Block',
            'mapa' => 'theblock.webp',
        ]);

        //CLASH ROYALE 1V1
        $arena10_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Arena 10',
            'mapa' => 'arena10.webp',
        ]);

        //CLASH ROYALE TOUCHDOWN
        $touchdown_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Touchdown',
            'mapa' => 'touchdown.jpg',
        ]);

        //MARIOKART
        $copachampiñón_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Copa Champiñón',
            'mapa' => 'copachampinon.webp',
        ]);

        $copaflor_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Copa Flor',
            'mapa' => 'copaflor.webp',
        ]);

        $copaestrella_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Copa Estrella',
            'mapa' => 'copaestrella.webp',
        ]);

        $copaespecial_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Copa Especial',
            'mapa' => 'copaespecial.webp',
        ]);

        $copacaparazón_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Copa Caparazón',
            'mapa' => 'copacaparazon.webp',
        ]);

        $copaplátano_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Copa Plátano',
            'mapa' => 'copaplatano.webp',
        ]);

        $copahoja_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Copa Hoja',
            'mapa' => 'copahoja.webp',
        ]);

        $copacentella_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Copa Centella',
            'mapa' => 'copacentella.webp',
        ]);

        $copahuevo_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Copa Huevo',
            'mapa' => 'copahuevo.png',
        ]);

        $copacrossing_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Copa Crossing',
            'mapa' => 'copacrossing.png',
        ]);

        $copatrifuerza_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Copa Trifuerza',
            'mapa' => 'copatrifuerza.png',
        ]);

        $copacampana_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Copa Campana',
            'mapa' => 'copacampana.png',
        ]);

        //LOL
        $mapalol_MapaId = DB::table('mapas')->insertGetId([
            'nom' => 'Mapa LOL',
            'mapa' => 'mapalol.webp',
        ]);

        //MAPA-MODES
        //FIFA
        MapaMode::create(['mapa_id' => $manchestercityacademystadium_MapaId, 'mode_joc_id' => $partidoRapido]);
        MapaMode::create(['mapa_id' => $philipsstadion_MapaId, 'mode_joc_id' => $partidoRapido]);
        MapaMode::create(['mapa_id' => $elsadar_MapaId, 'mode_joc_id' => $partidoRapido]);
        MapaMode::create(['mapa_id' => $estadiojosézorrilla_MapaId, 'mode_joc_id' => $partidoRapido]);
        MapaMode::create(['mapa_id' => $labombonera_MapaId, 'mode_joc_id' => $partidoRapido]);
        MapaMode::create(['mapa_id' => $allianzstadium_MapaId, 'mode_joc_id' => $partidoRapido]);

        //VALORANT
        MapaMode::create(['mapa_id' => $abyss_MapaId, 'mode_joc_id' => $spikeRush]);
        MapaMode::create(['mapa_id' => $abyss_MapaId, 'mode_joc_id' => $plantarDefusar]);
        MapaMode::create(['mapa_id' => $abyss_MapaId, 'mode_joc_id' => $deathmatch]);
        MapaMode::create(['mapa_id' => $abyss_MapaId, 'mode_joc_id' => $guerraDeLaNieve]);
        MapaMode::create(['mapa_id' => $bind_MapaId, 'mode_joc_id' => $spikeRush]);
        MapaMode::create(['mapa_id' => $bind_MapaId, 'mode_joc_id' => $plantarDefusar]);
        MapaMode::create(['mapa_id' => $bind_MapaId, 'mode_joc_id' => $deathmatch]);
        MapaMode::create(['mapa_id' => $bind_MapaId, 'mode_joc_id' => $guerraDeLaNieve]);
        MapaMode::create(['mapa_id' => $fracture_MapaId, 'mode_joc_id' => $spikeRush]);
        MapaMode::create(['mapa_id' => $fracture_MapaId, 'mode_joc_id' => $plantarDefusar]);
        MapaMode::create(['mapa_id' => $fracture_MapaId, 'mode_joc_id' => $deathmatch]);
        MapaMode::create(['mapa_id' => $fracture_MapaId, 'mode_joc_id' => $guerraDeLaNieve]);
        MapaMode::create(['mapa_id' => $haven_MapaId, 'mode_joc_id' => $spikeRush]);
        MapaMode::create(['mapa_id' => $haven_MapaId, 'mode_joc_id' => $plantarDefusar]);
        MapaMode::create(['mapa_id' => $haven_MapaId, 'mode_joc_id' => $deathmatch]);
        MapaMode::create(['mapa_id' => $haven_MapaId, 'mode_joc_id' => $guerraDeLaNieve]);
        MapaMode::create(['mapa_id' => $lotus_MapaId, 'mode_joc_id' => $spikeRush]);
        MapaMode::create(['mapa_id' => $lotus_MapaId, 'mode_joc_id' => $plantarDefusar]);
        MapaMode::create(['mapa_id' => $lotus_MapaId, 'mode_joc_id' => $deathmatch]);
        MapaMode::create(['mapa_id' => $lotus_MapaId, 'mode_joc_id' => $guerraDeLaNieve]);
        MapaMode::create(['mapa_id' => $pearl_MapaId, 'mode_joc_id' => $spikeRush]);
        MapaMode::create(['mapa_id' => $pearl_MapaId, 'mode_joc_id' => $plantarDefusar]);
        MapaMode::create(['mapa_id' => $pearl_MapaId, 'mode_joc_id' => $deathmatch]);
        MapaMode::create(['mapa_id' => $pearl_MapaId, 'mode_joc_id' => $guerraDeLaNieve]);
        MapaMode::create(['mapa_id' => $split_MapaId, 'mode_joc_id' => $spikeRush]);
        MapaMode::create(['mapa_id' => $split_MapaId, 'mode_joc_id' => $plantarDefusar]);
        MapaMode::create(['mapa_id' => $split_MapaId, 'mode_joc_id' => $deathmatch]);
        MapaMode::create(['mapa_id' => $split_MapaId, 'mode_joc_id' => $guerraDeLaNieve]);

        //BRAWL STARS SUPERVIVENCIA
        MapaMode::create(['mapa_id' => $arroyocalavera_MapaId, 'mode_joc_id' => $supervicencia]);
        MapaMode::create(['mapa_id' => $lagosacidos_MapaId, 'mode_joc_id' => $supervicencia]);
        MapaMode::create(['mapa_id' => $cuevaprofunda_MapaId, 'mode_joc_id' => $supervicencia]);
        MapaMode::create(['mapa_id' => $dobledilema_MapaId, 'mode_joc_id' => $supervicencia]);
        MapaMode::create(['mapa_id' => $nucleoorbital_MapaId, 'mode_joc_id' => $supervicencia]);
        MapaMode::create(['mapa_id' => $arboledadenenufares_MapaId, 'mode_joc_id' => $supervicencia]);

        //BRAWL STARS ATRAPAGEMAS
        MapaMode::create(['mapa_id' => $minarocosa_MapaId, 'mode_joc_id' => $atrapagemas]);
        MapaMode::create(['mapa_id' => $fuertedegemas_MapaId, 'mode_joc_id' => $atrapagemas]);
        MapaMode::create(['mapa_id' => $cuevasubterranea_MapaId, 'mode_joc_id' => $atrapagemas]);
        MapaMode::create(['mapa_id' => $brrrumbrrrum_MapaId, 'mode_joc_id' => $atrapagemas]);
        MapaMode::create(['mapa_id' => $ultimaparada_MapaId, 'mode_joc_id' => $atrapagemas]);
        MapaMode::create(['mapa_id' => $clarodelbosque_MapaId, 'mode_joc_id' => $atrapagemas]);

        //BRAWL STARS BALON BRAWL
        MapaMode::create(['mapa_id' => $estadiobrawl_MapaId, 'mode_joc_id' => $balonBrawl]);
        MapaMode::create(['mapa_id' => $camposfuritivos_MapaId, 'mode_joc_id' => $balonBrawl]);
        MapaMode::create(['mapa_id' => $futbolsoleado_MapaId, 'mode_joc_id' => $balonBrawl]);
        MapaMode::create(['mapa_id' => $tripledrible_MapaId, 'mode_joc_id' => $balonBrawl]);
        MapaMode::create(['mapa_id' => $canchapeleona_MapaId, 'mode_joc_id' => $balonBrawl]);
        MapaMode::create(['mapa_id' => $segundointento_MapaId, 'mode_joc_id' => $balonBrawl]);

        //BRAWL STARS ATRACO
        MapaMode::create(['mapa_id' => $neumaticosmaniaticos_MapaId, 'mode_joc_id' => $atraco]);
        MapaMode::create(['mapa_id' => $canonexplosivo_MapaId, 'mode_joc_id' => $atraco]);
        MapaMode::create(['mapa_id' => $refugio_MapaId, 'mode_joc_id' => $atraco]);
        MapaMode::create(['mapa_id' => $patatacalient_MapaId, 'mode_joc_id' => $atraco]);
        MapaMode::create(['mapa_id' => $aguasturbulentas_MapaId, 'mode_joc_id' => $atraco]);
        MapaMode::create(['mapa_id' => $instruccionessencillas_MapaId, 'mode_joc_id' => $atraco]);

        //BRAWL STARS CAZA ESTELAR
        MapaMode::create(['mapa_id' => $tiroteoestelar_MapaId, 'mode_joc_id' => $cazaEstelar]);
        MapaMode::create(['mapa_id' => $escondite_MapaId, 'mode_joc_id' => $cazaEstelar]);
        MapaMode::create(['mapa_id' => $crimenorganizado_MapaId, 'mode_joc_id' => $cazaEstelar]);
        MapaMode::create(['mapa_id' => $sequiasanguinaria_MapaId, 'mode_joc_id' => $cazaEstelar]);
        MapaMode::create(['mapa_id' => $ningunaexcusa_MapaId, 'mode_joc_id' => $cazaEstelar]);
        MapaMode::create(['mapa_id' => $impactoinminente_MapaId, 'mode_joc_id' => $cazaEstelar]);

        //BRAWL STARS ZONA RESTRINGIDA
        MapaMode::create(['mapa_id' => $campoabierto_MapaId, 'mode_joc_id' => $zonaRestringida]);
        MapaMode::create(['mapa_id' => $pisaardiente_MapaId, 'mode_joc_id' => $zonaRestringida]);
        MapaMode::create(['mapa_id' => $duelodeescarabajos_MapaId, 'mode_joc_id' => $zonaRestringida]);
        MapaMode::create(['mapa_id' => $zonaabierta_MapaId, 'mode_joc_id' => $zonaRestringida]);
        MapaMode::create(['mapa_id' => $joyasbrillantes_MapaId, 'mode_joc_id' => $zonaRestringida]);
        MapaMode::create(['mapa_id' => $pescacomoda_MapaId, 'mode_joc_id' => $zonaRestringida]);

        //BRAWL STARS NOQUEO
        MapaMode::create(['mapa_id' => $rocadebelle_MapaId, 'mode_joc_id' => $noqueo]);
        MapaMode::create(['mapa_id' => $hastaelfondo_MapaId, 'mode_joc_id' => $noqueo]);
        MapaMode::create(['mapa_id' => $alainterperie_MapaId, 'mode_joc_id' => $noqueo]);
        MapaMode::create(['mapa_id' => $terminomediosano_MapaId, 'mode_joc_id' => $noqueo]);
        MapaMode::create(['mapa_id' => $nuevoshorizontes_MapaId, 'mode_joc_id' => $noqueo]);
        MapaMode::create(['mapa_id' => $crucemusgoso_MapaId, 'mode_joc_id' => $noqueo]);

        //FORTNITE BATTLE ROYALE
        MapaMode::create(['mapa_id' => $construccion_MapaId, 'mode_joc_id' => $battleRoyale]);

        //FORTNITE CERO CONSTRUCCIÓN
        MapaMode::create(['mapa_id' => $ceroConstruccion_MapaId, 'mode_joc_id' => $ceroConstruccion]);

        //ROCKET LEAGUE 1V1 2V2 3V3 4V4
        MapaMode::create(['mapa_id' => $championsfield_MapaId, 'mode_joc_id' => $rocket1]);
        MapaMode::create(['mapa_id' => $championsfield_MapaId, 'mode_joc_id' => $rocket2]);
        MapaMode::create(['mapa_id' => $championsfield_MapaId, 'mode_joc_id' => $rocket3]);
        MapaMode::create(['mapa_id' => $championsfield_MapaId, 'mode_joc_id' => $rocket4]);

        MapaMode::create(['mapa_id' => $neotokyo_MapaId, 'mode_joc_id' => $rocket1]);
        MapaMode::create(['mapa_id' => $neotokyo_MapaId, 'mode_joc_id' => $rocket2]);
        MapaMode::create(['mapa_id' => $neotokyo_MapaId, 'mode_joc_id' => $rocket3]);
        MapaMode::create(['mapa_id' => $neotokyo_MapaId, 'mode_joc_id' => $rocket4]);

        MapaMode::create(['mapa_id' => $deadeyecanyon_MapaId, 'mode_joc_id' => $rocket1]);
        MapaMode::create(['mapa_id' => $deadeyecanyon_MapaId, 'mode_joc_id' => $rocket2]);
        MapaMode::create(['mapa_id' => $deadeyecanyon_MapaId, 'mode_joc_id' => $rocket3]);
        MapaMode::create(['mapa_id' => $deadeyecanyon_MapaId, 'mode_joc_id' => $rocket4]);

        MapaMode::create(['mapa_id' => $saltyshores_MapaId, 'mode_joc_id' => $rocket1]);
        MapaMode::create(['mapa_id' => $saltyshores_MapaId, 'mode_joc_id' => $rocket2]);
        MapaMode::create(['mapa_id' => $saltyshores_MapaId, 'mode_joc_id' => $rocket3]);
        MapaMode::create(['mapa_id' => $saltyshores_MapaId, 'mode_joc_id' => $rocket4]);

        MapaMode::create(['mapa_id' => $farmstead_MapaId, 'mode_joc_id' => $rocket1]);
        MapaMode::create(['mapa_id' => $farmstead_MapaId, 'mode_joc_id' => $rocket2]);
        MapaMode::create(['mapa_id' => $farmstead_MapaId, 'mode_joc_id' => $rocket3]);
        MapaMode::create(['mapa_id' => $farmstead_MapaId, 'mode_joc_id' => $rocket4]);

        MapaMode::create(['mapa_id' => $starbasearc_MapaId, 'mode_joc_id' => $rocket1]);
        MapaMode::create(['mapa_id' => $starbasearc_MapaId, 'mode_joc_id' => $rocket2]);
        MapaMode::create(['mapa_id' => $starbasearc_MapaId, 'mode_joc_id' => $rocket3]);
        MapaMode::create(['mapa_id' => $starbasearc_MapaId, 'mode_joc_id' => $rocket4]);

        //ROCKET LEAGUE HIELO
        MapaMode::create(['mapa_id' => $beckwithpark_MapaId, 'mode_joc_id' => $hielo]);
        MapaMode::create(['mapa_id' => $dfhstadium_MapaId, 'mode_joc_id' => $hielo]);
        MapaMode::create(['mapa_id' => $mannfield_MapaId, 'mode_joc_id' => $hielo]);
        MapaMode::create(['mapa_id' => $throwbackstadium_MapaId, 'mode_joc_id' => $hielo]);
        MapaMode::create(['mapa_id' => $utopiacoliseum_MapaId, 'mode_joc_id' => $hielo]);

        //ROCKET LEAGUE HOOPS
        MapaMode::create(['mapa_id' => $dunkhouse_MapaId, 'mode_joc_id' => $hoops]);
        MapaMode::create(['mapa_id' => $theblock_MapaId, 'mode_joc_id' => $hoops]);

        //CLASH ROYALE 1VS1
        MapaMode::create(['mapa_id' => $arena10_MapaId, 'mode_joc_id' => $clashRoyale1]);

        //CLASH ROYALE TOUCHDOWN
        MapaMode::create(['mapa_id' => $touchdown_MapaId, 'mode_joc_id' => $touchdown]);

        //MARIOKART 8 DELUXE
        MapaMode::create(['mapa_id' => $copachampiñón_MapaId, 'mode_joc_id' => $juegoEnLinea]);
        MapaMode::create(['mapa_id' => $copaflor_MapaId, 'mode_joc_id' => $juegoEnLinea]);
        MapaMode::create(['mapa_id' => $copaestrella_MapaId, 'mode_joc_id' => $juegoEnLinea]);
        MapaMode::create(['mapa_id' => $copaespecial_MapaId, 'mode_joc_id' => $juegoEnLinea]);
        MapaMode::create(['mapa_id' => $copacaparazón_MapaId, 'mode_joc_id' => $juegoEnLinea]);
        MapaMode::create(['mapa_id' => $copaplátano_MapaId, 'mode_joc_id' => $juegoEnLinea]);
        MapaMode::create(['mapa_id' => $copahoja_MapaId, 'mode_joc_id' => $juegoEnLinea]);
        MapaMode::create(['mapa_id' => $copacentella_MapaId, 'mode_joc_id' => $juegoEnLinea]);
        MapaMode::create(['mapa_id' => $copahuevo_MapaId, 'mode_joc_id' => $juegoEnLinea]);
        MapaMode::create(['mapa_id' => $copacrossing_MapaId, 'mode_joc_id' => $juegoEnLinea]);
        MapaMode::create(['mapa_id' => $copatrifuerza_MapaId, 'mode_joc_id' => $juegoEnLinea]);
        MapaMode::create(['mapa_id' => $copacampana_MapaId, 'mode_joc_id' => $juegoEnLinea]);

        //LOL
        MapaMode::create(['mapa_id' => $mapalol_MapaId, 'mode_joc_id' => $grietaDelInvocador]);
        MapaMode::create(['mapa_id' => $mapalol_MapaId, 'mode_joc_id' => $aram]);
        MapaMode::create(['mapa_id' => $mapalol_MapaId, 'mode_joc_id' => $modoRotativo]);

        //EQUIP
        $Admins = DB::table('equips')->insertGetId([
            'nom' => 'Admins',
            'regio' => 'Europa',
            'foto_equip' => 'admins.webp',
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo que se ha creado para hacer pruebas en el frontend al inicio del proyecto. Sus participantes son los creadores del proyecto.',
            'maxim_integrants' => 2
        ]);

        $LosLeones = DB::table('equips')->insertGetId([
            'nom' => 'Los Leones',
            'regio' => 'Europa',
            'foto_equip' => 'Losleones.webq',
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo que se ha creado para hacer pruebas en el frontend al inicio del proyecto. Sus participantes son los creadores del proyecto.',
            'maxim_integrants' => 2
        ]);

        $macarras = DB::table('equips')->insertGetId([
            'nom' => 'Macarras',
            'regio' => 'Europa',
            'foto_equip' => 'macarras.png',
            'data_creacio' => now(),
            'descripcio' => 'Este es otro equipo que se ha creado para hacer pruebas en el frontend al inicio del proyecto. Sus participantes son los creadores del proyecto.',
            'maxim_integrants' => 2
        ]);

        $LosRaulitos = DB::table('equips')->insertGetId([
            'nom' => 'Los Raulitos',
            'regio' => 'Europa',
            'foto_equip' => 'losraulitos.jpg',
            'data_creacio' => now(),
            'descripcio' => 'Este es otro equipo que se ha creado para hacer pruebas en el frontend al inicio del proyecto. Sus participantes son los creadores del proyecto.',
            'maxim_integrants' => 2
        ]);

        $campeones = DB::table('equips')->insertGetId([
            'nom' => 'Campeones',
            'regio' => 'Europa',
            'foto_equip' => 'campeones.jpg',
            'data_creacio' => now(),
            'descripcio' => 'Este es otro equipo que se ha creado para hacer pruebas en el frontend al inicio del proyecto. Sus participantes son los creadores del proyecto.',
            'maxim_integrants' => 2
        ]);

        $carlos_equip = DB::table('equips')->insertGetId([
            'nom' => 'Carlos MS',
            'regio' => 'Europa',
            'foto_equip' => 'carlos_ms.jpg',
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo individual en el que pertenece solo un equipo.',
            'maxim_integrants' => 1
        ]);
        $charly_equip = DB::table('equips')->insertGetId([
            'nom' => 'Charly MS',
            'regio' => 'Europa',
            'foto_equip' => 'charly_ms.png',
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo individual en el que pertenece solo un equipo.',
            'maxim_integrants' => 1
        ]);
        $charly2_equip = DB::table('equips')->insertGetId([
            'nom' => 'Charly2 MS',
            'regio' => 'Europa',
            'foto_equip' => 'charly2_ms.jpg',
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo individual en el que pertenece solo un equipo.',
            'maxim_integrants' => 1
        ]);

        $raul_equip = DB::table('equips')->insertGetId([
            'nom' => 'Raúl AG',
            'regio' => 'Europa',
            'foto_equip' => 'raul_ag.jpeg',
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo individual en el que pertenece solo un equipo.',
            'maxim_integrants' => 1
        ]);
        $raulito_equip = DB::table('equips')->insertGetId([
            'nom' => 'Raúlito AG',
            'regio' => 'Europa',
            'foto_equip' => 'raulito_ag.jpeg',
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo individual en el que pertenece solo un equipo.',
            'maxim_integrants' => 1
        ]);
        $raulito2_equip = DB::table('equips')->insertGetId([
            'nom' => 'Raúlito2 AG',
            'regio' => 'Europa',
            'foto_equip' => 'raulito2_ag.jpeg',
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo individual en el que pertenece solo un equipo.',
            'maxim_integrants' => 1
        ]);

        $pere_equip = DB::table('equips')->insertGetId([
            'nom' => 'Pere FT',
            'regio' => 'Europa',
            'foto_equip' => 'pere_ft.jpeg',
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo individual en el que pertenece solo un equipo.',
            'maxim_integrants' => 1
        ]);

        $fran_equip = DB::table('equips')->insertGetId([
            'nom' => 'Fran RB',
            'regio' => 'Europa',
            'foto_equip' => 'fran_rb.jpg',
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo individual en el que pertenece solo un equipo.',
            'maxim_integrants' => 1
        ]);

        $nico_equip = DB::table('equips')->insertGetId([
            'nom' => 'Nico PC',
            'regio' => 'Europa',
            'foto_equip' => 'nico_pc.jpg',
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo individual en el que pertenece solo un equipo.',
            'maxim_integrants' => 1
        ]);

        $eric_equip = DB::table('equips')->insertGetId([
            'nom' => 'Eric FM',
            'regio' => 'Europa',
            'foto_equip' => 'eric_fm.jpg',
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo individual en el que pertenece solo un equipo.',
            'maxim_integrants' => 1
        ]);

        $ivan_equip = DB::table('equips')->insertGetId([
            'nom' => 'Ivan MC',
            'regio' => 'Europa',
            'foto_equip' => 'ivan_mc.jpg',
            'data_creacio' => now(),
            'descripcio' => 'Este es un equipo individual en el que pertenece solo un equipo.',
            'maxim_integrants' => 1
        ]);

        //EQUIP-USER
        EquipUser::create(['equip_id' => $Admins, 'user_id' => $carlosUser]);
        EquipUser::create(['equip_id' => $Admins, 'user_id' => $raulUser]);

        EquipUser::create(['equip_id' => $LosLeones, 'user_id' => $charlyUser]);
        EquipUser::create(['equip_id' => $LosLeones, 'user_id' => $raulitoUser]);

        EquipUser::create(['equip_id' => $macarras, 'user_id' => $pereUser]);
        EquipUser::create(['equip_id' => $macarras, 'user_id' => $franUser]);

        EquipUser::create(['equip_id' => $campeones, 'user_id' => $nicoUser]);
        EquipUser::create(['equip_id' => $campeones, 'user_id' => $ericUser]);
        EquipUser::create(['equip_id' => $LosRaulitos, 'user_id' => $raulito2User]);


        EquipUser::create(['equip_id' => $carlos_equip, 'user_id' => $carlosUser]);
        EquipUser::create(['equip_id' => $raul_equip, 'user_id' => $raulUser]);
        EquipUser::create(['equip_id' => $charly_equip, 'user_id' => $charlyUser]);
        EquipUser::create(['equip_id' => $raulito_equip, 'user_id' => $raulitoUser]);
        EquipUser::create(['equip_id' => $charly2_equip, 'user_id' => $charly2User]);
        EquipUser::create(['equip_id' => $raulito2_equip, 'user_id' => $raulito2User]);
        EquipUser::create(['equip_id' => $pere_equip, 'user_id' => $pereUser]);
        EquipUser::create(['equip_id' => $fran_equip, 'user_id' => $franUser]);
        EquipUser::create(['equip_id' => $nico_equip, 'user_id' => $nicoUser]);
        EquipUser::create(['equip_id' => $eric_equip, 'user_id' => $ericUser]);
        EquipUser::create(['equip_id' => $ivan_equip, 'user_id' => $ivanUser]);


        //PREMIS
        $premiGran = DB::table('premis')->insertGetId([
            'valor' => 100
        ]);

        $premiMig = DB::table('premis')->insertGetId([
            'valor' => 75
        ]);

        $premiPetit = DB::table('premis')->insertGetId([
            'valor' => 50
        ]);

        //TORNEIGS
        $torneig1 = DB::table('torneigs')->insertGetId([
            'nom' => 'Torneig de Rocket',
            'participants' => 4,
            'tipus' => 'col·lectiu',
            'data_inici' => '2025-06-06 11:00:00',
            'data_fi' => '2025-07-15 12:00:00',
            'estat' => 'No Començat',
            'quantitat_partides' => 3,
            'numero_equips' => 2,
            'modeJoc_id' => $rocket2,
            'mapa_id' => $neotokyo_MapaId,
            'premi_id' => $premiGran
        ]);

        $torneig2 = DB::table('torneigs')->insertGetId([
            'nom' => 'Torneig de Rocket',
            'participants' => 4,
            'tipus' => 'col·lectiu',
            'data_inici' => '2025-04-01 10:00:00',
            'data_fi' => '2025-08-22 19:00:00',
            'estat' => 'En Procés',
            'quantitat_partides' => 3,
            'numero_equips' => 2,
            'modeJoc_id' => $rocket2,
            'mapa_id' => $neotokyo_MapaId,
            'premi_id' => $premiMig
        ]);

        $torneig3 = DB::table('torneigs')->insertGetId([
            'nom' => 'Torneig de Brawl Stars',
            'participants' => 4,
            'tipus' => 'col·lectiu',
            'data_inici' => '2025-01-01 10:00:00',
            'data_fi' => '2025-02-01 11:30:00',
            'estat' => 'Finalitzat',
            'quantitat_partides' => 3,
            'numero_equips' => 2,
            'modeJoc_id' => $cazaEstelar,
            'mapa_id' => $tiroteoestelar_MapaId,
            'premi_id' => $premiPetit
        ]);

        $torneig4 = DB::table('torneigs')->insertGetId([
            'nom' => 'Torneig de Clash Royale',
            'participants' => 2,
            'tipus' => 'individual',
            'data_inici' => '2025-04-01 10:00:00',
            'data_fi' => '2025-08-22 19:00:00',
            'estat' => 'En Procés',
            'quantitat_partides' => 3,
            'numero_equips' => 2,
            'modeJoc_id' => $clashRoyale1,
            'mapa_id' => $arena10_MapaId,
            'premi_id' => $premiPetit
        ]);

        $torneig5 = DB::table('torneigs')->insertGetId([
            'nom' => 'Torneig de Valorant',
            'participants' => 4,
            'tipus' => 'col·lectiu',
            'data_inici' => '2025-06-01 10:00:00',
            'data_fi' => '2025-08-01 11:30:00',
            'estat' => 'No Començat',
            'quantitat_partides' => 3,
            'numero_equips' => 2,
            'modeJoc_id' => $valorant,
            'mapa_id' => $abyss_MapaId,
            'premi_id' => $premiGran
        ]);
        $torneig6 = DB::table('torneigs')->insertGetId([
            'nom' => 'Torneig de Fortnite',
            'participants' => 10,
            'tipus' => 'individual',
            'data_inici' => '2025-06-01 10:00:00',
            'data_fi' => '2025-09-01 11:30:00',
            'estat' => 'No Començat',
            'quantitat_partides' => 3,
            'numero_equips' => 10,
            'modeJoc_id' => $battleRoyale,
            'mapa_id' => $construccion_MapaId,
            'premi_id' => $premiPetit
        ]);

        $torneig7 = DB::table('torneigs')->insertGetId([
            'nom' => 'Torneig Brawl Stars',
            'participants' => 2,
            'tipus' => 'col·lectiu',
            'data_inici' => '2025-05-01 10:00:00',
            'data_fi' => '2025-07-22 19:00:00',
            'estat' => 'En Procés',
            'quantitat_partides' => 3,
            'numero_equips' => 2,
            'modeJoc_id' => $atraco,
            'mapa_id' => $arroyocalavera_MapaId,
            'premi_id' => $premiMig
        ]);


        //EQUIP-TORNEIG
        EquipTorneig::create([
            'equip_id' => $carlos_equip,
            'torneig_id' => $torneig4
        ]);
        EquipTorneig::create([
            'equip_id' => $fran_equip,
            'torneig_id' => $torneig4
        ]);


        EquipTorneig::create([
            'equip_id' => $LosLeones,
            'torneig_id' => $torneig1
        ]);
        EquipTorneig::create([
            'equip_id' => $macarras,
            'torneig_id' => $torneig1
        ]);


        EquipTorneig::create([
            'equip_id' => $LosLeones,
            'torneig_id' => $torneig2
        ]);
        EquipTorneig::create([
            'equip_id' => $macarras,
            'torneig_id' => $torneig2
        ]);


        EquipTorneig::create([
            'equip_id' => $LosLeones,
            'torneig_id' => $torneig3
        ]);
        EquipTorneig::create([
            'equip_id' => $macarras,
            'torneig_id' => $torneig3
        ]);

        EquipTorneig::create([
            'equip_id' => $raulito_equip,
            'torneig_id' => $torneig4
        ]);
        EquipTorneig::create([
            'equip_id' => $nico_equip,
            'torneig_id' => $torneig4
        ]);

        EquipTorneig::create([
            'equip_id' => $campeones,
            'torneig_id' => $torneig5
        ]);
        EquipTorneig::create([
            'equip_id' => $macarras,
            'torneig_id' => $torneig5
        ]);

        EquipTorneig::create([
            'equip_id' => $charly_equip,
            'torneig_id' => $torneig6
        ]);
        EquipTorneig::create([
            'equip_id' => $raul_equip,
            'torneig_id' => $torneig6
        ]);
        EquipTorneig::create([
            'equip_id' => $ivan_equip,
            'torneig_id' => $torneig6
        ]);
        EquipTorneig::create([
            'equip_id' => $eric_equip,
            'torneig_id' => $torneig6
        ]);

        EquipTorneig::create([
            'equip_id' => $LosLeones,
            'torneig_id' => $torneig7
        ]);
        EquipTorneig::create([
            'equip_id' => $campeones,
            'torneig_id' => $torneig7
        ]);



        //PARTIDA

        //TORNEIG 1
        Partida::create([
            'data_hora' => '2025-06-06 11:00:00',
            'posicio_partida' => 1,
            'torneig_id' => $torneig1
        ]);

        Partida::create([
            'data_hora' => '2025-06-20 11:00:00',
            'posicio_partida' => 2,
            'torneig_id' => $torneig1
        ]);

        Partida::create([
            'data_hora' => '2025-07-12 11:00:00',
            'posicio_partida' => 3,
            'torneig_id' => $torneig1
        ]);

        //TORNEIG 2
        Partida::create([
            'data_hora' => '2025-04-01 10:00:00',
            'posicio_partida' => 1,
            'resultat_equip_id' => 1,
            'torneig_id' => $torneig2

        ]);

        Partida::create([
            'data_hora' => '2025-05-10 11:00:00',
            'posicio_partida' => 2,
            'torneig_id' => $torneig2

        ]);

        Partida::create([
            'data_hora' => '2025-08-20 11:00:00',
            'posicio_partida' => 3,
            'torneig_id' => $torneig2

        ]);

        //TORNEIG 3
        Partida::create([
            'data_hora' => '2025-01-01 10:00:00',
            'posicio_partida' => 1,
            'resultat_equip_id' => 1,
            'torneig_id' => $torneig3
        ]);

        Partida::create([
            'data_hora' => '2025-01-15 10:00:00',
            'posicio_partida' => 2,
            'resultat_equip_id' => 2,
            'torneig_id' => $torneig3
        ]);

        Partida::create([
            'data_hora' => '2025-01-30 10:00:00',
            'posicio_partida' => 3,
            'resultat_equip_id' => 1,
            'torneig_id' => $torneig3
        ]);

        //TORNEIG 4
        Partida::create([
            'data_hora' => '2025-04-01 10:00:00',
            'posicio_partida' => 1,
            'resultat_equip_id' => 2,
            'torneig_id' => $torneig4
        ]);

        Partida::create([
            'data_hora' => '2025-04-01 10:00:00',
            'posicio_partida' => 2,
            'torneig_id' => $torneig4
        ]);

        Partida::create([
            'data_hora' => '2025-04-01 10:00:00',
            'posicio_partida' => 3,
            'torneig_id' => $torneig4
        ]);

        //TORNEIG 5
        Partida::create([
            'data_hora' => '2025-06-02 10:00:00',
            'posicio_partida' => 1,
            'torneig_id' => $torneig5
        ]);

        Partida::create([
            'data_hora' => '2025-06-10 10:00:00',
            'posicio_partida' => 2,
            'torneig_id' => $torneig5
        ]);

        Partida::create([
            'data_hora' => '2025-06-20 10:00:00',
            'posicio_partida' => 3,
            'torneig_id' => $torneig5
        ]);

        //TORNEIG 6
        Partida::create([
            'data_hora' => '2025-06-02 10:00:00',
            'posicio_partida' => 1,
            'torneig_id' => $torneig6
        ]);

        Partida::create([
            'data_hora' => '2025-06-15 10:00:00',
            'posicio_partida' => 2,
            'torneig_id' => $torneig6
        ]);

        Partida::create([
            'data_hora' => '2025-06-20 10:00:00',
            'posicio_partida' => 3,
            'torneig_id' => $torneig6
        ]);

        //TORNEIG 7
        Partida::create([
            'data_hora' => '2025-05-05 10:00:00',
            'posicio_partida' => 1,
            'resultat_equip_id' => 1,
            'torneig_id' => $torneig7
        ]);

        Partida::create([
            'data_hora' => '2025-06-01 10:00:00',
            'posicio_partida' => 2,
            'torneig_id' => $torneig7
        ]);

        Partida::create([
            'data_hora' => '2025-06-22 10:00:00',
            'posicio_partida' => 3,
            'torneig_id' => $torneig7
        ]);

    }
}