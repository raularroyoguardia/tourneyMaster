<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //FOREIGN KEYS USERS
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('tipus_usuari_id')->default(3)->constrained('tipus_usuaris')->cascadeOnDelete();
        });

        //FOREIGN KEYS TORNEIGS
        Schema::table('torneigs', function (Blueprint $table) {
            $table->foreignId('modeJoc_id')->nullable()->constrained('mode_jocs')->cascadeOnDelete();
            $table->foreignId('mapa_id')->nullable()->constrained(table: 'mapas')->cascadeOnDelete();
            $table->foreignId('premi_id')->nullable()->constrained(table: 'premis')->cascadeOnDelete();
        });

        //FOREIGN KEYS MODE DE JOCS
        Schema::table('mode_jocs', function (Blueprint $table) {
            $table->foreignId('joc_id')->nullable()->constrained(table: 'jocs')->cascadeOnDelete();
        });

        //FOREIGN KEYS PARTIDAS
        Schema::table('partidas', function (Blueprint $table) {
            $table->foreignId('resultat_equip_id')->nullable()->constrained(table: 'equips')->cascadeOnDelete();
            $table->foreignId('torneig_id')->nullable()->constrained(table: 'torneigs')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
