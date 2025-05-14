<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Partida extends Model
{
    protected $table = 'partidas';

    protected $fillable = [
        'torneig_id',
        'posicio_partida',
        'data_hora',
        'resultat_equip_id',  // Si necesitas este campo también
    ];
    
    public function torneig(): BelongsTo
    {
        return $this->belongsTo(Torneig::class);
    }
}
