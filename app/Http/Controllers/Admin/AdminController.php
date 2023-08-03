<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // dd("in");

    public function __construct()
    {
        $this->middleware('admin');
    }

    public function home()
    {
        return view('admin.pages.home');
    }
}
