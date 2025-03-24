<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TipusUsuari extends Model
{
    protected $fillable = ['tipus', 'permisos'];

    public function equip(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
