<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ronda extends Model
{
    protected $fillable = ['num_ronda', 'descripcio'];
    
    public function partida(): BelongsTo
    {
        return $this->belongsTo(Partida::class);
    }
}
