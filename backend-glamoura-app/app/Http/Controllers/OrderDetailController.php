<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use Illuminate\Http\Request;

class OrderDetailController extends Controller
{
    public function index()
    {
        $orderDetail = OrderDetail::select('orders.order_code','products.name as product', 'order_details.quantity', 'order_detail.price')
        ->join('orders', 'order_details.order_id', '=', 'orders.id')
        ->join('products', 'order_details.product_id', '=', 'product.id')
        ->orderBy('order_details.id', 'asc')
        ->get();

        if ($orderDetail->isEmpty()) {
            return response()->json([
                'message' => 'No order details available'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Order details retrieved successfully ',
            'data' => $orderDetail
        ], 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'order_id' => 'required|int|min:0',
            'product_id' => 'required|integer|min:0',
            'quantity' => 'required|int|min:0',
            'price' => 'required|numeric|min:0'
        ]);

        $orderdetail = OrderDetail::create($validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'Order data added successfully',
            'data' => $orderdetail
        ], 201);
    }

    public function show(OrderDetail $orderDetail, $id)
    {
        $orderDetail = OrderDetail::select('orders.order_code','products.name as product', 'order_details.quantity', 'order_detail.price')
        ->join('orders', 'order_details.order_id', '=', 'orders.id')
        ->join('products', 'order_details.product_id', '=', 'product.id')
        ->where('order_details.id', '=', $id)
        ->first();

        if (!$orderDetail) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order detail with ' . $id . ' not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Item successfully retrieved',
            'data' => $orderDetail,
        ], 200);
    }

    public function update(Request $request, OrderDetail $orderDetail,$id)
    {
        $orderDetail = OrderDetail::find($id);

        if (!$orderDetail) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order with ' . $id . ' not found',
            ], 404);
        }

        $input = [
            'order_id' => $request->order_id ?? $orderDetail->order_id,
            'product_id' => $request->product_id ?? $orderDetail->product_id,
            'quantity' => $request->quantity ?? $orderDetail->quantity,
            'price' => $request->price ?? $orderDetail->price,
        ];

        $orderDetail->update($input);

        return response()->json([
            'status' => 'success',
            'message' => 'Order detail updated successfully',
            'data' => $orderDetail
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderDetail $orderDetail,$id)
    {
        $orderDetail = OrderDetail::find($id);

        if (!$orderDetail) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order detail with ' . $id . ' not found',
            ], 404);
        }

        $orderDetail->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Order detail data has been successfully deleted',
            'data' => $orderDetail
        ], 200);
    }
}
