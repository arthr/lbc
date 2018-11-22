<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\Lineage\LineageMisc;
use App\Traits\Lineage\LineageCacheD;

class ServerController extends Controller
{
    use LineageMisc, LineageCacheD;

    public function status()
    {
        return response()->json(($this->serverStatus()));
    }

    public function announce()
    {
        return $this->setInstantAnnouncePacket('Teste de Announce Web');
    }

    public function setNobless()
    {
        return $this->setNobless("3");
    }

    public function pmAnnounce()
    {
        $this->sendPrivateAnnouncePacket(3, 'Teste de PM Announce');
    }
}
