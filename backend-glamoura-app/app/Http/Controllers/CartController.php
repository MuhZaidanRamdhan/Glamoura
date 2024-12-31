<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use DB;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $cart = Cart::select('products.image as image', 'users.name as name', 'products.name as product', 'carts.quantity')
            ->join('users', 'carts.user_id', '=', 'users.id')
            ->join('products', 'carts.product_id', '=', 'products.id')
            ->orderBy('carts.id', 'asc')
            ->get();

        if ($cart->isEmpty()) {
            return response()->json([
                'message' => 'No Cart available'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Cart retrieved successfully ',
            'data' => $cart
        ], 200);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|integer',
            'quantity' => 'required|integer|min:1'
        ]);

        $userId = auth()->id();
        $validatedData['user_id'] = $userId;

        // Periksa stok produk
        $product = Product::find($validatedData['product_id']);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found',
            ], 404);
        }

        if ($product->stock <= 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'The product is out of stock',
            ], 400);
        }

        if ($validatedData['quantity'] > $product->stock) {
            return response()->json([
                'status' => 'error',
                'message' => 'Requested quantity exceeds available stock',
            ], 400);
        }

        // Tambahkan ke keranjang
        $cart = Cart::create($validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'Cart data added successfully',
            'data' => $cart
        ], 201);
    }


    public function show(Cart $cart, $id)
    {
        $cart = Cart::select('products.image as image', 'users.name as name', 'products.name as product', 'carts.quantity')
            ->join('users', 'carts.user_id', '=', 'users.id')
            ->join('products', 'carts.product_id', '=', 'products.id')
            ->where('carts.id', '=', $id)
            ->first();

        if (!$cart) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cart with ' . $id . ' not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Item successfully retrieved with id ' . $id,
            'data' => $cart,
        ], 200);
    }

    public function showUserCart()
    {
        // **1. Dapatkan ID Pengguna:**

        $currentUserId = auth()->user()->id; // Dapatkan ID pengguna yang sedang login

        // **2. Ambil Data Item Keranjang:**

        $cartItems = Cart::select('carts.id', 'products.image as image', 'products.name as product', 'carts.quantity', 'products.price', DB::raw('carts.quantity * products.price as product_price'))
            ->join('products', 'carts.product_id', '=', 'products.id')
            ->where('carts.user_id', '=', $currentUserId)
            ->get();

        // **3. Periksa Keranjang Kosong:**

        if ($cartItems->isEmpty()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Keranjang Anda kosong.'
            ], 200); // Kirim response sukses dengan pesan keranjang kosong
        }

        // **4. Hitung Total Harga Keranjang:**

        $totalCartPrice = $cartItems->sum('product_price'); // Hitung total harga semua item di keranjang

        // **5. Respon Sukses dengan Data Keranjang:**

        return response()->json([
            'status' => 'success',
            'message' => 'Daftar item keranjang berhasil diambil',
            'data' => [
                'items' => $cartItems, // Daftar item di keranjang
                'total_price' => $totalCartPrice, // Total harga keranjang
            ],
        ], 200); // Kirim response sukses dengan data keranjang
    }


    public function update(Request $request, $id)
    {

        // Cari cart berdasarkan ID
        $cart = Cart::find($id);

        // Jika cart tidak ditemukan
        if (!$cart) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cart with ID ' . $id . ' not found',
            ], 404);
        }

        // Dapatkan user yang sedang login
        $currentUser = auth()->user();

        // Periksa apakah user yang login adalah pemilik cart
        if ($cart->user_id !== $currentUser->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not authorized to update this cart.',
            ], 403);
        }

        // Validasi input
        $validatedData = $request->validate([
            'product_id' => 'integer|exists:products,id',
            'quantity' => 'integer|min:1',
        ]);

        // Update cart hanya dengan input yang diberikan
        $cart->update($validatedData);

        // Berikan respon sukses
        return response()->json([
            'status' => 'success',
            'message' => 'Cart updated successfully'
        ], 200);
    }

    public function destroy(Cart $cart, $id)
    {
        $cart = Cart::find($id);

        if (!$cart) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cart with ' . $id . ' not found',
            ], 404);
        }

        // Dapatkan user yang sedang login
        $currentUser = auth()->user();

        // Periksa apakah user yang login adalah pemilik cart
        if ($cart->user_id !== $currentUser->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not authorized to delete this cart.',
            ], 403);
        }

        $cart->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Cart data has been successfully deleted',
        ], 200);
    }
}
