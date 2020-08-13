<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('products', 'API\ProductsController@index');
Route::get('products/{product}', 'API\ProductsController@show');
Route::post('products', 'API\ProductsController@store');
Route::put('products/{product}', 'API\ProductsController@update');
Route::delete('products/{product}', 'API\ProductsController@delete');

Route::get('orders', 'API\OrdersController@index');
Route::get('orders/{order}', 'API\OrdersController@show');
Route::post('orders', 'API\OrdersController@store');
Route::put('orders/{order}', 'API\OrdersController@update');
Route::delete('orders/{order}', 'API\OrdersController@delete');

Route::post('quotations', 'API\QuotationsController@quotation');
