<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Torneig extends Model
{
    protected $fillable = ['nom', 'participats', 'tipus', 'data_inici', 'data_fi', 'estat'];

    public function equips(): BelongsToMany
    {
        return $this->belongsToMany(Equip::class);
    }

    public function modesDeJoc(): HasOne
    {
        return $this->hasOne(ModeJoc::class);
    }

    public function premis(): HasMany
    {
        return $this->hasMany(Premi::class);
    }

    public function partides(): HasMany
    {
        return $this->hasMany(Partida::class);
    }

}
