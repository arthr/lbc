<?php

namespace App\Models\Lineage;

use Illuminate\Database\Eloquent\Model;
use App\Models\Lineage\GameAccount;

class GameCharacter extends Model
{
    protected $connection = 'sqlsrv3';
    protected $table = 'user_data';
    public $timestamps = false;

    protected $guarded = [
        'char_id', 'account_name', 'account_id'
    ];

    protected $fillable = [
        'char_name', 'pledge_id', 'builder',
        'gender', 'race', 'class', 'world',
        'xloc', 'yloc', 'zloc', 'IsInVehicle',
        'HP', 'MP', 'SP', 'Exp', 'Lev',
        'align', 'PK', 'PKpardon', 'Duel'
    ];

    protected $visible = [
        'char_name', 'char_id', 'pledge_id',
        'gender', 'race', 'class',
        'xloc', 'yloc', 'zloc',
        'HP', 'MP', 'SP',
        'Exp', 'Lev', 'cp',
        'PK', 'Duel', 'subjob0_class',
        'subjob1_class', 'subjob2_class', 'subjob3_class',
        'create_date', 'login', 'logout',
        'use_time', 'temp_delete_date', 'subjob_id',
        'ssq_dawn_round', 'wedding', 'TitleColor',
        'WeddingTelTime', 'souls'
    ];

    public function gameAccount()
    {
        return $this->belongsTo(GameAccount::class, 'account_id', 'uid');
    }

}
