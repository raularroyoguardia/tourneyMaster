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
        Schema::table('torneigs', function (Blueprint $table) {
            $table->foreignId('premi_id')->nullable()->constrained(table: 'premis')->cascadeOnDelete();
            $table->foreignId('modeJoc_id')->nullable()->constrained(table: 'mode_jocs')->cascadeOnDelete();
            $table->foreignId('equip_id')->nullable()->constrained(table: 'equips')->cascadeOnDelete();
            $table->foreignId('partida_id')->nullable()->constrained(table: 'partidas')->cascadeOnDelete();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('torneigs', function (Blueprint $table) {
            //
        });
    }
};
