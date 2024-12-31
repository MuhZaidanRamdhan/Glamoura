<?php

namespace App\Http\Controllers;

use App\Models\Order;
use DB;
use Illuminate\Http\Request;
use Str;

class OrderController extends Controller
{
    public function index()
    {
        $order = Order::select('orders.id', 'orders.order_code', 'users.name as name', 'orders.total_price', 'orders.payment_status', 'orders.shipping_address')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->orderBy('orders.id', 'desc')
            ->get();

        if ($order->isEmpty()) {
            return response()->json([
                'message' => 'No orders available'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Orders retrieved successfully ',
            'data' => $order
        ], 200);
    }

    public function store(Request $request)
    {
        // Validasi input, memastikan alamat pengiriman diisi dan berupa string
        $validatedData = $request->validate([
            'shipping_address' => 'required|string'
        ]);

        // Mendapatkan ID pengguna yang sedang login
        $userId = auth()->id();

        // Mengambil data keranjang milik pengguna yang sedang login
        $cartItems = DB::table('carts')
            ->join('products', 'carts.product_id', '=', 'products.id') // Menggabungkan tabel carts dengan tabel products
            ->where('carts.user_id', $userId) // Hanya mengambil data untuk pengguna saat ini
            ->select('carts.product_id', 'carts.quantity', 'products.price', 'products.stock') // Memilih kolom yang diperlukan
            ->get();

        // Jika keranjang kosong, kembalikan respons error
        if ($cartItems->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cart is empty, cannot create order',
            ], 400);
        }

        // Menghitung total harga dari semua item dalam keranjang
        $totalPrice = $cartItems->sum(function ($item) {
            return $item->quantity * $item->price; // Harga total per produk = kuantitas * harga
        });

        // Membuat kode order yang unik
        $orderCode = 'ORD-' . strtoupper(Str::random(10));

        // Memulai transaksi database untuk memastikan semua operasi berhasil atau rollback jika ada kesalahan
        DB::beginTransaction();

        try {
            // Menambahkan data order ke tabel orders dan mendapatkan ID order baru
            $order = DB::table('orders')->insertGetId([
                'user_id' => $userId, // ID pengguna
                'order_code' => $orderCode, // Kode order unik
                'total_price' => $totalPrice, // Total harga
                'shipping_address' => $validatedData['shipping_address'], // Alamat pengiriman
                'payment_status' => 'pending' // Status pembayaran default
            ]);

            // Menambahkan data ke tabel order_details untuk setiap item dalam keranjang
            $orderDetails = $cartItems->map(function ($item) use ($order) {
                return [
                    'order_id' => $order, // ID order
                    'product_id' => $item->product_id, // ID produk
                    'quantity' => $item->quantity, // Kuantitas produk
                    'price' => $item->price, // Harga produk
                ];
            })->toArray();

            DB::table('order_details')->insert($orderDetails);

            // Mengurangi stok produk sesuai dengan jumlah yang dipesan
            foreach ($cartItems as $item) {
                // Jika stok tidak mencukupi, lempar exception
                if ($item->stock < $item->quantity) {
                    throw new \Exception("Insufficient stock for product ID: {$item->product_id}");
                }

                // Mengurangi stok produk di tabel products
                DB::table('products')
                    ->where('id', $item->product_id) // Berdasarkan ID produk
                    ->decrement('stock', $item->quantity); // Mengurangi stok
            }

            // Menghapus semua item dari keranjang pengguna setelah checkout berhasil
            DB::table('carts')->where('user_id', $userId)->delete();

            // Komit transaksi jika semua operasi berhasil
            DB::commit();

            // Mengembalikan respons sukses dengan data order
            return response()->json([
                'status' => 'success',
                'message' => 'Order created successfully',
                'data' => [
                    'order_id' => $order, // ID order
                    'order_code' => $orderCode, // Kode order
                    'total_price' => $totalPrice, // Total harga
                    'order_details' => $orderDetails, // Detail order
                ],
            ], 201);
        } catch (\Exception $e) {
            // Rollback transaksi jika terjadi kesalahan
            DB::rollBack();

            // Mengembalikan respons error dengan pesan kesalahan
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }



    public function getUserOrders()
{
    // Ambil user_id dari pengguna yang sedang login
    $userId = auth()->id();

    // Ambil data order untuk pengguna yang sedang login
    $orders = DB::table('orders')
        ->join('order_details', 'orders.id', '=', 'order_details.order_id') // Gabungkan tabel orders dengan order_details
        ->join('products', 'order_details.product_id', '=', 'products.id') // Gabungkan tabel order_details dengan products
        ->where('orders.user_id', $userId) // Filter berdasarkan user_id dari pengguna yang sedang login
        ->select(
            'orders.id as order_id', // Ambil ID order
            'orders.order_code', // Ambil kode order
            'orders.total_price', // Ambil total harga order
            'orders.shipping_address', // Ambil alamat pengiriman
            'orders.payment_status', // Ambil status pembayaran
            'order_details.quantity', // Ambil kuantitas produk dalam order
            'order_details.price', // Ambil harga produk dalam order
            'products.name as product_name' // Ambil nama produk
        )
        ->get()
        ->groupBy('order_id'); // Mengelompokkan data berdasarkan order_id

    // Jika tidak ada data order, kembalikan respons error
    if ($orders->isEmpty()) {
        return response()->json([
            'status' => 'error',
            'message' => 'No orders found for the logged-in user', // Pesan kesalahan jika tidak ada order ditemukan
        ], 404);
    }

    // Format data untuk dikembalikan dalam bentuk yang lebih terstruktur
    $formattedOrders = $orders->map(function ($orderDetails) {
        return [
            'order_code' => $orderDetails[0]->order_code, // Kode order
            'total_price' => $orderDetails[0]->total_price, // Total harga order
            'shipping_address' => $orderDetails[0]->shipping_address, // Alamat pengiriman
            'payment_status' => $orderDetails[0]->payment_status, // Status pembayaran
            'order_details' => $orderDetails->map(function ($detail) {
                // Format detail produk dalam order
                return [
                    'product_name' => $detail->product_name, // Nama produk
                    'quantity' => $detail->quantity, // Kuantitas produk
                    'price' => $detail->price, // Harga produk
                ];
            })
        ];
    });

    // Kembalikan respons sukses dengan data yang sudah diformat
    return response()->json([
        'status' => 'success', // Status respons
        'message' => 'Orders retrieved successfully', // Pesan sukses
        'data' => $formattedOrders, // Data order yang diformat
    ], 200);
}


    public function show(Order $order, $id)
    {
        // Ambil data order tanpa dengan user
        $order = Order::select('orders.order_code', 'users.name as name', 'orders.total_price', 'orders.payment_status', 'orders.shipping_address')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->where('orders.id', '=', $id)
            ->first();

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order with ID ' . $id . ' not found',
            ], 404);
        }

        // Ambil data order_details yang terkait dengan order ini
        $orderDetails = DB::table('order_details')
            ->join('products', 'order_details.product_id', '=', 'products.id')
            ->where('order_details.order_id', $id)
            ->select(
                'order_details.id',
                'products.image as image',
                'products.name as product_name',
                'order_details.quantity',
                'order_details.price'
            )
            ->get();

        // Format respons JSON sesuai kebutuhan
        return response()->json([
            'status' => 'success',
            'message' => 'Order successfully retrieved',
            'data' => [
                'name' => $order->name,
                'order_code' => $order->order_code,
                'total_price' => number_format($order->total_price, 2), // Format harga menjadi 2 desimal
                'shipping_address' => $order->shipping_address,
                'payment_status' => $order->payment_status,
                'order_details' => $orderDetails->map(function ($detail) {
                    return [
                        'id' => $detail->id,
                        'image' => $detail->image,
                        'product_name' => $detail->product_name,
                        'quantity' => $detail->quantity,
                        'price' => number_format($detail->price, 2), // Format harga menjadi 2 desimal
                    ];
                }),
            ],
        ], 200);
    }


    public function update(Request $request, Order $order, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order with ' . $id . ' not found',
            ], 404);
        }

        $input = [
            'order_code' => $request->code ?? $order->order_code,
            'user_id' => $request->user_id ?? $order->user_id,
            'total_price' => $request->total_price ?? $order->total_price,
            'payment_status' => $request->payment_status ?? $order->payment_status,
            'shipping_address' => $request->shipping_address ?? $order->shipping_address
        ];

        $order->update($input);

        return response()->json([
            'status' => 'success',
            'message' => 'Order updated successfully',
            'data' => $order
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order with ' . $id . ' not found',
            ], 404);
        }

        $order->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Order data has been successfully deleted',
            'data' => $order
        ], 200);
    }
}
