<?php

namespace App\Traits;

use App\User;
use App\GameAuth;
use App\GameAccount;

trait LineageMisc
{
    private $server = '188.228.204.72';
    private $portL = 2104;
    private $portG = 7777;
    private $timeout = 0;

    public function serverStatus()
    {
        return [
            'gameserver' => $this->gameServerStatus(),
            'loginserver' => $this->loginServerStatus(),
            'npcserver' => $this->npcServerStatus()
        ];
    }

    protected function gameServerStatus()
    {
        return 'offline'; //@fsockopen("lineagebrasilclub.ddns.net", 7777, $errno, $errstr, 5) ? 'online' : 'offline';
    }

    protected function loginServerStatus()
    {
        return 'offline'; //@fsockopen("lineagebrasilclub.ddns.net", 2106, $errno, $errstr, 5) ? 'online' : 'offline';
    }

    protected function npcServerStatus()
    {
        return 'offline'; //@fsockopen("lineagebrasilclub.ddns.net", 2002, $errno, $errstr, 5) ? 'online' : 'offline';
    }
}
