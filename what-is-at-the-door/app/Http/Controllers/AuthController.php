<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
     public function Login(Request $request) {

        $request->validate([
            'email' => "required|email",
            'password' => 'required'
        ]);

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('MyApp')->accessToken;
            return response()->json(['accessToken' => $token], 200);
        }

     }

     public function Register(Request $request) {
        $request->validate([
            'email' => "required|email",
            'name' => "required|string",
            'password' => 'required'
        ]);

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user->save();

        return response()->json(['message' => 'Kayıt Başarılı'], 201);
     }
}
