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
        Schema::create('equips_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equip_id')->nullable()->constrained(table: 'equips')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained(table: 'users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equips_users');
    }
};
