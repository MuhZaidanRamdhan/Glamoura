<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required'
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'Registered successfully',
        ], 200);
    }

    public function login(Request $request)
    {

        $input = [
            'email' => $request->email,
            'password' => $request->password
        ];

        $user = User::where("email", $input['email'])->first();

        $role = $user->role;

        if (Auth::attempt($input)) {
            $token = $user->createToken("token")->plainTextToken;

            return response()->json([
                "status" => "success",
                "message" => "Login Successfully",
                "token" => $token,
                "role" => $role
            ], 200);
        } else {
            return response()->json([
                "status" => "error",
                "message" => "Incorrect username or password"
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        // Pastikan user terautentikasi
        if (!$request->user()) {
            return response()->json([
                "status" => "error",
                "message" => "User is not authenticated",
            ], 401);
        }

        // Hapus token
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            "status" => "success",
            "message" => "You has logout",
        ], 200);
    }

}
