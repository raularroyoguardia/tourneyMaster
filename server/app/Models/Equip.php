<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Equip extends Model
{
    protected $fillable = ['nom', 'regio', 'foto_equip', 'descripcio', 'trofeus'];
    protected $table = 'equips';
    protected $casts = [
        'maxim_integrants' => 'integer',
        'trofeus' => 'integer',
    ];
    public function torneigs(): HasMany
    {
        return $this->hasMany(Torneig::class);
    }
    public function torneig()
{
    return $this->belongsToMany(Torneig::class, 'torneig_equip');
}

    public function usuaris(): HasMany
    {   
        return $this->hasMany(User::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'equips_users', 'equip_id', 'user_id');
    }
}
