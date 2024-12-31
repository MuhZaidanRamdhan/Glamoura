<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function index()
    {
        $categories = Categories::select('id','name', 'description')->get();

        if ($categories->isEmpty()) {
            return response()->json([
                'message' => 'No categories available'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Categories retrieved successfully ',
            'data' => $categories
        ], 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'required|string'
        ]);

        $categories = Categories::create($validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'Categories data added successfully',
            'data' => $categories
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Categories $categories, $id)
    {
        $categories = Categories::select('name', 'description')->where('id', '=', $id)->first();
        
        if (!$categories) {
            return response()->json([
                'status' => 'error',
                'message' => 'Categories with ' . $id . ' not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Item successfully retrieved with id ' . $id,
            'data' => $categories,
        ], 200);
    }

    public function update(Request $request, Categories $categories, $id)
    {
        $categories = Categories::find($id);

        if (!$categories) {
            return response()->json([
                'status' => 'error',
                'message' => 'Categories with ' . $id . ' not found',
            ], 404);
        }

        $input = [
            'name' => $request->name ?? $categories->name,
            'description' => $request->description ?? $categories->description
        ];

        $categories->update($input);

        return response()->json([
            'status' => 'success',
            'message' => 'Product updated successfully',
            'data' => $categories
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categories $categories,$id)
    {
        $categories = Categories::find($id);

        if (!$categories) {
            return response()->json([
                'status' => 'error',
                'message' => 'Categories with ' . $id . ' not found',
            ], 404);
        }

        $categories->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Category data has been successfully deleted',
            'data' => $categories
        ], 200);
    }
}
