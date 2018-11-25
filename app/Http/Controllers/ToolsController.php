<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Beta\BetaUser;
use App\Traits\Lineage\LineagePassword;
use App\Traits\Beta\MigrationTool;
use App\Models\Lineage\GameAccount;
use App\Models\Lineage\GameAuth;
use App\Models\Web\User;

class ToolsController extends Controller
{
    use MigrationTool;
    use LineagePassword;

    public function changePass(Request $request)
    {
        $user = User::all();
        dd($user);
    }

    public function migrateBetaAccounts(Request $request)
    {
        if ($request->exe) {
            ini_set('max_execution_time', 30000);
            $users = BetaUser::all()->groupBy('name');

            foreach ($users as $user) {
                $this->saveUser($user[0]);
            }
        }
    }

    public function migrateBetaAccount(Request $request)
    {
        if ($request->login) {
            ini_set('max_execution_time', 3000);
            $users = BetaUser::where('email', 'LIKE', '%' . $request->login . '%')->get();

            dd($users);

            // foreach ($users as $user) {
            //     $this->saveUser($user[0]);
            // }

            //return view('home');
        }
    }

    protected function saveUser($user)
    {
        try {
            /**
             * Os parametros estão com seus offsets invertidos 
             * por erro no formulário do Beta Subscribe
             */
            $login = $this->stringAdjust($user->email, 14);
            $email = $user->name;
            $pass = $this->passwordAdjust($user->senha, 14);

            if (!$this->duplicatedLogin($user)) {
                # user_auth
                $userAuth = DB::connection('sqlsrv2')->insert(
                    'insert into user_auth (account, password, quiz1, quiz2, answer1, answer2) values (\'' . $login . '\', CONVERT(BINARY(16), ' . $this->encrypt($pass) . '), \'\', \'\', CONVERT(BINARY(16), ' . $this->encrypt('answer') . '), CONVERT(BINARY(16), ' . $this->encrypt('answer') . '))'
                );

                if ($userAuth) {
                # users [web]
                    $userWeb = new User([
                        'name' => $login,
                        'login' => $login,
                        'email' => $email,
                        'password' => bcrypt($pass),
                        'activation_token' => str_random(60)
                    ]);
                    $userWeb->save();

                # user_account
                    $userAccount = new GameAccount([
                        'account' => $login,
                        'user_id' => $userWeb->id
                    ]);

                    $userAccount->save();


                    echo '# user id: ' . $userWeb->id . '<br>';
                }
            } else {
                echo '# duplicated user id: ' . $user->id . ' / user login: ' . $user->email . '<br>';
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage);
        }

    }
}
