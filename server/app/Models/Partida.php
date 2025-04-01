<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Partida extends Model
{
    protected $fillable = ['data_hora', 'resultat'];

    public function torneig(): BelongsTo
    {
        return $this->belongsTo(Torneig::class);
    }
}
