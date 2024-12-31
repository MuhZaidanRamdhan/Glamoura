<?php

namespace App\Http\Controllers;

use App\Models\Product;
use DB;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::select('products.id', 'products.code', 'products.name', 'categories.name as categories', 'products.description', 'products.price', 'products.stock', 'products.image')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->orderBy('products.id', 'asc')
            ->get();

        if ($products->isEmpty()) {
            return response()->json([
                'message' => 'No products available'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Products retrieved successfully ',
            'data' => $products
        ], 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'code' => 'required|string|max:50|unique:products',
            'name' => 'required|string|max:100',
            'category_id' => 'required|integer|exists:categories,id',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable',
        ]);

        $products = Product::create($validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'Product data added successfully',
            'data' => $products
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product, $id)
    {
        $product = Product::select(
            'products.id',
            'products.code',
            'products.name',
            'categories.id as category_id',
            'categories.name as category_name',
            'products.description',
            'products.price',
            'products.stock',
            'products.image'
        )
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->where('products.id', '=', $id)
            ->first();

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product with ' . $id . ' not found',
            ], 404);
        }

        // Mengubah kategori menjadi objek
        $product->categories = [
            'id' => $product->category_id,
            'name' => $product->category_name,
        ];

        // Menghapus kolom tambahan yang tidak diperlukan
        unset($product->category_id, $product->category_name);

        return response()->json([
            'status' => 'success',
            'message' => 'Item successfully retrieved',
            'data' => $product,
        ], 200);
    }

    public function update(Request $request, Product $product, $id)
    {
        $products = Product::find($id);

        if (!$products) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product with ' . $id . ' not found',
            ], 404);
        }

        $input = [
            'code' => $request->code ?? $product->code,
            'name' => $request->name ?? $product->name,
            'category_id' => $request->category_id ?? $product->category_id,
            'description' => $request->description ?? $product->description,
            'price' => $request->price ?? $product->price,
            'stock' => $request->stock ?? $product->stock,
            'image' => $request->image ?? $product->image
        ];

        $products->update($input);

        return response()->json([
            'status' => 'success',
            'message' => 'Product updated successfully',
            'data' => $products
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product, $id)
    {
        $products = Product::find($id);

        if (!$products) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product with ' . $id . ' not found',
            ], 404);
        }

        $products->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Product data has been successfully deleted',
            'data' => $products
        ], 200);
    }

    public function search(Request $request, $name)
    {
        $products = Product::select('products.id','products.code', 'products.name', 'categories.name as categories', 'products.description', 'products.price', 'products.stock', 'products.image')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->where('products.name', 'like', '%' . $name . '%')
            ->get();

        if ($products->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product data with the name ' . $name . ' not found',
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Product data is successfully displayed',
            'data' => $products
        ], 200);
    }

    public function categories($categories)
    {
        $produk = Product::select('products.id','products.code', 'products.name', 'categories.name as categories', 'products.description', 'products.price', 'products.stock', 'products.image')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->where('categories.name', 'like', '%' . $categories . '%')
            ->get();

        if ($produk->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product data with category ' . $categories . ' is not found',
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Product data is successfully displayed',
            'data' => $produk
        ], 200);

    }
}
