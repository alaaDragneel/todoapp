<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
  return view('auth.login');
});

Route::auth();

Route::resource('/todolists', 'TodoListsController');
// nested resource controller check the Route:list
Route::resource('/todolists.tasks', 'TasksController', [
  'only' => [ 'store', 'update', 'destroy']
]);
