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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('tipus_usuari_id')->nullable()->constrained('tipus_usuaris')->cascadeOnDelete();
        });

        Schema::table('torneigs', function (Blueprint $table) {
            $table->foreignId('modeJoc_id')->nullable()->constrained('mode_jocs')->cascadeOnDelete();
        });
        Schema::table('mode_jocs', function (Blueprint $table) {
            $table->foreignId('jocId')->nullable()->constrained(table: 'jocs')->cascadeOnDelete();
        });
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
