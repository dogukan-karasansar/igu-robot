<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Project_Products;
use App\Http\Controllers\SensorController;
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



Route::prefix('v1')->group(function () {
    Route::post('/login', [AuthController::class, 'Login']);
    Route::post('/register', [AuthController::class, 'Register']);
    Route::resource('/project-product', Project_Products::class);
    Route::resource('/sensor', SensorController::class);
});


/* Route::middleware('auth:api')->group(function () {

}); */


