<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $products = Product::count();
        $categories = Categories::count();
        $orders = Order::count();
        $payments = Payment::count();
        $users = User::count();

        return response()->json([
            'status' => 'success',
            'message' => 'All data retrieved successfully ',
            'data' => [
                "products" => $products,
                "categories" => $categories,
                "orders" => $orders,
                'payments' => $payments,
                'users' => $users,
            ]
        ], 200);
    }
}
