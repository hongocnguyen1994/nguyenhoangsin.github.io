var _token = $('meta[name="csrf-token"]').attr('content');

$('#recapitulatif button, #recapitulatif .jsRemoveItem, #recapitulatif .jsRemoveBill, #recapitulatif .jsRadioBill').remove();
$('.jsPaymentDetail').on('click', function(e) {
    var _this = $(this);
    var _paymentId  = _this.attr('attr-id');
    $('.jsDetail[attr-id="'+ _paymentId +'"]').removeClass('disabled');
    e.preventDefault();
});
