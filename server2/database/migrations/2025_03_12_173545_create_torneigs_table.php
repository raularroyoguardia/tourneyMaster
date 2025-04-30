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
        Schema::create('torneigs', function (Blueprint $table) {
            $table->id();
            $table->longText('nom');
            $table->integer('participants');
            $table->string('tipus');
            $table->dateTime('data_inici');
            $table->dateTime('data_fi');
            $table->string('estat')->default('No Començat');
            $table->integer('quantitat_partides')->default(3);
            $table->integer('numero_equips');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('torneigs');
    }
};
