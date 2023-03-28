<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('register',[UserController::class,'Register']);
Route::post('login',[UserController::class,'Login']);
Route::post('addproduct',[ProductController::class,'AddProduct']);
Route::get('showproduct',[ProductController::class,'ShowProducts']);
Route::delete('delete/{id}',[ProductController::class,'DeleteProduct']);
Route::get('getproduct/{id}',[ProductController::class,'GetProduct']);
Route::post('update/{id}',[ProductController::class,'UpdateProduct']);
Route::get('search/{key}',[ProductController::class,'Search']);
