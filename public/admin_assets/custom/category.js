$(document).ready(function () {
    $('#category_table').DataTable({
        processing: false,
        serverSide: true,
        responsive: true,
        destroy: true,
        "order": [],
        ajax: {
            url: base_url + '/admin/category/list',
            type: 'post',
            data: {},
        },
        "initComplete": function (settings, json) {
            $('.tgl').bootstrapToggle()
        },
        columns: [{
            data: 'DT_RowIndex',
            orderable: false,
            searchable: false
        },
        {
            data: 'category',
            name: 'category',
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

    $(document).on('click', '.edit_category', function (e) {
        e.preventDefault();
        id = $(this).attr("data-id");
        // console.log(id);
        $.ajax({
            type: 'GET',
            url: base_url + '/admin/category/' + id + '/edit',
            success: function (data) {
                $("#editCategoryModal").modal('show');
                let elem = document.getElementById('edit_category_form');
                elem.setAttribute("action", base_url + '/admin/category/' + data.id)
                elem.setAttribute("data_id", data.id)
                document.getElementById("edit_category").value = data.category
            }
        });
    });

    $("form[name='add_category_form']").on('submit', function (e) {
        e.preventDefault();
    }).validate({
        rules: {
            "category": {
                required: true,
            }
        },
        messages: {
            "category": {
                required: "Please enter category name",
            },
        },
        submitHandler: function (form) {
            var formData = new FormData(form);
            $("#add_category_form button[type='submit']").attr('disabled',true);
            $.ajax({
                url: $(form).attr("action"),
                type: 'post',
                data: formData,
                processData: false,
                cache: false,
                contentType: false,
                success: function (response) {
                    $('.modal-backdrop').remove();
                    if (response.success) {
                        $.notify(response.message, {
                            type: 'success'
                        });
                        $("#addCategoryModal").modal('hide');
                        $('#add_category_form').trigger("reset");
                        $('#category_table').DataTable().ajax.reload(null, false);
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
            $("#add_category_form button[type='submit']").attr('disabled',false);
        }
    });

    $("form[name='edit_category_form']").on('submit', function (e) {
        e.preventDefault();
    }).validate({
        rules: {
            "edit_category": {
                required: true,
            }
        },
        messages: {
            "edit_category": {
                required: "Please enter category name",
            },
        },
        submitHandler: function (form) {
            var formData = new FormData(form);
            $("#edit_category_form button[type='submit']").attr('disabled',true);
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
                        $("#editCategoryModal").modal('hide');
                        $('#edit_category_form').trigger("reset");
                        $('#category_table').DataTable().ajax.reload(null, false);
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
            $("#edit_category_form button[type='submit']").attr('disabled',false);
        }
    });

    $(document).on('click', '.edit_category', function (e) {
        e.preventDefault();
        id = $(this).attr("data-id");
        $.ajax({
            type: 'GET',
            url: base_url + '/admin/category/' + id + '/edit',
            success: function (data) {
                $("#editCategoryModal").modal('show');
                let elem = document.getElementById('edit_category_form');
                elem.setAttribute("action", base_url + '/admin/category/' + data.id)
                elem.setAttribute("data_id", data.id)
                document.getElementById("edit_category").value = data.category
            }
        });
    });

    $(document).on('click', '.delete_category', function (e) {
        e.preventDefault();
        let link = this;
        swal({
            title: `Are you sure you want to delete this record?`,
            text: "If you delete this, it will be gone forever.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    id = this.value;
                    $.ajax({
                        type: 'DELETE',
                        url: link.href,
                        success: function (response) {
                            if (response.success) {
                                $.notify(response.message, {
                                    type: 'success'
                                });
                                $('#category_table').DataTable().ajax.reload(null, false)
                                $('.tgl').bootstrapToggle()
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
                }
            });

    });

    $(document).on('change', '.status_btn', function (e) {
        e.preventDefault();
        id = this.value;
        $.ajax({
            type: 'GET',
            url: base_url + '/admin/category/status/' + id,
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

    $(document).ajaxComplete(function() {
        $('input[type=checkbox][data-toggle^=toggle]').bootstrapToggle();
    });
});
