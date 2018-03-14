var _token = $('meta[name="csrf-token"]').attr('content');
$("#frmEditProfile").validate({
    rules: {
        first_name: {
            required: true,
            maxlength: 255
        },
        last_name: {
            required: true,
            maxlength: 255
        },
        email: {
            required: true,
            email: true,
            maxlength: 255,
            remote: {
                url: "/profile/check-exist-email",
                type: "POST",
                data: {_token: _token}
            }
        }
    },
    messages: {
        first_name: {
            required: Lang.get('validation.required', {'attribute': Lang.get('validation.attributes.first_name')}),
            maxlength: Lang.get('validation.maxlength', {'attribute': Lang.get('validation.attributes.first_name'), 'max' :255 }),
        },
        last_name: {
            required: Lang.get('validation.required', {'attribute': Lang.get('validation.attributes.last_name')}),
            maxlength: Lang.get('validation.maxlength', {'attribute': Lang.get('validation.attributes.last_name'), 'max' :255 }),
        },
        email: {
            required: Lang.get('validation.required', {'attribute': Lang.get('validation.attributes.email')}),
            maxlength: Lang.get('validation.maxlength', {'attribute': Lang.get('validation.attributes.email'), 'max' :255 }),
            remote: Lang.get('validation.exists', {'attribute': Lang.get('validation.attributes.email')}),
        }
    }
});

$("#frmChangePassword").validate({
    rules: {
        old_password: {
            required: true,
            minlength: 6,
            maxlength: 20
        },
        new_password: {
            required: true,
            minlength: 6,
            maxlength: 20
        },
        re_new_password: {
            required: true,
            minlength: 6,
            maxlength: 20,
            equalTo : "#new_password"
        },
    },
    messages: {
        old_password: {
            required: Lang.get('validation.required', {'attribute': Lang.get('validation.attributes.old_password')}),
            minlength: Lang.get('validation.minlength', {'attribute': Lang.get('validation.attributes.old_password'), 'min': 6}),
            maxlength: Lang.get('validation.maxlength', {'attribute': Lang.get('validation.attributes.old_password'), 'max' :20 }),
        },
        new_password: {
            required: Lang.get('validation.required', {'attribute': Lang.get('validation.attributes.new_password')}),
            minlength: Lang.get('validation.minlength', {'attribute': Lang.get('validation.attributes.new_password'), 'min': 6}),
            maxlength: Lang.get('validation.maxlength', {'attribute': Lang.get('validation.attributes.new_password'), 'max' :20 }),
        },
        re_new_password: {
            required: Lang.get('validation.required', {'attribute': Lang.get('validation.attributes.re_new_password')}),
            minlength: Lang.get('validation.minlength', {'attribute': Lang.get('validation.attributes.re_new_password'), 'min': 6}),
            maxlength: Lang.get('validation.maxlength', {'attribute': Lang.get('validation.attributes.re_new_password'), 'max' :20 }),
            equalTo: Lang.get('validation.equalTo', {'attribute': Lang.get('validation.attributes.new_password')}),
        },
    }
});