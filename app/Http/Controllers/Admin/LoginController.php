<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login()
    {
        return view('admin.pages.auth.login');
    }

    public function dologin(Request $request)
    {
        // dd($request);
        $validator = Validator::make($request->all(), [
            'login_email' => 'required|email',
            'login_password' => 'required|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false,'code'=>202,'message' => implode("<br>",$validator->errors()->all())], 202);
        }

        if (Auth::guard('admin')->attempt(['email' => $request->login_email, 'password' => $request->login_password])) {
            return response()->json(['success' => true, 'code'=>200, 'message' => 'Logged in sucessfully.', 'data' => []], 200);
        } else {
            return response()->json(['success' => false,'code'=>202, 'message' => 'Invalid credentials', 'data' => []], 202);
        }
    }

    public function logout(Request $request)
    {
        if(Auth::guard('admin')->check())
            Auth::guard('admin')->logout();
        return redirect(route("admin.login"));
    }
}
