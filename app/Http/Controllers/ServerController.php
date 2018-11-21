<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\Lineage\LineageMisc;

class ServerController extends Controller
{
    use LineageMisc;

    public function status(Request $request)
    {
        return response()->json(($this->serverStatus()));
    }
}
