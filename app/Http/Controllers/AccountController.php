<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\Web\User;
use App\Models\Lineage\GameAccount;
use App\Traits\Lineage\LineageRegister;

class AccountController extends Controller
{

    use LineageRegister;

    /**
     * Create User Game Account
     *
     * @return [json] game-account object
     */
    public function create(Request $request)
    {
        $this->createSingleGameAccount($request);
        return response()->json([
            'message' => 'Conta criada com sucesso!'
        ], 201);
    }

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
