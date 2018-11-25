<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Notifications\PasswordResetRequest;
use App\Notifications\PasswordResetSuccess;
use App\Models\Web\User;
use App\Models\Web\PasswordReset;

class PasswordResetController extends Controller
{
    /**
     * Create token password reset
     *
     * @param  [string] email
     * @return [string] message
     */
    public function create(Request $request)
    {
        // $request->validate([
        //     'email' => 'required|string|email',
        // ]);

        // $user = User::where('email', $request->email)->first();

        // if (!$user) {
        //     return response()->json([
        //         'message' => 'Endereço de email não encontrado.',
        //     ], 404);
        // }

        // $passwordReset = PasswordReset::updateOrCreate(
        //     [
        //         'email' => $user->email
        //     ],
        //     [
        //         'email' => $user->email,
        //         'token' => str_random(60)
        //     ]
        // );

        // if ($user && $passwordReset)
        //     $user->notify(
        //     new PasswordResetRequest($passwordReset->token)
        // );
        sleep(2);
        return response()->json([
            'message' => 'Um link de recuperação de senha foi enviado para o seu email.'
        ]);
    }

    /**
     * Find token password reset
     *
     * @param  [string] $token
     * @return [string] message
     * @return [json] passwordReset object
     */
    public function find($token)
    {
        $passwordReset = PasswordReset::where('token', $token)
            ->first();

        if (!$passwordReset)
            return response()->json([
            'message' => 'Token para recuperar senha inválido.'
        ], 404);

        if (Carbon::parse($passwordReset->updated_at)->addMinutes(720)->isPast()) {
            $passwordReset->delete();
            return response()->json([
                'message' => 'Token para recuperar senha inválido.'
            ], 404);
        }
        return response()->json($passwordReset);
    }
    /**
     * Reset password
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @param  [string] token
     * @return [string] message
     * @return [json] user object
     */
    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:4|max:14|confirmed|regex:/^((?=.*[A-Za-z])(?=.*\d)[A-Za-z\d[:graph:]]*)$/i',
            'token' => 'required|string'
        ]);

        $passwordReset = PasswordReset::where([
            ['token', $request->token],
            ['email', $request->email]
        ])->first();

        if (!$passwordReset)
            return response()->json([
            'message' => 'Token para recuperar senha inválido.'
        ], 404);

        $user = User::where('email', $passwordReset->email)->first();

        if (!$user)
            return response()->json([
            'message' => 'Não encontramos nenhum usuário associado a esse email.'
        ], 404);

        $user->password = bcrypt($request->password);
        $user->save();

        $passwordReset->delete();

        $user->notify(new PasswordResetSuccess($passwordReset));

        return response()->json($user);
    }
}
