var _token = $('meta[name="csrf-token"]').attr('content');
var _language = $('meta[name="language"]').attr('content');

var paymentId = $('.tmpPayment').attr('attr-id');
var urlBack = $('.urlBack').html();
getCart(paymentId);

function getCart(paymentId){
    var _token = $('meta[name="csrf-token"]').attr('content');
    var _url = '/' + _language + '/ajax-get-cart/'+paymentId;
    $.ajax({
        url: _url,
        type: "GET",
        data: {_token: _token},
        dataType: 'JSON',
        success: function(res){
            if(res.status) {
                var _totalPrice = 0;
                var extraMenuCategories = res.extraMenuCategories;
                var extraCategories = res.extraCategories;

                var _html = '<div class="content">' +
                                '<div class="jsFlats"></div>' +
                                '<div class="recapitulatif__mainContentBox b-l-none col-md-6 col-md-offset-6 disRight">' +
                                    '<div class="recapitulatif__listGroup">' +
                                        '<h2>Total HT<span class="pull-right">… <span class="jsTax">180</span>€</span></h2>' +
                                        '<hr>' +
                                        '<h2>Total TTC<span class="pull-right">… <span class="jsTotalPrice">200</span>€</span></h2>' +
                                        '<hr>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="recapitulatif__listGroup">' +
                                '<div class="col-md-6">' +
                                    '<a href="'+urlBack+'" class="btn btn-recapitulatif p-t-16 jsCancel uppercase" style="color: #FFF4E8;">'+Lang.get('client.label.back')+'</a>' +
                                '</div>' +
                                '<div class="col-md-6">' +
                                    '<button type="sumbit" class="btn btn-recapitulatif uppercase">'+Lang.get('client.label.continue')+'</button>' +
                                '</div>' +
                            '</div>' +
                            '<input type="hidden" name="total_zero" class="jsTotalZero" value="0"/>' +
                            '<div class="clearfix"></div>';
                $('#recapitulatif .recapitulatif__contentBox').html(_html);

                var datas = res.data;
                datas.forEach(function(_data,_fl) {
                    var _flat = _data.flat;
                    var _bills = _data.bills;
                    var _flatHtml = '<div class="jsFlat" attr-key="'+_fl+'"><p class="uppercase flat">*'+_flat.object_language.title+'</p><div class="jsBills" attr-key="'+_fl+'"></div></div>';
                    $('#recapitulatif .recapitulatif__contentBox .jsFlats').append(_flatHtml);

                    _bills.forEach(function(_bill,_i) {
                        var _bill = _bill.bill;
                        var _priceDoItYourSelf = 0;
                        var doItYourSelf = false;
                        if(_bill.orders !== null && _bill.orders.length > 0) {
                            _billHtml = '<div class="jsBill" attr-key="'+_i+'">' +
                                                '<div class="row">' +
                                                    '<i class="fa fa fa-remove jsRemoveBill" attr-href="/ajax-remove-bill/'+_bill.id+'"></i>' +
                                                    '<div class="recapitulatif__mainContentBox left col-md-6 disLeft">' +
                                                        '<div class="recapitulatif__listCalculated">';
                                                            if(_flat != null && _flat.prescriptions != null)
                                                            {  
                                                                var prescriptions = _flat.prescriptions;
                                                                prescriptions.forEach(function(prescription, key){
                                                                    if(_bill.dish_id == prescription.dish_id)
                                                                    {
                                                                        _priceDoItYourSelf = parseFloat(prescription.price);
                                                                        if(_flat.type == 1)
                                                                        {
                                                                            _title = prescription.position == 1 ? 'SEMI-COMPLETE' : 'COMPLETE';
                                                                        }else {
                                                                            _title =  Lang.get('client.label.compose_your_dish');
                                                                        }                                                                    
                                        _billHtml = _billHtml +'<div class="recapitulatif__listGroup__main has-list jsDoItYourself custom-box" attr-number="0" prescription-max="'+ prescription.max_number +'">' +
                                                                    '<p class="p-l-5r"><label class = "uppercase" for="'+_bill.id+'">'+(_i + 1)+'. '+_title+'</label>&nbsp&nbsp<label class="notComplete">'+Lang.get('client.message.not_complete')+'</label><span class="pull-right">... <span class="jsDoItYourSelfPrice">'+_priceDoItYourSelf+'</span>€</span></p>' +
                                                                        '<input type="hidden" class="jsHiddenDoItYourself" name="price_do_it_yourself['+_bill.id+']" value="'+_priceDoItYourSelf+'"/> <i class="fa fa fa-trash jsRemoveOrder disabled"></i>' +
                                                                    '<div class="recapitulatif__detail__menu">';
                                                                        if(_flat != null && _flat.dishs != null)
                                                                        {
                                                                            var dish = _flat.dishs[key];
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
                                                '<div class="recapitulatif__mainContentBox right col-md-6 disRight">' +
                                                    '<div class="visible-sm visible-xs">' +
                                                        '<h2>'+Lang.get('general.label.other')+'(s): </h2>' +
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
                                        '<div class="clearfix"></div>' +
                                        '<hr class="dot">';

                            $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"]').append(_billHtml);
                            if(_bill.orders !== null && _bill.orders.length > 0)
                            {
                                var _orders = _bill.orders;
                                _orders.forEach(function(order){
                                    switch(order.type) {
                                        case 1: /*Product*/
                                            var product = order.product;                                  
                                            var numberDoItYourSelf = parseInt($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-number'));
                                            var maxNumberDoItYourSelf = parseInt($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-max-number'));
                                            var orderNumber = parseInt(order.number);
                                            var extraNumber = 0;
                                            var currentNumber = 0;
                                            var productPrice = product.object_language.price;

                                            if(numberDoItYourSelf < maxNumberDoItYourSelf)/*DoItYourSelf*/
                                            {
                                                if(orderNumber + numberDoItYourSelf >= maxNumberDoItYourSelf)
                                                {
                                                    extraNumber = orderNumber + numberDoItYourSelf - maxNumberDoItYourSelf;
                                                    currentNumber = orderNumber - extraNumber;
                                                }else {
                                                    currentNumber = orderNumber;                                            
                                                }
                                                if(productPrice > 0 && _flat.type != 1)
                                                {
                                                    var _item = '<div class="jsItem" attr-id="'+product.id+'"><p><span class="jsNumber">'+currentNumber+'</span> x '+ product.object_language.title+' (+ '+currentNumber*productPrice+'€) <i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+product.id+'" attr-number = "'+currentNumber+'"></i><span class="pull-right disabled">… <span class="jsPrice">'+ (currentNumber*productPrice).toFixed(2) +'</span>€</span></p></div><input type="hidden" name="price_yourself_extra['+_bill.id+'][]" value="'+currentNumber*productPrice+'" class="jsPriceYourselExtra"/>';
                                                }else {
                                                    var _item = '<div class="jsItem" attr-id="'+product.id+'"><p><span class="jsNumber">'+currentNumber+'</span> x '+ product.object_language.title+' <i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+product.id+'" attr-number = "'+currentNumber+'"></i><span class="pull-right disabled">… <span class="jsPrice">'+ (currentNumber*productPrice).toFixed(2) +'</span>€</span></p></div>';
                                                }
                                                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsItems[attr-id="'+product.category_id+'"]').append(_item);
                                                if(orderNumber > 0)
                                                {
                                                    $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsItems[attr-id="'+product.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                                    $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself').removeClass('disabled');
                                                    doItYourSelf = true;
                                                }

                                                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-number', currentNumber);
                                                /*Extra products*/
                                                if(extraNumber >= 1)
                                                {
                                                    var _item = '<div class="jsItem" attr-id="'+product.id+'"><p><span class="jsNumber">'+extraNumber+'</span> x '+ product.object_language.title+' <i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+product.id+'" attr-number = "'+extraNumber+'"></i><span class="pull-right">… <span class="jsPrice">'+ (extraNumber*productPrice).toFixed(2) +'</span>€</span></p></div>';

                                                    $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+product.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                                    $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+product.category_id+'"]').append(_item);

                                                    if(numberDoItYourSelf + extraNumber >= maxNumberDoItYourSelf)
                                                    {
                                                        $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-number', maxNumberDoItYourSelf);
                                                    }else {
                                                        $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-number', numberDoItYourSelf + extraNumber);
                                                    }
                                                    
                                                }else {
                                                    $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-number', numberDoItYourSelf + orderNumber);
                                                }
                                            }else {
                                                var _item = '<div class="jsItem" attr-id="'+product.id+'"><p><span class="jsNumber">'+order.number+'</span> x '+ product.object_language.title+' <i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+product.id+'" attr-number = "'+order.number+'"></i><span class="pull-right">… <span class="jsPrice">'+ (order.number * productPrice).toFixed(2) +'</span>€</span></p></div>';                                        
                                                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+product.category_id+'"]').append(_item);
                                                if(order.number > 0)
                                                {
                                                    $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+product.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                                }

                                            }

                                            break;
                                        case 2:/*Menu*/
                                            menu = order.menu;
                                            var numberDoItYourSelf = $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsCategory[attr-id="'+menu.category_id+'"]').attr('attr-number');
                                            var maxNumberDoItYourSelf = $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsCategory[attr-id="'+menu.category_id+'"]').attr('attr-max-number');
                                            var menuPrice = menu.object_language.price;
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
                                                if(menuPrice > 0 && _flat.type != 1)
                                                {
                                                    var _item = '<div class="jsItem" attr-id="'+menu.id+'"><p><span class="jsNumber">'+currentNumber+'</span> x '+ menu.object_language.title+' (+ '+currentNumber*menuPrice+'€) <i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+menu.id+'" attr-number = "'+currentNumber+'"></i><span class="pull-right disabled">… <span class="jsPrice">'+ (currentNumber*menuPrice).toFixed(2) +'</span>€</span></p></div>';
                                                }else {
                                                    var _item = '<div class="jsItem" attr-id="'+menu.id+'"><p><span class="jsNumber">'+currentNumber+'</span> x '+ menu.object_language.title+' <i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+menu.id+'" attr-number = "'+currentNumber+'"></i><span class="pull-right disabled">… <span class="jsPrice">'+ (currentNumber*menuPrice).toFixed(2) +'</span>€</span></p></div>';
                                                }

                                                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsItems[attr-id="'+menu.category_id+'"]').append(_item);                                        
                                                if(order.number > 0)
                                                {
                                                    $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsItems[attr-id="'+menu.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                                    $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself').removeClass('disabled');
                                                    doItYourSelf = true;
                                                }

                                                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsCategory[attr-id="'+menu.category_id+'"]').attr('attr-number', parseInt(numberDoItYourSelf) + 1);

                                                /*Extra menus*/
                                                if(extraNumber >= 1)
                                                {
                                                    var _item = '<div class="jsItem" attr-id="'+menu.id+'"><p><span class="jsNumber">'+extraNumber+'</span> x '+ menu.object_language.title+' <i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+menu.id+'" attr-number = "'+extraNumber+'"></i><span class="pull-right">… <span class="jsPrice">'+ (extraNumber*menuPrice).toFixed(2) +'</span>€</span></p></div>';

                                                    $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsChoiceProduct .jsExtraMenus .jsItems[attr-id="'+menu.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                                    $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsChoiceProduct .jsExtraMenus .jsItems[attr-id="'+menu.category_id+'"]').append(_item);
                                                }
                                            }else {

                                                var _item = '<div class="jsItem" attr-id="'+menu.id+'">' +
                                                        '<p><span class="jsNumber">'+order.number+'</span> x '+menu.object_language.title+' <i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+menu.id+'" attr-number = "'+order.number+'"></i><span class="pull-right">… <span class="jsPrice">'+ (order.number*menuPrice).toFixed(2) +'</span>€</span></p>' +
                                                    '</div>' +
                                                    '<div class="clearfix"></div>';

                                                $('#recapitulatif .recapitulatif__contentBox .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraMenus .jsItems[attr-id="'+menu.category_id+'"]').append(_item);
                                                if(order.number > 0)
                                                {
                                                    $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraMenus .jsItems[attr-id="'+menu.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                                }
                                            }
                                            break;
                                    }                        
                                });
                            }else {
                                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourSelfPrice').text(0);
                                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsHiddenDoItYourself').val(0);
                            }

                            if(doItYourSelf)
                            {
                                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourSelfPrice').text(_priceDoItYourSelf);
                            }else {
                                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourSelfPrice').text(0);
                                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsHiddenDoItYourself').val(0);
                            }                            
                        }
                        setMoveToExtraProducts(_fl, _i);                                      
                        setTotalPriceHidden(_bill.id, _fl, _i);
                        /*Remove Bill*/
                        removeBill($('.jsRemoveBill'));
                    });
                    
                    if($('#recapitulatif .jsFlat .jsBills[attr-key="'+_fl+'"]').is(':empty'))
                    {
                        $('#recapitulatif .jsFlat[attr-key="'+_fl+'"]').remove();
                    }
                    
                })

                setTotalPrice();
                checkNotComplete();
                /*Set content hidden*/
                var htmlPayment = $('#recapitulatif .content').html();
                $('#recapitulatif form .jsContentHidden').val('').val(htmlPayment);

                /*Remove Item Of Bill*/
                removeItem($('#recapitulatif .jsRemoveItem'));

                $('#recapitulatif').removeClass('disabled');
            }          
        },
        error:function(){
        }
    });
}

function checkNotComplete()
{
    $('.jsBills .jsDoItYourself').each(function(key, obj) {
        var prescriptionMax = parseInt($(this).attr('prescription-max'));
        var prescriptionNumber = 0;
        var categories = $(this).find('.jsCategory');
        categories.each(function(k,cate) {
            prescriptionNumber = prescriptionNumber + parseInt($(this).attr('attr-number'));
        });
        if(prescriptionNumber >= prescriptionMax)
        {
            $(this).find('.notComplete').addClass('disabled');
        }else {
            $(this).find('.notComplete').removeClass('disabled');            
        }
    });
}

function setMoveToExtraProducts(_fl,_i)
{   
    $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .or_flat .jsItem').each(function(_key, val) {
        var attrNumber = parseInt($(this).closest('.or_flat').attr('attr-number'));
        if(_key != 0 && attrNumber != 0) {
            var id = $(this).attr('attr-id');
            var fromNumber = parseInt($(this).find('.jsNumber').text());
            var fromPrice = parseInt($(this).find('.jsPrice').text());
            var categoryId = $(this).closest('.or_flat').attr('attr-id');
            if($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"]').length)
            {
                console.log('a');
                toPrice =  parseInt($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"] .jsPrice').text());
                toNumber =  parseInt($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"] .jsNumber').text());

                number = toNumber + fromNumber;
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"] .jsNumber').text(number);
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"] .jsPrice').text(fromPrice + toPrice);
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"] .jsRemoveItem').attr('attr-number', number);

                /*Set total price*/
                _totalPrice = parseFloat($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsTotalPrice').text());
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"]  .jsBill .jsTotalPrice').text(_totalPrice + fromNumber*fromPrice);

                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsTotalPrice').text(_totalPrice);
            }else {
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraMenus .jsCategory[attr-id="'+categoryId+'"]').removeClass('disabled');
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraMenus .jsCategory[attr-id="'+categoryId+'"] .jsItems').append($(this));
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraMenus .jsCategory[attr-id="'+categoryId+'"] .jsItem[attr-id="'+id+'"] .pull-right').removeClass('disabled');

                /*Set total price*/
                _totalPrice = parseFloat($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsTotalPrice').text());
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"]  .jsBill .jsTotalPrice').text(_totalPrice + fromPrice);

            }
            _totalPrice = parseFloat($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsTotalPrice').text());
            $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsCategory[attr-id="'+categoryId+'"]').addClass('disabled').attr('attr-number', 0);;
        }
    });

    $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .or .jsItem').each(function(_key, val) {
        var attrNumber = parseInt($(this).closest('.or').attr('attr-number'));
        if(_key != 0 && attrNumber != 0) {                
            var id = $(this).attr('attr-id');
            var fromNumber = parseInt($(this).find('.jsNumber').text());
            var fromPrice = parseInt($(this).find('.jsPrice').text());
            var categoryId = $(this).closest('.or').attr('attr-id');

            if($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"]').length)
            {
                toPrice =  parseInt($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsPrice').text());
                toNumber =  parseInt($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsNumber').text());

                number = toNumber + fromNumber;
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsNumber').text(number);
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsPrice').text(fromPrice + toPrice);
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsRemoveItem').attr('attr-number', number);

                /*Set total price*/
                _totalPrice = parseFloat($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsTotalPrice').text());
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"]  .jsBill .jsTotalPrice').text(_totalPrice + fromNumber*fromPrice);

                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsTotalPrice').text(_totalPrice);
            }else {
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsCategory[attr-id="'+categoryId+'"]').removeClass('disabled');
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsCategory[attr-id="'+categoryId+'"] .jsItems').append($(this));
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsCategory[attr-id="'+categoryId+'"] .jsItem[attr-id="'+id+'"] .pull-right').removeClass('disabled');

                /*Set total price*/
                _totalPrice = parseFloat($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsTotalPrice').text());
                $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"]  .jsBill .jsTotalPrice').text(_totalPrice + fromPrice);

            }
            _totalPrice = parseFloat($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsTotalPrice').text());
            $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsCategory[attr-id="'+categoryId+'"]').addClass('disabled').attr('attr-number', 0);;
            //setHeightBill(key);
        }
    });

    $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .and').each(function(_key, val) {
        var attrMaxNumber = parseInt($(this).attr('attr-max-number'));
        var numberHidden = 0;
        if(attrMaxNumber != 0) {                
            var categoryId = $(this).attr('attr-id');
            $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .and[attr-id="'+categoryId+'"] .jsItem').each(function(_keyItem, _valItem) {
                var id = $(this).attr('attr-id');      
                var fromNumber =  parseInt($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .and[attr-id="'+categoryId+'"] .jsItem[attr-id="'+id+'"] .jsNumber').text());
                var fromPrice =  parseInt($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .and[attr-id="'+categoryId+'"] .jsItem[attr-id="'+id+'"] .jsPrice').text());
                numberHidden = parseInt(numberHidden) + fromNumber;
                if(numberHidden > attrMaxNumber)
                {
                    if($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"]').length)
                    {
                        toPrice =  parseInt($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsPrice').text());
                        var toNumber =  parseInt($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsNumber').text());

                        number = toNumber + fromNumber;
                        $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsNumber').text(number);
                        $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsPrice').text(fromPrice + toPrice);
                        $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsRemoveItem').attr('attr-number', number);
                        /*Set total price*/
                        _totalPrice = parseFloat($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsTotalPrice').text());
                        $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"]  .jsBill .jsTotalPrice').text(_totalPrice + fromNumber*fromPrice);

                        $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsTotalPrice').text(_totalPrice);
                    }else {
                        $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsCategory[attr-id="'+categoryId+'"]').removeClass('disabled');
                        $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsCategory[attr-id="'+categoryId+'"] .jsItems').append($(this));
                        $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsExtraProducts .jsCategory[attr-id="'+categoryId+'"] .jsItem[attr-id="'+id+'"] .pull-right').removeClass('disabled');

                        /*Set total price*/
                        _totalPrice = parseFloat($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsTotalPrice').text());
                        $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"]  .jsBill .jsTotalPrice').text(_totalPrice + fromPrice);

                    }
                    _totalPrice = parseFloat($('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsTotalPrice').text());
                    $(this).remove();
                }
            });
        }
    });
}

function setTotalPriceHidden(billId, _fl, _i)
{
    var totalPriceHidden = 0;
    $('#recapitulatif .jsFlats .jsBills[attr-key="'+_fl+'"] .jsBill[attr-key="'+_i+'"] .jsDoItYourself .jsItem').each(function(key, val) {
        var price = parseFloat($(this).find('.jsPrice').text());
        totalPriceHidden = totalPriceHidden + price; 
    });
    $('#frmCart').append('<input type="hidden" name="total_price_hidden['+billId+']" value="'+totalPriceHidden+'"/>');
}

function setTotalPrice()
{
    var _totalPrice = 0;
    var _total_zero = 0;
    $('#recapitulatif .right .jsPrice').each(function(key, val) {
        var _price = parseFloat($(this).text());

        if(_price == 0)
        {
            var _number = parseInt($(this).closest('.jsItem').find('.jsNumber').text());
            $(this).text(_number);
            _price = _price + _number;
            _total_zero = _total_zero + _price;
        }

        _totalPrice = _totalPrice + _price;
    });

    $('#recapitulatif .left .jsPriceYourselExtra').each(function(key, val) {
        var _priceYourselExtra = parseFloat($(this).val());
        _totalPrice = _totalPrice + _priceYourselExtra;
    });

    $('#recapitulatif .left .jsDoItYourSelfPrice').each(function(key, val) {
        var _doItYourSelfPrice = parseFloat($(this).text());
        _totalPrice = _totalPrice + _doItYourSelfPrice;        
    });
    
    $('#recapitulatif .jsTotalPrice').text(_totalPrice.toFixed(2));

    var _taxPrice = _totalPrice - _totalPrice/10;
    $('#recapitulatif .jsTax').text(_taxPrice.toFixed(2));

    $('#recapitulatif .jsTotalZero').val(_total_zero);
    
    if(_totalPrice == 0)
    {
        window.location = '/';
    }
}

/*Remove Item*/
function removeItem(item)
{
    item.on('click', function(event){
        var _this = $(this);
        _this.addClass('disabled');
        var _billId = _this.attr('attr-bill-id');
        var _objectId = _this.attr('attr-id');
        var _number = _this.attr('attr-number');
        var _url = '/ajax-remove-order/' +_billId +'/'+ _objectId + '/' + _number;
        _this.attr('disabled', 'disabled');
        $.ajax({
            url: _url,
            type: "POST",
            data: {_token: _token},
            dataType: 'JSON',
            success: function(res){
                if(res.status)
                {
                    window.location = window.location.href;
                }else {
                    _this.removeClass('disabled');
                }
            },
            error:function(){
            }
        });
    });        
}

function removeBill(item)
{
    item.confirm({
        title:"Suppression",
        text: Lang.get('client.message.are_you_sure'),
        width: 400,
        confirm: function(button) {
            var _this = button;
            var _url = _this.attr('attr-href');
            _this.attr('disabled', 'disabled');
            $.ajax({
                url: _url,
                type: "POST",
                data: {_token: _token},
                dataType: 'JSON',
                success: function(res){
                    if(res.status)
                    {
                        window.location = window.location.href;
                    }
                },
                error:function(){
                }
            });
            button.fadeOut(2000).fadeIn(2000);
        },
        cancel: function(button) {
            button.fadeOut(2000).fadeIn(2000);
        },
        confirmButton: Lang.get('general.label.yes'),
        cancelButton: Lang.get('general.label.no')
    });
}