<?php

use Illuminate\Http\Request;

Route::group(['prefix' => 'abc', 'middleware' => 'cors'], function () {
    Route::post('test', function () {
        return 'test';
    });
    Route::post('signup', 'AuthController@signup');
});


Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::get('signup/activate/{token}', 'AuthController@signupActivate');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('changepass', 'AccountController@changepass');
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::group(['middleware' => 'api', 'prefix' => 'password'], function () {
    Route::post('create', 'PasswordResetController@create');
    Route::get('find/{token}', 'PasswordResetController@find');
    Route::post('reset', 'PasswordResetController@reset');
});

Route::group(['prefix' => 'account', 'middleware' => 'auth:api'], function () {
    Route::get('details', 'AccountController@details');
});