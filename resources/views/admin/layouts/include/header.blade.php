
<div class="custom_nav">
    <nav class="navbar navbar-expand-lg navbar-light bg-light" id="myHeader">
        <a class="navbar-brand ps-4" style="cursor:default">
            Welcome<b><span> {{ Auth::guard('admin')->user()->name  }} </span></b>
        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end pe-5" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="{{route('admin.logout')}}">Logout </a>
            </li>
          </ul>
        </div>

      </nav>
</div>
