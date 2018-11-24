<?php

namespace App\Traits\Lineage;

use App\Models\Web\User;
use App\Models\Lineage\GameAuth;
use App\Models\Lineage\GameAccount;
use Illuminate\Http\Request;
use App\Notifications\SignupActivate;
use App\Traits\Lineage\LineagePassword;
use League\Flysystem\Exception;
use Illuminate\Support\Facades\DB;

trait LineageRegister
{
    use LineagePassword;

    public function createAccount(Request $request, bool $notify)
    {
        $request->validate([
            'name' => 'required|string',
            'login' => 'required|string|unique:users|min:4|max:14|regex:/^([a-zA-Z0-9]*)$/i',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:4|max:14|confirmed|regex:/^((?=.*[A-Za-z])(?=.*\d)[A-Za-z\d[:graph:]]*)$/i',
        ]);

        $user = $this->createWebAccount($request);
        $gameAuth = $this->createGameAuth($request);
        $gameAccount = $this->createGameAccount($request, $user->id);

        $notify ? $user->notify(new SignupActivate($user)) : null;

        return $user;
    }

    protected function createWebAccount(Request $request)
    {
        $user = new User([
            'name' => $request->name,
            'login' => $request->login,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'activation_token' => str_random(60)
        ]);
        $user->save();
        return $user;
    }

    protected function createGameAuth(Request $request)
    {
        try {
            $userAuth = DB::connection('sqlsrv2')->insert(
                'insert into user_auth (account, password, quiz1, quiz2, answer1, answer2) 
                 values (\'' . $request->login . '\', CONVERT(BINARY(16), ' . $this->encrypt($request->password) . '), \'\', \'\', CONVERT(BINARY(16), ' . $this->encrypt('answer') . '), CONVERT(BINARY(16), ' . $this->encrypt('answer') . '))'
            );
            return $userAuth;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    protected function createGameAccount(Request $request, int $userId)
    {
        $userAccount = new GameAccount([
            'account' => $request->login,
            'user_id' => $userId
        ]);

        $userAccount->save();
        return $userAccount;
    }
}