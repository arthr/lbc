<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\LineageMisc;

class ServerController extends Controller
{
    use LineageMisc;

    public function serverStatus(Request $request)
    {
        return $this->loginServer();
    }
}
