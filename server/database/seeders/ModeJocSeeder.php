<?php

namespace Database\Seeders;

use App\Models\ModeJoc;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModeJocSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ModeJoc::create([
            'nom' => 'Partido Rápido',
            'descripcio' => 'El modo Partido Rápido en EA SPORTS FC 25 permite jugar un partido de fútbol inmediato, eligiendo rápidamente equipos, estadio y condiciones.',
            'jugadors' => 2,
            'jocId' => 1
        ]);

        ModeJoc::create([
            'nom' => 'Spike Rush',
            'descripcio' => 'Spike Rush es un modo Bo7 5v5 donde todos los jugadores comienzan cada ronda con la misma arma aleatoria. Se generan orbes aleatorios alrededor del mapa que los jugadores pueden recolectar para otorgar beneficios para ellos y/o sus compañeros de equipo o afligir a los enemigos con desventajas.',
            'jugadors' => 10,
            'jocId' => 2
        ]);

        ModeJoc::create([
            'nom' => 'Plantar/Defusar',
            'descripcio' => 'Plantar/Defusar es un tipo de modo de juego en el que juegas como atacante o defensor. El objetivo del Atacante es plantar la Spike o matar a todos los Defensores vivos, mientras que el objetivo del Defensor es evitar que el Atacante plante la Spike (ya sea matando a todos los Atacantes vivos o impidiendo que los Atacantes planten dentro del límite de tiempo de la ronda), o desactivar la Spike si ya ha sido plantado (matar a todos los Atacantes vivos no es suficiente para ganar la ronda en este caso). Los participantes solo tienen una vida por ronda. Al morir, los jugadores deben esperar a que comience la siguiente ronda o ser revividos por Sage para volver al campo de batalla.',
            'jugadors' => 10,
            'jocId' => 2
        ]);

        ModeJoc::create([
            'nom' => 'Deathmatch',
            'descripcio' => 'Deathmatch es un modo de juego de 12 jugadores todos contra todos diseñado para permitir a los jugadores perfeccionar su mecánica de tiro sin habilidades. Los jugadores equipan las armas de su elección y matan a cualquiera que se interponga en su camino hasta que un jugador alcance las 40 muertes o hayan pasado 9 minutos, momento en el que el juego terminará.',
            'jugadors' => 12,
            'jocId' => 2
        ]);

        ModeJoc::create([
            'nom' => 'Guerra de Nieve',
            'descripcio' => 'Snowball Fight es un modo de combate a muerte por equipos de 5 contra 5 en el que gana el primer equipo en 50 muertes. Todos los jugadores solo tienen acceso a un Lanzador de bolas de nieve que dispara bolas de nieve letales basadas en proyectiles. Los regalos también aparecen en el mapa que contienen potenciadores temporales para el jugador. Estos pueden aumentar la velocidad de disparo del lanzador, aumentar el tamaño de las bolas de nieve, dejar que las bolas de nieve reboten o aumentar la velocidad de movimiento del jugador y la altura máxima de salto.',
            'jugadors' => 10,
            'jocId' => 2
        ]);

        ModeJoc::create([
            'nom' => 'Supervivencia',
            'descripcio' => 'El típico "Battle royale", varios jugadores luchan por sobrevivir hasta ser el último en pie. El mapa se va reduciendo con el tiempo, pues se va llenando de nubes tóxicas.',
            'jugadors' => 10,
            'jocId' => 3
        ]);

        ModeJoc::create([
            'nom' => 'Atrapagemas',
            'descripcio' => 'Se trata de conseguir gemas que salen del centro del mapa, al llegar a 10 (o más) gemas se carga un contador de 15 segundos cuando se termina el equipo de las 10 gemas gana, si tienes gemas y te matan pierdes las gemas y si el contador estaba activo, se reinicia y no vuelve a cargar hasta que tu equipo vuelva a tener diez gemas.',
            'jugadors' => 6,
            'jocId' => 3
        ]);

        ModeJoc::create([
            'nom' => 'Balón Brawl',
            'descripcio' => '¡Un partido al estilo Brawl! ganará quien anote 2 goles o anote la mayor cantidad cuando el tiempo acabe. Si hay empate, habrá un minuto de tiempo extra en el que el primer gol que sea anotado, es el que define el ganador. Si este se termina, la partida acaba en empate.',
            'jugadors' => 6,
            'jocId' => 3
        ]);

        ModeJoc::create([
            'nom' => 'Atraco',
            'descripcio' => 'Como su nombre lo indica, tienes que atracar la caja fuerte del enemigo, esto se consigue destruyéndola. Pero ¡cuidado! los rivales también intentarán destruir tu caja fuerte.',
            'jugadors' => 6,
            'jocId' => 3
        ]);

        ModeJoc::create([
            'nom' => 'Caza Estelar',
            'descripcio' => 'Derrota a tus enemigos para ganar estrellas, entre más enemigos derrotes, más estrellas tendrás, ¡pero con cuidado! si te derrotan, le darás todas esas estrellas a tus rivales. Ganará quien, al finalizar el tiempo (2 minutos) haya conseguido más estrellas, o después de que un equipo haya conseguido 20 estrellas.',
            'jugadors' => 6,
            'jocId' => 3
        ]);

        ModeJoc::create([
            'nom' => 'Zona Restringida',
            'descripcio' => 'Hay 1, 2, o 3 zonas en el mapa tienes que entrar en ellas para cargar una barra. El primer equipo en llegar a 100% su equipo gana (si se acaba el tiempo, gana el que tenga la barra más cargada).',
            'jugadors' => 6,
            'jocId' => 3
        ]);

        ModeJoc::create([
            'nom' => 'Noqueo',
            'descripcio' => 'Derrota a tus enemigos en una batalla campal. Pero ¡No dejes que te derroten! si lo hacen, no podrás reaparecer en toda la ronda. Ganará la ronda quien tenga al menos un miembro en pie, y gana la partida quien gane 2 rondas.',
            'jugadors' => 6,
            'jocId' => 3
        ]);

        ModeJoc::create([
            'nom' => 'Battle Royale',
            'descripcio' => 'Un máximo de 100 jugadores por partida y con la opción de construir estructura.',
            'jugadors' => 100,
            'jocId' => 4
        ]);

        ModeJoc::create([
            'nom' => 'Cero construcción',
            'descripcio' => 'Si no quieres jugar con estructuras el juego te ofrece la opción de jugar sin la opción de construir en cualquiera de los modos anteriores.',
            'jugadors' => 100,
            'jocId' => 4
        ]);

        ModeJoc::create([
            'nom' => '1 vs 1',
            'descripcio' => 'Un enfrentamiento individual donde cada jugador debe demostrar su habilidad en ataque y defensa sin ayuda. Es el modo más exigente a nivel técnico y estratégico.',
            'jugadors' => 2,
            'jocId' => 5
        ]);

        ModeJoc::create([
            'nom' => '2 vs 2',
            'descripcio' => 'Modo basado en trabajo en equipo, donde la comunicación y la sincronización son clave. Cada jugador debe equilibrar ataque y defensa para no dejar la portería desprotegida.',
            'jugadors' => 4,
            'jocId' => 5
        ]);

        ModeJoc::create([
            'nom' => '3 vs 3',
            'descripcio' => 'El modo principal y más competitivo de Rocket League, con una dinámica de juego basada en rotaciones entre ataque, medio campo y defensa.',
            'jugadors' => 6,
            'jocId' => 5
        ]);

        ModeJoc::create([
            'nom' => '4 vs 4',
            'descripcio' => 'Una versión más caótica del 3vs3 con menos estructura y más acción. Con tantos jugadores en el campo, las jugadas pueden volverse impredecibles y menos estratégicas.',
            'jugadors' => 8,
            'jocId' => 5
        ]);

        ModeJoc::create([
            'nom' => 'Snoww Day',
            'descripcio' => 'Un modo inspirado en el hockey sobre hielo, donde el balón es reemplazado por un puck que se desliza sobre la superficie. Cambia la física del juego y requiere un enfoque diferente para los tiros y pases.',
            'jugadors' => 6,
            'jocId' => 5
        ]);

        ModeJoc::create([
            'nom' => 'Hoops',
            'descripcio' => 'Un modo en el que las porterías son aros elevados, obligando a los jugadores a realizar tiros aéreos y jugar con precisión para encestar. La dinámica del juego cambia completamente al enfocarse en juego vertical y control del balón en el aire.',
            'jugadors' => 6,
            'jocId' => 5
        ]);

        ModeJoc::create([
            'nom' => '1vs1',
            'descripcio' => 'Es el modo clásico de Clash Royale, donde dos jugadores compiten en un duelo uno contra uno. Cada jugador tiene tres torres (dos torres de coronas y una torre del rey) y debe destruir más torres que el oponente antes de que acabe el tiempo. Si un jugador destruye la torre del rey, gana automáticamente.',
            'jugadors' => 2,
            'jocId' => 6
        ]);

        ModeJoc::create([
            'nom' => 'Touchdown',
            'descripcio' => 'Es un modo especial en el que no hay torres, y el objetivo es llevar una de tus tropas hasta la línea de touchdown del rival. Cada vez que una tropa cruza la línea enemiga, se anota un punto. El primer jugador en marcar dos touchdowns gana la partida.',
            'jugadors' => 2,
            'jocId' => 6
        ]);

        ModeJoc::create([
            'nom' => 'Juego en línea',
            'descripcio' => 'Compite contra otros jugadores en 4 circuitos distintos escogidos por votos de los jugadores. Antes de empezar cada carrera se botará el circuito que se quiere correr. Al final de cada carrera se obtiene una puntuación dependiendo de la posición. El jugador que junte más puntos gana la partida',
            'jugadors' => 8,
            'jocId' => 7
        ]);

        ModeJoc::create([
            'nom' => 'Grieta del Invocador',
            'descripcio' => 'Dos equipos de cinco jugadores luchan para destruir el Nexo enemigo, atravesando tres líneas (top, mid, bot) y enfrentándose a torres, súbditos y monstruos de la jungla.',
            'jugadors' => 10,
            'jocId' => 8
        ]);

        ModeJoc::create([
            'nom' => 'ARAM (All Random All Mid)',
            'descripcio' => 'Un modo rápido y caótico en el Abismo de los Lamentos. Solo hay una línea, sin jungla, y los campeones son asignados aleatoriamente. Ideal para combates constantes.',
            'jugadors' => 10,
            'jocId' => 8
        ]);

        ModeJoc::create([
            'nom' => 'Modo Rotativo',
            'descripcio' => 'Modos especiales que aparecen temporalmente, como URF (Ultra Rapid Fire) con habilidades sin costo y enfriamientos reducidos.',
            'jugadors' => 10,
            'jocId' => 8
        ]);
    }
}
