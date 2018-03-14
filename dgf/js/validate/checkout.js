$("#frmPayment").validate({
    rules: {
        number: {
            required: true,
        },
        holder: {
            required: true,
        },
        cvc: {
            required: true,
        }
    },
    messages: {
        number: {
            required: Lang.get('validation.required', {'attribute': Lang.get('validation.attributes.number')}),
        },
        holder: {
            required: Lang.get('validation.required', {'attribute': Lang.get('validation.attributes.holder')}),
        },
        cvc: {
            required: Lang.get('validation.required', {'attribute': Lang.get('validation.attributes.cvc')}),
        },
    },
    submitHandler: function(form) {
        $('.jsGuide').attr('disabled', true);
        $('.jsSubmit').attr('disabled', true);
        form.submit();
    }
});

$('.jsGuide').on('click', function(){
	var _this = $(this);
	if(_this.is(':checked'))
	{
		$('.jsSubmit').attr('disabled', false);
	}else {
		$('.jsSubmit').attr('disabled', true);
	}
})