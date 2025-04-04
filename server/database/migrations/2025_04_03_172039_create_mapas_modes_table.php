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
        Schema::create('mapas_modes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mapa_id')->nullable()->constrained(table: 'mapas')->cascadeOnDelete();
            $table->foreignId('mode_joc_id')->nullable()->constrained(table: 'mode_jocs')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mapas_modes');
    }
};
