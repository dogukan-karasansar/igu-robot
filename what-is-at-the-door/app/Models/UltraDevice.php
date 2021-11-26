<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UltraDevice extends Model
{
    use HasFactory;

    protected $fillable = ['device', 'is_active', 'sensor_delay'];
}
