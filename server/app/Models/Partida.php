<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Partida extends Model
{
    protected $table = 'partidas';

    protected $fillable = [
        'resultat_equip_id',
    ];
    public function torneig(): BelongsTo
    {
        return $this->belongsTo(Torneig::class);
    }
}
