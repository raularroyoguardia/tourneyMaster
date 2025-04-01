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
        Schema::create('partida_torneig', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partida_id')->nullable()->constrained(table: 'partidas')->cascadeOnDelete();
            $table->foreignId('torneig_id')->nullable()->constrained(table: 'torneigs')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partida_torneig');
    }
};
