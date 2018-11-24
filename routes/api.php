<?php

use Illuminate\Http\Request;

Route::group(['prefix' => 'abc', 'middleware' => 'cors'], function () {
    Route::post('test', function () {
        return 'test';
    });
    Route::post('signup', 'AuthController@signup');
});

Route::group(['prefix' => 'server'], function () {
    Route::get('status', 'ServerController@status');
    Route::get('announce', 'ServerController@announce');
    Route::get('nobless', 'ServerController@setNobless');
    Route::get('pmannounce', 'ServerController@pmAnnounce');
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::get('signup/activate/{token}', 'AuthController@signupActivate');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
        Route::post('change-password', 'AuthController@changePassword');
    });
});

Route::group(['middleware' => 'api', 'prefix' => 'password'], function () {
    Route::post('create', 'PasswordResetController@create');
    Route::get('find/{token}', 'PasswordResetController@find');
    Route::post('reset', 'PasswordResetController@reset');
});

Route::group(['prefix' => 'account', 'middleware' => 'auth:api'], function () {
    Route::get('details', 'AccountController@details');
    Route::post('create', 'AccountController@create');
});