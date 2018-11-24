<?php

namespace App\Rules\Lineage;

use Illuminate\Http\Request;
use Illuminate\Contracts\Validation\Rule;
use App\Models\Lineage\GameAccount;

class UniqueAccount implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $exist = GameAccount::where('account', $value)->get()->count();
        return ($exist == 0);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'O login j&aacute; est&aacute; em uso.';
    }
}
