$(document).ready(function () {
    let table = $('#event_table');
    /*console.log(table);*/
    document.dataTable = table.DataTable({
        dom: 'Bfrtp',
        processing: false,
        serverSide: true,
        responsive: true,
        "bDestroy": true,
        "order": [],
        ajax: {
            url: base_url + '/admin/eventlist/event_list',
            type: 'post'
        },
        columns: [{
                data: 'DT_RowIndex',
                orderable: false,
                searchable: false
            },
            {
                data: 'person_name',
                name: 'person_name'
            },
            {
                data: 'event_date',
            },
            {
                data: 'status',
                name: 'status',
                orderable: false,
                searchable: false
            },
            {
                data: 'actions',
                orderable: false,
                searchable: false
            },
        ]
    });

    table.on('click', '.activate-link', function (e) {
        e.preventDefault();
        let link = this;

        swal({
                title: "Are you sure?",
                text: link.getAttribute('data-title'),
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((result) => {
                if (result) {
                    $.ajax({
                        url: link.href,
                        type: 'post',
                        dataType: 'json',
                        success: function (response) {
                            if (response.success) {
                                $.notify(response.message, {
                                    type: 'success'
                                });
                                document.dataTable.draw();
                            } else if (!response.success) {
                                $.notify(response.message, {
                                    type: 'danger'
                                });
                            } else {
                                $.notify(response.message, {
                                    type: 'danger'
                                });
                            }
                        },
                        error: function (response) {
                            let errors = response.responseJSON.errors;

                            if (errors) {
                                $.notify(Object.values(errors)[0], {
                                    type: 'danger'
                                });
                            }
                        }
                    })
                }
            });
    })

    table.on('click', '.delete-link', function (e) {
        e.preventDefault();
        let link = this;

        swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((result) => {
                if (result) {
                    $.ajax({
                        url: link.href,
                        type: 'delete',
                        dataType: 'json',
                        success: function (response) {
                            if (response.success) {
                                $.notify(response.message, {
                                    type: 'success'
                                });
                                document.dataTable.draw();
                            } else if (!response.success) {
                                $.notify(response.message, {
                                    type: 'danger'
                                });
                            } else {
                                $.notify('Something went wrong', {
                                    type: 'danger'
                                });
                            }
                        },
                        error: function (response) {
                            let errors = response.responseJSON.errors;

                            if (errors) {
                                $.notify(Object.values(errors)[0], {
                                    type: 'danger'
                                });
                            }
                        }
                    })
                }
            });

    });

    $("form[name='add_event_form']").on('submit', function (e) {
        e.preventDefault();
    }).validate({
        rules: {
            "person_name": {
                required: true,
            },
            "start_date": {
                required: true,
            }
        },
        messages: {
            "person_name": {
                required: "Please enter person name",
            },
            "start_date": {
                required: "Please select Event Date",
            }
        },
        submitHandler: function (form) {
            var formData = new FormData(form);
            $("#add_category_form button[type='submit']").attr('disabled', true);
            $.ajax({
                url: $(form).attr("action"),
                type: 'post',
                data: formData,
                processData: false,
                cache: false,
                contentType: false,
                success: function (response) {
                    if (response.success) {
                        $.notify(response.message, {
                            type: 'success'
                        });
                        window.location.href = base_url + '/admin/event';
                    } else if (!response.success) {
                        $.notify(response.message, {
                            type: 'danger'
                        });
                    } else {
                        $.notify('Something went wrong', {
                            type: 'danger'
                        });
                    }
                }
            });
            $("#add_category_form button[type='submit']").attr('disabled', false);
        }
    });

    $("form[name='edit_event_form']").on('submit', function (e) {
        e.preventDefault();
    }).validate({
        rules: {
            "person_name": {
                required: true,
            },
            "start_date": {
                required: true,
            }
        },
        messages: {
            "person_name": {
                required: "Please enter person name",
            },
            "start_date": {
                required: "Please select Event Date",
            }
        },
        submitHandler: function (form) {
            var formData = new FormData(form);
            $("#add_category_form button[type='submit']").attr('disabled', true);
            $.ajax({
                url: $(form).attr("action"),
                type: 'post',
                data: formData,
                processData: false,
                cache: false,
                contentType: false,
                success: function (response) {
                    if (response.success) {
                        $.notify(response.message, {
                            type: 'success'
                        });
                        window.location.href = base_url + '/admin/event';
                    } else if (!response.success) {
                        $.notify(response.message, {
                            type: 'danger'
                        });
                    } else {
                        $.notify('Something went wrong', {
                            type: 'danger'
                        });
                    }
                }
            });
            $("#add_category_form button[type='submit']").attr('disabled', false);
        }
    });

    $(document).ajaxComplete(function () {
        $('input[type=checkbox][data-toggle^=toggle]').bootstrapToggle();
    });

    $(document).on('change', '.status_btn', function (e) {
        e.preventDefault();
        id = this.value;
        // alert(id)
        $.ajax({
            type: 'POST',
            url: base_url + '/admin/event/' + id + '/activate/toggle',
            "initComplete": function (settings, json) {
                $('.tgl').bootstrapToggle()
            },
            success: function (response) {
                $.notify(response.message, {
                    type: 'success'
                });
            }
        });
    });

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    $('#start_date').attr('min', today);

    $('#start_date').change(function () {
        var date = $(this).val();
        const validDate = new Date(date)

        var nextDay = new Date(validDate);
        nextDay.setDate(validDate.getDate() + 1);
        var nextDate = moment(nextDay).format('DD-MM-YYYY');
        console.log(nextDate);

        $('#end_date').val(nextDate);
    });

    // function formatDate(date) {
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const day = String(date.getDate()).padStart(2, '0');
    //     return `${year}-${month}-${day}`;
    // }


});
