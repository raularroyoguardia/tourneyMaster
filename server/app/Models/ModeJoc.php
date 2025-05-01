<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

use Illuminate\Database\Eloquent\Model;

class ModeJoc extends Model
{
    protected $fillable = ['nom', 'descripcio', 'jugadors', 'jocId'];
    protected $table = 'mode_jocs';

    public function joc(): BelongsTo
    {
        return $this->belongsTo(Joc::class, 'jocId');
    }

    public function torneig(): BelongsTo
    {
        return $this->belongsTo(Torneig::class);
    }

    // public function mapas(): HasMany {
    //     return $this->hasMany(Mapa::class);
    // }
    public function mapas() {
        return $this->belongsToMany(Mapa::class, 'mapas_modes', 'mode_joc_id', 'mapa_id');
    }
}
