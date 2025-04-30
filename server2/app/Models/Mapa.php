<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Mapa extends Model
{

    protected $table = 'mapas';
    protected $fillable = ['nom', 'mapa'];

    public function modesDeJoc(): BelongsToMany
    {
        return $this->belongsToMany(ModeJoc::class);
    }
}
