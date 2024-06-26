<?php

namespace App\Traits\Beta;

use App\Models\Lineage\DuplicatedLogin;
use App\Models\Lineage\GameAuth;
use App\Models\Lineage\GameAccount;
use App\Models\Beta\BetaUser;

trait MigrationTool
{

    /**
     * Duplicated Login Checker
     * If has another login, store for log
     * and recover later
     *
     * @param  [BetaUser] $user
     * @return [bool] result
     */
    public function duplicatedLogin(BetaUser $user)
    {
        $hasAuth = GameAuth::where('account', $user->email)->count();
        $hasAccount = GameAccount::where('account', $user->email)->count();

        ($hasAuth + $hasAccount) > 0 ? DuplicatedLogin::create([
            'account_id' => $user->id,
            'login' => $user->email,
            'email' => $user->name,
            'pass' => $user->senha
        ]) : null;

        return ($hasAuth + $hasAccount);
    }

    /**
     * String Adjust
     *
     * @param  [string] $str
     * @param  [integer] $size
     * @return [string] adjusted string
     */
    public function stringAdjust(string $str, int $size)
    {
        return $this->cutString($this->trimLower($str), $size);
    }

    /**
     * Password Adjust
     *
     * @param  [string] $str
     * @param  [integer] $size
     * @return [string] adjusted string
     */
    public function passwordAdjust(string $str, int $size)
    {
        return $this->cutString($this->trim($str), $size);
    }

    /**
     * Trim and Lower string
     *
     * @param  [string] $str
     * @return [string] trimmed string
     */
    public function trimLower(string $str)
    {
        return strtolower(str_replace(' ', '', $str));
    }

    public function trim(string $str)
    {
        return str_replace(' ', '', $str);
    }

    /**
     * String Cut
     *
     * @param  [string] $str
     * @param  [integer] $size
     * @return [string] adjusted string
     */
    public function cutString(string $str, int $size)
    {
        return strlen($str) > $size ? substr($str, 0, ($size - strlen($str))) : $str;
    }
}