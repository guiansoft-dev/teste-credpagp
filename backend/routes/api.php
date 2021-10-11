<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UrlController;
use App\Http\Controllers\AuthController;

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

Route::post('/register', [UserController::class, 'register']); // Singup URL 

Route::post('/reactlogin', [UserController::class, 'login']); // lOGIN url

Route::get("urls", [UrlController::class, 'index']);

Route::post("create-url", [UrlController::class, 'store']);

Route::get("url/{id}", [UrlController::class, 'show']);

Route::put("update-url", [UrlController::class, 'update']);

Route::delete("url/{id}", [UrlController::class, 'destroy']);

Route::put("status", [UrlController::class, 'send']);


