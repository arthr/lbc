<?php

Route::get('/', function () {
    return view('home');
});

Route::get('status', 'ServerController@status');
Route::get('migratebeta/{exe?}', 'ToolsController@migrateBetaAccounts');
Route::get('migrateacc/{login}', 'ToolsController@migrateBetaAccount');
Route::get('changepass/{email}', 'ToolsController@changePass');