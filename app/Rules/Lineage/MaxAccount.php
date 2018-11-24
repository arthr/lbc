<?php

namespace App\Rules\Lineage;

use Illuminate\Http\Request;
use Illuminate\Contracts\Validation\Rule;

class MaxAccount implements Rule
{
    private $user;
    private $max;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(Request $request, int $maxAccounts)
    {
        $this->user = $request->user();
        $this->max = $maxAccounts;
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
        $user = $this->user->with('gameAccount')->first();
        return $user->gameAccount->count() < $this->max;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return "N&atilde;o &eacute; permitido criar mais do que {$this->max} contas por Jogador.";
    }
}
