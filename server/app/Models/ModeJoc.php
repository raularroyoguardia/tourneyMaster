<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use Illuminate\Database\Eloquent\Model;

class ModeJoc extends Model
{
    protected $fillable = ['nom', 'descripcio', 'tipus'];

    public function joc(): BelongsTo
    {
        return $this->belongsTo(Joc::class);
    }

    public function torneig(): BelongsTo
    {
        return $this->belongsTo(Torneig::class);
    }
}
