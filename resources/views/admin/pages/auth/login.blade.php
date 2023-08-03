@extends('admin.layouts.login_before')
@section('content')
    <div class="container-fluid p-0">
        <div class="row m-0">
            <div class="col-12 p-0">
                <div class="login-card">
                    <div>
                        <div class="login-main">
                            <form action="{{ route('admin.dologin') }}" method="POST" id="login_form" name="login_form"
                                class="theme-form">
                                @csrf
                                <h4>Login to account</h4>
                                <p>Enter your email & password to login</p>
                                <div class="form-group">
                                    <label class="col-form-label">Email Address</label>
                                    <input class="form-control" type="text" id="login_email" name="login_email"
                                        placeholder="Test@gmail.com" required>
                                    @if ($errors->has('login_email'))
                                        <span class="text-danger invalid">{{ $errors->first('login_email') }}</span>
                                    @endif
                                </div>
                                <div class="form-group">
                                    <label class="col-form-label">Password</label>
                                    <input class="form-control" type="password" id="login_password" name="login_password"
                                        value="" placeholder="*********" required>
                                    <div class="show-hide"><span class="show"> </span></div>
                                    @if ($errors->has('login_password'))
                                        <span class="text-danger invalid">{{ $errors->first('login_password') }}</span>
                                    @endif
                                </div>
                                <div class="form-group mb-0">
                                    <button class="btn btn-primary mt-3" type="submit">Login</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('script')
    <script>
        $('#login_password').keyup(function() {
            if (jQuery.trim($("#login_password").val()).length == 0) {
                this.value = $.trim(this.value);
            }
        })
        $('#login_email').keyup(function() {
            if (jQuery.trim($("#login_password").val()).length == 0) {
                this.value = $.trim(this.value);
            }
        })

        $("form[name='login_form']").on('submit', function(e) {
            e.preventDefault();
        }).validate({
            rules: {
                login_email: {
                    required: true,
                    normalizer: function(value) {
                        return $.trim(value);
                    },
                },
                login_password: {
                    required: true,
                    normalizer: function(value) {
                        return $.trim(value);
                    },
                },
            },
            messages: {
                login_email: {
                    required: "Email is required",
                },
                login_password: {
                    required: "Password is required",
                },
            },
            submitHandler: function(form) {
                var form_data = $(form).serialize();
                $("#login_form button[type='submit']").attr('disabled', true);
                $.ajax({
                    url: $(form).attr("action"),
                    type: 'post',
                    data: form_data,
                    beforeSend: function() {
                        $(".loader").show();
                    },
                    complete: function() {
                        $(".loader").hide();
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function(response) {
                        if (response.success) {
                            console.log("1");
                            window.location.href = base_url + '/admin/dashboard';
                            $.notify(response.message, {
                                type: 'success'
                            });
                        } else if (!response.success) {
                            console.log("2");
                            $.notify(response.message, {
                                type: 'danger'
                            });
                        } else {
                            console.log("3");
                            $.notify('Something went wrong', {
                                type: 'danger'
                            });
                        }
                    },
                    fail: function(xhr, status, error) {
                        $.each(xhr.responseJSON.errors, function(key, item) {
                            $.notify(item, {
                                type: 'danger'
                            });
                        });

                    }
                });
                $("#login_form button[type='submit']").attr('disabled', false);
            }
        });
    </script>
@endsection
