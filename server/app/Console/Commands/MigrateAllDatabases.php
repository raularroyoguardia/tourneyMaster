<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class MigrateAllDatabases extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ejecutar migraciones en todas las bases de datos';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $databases = ['mysql_carlos', 'mysql_raul', 'mysql'];

        foreach($databases as $database) {
            $this->info("Migrating database: $database");
            Artisan::call('migrate', ['--database' => $database]);
            $this->info(Artisan::output());
        }

        $this->info('Migraciones completadas en todas las bases de datos');
    }
}
