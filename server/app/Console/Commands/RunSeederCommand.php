<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class RunSeederCommand extends Command
{
    protected $signature = 'db:seed-all';
    protected $description = 'Ejecuta los seeders en diferentes entornos';

    public function handle()
    {
        $host = gethostbyname(gethostname()); // Obtiene la IP de la máquina actual

        $allowedHosts = [
            '127.0.0.1', // Localhost
            '172.16.206.28',
            '172.16.206.29'
        ];

        if (in_array($host, $allowedHosts)) {
            $this->info("Ejecutando seeders en: $host");

            $this->call('db:seed'); // Ejecuta los seeders normales
        } else {
            $this->error("Este comando no está permitido en esta máquina ($host).");
        }
    }
}
