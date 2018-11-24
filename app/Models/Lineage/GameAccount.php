<?php

namespace App\Models\Lineage;

use Illuminate\Database\Eloquent\Model;
use App\Models\Web\User;
use App\Models\Lineage\GameAuth;
use App\Models\Lineage\GameCharacter;

class GameAccount extends Model
{
    protected $connection = 'sqlsrv2';
    protected $table = 'user_account';
    public $timestamps = false;
    protected $primaryKey = 'account';
    public $incrementing = false;
    public $keyType = 'string';

    protected $dates = [
        'block_end_date', 'last_login', 'last_logout',
    ];

    protected $guarded = [
        'account'
    ];

    protected $fillable = [
        'account', 'pay_stat', 'login_flag',
        'warn_flag', 'block_flag', 'block_flag2',
        'block_end_date', 'last_login', 'last_logou',
        'subscription_flag', 'last_world', 'user_id'
    ];

    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = [
        'account', 'pay_stat', 'last_login',
        'last_logout', 'last_ip', 'user_id',
        'characters', 'GameAuth'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function gameAuth()
    {
        return $this->hasOne(GameAuth::class, 'account', 'account');
    }

    public function characters()
    {
        return $this->hasMany(GameCharacter::class, 'account_id', 'uid');
    }
}
