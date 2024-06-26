<?php

namespace App\Traits\Lineage;

use App\Models\Web\User;
use App\Models\Lineage\GameAuth;
use App\Models\Lineage\GameAccount;

trait LineageMisc
{

    private $dns;
    private $lsport;
    private $gsport;
    private $timeout;

    public function __construct()
    {
        $this->dns = env('DNS');
        $this->lsport = env('LS_PORT');
        $this->gsport = env('GS_PORT');
        $this->timeout = 1;
    }

    public function serverStatus()
    {
        return [
            'loginserver' => $this->loginServerStatus(),
            'gameserver' => $this->gameServerStatus(),
        ];
    }

    protected function gameServerStatus()
    {
        return $this->sockStatus($this->dns, $this->gsport, $this->timeout);
    }

    protected function loginServerStatus()
    {
        return $this->sockStatus($this->dns, $this->lsport, $this->timeout);
    }

    private function sockStatus(string $address, int $port, int $timeout)
    {
        try {
            $sock = @fsockopen($address, $port, $errno, $errstr, $timeout);

            if ($sock) {
                fclose($sock);
                return true;
            }

            return false;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
}
