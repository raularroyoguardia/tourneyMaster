<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Equip extends Model
{
    protected $fillable = ['nom', 'regio', 'foto_equip', 'descripcio'];
    protected $table = 'equips';


    public function torneigs(): HasMany
    {
        return $this->hasMany(Torneig::class);
    }
    public function usuaris(): HasMany
    {
        return $this->hasMany(Torneig::class);
    }
    
}
