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
        Schema::create('equips', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('regio');
            $table->string('foto_equip');
            $table->integer('trofeus')->default(0);
            $table->date('data_creacio')->default(now());
            $table->longText('descripcio');
            $table->integer('maxim_integrants');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equips');
    }
};
