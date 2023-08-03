<!doctype html>
<html lang="en">

<head>
    @include('admin.layouts.include.css')
    <script type="text/javascript">
        var base_url = "{{ url('/') }}";
    </script>
    @yield('style')
</head>

<body>
    {{-- <div class="tap-top"><i data-feather="chevrons-up"></i></div> --}}
        @include('admin.layouts.include.header')
        <div class="page-body-wrapper">
            @include('admin.layouts.include.sidebar')
            <div class="loader" style="display: none;"><span>Loading..</span></div>
            @yield('content')
        </div>
        @include('admin.layouts.include.script')
        @yield('script')

</body>


</html>
