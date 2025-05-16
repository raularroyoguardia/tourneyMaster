<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Torneig extends Model
{
    protected $fillable = ['nom', 'data_inici', 'data_fi', 'modeJoc_id', 'mapa_id'];
    protected $table = 'torneigs';

    public function equips(): BelongsToMany
    {
        return $this->belongsToMany(Equip::class, 'equips_torneigs', 'torneig_id', 'equip_id');
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
