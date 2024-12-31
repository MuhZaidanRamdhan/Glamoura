<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ('response success');
});
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// user dapat melakukan pencarian produk
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/search/{name}', [ProductController::class, 'search']);
Route::get('/products/category/{name}', [ProductController::class, 'categories']);

// berdasarkan kategori
Route::get('/categories', [CategoriesController::class, 'index']);
Route::get('/categories/{id}', [CategoriesController::class, 'show']);


// user harus login terlebih dahulu
route::middleware(['auth:sanctum'])->group(function () {
    
    // user dapat memasukan keranjang
    Route::get('/user/carts', [CartController::class, 'showUserCart']);
    Route::post('/carts/create', [CartController::class, 'store']);
    Route::put('/carts/{id}', [CartController::class, 'update']);
    Route::delete('/carts/{id}', [CartController::class, 'destroy']);
    
    // user dapat membuat pesanan
    Route::post('/orders/create', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::get('/user/orders', [OrderController::class, 'getUserOrders']);
    
    // 
    Route::post('/user/payment', [PaymentController::class, 'store']);
    Route::get('/user/payment', [PaymentController::class, 'getUserPayments']);

    // user profile
    Route::get('/user/profile', [UserController::class, 'profile']);
});
// Admin access
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // routing untuk carts
    Route::get('/carts', [CartController::class, 'index']);
    Route::get('/carts/{id}', [CartController::class, 'show']);

    // routing api untuk produk
    Route::post('/products/create', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    
    // routing api untuk kategori
    Route::post('/categories/create', [CategoriesController::class, 'store']);
    Route::put('/categories/{id}', [CategoriesController::class, 'update']);
    Route::delete('/categories/{id}', [CategoriesController::class, 'destroy']);

    // routing api untuk order
    Route::get('/orders', [OrderController::class, 'index']);
    Route::put('/orders/{id}', [OrderController::class, 'update']);
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

    // routing api untuk order detail
    Route::get('/order_details', [OrderDetailController::class, 'index']);
    Route::get('/order_details/{id}', [OrderDetailController::class, 'show']);
    Route::post('/order_details/create', [OrderDetailController::class, 'store']);
    Route::put('/order_details/{id}', [OrderDetailController::class, 'update']);
    Route::delete('/order_details/{id}', [OrderDetailController::class, 'destroy']);

    // routing api untuk user
    Route::get('/users', [UserController::class, 'index']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    
    // routing api untuk payment
    Route::get('/payments', [PaymentController::class, 'index']);
    Route::put('/payments/{id}', [PaymentController::class, 'update']);
    Route::delete('/payments/{id}', [PaymentController::class, 'destroy']);

});