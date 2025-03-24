<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Premi extends Model
{
    protected $fillable = ['tipus', 'valor'];

    public function torneig(): BelongsTo
    {
        return $this->belongsTo(Torneig::class);
    }
}
