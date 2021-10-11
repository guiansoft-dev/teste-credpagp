<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class url extends Model
{
    protected $fillable = [
        "url", "status_code", "created_at", "updated_at"
    ];
}
