<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class RunSeederCommand extends Command
{
    // Definimos la firma del comando con la opción --class
    protected $signature = 'db:seed-all {--class=}';
    protected $description = 'Ejecuta los seeders en diferentes entornos permitidos';

    public function handle()
{
    $host = $_SERVER['SERVER_ADDR'] ?? trim(shell_exec("hostname -I | awk '{print $1}'"));

    $allowedHosts = [
        // '127.0.0.1',  
        '127.0.1.1',  
        '::1',        
        '172.16.206.28',
        '172.16.206.29'
    ];

    if (in_array($host, $allowedHosts)) {
        $this->info("Ejecutando seeders en: $host");

        // Obtiene la opción --class si está presente
        $seederClass = $this->option('class');
        $command = $seederClass ? "php artisan db:seed --class={$seederClass}" : "php artisan db:seed";

        // Ejecuta localmente
        $this->call('db:seed', $seederClass ? ['--class' => $seederClass] : []);

        // Si estamos en 172.16.206.29, también ejecutar en 172.16.206.28
        if ($host === '172.16.206.29') {
            $this->info("Ejecutando seeders en 172.16.206.28...");
            shell_exec("ssh raul@172.16.206.28 'cd /var/www/html/M12/tourneyMaster/server && $command'");
        }

        return;
    }

    $this->error("Este comando no está permitido en esta máquina ($host).");
}



}
