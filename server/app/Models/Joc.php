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

    public function modeJocs() { // Nombre correcto debería ser en plural
        return $this->hasMany(ModeJoc::class, 'jocId'); // 'jocId' es la FK en mode_jocs
    }
}
