<?php

namespace App\Models\Web;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    protected $fillable = [
        'email', 'token',
    ];
}
