<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Mapa extends Model
{
    public function modesDeJoc(): BelongsToMany
    {
        return $this->belongsToMany(ModeJoc::class);
    }
}
