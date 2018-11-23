<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Web\User;

class AccountController extends Controller
{
    /**
     * Get the User Game Account details
     *
     * @return [json] user object
     */
    public function details(Request $request)
    {
        return response()->json($request->user()->load('gameAccount', 'gameAccount.GameAuth'));
    }

}
