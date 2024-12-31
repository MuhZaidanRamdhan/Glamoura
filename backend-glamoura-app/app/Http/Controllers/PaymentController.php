<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PaymentController extends Controller
{

    public function index()
    {
        $payments = Payment::select('payments.id','users.name as name','orders.order_code', 'payments.payment_method','payments.payment_status','payments.transaction_id','payments.amount')
            ->join('orders', 'payments.order_id', '=', 'orders.id')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->orderBy('payments.id', 'desc')
            ->get();

        if ($payments->isEmpty()) {
            return response()->json([
                'message' => 'No payments available'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Orders retrieved successfully ',
            'data' => $payments
        ], 200);
    }
    // Method untuk membuat pembayaran setelah order dibuat
    public function store(Request $request)
    {
        // Validasi input hanya untuk payment_method, yang harus berisi salah satu dari credit_card, bank_transfer, atau e_wallet
        $validatedData = $request->validate([
            'payment_method' => 'required|in:credit_card,bank_transfer,e_wallet'
        ]);
    
        // Ambil user_id dari pengguna yang sedang login
        $userId = auth()->id();
    
        // Cari data order berdasarkan user_id, dan pastikan status pembayaran adalah pending atau created
        $order = DB::table('orders')
            ->where('user_id', $userId) // Filter berdasarkan user_id pengguna
            ->whereIn('payment_status', ['pending', 'created']) // Status pembayaran harus pending atau created
            ->latest() // Ambil data order terbaru berdasarkan waktu
            ->first(); // Ambil satu data order
    
        // Jika tidak ditemukan order, kembalikan respons error
        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found or already processed', // Pesan error jika tidak ada order yang cocok
            ], 404);
        }
    
        // Cek apakah order sudah memiliki pembayaran
        $existingPayment = DB::table('payments')
            ->where('order_id', $order->id) // Cari pembayaran berdasarkan order_id
            ->first();
    
        // Jika pembayaran sudah ada, kembalikan pesan bahwa pembayaran sudah ada
        if ($existingPayment) {
            return response()->json([
                'status' => 'success',
                'message' => 'Payment already exists for this order', // Pesan bahwa pembayaran sudah dibuat
            ], 400);
        }
    
        // Buat data pembayaran baru di tabel payments
        $paymentId = DB::table('payments')->insertGetId([
            'order_id' => $order->id, // ID order terkait
            'payment_method' => $validatedData['payment_method'], // Metode pembayaran yang dipilih
            'payment_status' => 'pending', // Status pembayaran awalnya pending
            'transaction_id' => 'TXN-' . strtoupper(Str::random(10)), // Buat ID transaksi unik
            'amount' => $order->total_price, // Total harga dari order
            'payment_url' => null, // URL pembayaran (opsional, untuk integrasi payment gateway)
        ]);
    
        // Ambil data pembayaran yang baru saja dibuat untuk dikembalikan dalam respons
        $payment = DB::table('payments')->where('id', $paymentId)->first();
    
        // Kembalikan respons sukses dengan data pembayaran
        return response()->json([
            'status' => 'success', // Status respons
            'message' => 'Payment created successfully', // Pesan sukses
            'data' => $payment, // Data pembayaran yang baru dibuat
        ], 201);
    }
    

    public function update(Request $request, Payment $payment, $id)
    {
        $payments = Payment::find($id);

        if (!$payments) {
            return response()->json([
                'status' => 'error',
                'message' => 'Payments with ' . $id . ' not found',
            ], 404);
        }

        $input = [
            'order_id' => $request->order_id ?? $payments->order_id,
            'payment_method' => $request->payment_method ?? $payments->payment_method,
            'payment_status' => $request->payment_status ?? $payments->payment_status,
            'transaction_id' => $request->transaction_id ?? $payments->transaction_id,
            'amount' => $request->transaction_id ?? $payments->amount,
        ];

        $payments->update($input);

        return response()->json([
            'status' => 'success',
            'message' => 'Payment updated successfully',
            'data' => $payments
        ], 200);
    }


    // Method untuk mendapatkan detail payment berdasarkan order_id
    public function getUserPayments(Request $request)
    {
        // Ambil user_id dari pengguna yang sedang login
        $userId = auth()->id();

        // Ambil semua pembayaran yang terkait dengan user_id
        $payments = DB::table('payments')
            ->join('orders', 'payments.order_id', '=', 'orders.id')
            ->where('orders.user_id', $userId)
            ->select('payments.*', 'orders.order_code', 'orders.total_price', 'orders.shipping_address')
            ->get();

        // Jika tidak ada pembayaran ditemukan
        if ($payments->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Payment not found', 
            ], 404);
        }

        // Jika ada pembayaran ditemukan, tampilkan data pembayaran
        return response()->json([
            'status' => 'success',
            'message' => 'Payments found for user',
            'data' => $payments,
        ], 200);
    }

    public function destroy(Payment $payment, $id)
    {
        $payments = Payment::find($id);

        if (!$payments) {
            return response()->json([
                'status' => 'error',
                'message' => 'Payment with ' . $id . ' not found',
            ], 404);
        }

        $payments->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Payment data has been successfully deleted',
            'data' => $payments
        ], 200);
    }



}

