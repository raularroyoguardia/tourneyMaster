<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Joc extends Model
{
    protected $fillable = ['nom', ];

    public function modesDeJoc(): HasMany
    {
        return $this->hasMany(ModeJoc::class);
    }
}
