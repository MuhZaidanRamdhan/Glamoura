<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'address', 'role')
            ->orderBy('id', 'asc')
            ->get();

        if ($users->isEmpty()) {
            return response()->json([
                'message' => 'No users available'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'User retrieved successfully ',
            'data' => $users
        ], 200);
    }

    public function update(Request $request, User $user, $id)
    {
        $users = User::find($id);

        if (!$users) {
            return response()->json([
                'status' => 'error',
                'message' => 'User with ' . $id . ' not found',
            ], 404);
        }

        $input = [
            'name' => $request->name ?? $users->name,
            'email' => $request->description ?? $users->email,
            'address' => $request->address ?? $users->address,
            'role' => $request->role ?? $users->role
        ];

        $users->update($input);

        return response()->json([
            'status' => 'success',
            'message' => 'User updated successfully',
            'data' => $users
        ], 200);
    }

    public function destroy(User $user, $id)
    {
        $users = User::find($id);

        if (!$users) {
            return response()->json([
                'status' => 'error',
                'message' => 'Users with ' . $id . ' not found',
            ], 404);
        }

        $users->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User data has been successfully deleted',
            'data' => $users
        ], 200);
    }

    public function profile()
    {
        // Ambil data pengguna yang sedang login
        $user = auth()->user();

        // Periksa apakah pengguna tersedia
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not authenticated',
            ], 401);
        }

        // Return sebagai JSON response
        return response()->json([
            'status' => 'success',
            'message' => 'User retrieved successfully',
            'data' => $user,
        ]);
    }
}
