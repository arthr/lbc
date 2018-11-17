<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BetaUser extends Model
{
    protected $connection = 'sqlsrv4';
    protected $table = 'accounts';
    public $timestamps = false;

}
