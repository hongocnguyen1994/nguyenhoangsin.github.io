var _token = $('meta[name="csrf-token"]').attr('content');

$('.jsPaymentDetail').on('click', function(e) {
    var _this = $(this);
    var _paymentId  = _this.attr('attr-id');
    if($('.jsDetail[attr-id="'+ _paymentId +'"]').html() === "")
    {
        var _url = _this.attr('attr-href');
        $.ajax({
            url: _url,
            type: "GET",
            data: {_token: _token},
            dataType: 'JSON',
            success: function(res)
            {
                if(res.status) {
                    var _totalPrice = 0;
                    var extraMenuCategories = res.extraMenuCategories;
                    var extraCategories = res.extraCategories;
                    var flat = res.data.flat;

                    var _bills = res.data.payment_bills;
                    var _html = '<article>' +
                                    '<div class="recapitulatif__mainBox">' +
                                        '<h3 class="text-center uppercase">'+Lang.get('general.label.order')+'</h3>' +
                                        '<div class="recapitulatif__head hidden-xs">' +
                                            '<h3>Dr. Good Food</h3>' +                                        
                                        '</div>' +
                                        '<div class="recapitulatif__contentBox">' +
                                            '<div class="recapitulatif__mainContentBox left col-md-6">' +
                                                '<h2>Prescription(s): </h2>' +
                                            '</div>' +
                                            '<div class="recapitulatif__mainContentBox f-right col-md-6 hidden-sm hidden-xs">' +
                                                '<h2>'+Lang.get('general.label.other')+'(s): </h2>' +
                                            '</div>' +
                                            '<div class="jsBills"></div>' +
                                            '<div class="recapitulatif__mainContentBox f-right col-md-6 col-md-offset-6">' +
                                                '<div class="recapitulatif__listGroup">' +
                                                    '<h2>Total HT<span class="pull-right">… <span class="jsTax">0</span>€</span></h2>' +
                                                    '<hr>' +
                                                    '<h2>Total TTC<span class="pull-right">… <span class="jsTotalPrice">0</span>€</span></h2>' +
                                                    '<hr>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="clearfix"></div>' +
                                        '</div>' +
                                    '</div>'
                                '</article>';
                    $('.jsDetail[attr-id="'+ _paymentId +'"]').html(_html);

                    _bills.forEach(function(_bill,_key) {
                        _bill = _bill.bill;
                        var _priceDoItYourSelf = 0;
                        var doItYourSelf = false;
                        _billHtml = '<div class="jsBill" attr-key="'+_key+'">' +
                                            '<div class="row">' +
                                                '<div class="recapitulatif__mainContentBox left col-md-6">' +
                                                    '<div class="recapitulatif__listCalculated">';
                                                        if(flat != null && flat.prescriptions != null)
                                                        {  
                                                            var prescriptions = flat.prescriptions;
                                                            prescriptions.forEach(function(prescription, key){
                                                                if(_bill.dish_id == prescription.dish_id)
                                                                {
                                                                    _priceDoItYourSelf = parseFloat(prescription.price);
                                                                    _totalPrice = _totalPrice + _priceDoItYourSelf;
                                                                    _title = prescription.position == 1 ? 'SEMI-COMPLETE' : 'COMPLETE';
                                    _billHtml = _billHtml +'<div class="recapitulatif__listGroup__main has-list jsDoItYourself custom-box" attr-number="0">' +
                                                                '<p class="p-l-5r"><label for="'+_bill.id+'">'+(_key + 1)+'. '+_title+'</label><span class="pull-right">... <span class="jsDoItYourSelfPrice">'+_priceDoItYourSelf+'</span>€</span></p>' +
                                                                '<div class="recapitulatif__detail__menu">';
                                                                    if(flat != null && flat.dishs != null)
                                                                    {
                                                                        var dish = flat.dishs[key];
                                                                        if(dish.dish_categories != null)
                                                                        {
                                                                            var dishCategories = dish.dish_categories;
                                                                            dishCategories.forEach(function(dishCategory){
                                                                                switch(dishCategory.or_and) {
                                                                                    case 1:
                                                                                        var _orAnd = 'or';
                                                                                        break;
                                                                                    case 2:
                                                                                        var _orAnd = 'and';
                                                                                        break;
                                                                                    default:
                                                                                        var _orAnd = 'or_flat';
                                                                                        break;
                                                                                }
                                                                                var _item = '<div class="recapitulatif__listGroup jsCategory disabled '+_orAnd+'" attr-id="'+dishCategory.category.id+'" attr-max-number="'+ dishCategory.number +'" attr-number="0">' +
                                                                                        '<h3 class="text-uppercase">' + dishCategory.category.object_language.title +' :</h3>' +
                                                                                        '<div class="recapitulatif__listGroup__main">' +
                                                                                            '<div class="jsItems" attr-id="'+dishCategory.category.id+'"></div>' +
                                                                                            '<hr>' +
                                                                                        '</div>' +
                                                                                    '</div>';
                                                                                _billHtml = _billHtml + _item;
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                            });
                                                                
                                    _billHtml = _billHtml + '</div>' +
                                                        '</div>';
                                                        }
                             _billHtml = _billHtml + '</div>' +
                                            '</div>' +
                                            '<div class="recapitulatif__mainContentBox right col-md-6">' +
                                                '<div class="visible-sm visible-xs">' +
                                                    '<h2>Autre(s): </h2>' +
                                                '</div>' +
                                                '<div class="jsChoiceProduct">' +
                                                    '<div class="jsExtraMenus">';
                                                    if(extraMenuCategories != null)
                                                    {
                                                        extraMenuCategories.forEach(function(category){
                                                            var _item = '<div class="recapitulatif__listGroup jsCategory disabled" attr-id="'+category.id+'">' +
                                                                    '<h3 class="text-uppercase">'+category.object_language.title+' :</h3>' +
                                                                    '<div class="recapitulatif__listGroup__main">' +
                                                                        '<div class="jsItems" attr-id="'+category.id+'"></div>' +
                                                                        '<hr>' +
                                                                    '</div>' +
                                                                '</div>';
                                                            _billHtml = _billHtml + _item;
                                                        });
                                                    }
                                        _billHtml = _billHtml + '</div>' +
                                                    '<div class="jsExtraProducts">';
                                                        if(extraCategories != null)
                                                        {
                                                            extraCategories.forEach(function(category){
                                                                var _item = '<div class="recapitulatif__listGroup jsCategory disabled" attr-id="'+category.id+'">' +
                                                                        '<h3>'+category.object_language.title+' :</h3>' +
                                                                        '<div class="recapitulatif__listGroup__main">' +
                                                                            '<div class="jsItems" attr-id="'+category.id+'"></div>' +
                                                                            '<hr>' +
                                                                        '</div>' +
                                                                    '</div>';
                                                                _billHtml = _billHtml + _item;
                                                            });
                                                        }
                                        _billHtml = _billHtml + '</div>' +                                  
                                                '</div>' +
                                            '</div>' +

                                        '</div>' +
                                    '</div>' +
                                    '<hr class="dot">';

                        $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBills').append(_billHtml);
                        
                        if(_bill.orders !== null && _bill.orders !== null)
                        {
                            var _orders = _bill.orders;
                            _orders.forEach(function(order){
                                switch(order.type) {
                                    case 1: /*Product*/
                                        var product = order.product;                                  
                                        var numberDoItYourSelf = parseInt($('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-number'));
                                        var maxNumberDoItYourSelf = parseInt($('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-max-number'));
                                        var orderNumber = parseInt(order.number);
                                        var extraNumber = 0;
                                        var currentNumber = 0;
                                        //var productPrice = product.object_language.price;
                                        var productPrice = order.price;

                                        if(numberDoItYourSelf < maxNumberDoItYourSelf)/*DoItYourSelf*/
                                        {
                                            if(orderNumber + numberDoItYourSelf >= maxNumberDoItYourSelf)
                                            {
                                                extraNumber = orderNumber + numberDoItYourSelf - maxNumberDoItYourSelf;
                                                currentNumber = orderNumber - extraNumber;
                                            }else {
                                                currentNumber = orderNumber;                                            
                                            }
                                            var _item = '<div class="jsItem" attr-id="'+product.id+'"><p><span class="jsNumber">'+currentNumber+'</span> x '+ product.object_language.title+' <span class="pull-right disabled">… <span class="jsPrice">'+ (currentNumber*productPrice).toFixed(2) +'</span>€</span></p></div>';
                                                $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsItems[attr-id="'+product.category_id+'"]').append(_item);
                                            if(orderNumber > 0)
                                            {
                                                $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsItems[attr-id="'+product.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                                $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourself').removeClass('disabled');
                                                doItYourSelf = true;
                                            }

                                            $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-number', currentNumber);
                                            /*Extra products*/
                                            if(extraNumber >= 1)
                                            {
                                                var _item = '<div class="jsItem" attr-id="'+product.id+'"><p><span class="jsNumber">'+extraNumber+'</span> x '+ product.object_language.title+' <span class="pull-right">… <span class="jsPrice">'+ (extraNumber*productPrice).toFixed(2) +'</span>€</span></p></div>';

                                                $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+product.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                                $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+product.category_id+'"]').append(_item);

                                                if(numberDoItYourSelf + extraNumber >= maxNumberDoItYourSelf)
                                                {
                                                    $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-number', maxNumberDoItYourSelf);
                                                }else {
                                                    $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-number', numberDoItYourSelf + extraNumber);
                                                }
                                                
                                            }else {
                                                $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-number', numberDoItYourSelf + orderNumber);
                                            }
                                            _totalPrice = _totalPrice + (extraNumber*productPrice).toFixed(2);
                                        }else {
                                            var _item = '<div class="jsItem" attr-id="'+product.id+'"><p><span class="jsNumber">'+order.number+'</span> x '+ product.object_language.title+' <span class="pull-right">… <span class="jsPrice">'+ (order.number * productPrice).toFixed(2) +'</span>€</span></p></div>';                                        
                                            $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+product.category_id+'"]').append(_item);
                                            if(order.number > 0)
                                            {
                                                $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+product.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                            }

                                            _totalPrice = _totalPrice + (order.number * productPrice).toFixed(2);
                                        }

                                        break;
                                    case 2:/*Menu*/
                                        menu = order.menu;
                                        var numberDoItYourSelf = $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+menu.category_id+'"]').attr('attr-number');
                                        var maxNumberDoItYourSelf = $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+menu.category_id+'"]').attr('attr-max-number');
                                        //var menuPrice = menu.object_language.price;
                                        var menuPrice = order.price;

                                        if(numberDoItYourSelf < maxNumberDoItYourSelf)/*DoItYourSelf*/
                                        {
                                            var extraNumber = 0;
                                            var currentNumber = 0;
                                            if(order.number > maxNumberDoItYourSelf) 
                                            {
                                                extraNumber = order.number - maxNumberDoItYourSelf;
                                                currentNumber = order.number - extraNumber;
                                            }else {
                                                currentNumber = order.number;
                                            }

                                            var _item = '<div class="jsItem" attr-id="'+menu.id+'"><p><span class="jsNumber">'+currentNumber+'</span> x '+ menu.object_language.title+' <span class="pull-right disabled">… <span class="jsPrice">'+ (currentNumber*menuPrice).toFixed(2) +'</span>€</span></p></div>';

                                            $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsItems[attr-id="'+menu.category_id+'"]').append(_item);                                        
                                            if(order.number > 0)
                                            {
                                                $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsItems[attr-id="'+menu.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                                $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourself').removeClass('disabled');
                                                doItYourSelf = true;
                                            }

                                            $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+menu.category_id+'"]').attr('attr-number', parseInt(numberDoItYourSelf) + 1);

                                            /*Extra menus*/
                                            if(extraNumber >= 1)
                                            {
                                                var _item = '<div class="jsItem" attr-id="'+menu.id+'"><p><span class="jsNumber">'+extraNumber+'</span> x '+ menu.object_language.title+' <span class="pull-right">… <span class="jsPrice">'+ (extraNumber*menuPrice).toFixed(2) +'</span>€</span></p></div>';

                                                $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsChoiceProduct .jsExtraMenus .jsItems[attr-id="'+menu.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                                $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsChoiceProduct .jsExtraMenus .jsItems[attr-id="'+menu.category_id+'"]').append(_item);
                                            }
                                            _totalPrice = _totalPrice + (extraNumber * menuPrice).toFixed(2);                                        
                                        }else {
                                            var _item = '<div class="jsItem" attr-id="'+menu.id+'">' +
                                                    '<p><span class="jsNumber">'+order.number+'</span> x '+menu.object_language.title+' <span class="pull-right">… <span class="jsPrice">'+ (order.number*menuPrice).toFixed(2) +'</span>€</span></p>' +
                                                '</div>' +
                                                '<div class="clearfix"></div>';

                                            $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsExtraMenus .jsItems[attr-id="'+menu.category_id+'"]').append(_item);
                                            if(order.number > 0)
                                            {
                                                $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsExtraMenus .jsItems[attr-id="'+menu.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                            }
                                            _totalPrice = _totalPrice + order.number*menuPrice.toFixed(2);
                                        }
                                        break;
                                }                        
                            });
                        }else {
                            $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourSelfPrice').text(0);
                            $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsHiddenDoItYourself').val(0);
                        }

                        if(doItYourSelf)
                        {
                            $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourSelfPrice').text(_priceDoItYourSelf);
                        }else {
                            $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsDoItYourSelfPrice').text(0);
                            $('.jsDetail[attr-id="'+ _paymentId +'"] .jsBill[attr-key="'+_key+'"] .jsHiddenDoItYourself').val(0);
                            _totalPrice = _totalPrice - _priceDoItYourSelf;
                        }
                        setMoveToExtraProducts(_paymentId, _key);                                      
                    });
                    setTotalPrice(_paymentId) ;
                }   
            },
            error:function(){
            }
        });
    }

    e.preventDefault();
});

function setTotalPrice(paymentId)
{
    var _totalPrice = 0;
    $('.jsDetail[attr-id="'+ paymentId +'"] .right .jsPrice').each(function(key, val) {
        var _price = parseFloat($(this).text());
        _totalPrice = _totalPrice + _price;
    });

    $('.jsDetail[attr-id="'+ paymentId +'"] .left .jsDoItYourSelfPrice').each(function(key, val) {
        var _doItYourSelfPrice = parseFloat($(this).text());
        _totalPrice = _totalPrice + _doItYourSelfPrice;        
    });

    $('.jsDetail[attr-id="'+ paymentId +'"] .jsTotalPrice').text(_totalPrice.toFixed(2));

    var _taxPrice = _totalPrice - _totalPrice/10;
    $('.jsDetail[attr-id="'+ paymentId +'"] .jsTax').text(_taxPrice.toFixed(2));
}


function setMoveToExtraProducts(paymentId, key=0)
{   
    $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsDoItYourself .or_flat .jsItem').each(function(_key, val) {

        var attrNumber = parseInt($(this).closest('or_flat').attr('attr-number'));

        if(_key != 0 && attrNumber != 0) {     

            var id = $(this).attr('attr-id');
            var fromNumber = parseInt($(this).find('.jsNumber').text());
            var fromPrice = parseInt($(this).find('.jsPrice').text());
            var categoryId = $(this).closest('.or_flat').attr('attr-id');
    
            if($('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"]').length)
            {
                toPrice =  parseInt($('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"] .jsPrice').text());
                toNumber =  parseInt($('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"] .jsNumber').text());

                number = toNumber + fromNumber;
                $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"] .jsNumber').text(number);
                $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"] .jsPrice').text(fromPrice + toPrice);
                $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"] .jsRemoveItem').attr('attr-number', number);

                /*Set total price*/
                _totalPrice = parseFloat($('.jsDetail[attr-id="'+ paymentId +'"] .jsTotalPrice').text());
                $('.jsDetail[attr-id="'+ paymentId +'"]  .jsBill .jsTotalPrice').text(_totalPrice + fromNumber*fromPrice);

                $('.jsDetail[attr-id="'+ paymentId +'"] .jsTotalPrice').text(_totalPrice);
            }else {

                $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsCategory[attr-id="'+categoryId+'"]').removeClass('disabled');
                $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsCategory[attr-id="'+categoryId+'"] .jsItems').append($(this));
                $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsCategory[attr-id="'+categoryId+'"] .jsItem[attr-id="'+id+'"] .pull-right').removeClass('disabled');

                /*Set total price*/
                _totalPrice = parseFloat($('.jsDetail[attr-id="'+ paymentId +'"] .jsTotalPrice').text());
                $('.jsDetail[attr-id="'+ paymentId +'"]  .jsBill .jsTotalPrice').text(_totalPrice + fromPrice);

            }
            _totalPrice = parseFloat($('.jsDetail[attr-id="'+ paymentId +'"] .jsTotalPrice').text());
            $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsDoItYourself .jsCategory[attr-id="'+categoryId+'"]').addClass('disabled');
        }
    });

    $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsDoItYourself .or .jsItem').each(function(_key, val) {
        var attrNumber = parseInt($(this).closest('.or').attr('attr-number'));

        if(_key != 0 && attrNumber != 0) {                
            var id = $(this).attr('attr-id');
            var fromNumber = parseInt($(this).find('.jsNumber').text());
            var fromPrice = parseInt($(this).find('.jsPrice').text());
            var categoryId = $(this).closest('.or').attr('attr-id');

            if($('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"]').length)
            {
                toPrice =  parseInt($('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsPrice').text());
                toNumber =  parseInt($('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsNumber').text());

                number = toNumber + fromNumber;
                $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsNumber').text(number);
                $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsPrice').text(fromPrice + toPrice);
                $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsRemoveItem').attr('attr-number', number);

                /*Set total price*/
                _totalPrice = parseFloat($('.jsDetail[attr-id="'+ paymentId +'"] .jsTotalPrice').text());
                $('.jsDetail[attr-id="'+ paymentId +'"]  .jsBill .jsTotalPrice').text(_totalPrice + fromNumber*fromPrice);

                $('.jsDetail[attr-id="'+ paymentId +'"] .jsTotalPrice').text(_totalPrice);
            }else {
                $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsCategory[attr-id="'+categoryId+'"]').removeClass('disabled');
                $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsCategory[attr-id="'+categoryId+'"] .jsItems').append($(this));
                $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsCategory[attr-id="'+categoryId+'"] .jsItem[attr-id="'+id+'"] .pull-right').removeClass('disabled');

                /*Set total price*/
                _totalPrice = parseFloat($('.jsDetail[attr-id="'+ paymentId +'"] .jsTotalPrice').text());
                $('.jsDetail[attr-id="'+ paymentId +'"]  .jsBill .jsTotalPrice').text(_totalPrice + fromPrice);

            }
            _totalPrice = parseFloat($('.jsDetail[attr-id="'+ paymentId +'"] .jsTotalPrice').text());
            $('.jsDetail[attr-id="'+ paymentId +'"] .jsBill[attr-key="'+key+'"] .jsDoItYourself .jsCategory[attr-id="'+categoryId+'"]').addClass('disabled');
        }
    });
}

