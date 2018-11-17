<?php

Route::get('/', function () {
    return view('home');
});

Route::get('migratebeta/{exe?}', 'ToolsController@migrateBetaAccounts');
Route::get('migrateacc/{login}', 'ToolsController@migrateBetaAccount');