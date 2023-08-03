<!doctype html>
<html lang="en">

<head>
    @include('layouts.include.css')
    @yield("style")

    <script type="text/javascript">
        var base_url = "{{ url('/') }}";
    </script>

</head>

<body>
        @include('layouts.include.header')
        @include('layouts.include.topmenu')
    <main>
        @yield('content')
    </main>
    @include('layouts.include.footer')
</body>
@include('layouts.include.script')
@yield('script')

</html>
