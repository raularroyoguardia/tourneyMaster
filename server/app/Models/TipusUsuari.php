<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TipusUsuari extends Model
{
    protected $fillable = ['tipus', 'permisos'];
    protected $table = 'tipus_usuaris';

    public function equip(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
