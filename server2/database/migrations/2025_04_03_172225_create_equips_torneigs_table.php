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
        Schema::create('equips_torneigs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equip_id')->nullable()->constrained(table: 'equips')->cascadeOnDelete();
            $table->foreignId('torneig_id')->nullable()->constrained(table: 'torneigs')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equips_torneigs');
    }
};
