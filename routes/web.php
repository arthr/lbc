<?php

Route::get('/', function () {
    return view('home');
});

Route::get('server/status', 'ServerController@serverStatus');

Route::get('migratebeta/{exe?}', 'ToolsController@migrateBetaAccounts');
Route::get('migrateacc/{login}', 'ToolsController@migrateBetaAccount');