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
        Schema::create('partidas_equips', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partida_id')->nullable()->constrained(table: 'partidas')->cascadeOnDelete();
            $table->foreignId('equip_id')->nullable()->constrained(table: 'equips')->cascadeOnDelete();
            $table->integer('posicio_final');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partidas_equips');
    }
};
