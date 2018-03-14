var _token = $('meta[name="csrf-token"]').attr('content');
$("#frmNewsLetter").validate({
    rules: {
        email: {
            required: true,
            email: true,
            remote: {
                url: "/check-exist-subcribe",
                type: "POST",
                data: {_token: _token}
            }
        }
    },
    messages: {
        email: {
            required: Lang.get('validation.required', {'attribute': Lang.get('validation.attributes.email')}),
            email: Lang.get('validation.email', {'attribute': Lang.get('validation.attributes.email')}),
            remote: Lang.get('validation.subcribed', {'attribute': Lang.get('validation.attributes.email')})
        }
    },
});