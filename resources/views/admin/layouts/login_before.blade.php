<!doctype html>
<html lang="en">

<head>
    @include('admin.layouts.include.css')
    <style>
        .login-card {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-repeat: no-repeat;
        }

        .login-card .login-main {
            width: 450px;
            padding: 40px;
            border-radius: 10px;
            -webkit-box-shadow: 0 0 37px rgba(8, 21, 66, 0.05);
            box-shadow: 0 0 37px rgba(8, 21, 66, 0.05);
            margin: 0 auto;
            background-color: #fff;
        }

        .container-fluid {
            background-color: #71b7f4;
        }
    </style>
    <script type="text/javascript">
        var base_url = "{{ url('/') }}";
    </script>
    @yield('style')
</head>

<body>
    @yield('content')
    @include('admin.layouts.include.script')
    @yield('script')
</body>

</html>
