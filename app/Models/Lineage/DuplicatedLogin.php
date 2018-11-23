<?php

namespace App\Models\Lineage;

use Illuminate\Database\Eloquent\Model;

class DuplicatedLogin extends Model
{
    protected $connection = 'sqlsrv4';
    protected $table = 'duplicated_logins';
    public $timestamps = false;

    protected $fillable = [
        'account_id', 'login', 'email', 'pass'
    ];
}
