<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Joc extends Model
{
    protected $fillable = ['nom', 'categoria', 'plataforma', 'foto'];
    protected $table = 'jocs';

    public function modesDeJoc(): HasMany
    {
        return $this->hasMany(ModeJoc::class);
    }
    public function modeJocs()
{
    return $this->hasMany(ModeJoc::class);
}


}
