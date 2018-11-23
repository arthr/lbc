<?php

namespace App\Models\Lineage;

use Illuminate\Database\Eloquent\Model;
use App\Models\Lineage\GameAccount;

class GameAuth extends Model
{
    protected $connection = 'sqlsrv2';
    protected $table = 'user_auth';
    public $timestamps = false;
    protected $primaryKey = 'account';
    public $incrementing = false;
    public $keyType = 'string';

    protected $guarded = [
        'account'
    ];

    protected $fillable = [
        'password', 'quiz1', 'quiz2',
        'answer1', 'answer2', 'ipcreafrom',
        'createdate'
    ];

    protected $visible = [
        'account', 'password', 'createdate'
    ];

    public function gameAccount()
    {
        return $this->belongsTo(GameAccount::class, 'account', 'account');
    }
}
