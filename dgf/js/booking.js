$('.jsChangeDate').on('change', function(){
    var _this = $(this);
    var _key = $( ".jsChangeDate option:selected" ).attr('attr-key');
    $('.jsTime').each(function(key, val) {
        $(this).addClass('disabled'); 
    });
    $('.jsTime[attr-key="'+_key+'"]').removeClass('disabled');
});

$('.jsChangeTime').on('change', function(){
    var _this = $(this);
    var _val = $( ".jsChangeTime option:selected" ).val();
    $('.jsOrderTimeHidden').val(_val);            
});

$("#frmBooking").validate({
    rules: {
        phone: {
            required: true,
            number: true,
            minlength: 10,
            maxlength: 20
        }
    },
    messages: {
       phone: {
            required: Lang.get('validation.required', {'attribute': Lang.get('validation.attributes.phone')}),
            numeric: Lang.get('validation.number', {'attribute': Lang.get('validation.attributes.phone')}),
            minlength: Lang.get('validation.minlength', {'attribute': Lang.get('validation.attributes.phone'), 'min': 10 }),
            maxlength: Lang.get('validation.maxlength', {'attribute': Lang.get('validation.attributes.phone'), 'max' :20 }),
        },
    }
});