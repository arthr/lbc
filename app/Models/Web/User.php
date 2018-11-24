<?php

namespace App\Models\Web;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Lineage\GameAccount;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens, SoftDeletes;

    protected $dates = ['deleted_at', 'email_verified_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'login',
        'password', 'active', 'activation_token',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'activation_token',
    ];

    protected $appends = [
        'last_login',
    ];

    public function gameAccount()
    {
        return $this->hasMany(GameAccount::class);
    }

    public function getLastLoginAttribute()
    {
        $lastLogin = $this->gameAccount()->orderBy('last_login', 'DESC')->first()->last_login;
        return $lastLogin->format('Y-m-d H:i:s.v');
    }
}
