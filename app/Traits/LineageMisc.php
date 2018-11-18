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

    public function gameServer()
    {
        return @fsockopen("lineagebrasilclub.ddns.net", 7777, $errno, $errstr, 30) ? 'online' : 'offline';
    }

    public function loginServer()
    {
        return @fsockopen("lineagebrasilclub.ddns.net", 2106, $errno, $errstr, 30) ? 'online' : 'offline';
    }

}
