<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Premi extends Model
{
    protected $fillable = ['tipus', 'valor'];
    protected $table = 'premis';

    public function torneig(): BelongsTo
    {
        return $this->belongsTo(Torneig::class);
    }
}
