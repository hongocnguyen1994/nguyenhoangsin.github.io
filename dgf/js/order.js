var _token = $('meta[name="csrf-token"]').attr('content');
var _language = $('meta[name="language"]').attr('content');

/*Up Number*/
upNumber($('.jsUpNumber'));
function upNumber(item)
{
    item.on('click', function(event){
        var _this = $(this);
        var _billId = _this.attr('attr-bill-id');
        var _id = _this.attr('attr-id');

        if ($(this).is("[disabled]")) {
            return false;
        }
        _this.attr('disabled', 'disabled');
        $('.jsPayment').removeClass('disabled');
        $.ajax({
            url: '/ajax-order/'+_billId+'/'+_id,
            type: "POST",
            data: {_token: _token},
            dataType: 'JSON',
            success: function(res){
                if(res.status)
                {
                    var _number = parseInt(_this.closest('.jsProduct').find('.jsNumber').val());
                    if(isNaN(_number))
                    {
                        _number = parseInt(_this.closest('.jsProduct').find('.jsNumber').text());
                    }
                    _this.closest('.jsProduct').find('.jsNumber').val(_number + 1).text(_number + 1);
                    /*Set Bill*/
                    getBills(flatId, flatType, false);

                    _this.removeAttr('disabled');                    
                }          
            },
            error:function(){
            }
        });          
    })
}

/*Down Number*/
downNumber($('.jsDownNumber'));
function downNumber(item)
{
    item.on('click', function(){
        var _this = $(this);
        var _billId = _this.attr('attr-bill-id');
        var _id = _this.attr('attr-id');

        if ($(this).is("[disabled]")) {
            return false;
        }
        _this.attr('disabled', 'disabled');
        var _number = parseInt(_this.closest('.jsProduct').find('.jsNumber').val());
        if(_number >= 1)
        {
            var _url = _this.attr('attr-href');
            $.ajax({
                url: '/ajax-unorder/'+_billId+'/'+_id,
                type: "POST",
                data: {_token: _token},
                dataType: 'JSON',
                success: function(res){
                    if(res.status)
                    {
                        var _number = parseInt(_this.closest('.jsProduct').find('.jsNumber').val());
                        if(isNaN(_number))
                        {
                            _number = parseInt(_this.closest('.jsProduct').find('.jsNumber').text());
                        }
                        _this.closest('.jsProduct').find('.jsNumber').val(_number - 1).text(_number - 1);

                        /*Set Bill*/
                        getBills(flatId, flatType, false);
                    }
                    _this.removeAttr('disabled');
                },
                error:function(){
                }
            });
        }else {
            _this.closest('.jsProduct').find('.jsNumber').text(0);
            _this.removeAttr('disabled');
        }
    })
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
                    var _numberOld = parseInt($('.jsProduct[attr-id="'+_objectId+'"] .jsNumber').val());
                    var _numberNew = _numberOld -  _number;

                    $('.jsProduct[attr-id="'+_objectId+'"] .jsNumber').val(_numberNew).text(_numberNew);

                    /*Set Bill*/
                    getBills(flatId, flatType, false);
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
                        var link = window.location.href;
                        link = link.replace('#order', '');
                        window.location = link + '/#order';
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

/*Down Number*/
changeNumber($('.jsNumber'));
function changeNumber(item)
{
    item.on('change', function(){
        var _this = $(this);
        var _number = parseInt($(this).val());
        if(_number < 0 || isNaN(_number))
        {
            _this.val(0);
        }                
    })
}

/*Set Heigh*/
function setHeightBill(key)
{
    /*var _height= $('.jsPayment .jsBill[attr-key="'+key+'"] .jsChoiceProduct').height();
    var _leftHeight= $('.jsPayment .jsBill[attr-key="'+key+'"] .left').height();
    var _maxHeight = 100;
    if(_height > 0)
    {
        _maxHeight = _height + 100;
    }else {
        if(_leftHeight > _maxHeight)
        {
            _maxHeight = _leftHeight;
        }

    }
    $('.jsPayment .jsBill[attr-key="'+key+'"] .recapitulatif__mainContentBox.right').css("height", _maxHeight);*/
}

var flatId = $('.tmpBill').attr('attr-flat-id');
var flatType = $('.tmpBill').attr('attr-flat-type');
var paymentId = $('.tmpPayment').attr('attr-id');
getBills(flatId, flatType, true);

function getBills(flatId, flatType = 1, tmp = true){
    var _token = $('meta[name="csrf-token"]').attr('content');
    var _url = '/' + _language + '/ajax-get-bills?flat_id='+flatId;
    var _billId = $('.tmpBill').attr('attr-bill-id');
    var _billType = $('.tmpBill').attr('attr-flat-type');
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
                var flat = res.flat;

                var _bills = res.data;
                var _html = '<form action="/'+ _language +'/cart/'+paymentId+'" method="GET" id="frmCheckout">' +
                                '<input name="_token" type="hidden" value="'+_token+'">' +
                                '<input name="flat_id" type="hidden" value="'+flat.id+'">' +
                                '<div class="recapitulatif__mainContentBox left col-md-6">' +
                                    '<h2>Prescription(s): </h2>' +
                                '</div>' +
                                '<div class="recapitulatif__mainContentBox f-right col-md-6 hidden-sm hidden-xs">' +
                                    '<h2>'+Lang.get('general.label.other')+'(s): </h2>' +
                                '</div>' +
                                '<div class="jsBills"></div>' +
                                '<div class="recapitulatif__mainContentBox f-right col-md-6 col-md-offset-6 disRight">' +
                                    '<div class="recapitulatif__listGroup">' +
                                        '<h2>Total HT<span class="pull-right">… <span class="jsTax">0</span>€</span></h2>' +
                                        '<hr>' +
                                        '<h2>Total TTC<span class="pull-right">… <span class="jsTotalPrice">0</span>€</span></h2>' +
                                        '<hr>' +
                                    '</div>' +
                                    '<div class="recapitulatif__listGroup">' +
                                        '<button type="button" class="btn btn-recapitulatif jsAddBill uppercase">'+Lang.get('general.label.continuing_my_order')+'</button>' +
                                        '<button type="sumbit" class="btn btn-recapitulatif jsCheckOut uppercase" disabled="disabled">'+Lang.get('general.label.commander')+'</button>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="clearfix"></div>' +
                                '<input type="hidden" name="total_zero" class="jsTotalZero" value="0"/>' +
                            '</form>';
                $('.jsPayment .recapitulatif__contentBox').html(_html);

                _bills.forEach(function(_bill,_key) {
                    var _priceDoItYourSelf = 0;
                    var doItYourSelf = false;
                    var radioBill = '';
                    if(_bill.id == _billId)
                    {
                        radioBill = 'checked';
                    }
                    _billHtml = '<div class="jsBill" attr-key="'+_key+'">' +
                                        '<div class="row">' +
                                            '<i class="fa fa fa-remove jsRemoveBill" attr-href="/ajax-remove-bill/'+_bill.id+'"></i>' +
                                            '<div class="recapitulatif__mainContentBox left col-md-6 disLeft">' +
                                                '<div class="recapitulatif__listCalculated">';
                                                    if(flat != null && flat.prescriptions != null)
                                                    {  
                                                        var prescriptions = flat.prescriptions;
                                                        prescriptions.forEach(function(prescription, key){
                                                            if(_bill.dish_id == prescription.dish_id)
                                                            {
                                                                _priceDoItYourSelf = parseFloat(prescription.price);
                                                                if(flat.type == 1)
                                                                {
                                                                    _title = prescription.position == 1 ? 'SEMI-COMPLETE' : 'COMPLETE';
                                                                }else {
                                                                    _title =  Lang.get('client.label.compose_your_dish');
                                                                }
                                                                
                                _billHtml = _billHtml +'<div class="recapitulatif__listGroup__main has-list jsDoItYourself custom-box" attr-number="0" prescription-max="'+ prescription.max_number +'">' +
                                                            '<p class="p-l-5r"><input class="jsRadioBill" type="radio" value="'+_bill.id+'" attr-dish-id="'+_bill.dish_id+'" id="'+_bill.id+'" '+radioBill+'/><label class = "uppercase" for="'+_bill.id+'">'+(_key + 1)+'. '+_title+'</label><label class="notComplete">'+Lang.get('client.message.not_complete')+'</label><span class="pull-right">... <span class="jsDoItYourSelfPrice">'+_priceDoItYourSelf+'</span>€</span></p>' +
                                                                '<i class="fa fa fa-trash jsRemoveOrder disabled"></i>' +
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

                    $('.jsPayment .jsBills').append(_billHtml);
                    
                    if(_bill.orders !== null && _bill.orders.length > 0)
                    {
                        var _orders = _bill.orders;
                        _orders.forEach(function(order){
                            switch(order.type) {
                                case 1: /*Product*/
                                    var product = order.product;                                  
                                    var numberDoItYourSelf = parseInt($('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-number'));
                                    var maxNumberDoItYourSelf = parseInt($('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-max-number'));
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
                                        if(productPrice > 0 && flat.type != 1)
                                        {
                                            var _item = '<div class="jsItem" attr-id="'+product.id+'"><p><span class="jsNumber">'+currentNumber+'</span> x '+ product.object_language.title+' (+ '+currentNumber*productPrice+'€)<i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+product.id+'" attr-number = "'+currentNumber+'"></i><span class="pull-right disabled">… <span class="jsPrice">'+ (currentNumber*productPrice).toFixed(2) +'</span>€</span></p></div><input type="hidden" name="price_yourself_extra['+_bill.id+'][]" value="'+currentNumber*productPrice+'" class="jsPriceYourselExtra"/>';
                                        }else {
                                            var _item = '<div class="jsItem" attr-id="'+product.id+'"><p><span class="jsNumber">'+currentNumber+'</span> x '+ product.object_language.title+' <i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+product.id+'" attr-number = "'+currentNumber+'"></i><span class="pull-right disabled">… <span class="jsPrice">'+ (currentNumber*productPrice).toFixed(2) +'</span>€</span></p></div>';
                                        }

                                        $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsItems[attr-id="'+product.category_id+'"]').append(_item);
                                        if(orderNumber > 0)
                                        {
                                            $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsItems[attr-id="'+product.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                            $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourself').removeClass('disabled');
                                            doItYourSelf = true;
                                        }

                                        $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-number', currentNumber);
                                        /*Extra products*/
                                        if(extraNumber >= 1)
                                        {
                                            var _item = '<div class="jsItem" attr-id="'+product.id+'"><p><span class="jsNumber">'+extraNumber+'</span> x '+ product.object_language.title+' <i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+product.id+'" attr-number = "'+extraNumber+'"></i><span class="pull-right">… <span class="jsPrice">'+ (extraNumber*productPrice).toFixed(2) +'</span>€</span></p></div>';

                                            $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+product.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                            $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+product.category_id+'"]').append(_item);

                                            if(numberDoItYourSelf + extraNumber >= maxNumberDoItYourSelf)
                                            {
                                                $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-number', maxNumberDoItYourSelf);
                                            }else {
                                                $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-number', numberDoItYourSelf + extraNumber);
                                            }
                                            
                                        }else {
                                            $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+product.category_id+'"]').attr('attr-number', numberDoItYourSelf + orderNumber);
                                        }
                                    }else {
                                        var _item = '<div class="jsItem" attr-id="'+product.id+'"><p><span class="jsNumber">'+order.number+'</span> x '+ product.object_language.title+' <i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+product.id+'" attr-number = "'+order.number+'"></i><span class="pull-right">… <span class="jsPrice">'+ (order.number * productPrice).toFixed(2) +'</span>€</span></p></div>';                                        
                                        $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+product.category_id+'"]').append(_item);
                                        if(order.number > 0)
                                        {
                                            $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+product.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                        }
                                    }

                                    if(tmp)
                                    {
                                        setTmp(product.id, 'product');
                                    }

                                    break;
                                case 2:/*Menu*/
                                    menu = order.menu;
                                    var numberDoItYourSelf = $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+menu.category_id+'"]').attr('attr-number');
                                    var maxNumberDoItYourSelf = $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+menu.category_id+'"]').attr('attr-max-number');
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

                                        if(menuPrice > 0 && flat.type != 1)
                                        {
                                            var _item = '<div class="jsItem" attr-id="'+menu.id+'"><p><span class="jsNumber">'+currentNumber+'</span> x '+ menu.object_language.title+' (+ '+currentNumber*menuPrice+'€) <i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+menu.id+'" attr-number = "'+currentNumber+'"></i><span class="pull-right disabled">… <span class="jsPrice">'+ (currentNumber*menuPrice).toFixed(2) +'</span>€</span></p></div>';
                                        }else {
                                            var _item = '<div class="jsItem" attr-id="'+menu.id+'"><p><span class="jsNumber">'+currentNumber+'</span> x '+ menu.object_language.title+' <i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+menu.id+'" attr-number = "'+currentNumber+'"></i><span class="pull-right disabled">… <span class="jsPrice">'+ (currentNumber*menuPrice).toFixed(2) +'</span>€</span></p></div>';
                                        }

                                        $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsItems[attr-id="'+menu.category_id+'"]').append(_item);                                        
                                        if(order.number > 0)
                                        {
                                            $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsItems[attr-id="'+menu.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                            $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourself').removeClass('disabled');
                                            doItYourSelf = true;
                                        }

                                        $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourself .jsCategory[attr-id="'+menu.category_id+'"]').attr('attr-number', parseInt(numberDoItYourSelf) + 1);

                                        /*Extra menus*/
                                        if(extraNumber >= 1)
                                        {
                                            var _item = '<div class="jsItem" attr-id="'+menu.id+'"><p><span class="jsNumber">'+extraNumber+'</span> x '+ menu.object_language.title+' <i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+menu.id+'" attr-number = "'+extraNumber+'"></i><span class="pull-right">… <span class="jsPrice">'+ (extraNumber*menuPrice).toFixed(2) +'</span>€</span></p></div>';

                                            $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsChoiceProduct .jsExtraMenus .jsItems[attr-id="'+menu.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                            $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsChoiceProduct .jsExtraMenus .jsItems[attr-id="'+menu.category_id+'"]').append(_item);
                                        }
                                    }else {
                                        var _item = '<div class="jsItem" attr-id="'+menu.id+'">' +
                                                '<p><span class="jsNumber">'+order.number+'</span> x '+menu.object_language.title+' <i class="jsRemoveItem fa fa fa-trash" attr-bill-id="'+_bill.id+'" attr-id ="'+menu.id+'" attr-number = "'+order.number+'"></i><span class="pull-right">… <span class="jsPrice">'+ (order.number*menuPrice).toFixed(2) +'</span>€</span></p>' +
                                            '</div>' +
                                            '<div class="clearfix"></div>';

                                        $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsExtraMenus .jsItems[attr-id="'+menu.category_id+'"]').append(_item);
                                        if(order.number > 0)
                                        {
                                            $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsExtraMenus .jsItems[attr-id="'+menu.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                        }
                                    }
                                    if(tmp)
                                    {
                                        setTmp(menu.id, 'menu');
                                    }
                                    break;
                            }                        
                        });
                    }else {
                        $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourSelfPrice').text(0);
                        $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsHiddenDoItYourself').val(0);
                    }

                    if(doItYourSelf)
                    {
                        $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourSelfPrice').text(_priceDoItYourSelf);
                    }else {
                        $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsDoItYourSelfPrice').text(0);
                        $('.jsPayment .jsBill[attr-key="'+_key+'"] .jsHiddenDoItYourself').val(0);
                    }

                    //setHeightBill(_key);
                    setMoveToExtraProducts(_key);                                      
                    removeBill($('.jsRemoveBill'));
                    //setTotalPriceHidden(_bill.id,_key);
                    
                });
                addBill($('.jsAddBill'));
                changeBill($('.jsRadioBill'));   
                /*Remove Item Of Bill*/
                removeItem($('.jsPayment .jsRemoveItem'));

                checkNotComplete();
                setTotalPrice() ;
                setPanier();
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

function setTotalPrice()
{
    $('.jsPayment .jsCheckOut').attr('disabled','disabled');
    var _totalPrice = 0;
    var _total_zero = 0;
    $('.jsPayment .right .jsPrice').each(function(key, val) {
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

    $('.jsPayment .left .jsPriceYourselExtra').each(function(key, val) {
        var _priceYourselExtra = parseFloat($(this).val());
        _totalPrice = _totalPrice + _priceYourselExtra;
    });

    $('.jsPayment .left .jsDoItYourSelfPrice').each(function(key, val) {
        var _doItYourSelfPrice = parseFloat($(this).text());
        _totalPrice = _totalPrice + _doItYourSelfPrice;        
    });
    
    $('.jsPayment .jsTotalPrice').text(_totalPrice.toFixed(2));

    var _taxPrice = _totalPrice - _totalPrice/10;
    $('.jsPayment .jsTax').text(_taxPrice.toFixed(2));

    $('.jsPayment .jsTotalZero').val(_total_zero);
    
    if(_totalPrice > 0)
    {
        setTimeout(function(){ $('.jsPayment .jsCheckOut, .jsPanier .jsCheckOut').removeAttr('disabled'); }, 1000);
        $('.jsPayment, .panier').removeClass('disabled');
    }else {
        $('.jsPayment, .panier').addClass('disabled');
    }
}

/*Add Bill*/
function addBill(item)
{
    item.on('click', function(event){
        $('.jsPayment .jsCheckOut , .jsPanier .jsCheckOut').attr('disabled','disabled');
        var _this = $(this);
        _this.attr('disabled', 'disabled');
        var _dishID = $('#prescription .jsDish[attr-key="1"]').val();

        $.ajax({
            url: '/ajax-add-bill/'+flatId+'/'+_dishID,
            type: "POST",
            data: {_token: _token},
            dataType: 'JSON',
            success: function(res){
                if(res.status)
                {
                    setBill(res.data.id);
                    /*Set Bill*/
                    unCheckRadioBills();
                    $('#prescription .jsDish[attr-key="1"]').trigger('click');
                    getBills(flatId, flatType, false);
                    _this.removeAttr('disabled');
                    setTimeout(function(){ $('.jsPayment .jsCheckOut, .jsPanier .jsCheckOut').removeAttr('disabled'); }, 1000);

                    $('.jsScrollTop').trigger('click');
                }
                
            },
            error:function(){
            }
        });
    });        
}

changeDish($('.jsDish'));
function changeDish(item)
{
    item.on('change', function(){
        var _this = $(this);
        var _dishId = _this.val();
        $('#prescription .jsDish').each(function(){
            if($(this).val() != _dishId)
            {
                $(this).removeAttr('checked');
            }else {
                $(this).attr('checked', true);
                var _billId = $('.jsPayment .jsRadioBill:checked').val();
                changeDishForBill(_billId, _dishId);
            }
            
        });
    });
}

function changeDishForBill(billId, dishId)
{
    $.ajax({
        url: '/change-dish-bill/'+billId+'/'+dishId,
        type: "POST",
        data: {_token: _token},
        dataType: 'JSON',
        success: function(res){
            if(res.status)
            {
                /*Set Bill*/
                getBills(flatId, flatType, false);
            }
        },
        error:function(){
        }
    });
}

function setTmp(id, type = 'product')
{
    var _tmpObject = $('.tmpObject').text();
    var _tmpNumber = $('.tmpNumber').text();
    var _arrTmpObject = _tmpObject.split("_");
    var _arrTmpNumber = _tmpNumber.split("_");

    /*Tmp product or menu category*/
    if(_arrTmpObject.indexOf(id) >= 0)
    {
        if(type == 'product')
        {
            var i = _arrTmpObject.indexOf(id);
            $('.jsFlatCategory .jsProduct[attr-id="'+ id +'"]').addClass('active jsActive').find('.jsNumber').text(_arrTmpNumber[i]);

            $('.jsFlatCategory .jsProduct[attr-id="'+ id +'"]').addClass('active jsActive').find('.jsNumber').val(_arrTmpNumber[i]);

            var _minChoice = $('.jsFlatCategory .jsProduct[attr-id="'+ id +'"]').closest('.jsFlatCategory').attr('attr-choice-min');
            $('.jsFlatCategory .jsProduct[attr-id="'+ id +'"]').closest('.jsFlatCategory').attr('attr-choice-min', parseInt(_minChoice) + 1);
        }else {
            var i = _arrTmpObject.indexOf(id);
            /*Tmp Menu*/
            $('.jsMenus .jsProduct[attr-id="'+ id +'"]').addClass('active jsActive').find('.jsNumber').val(_arrTmpNumber[i]);
        }
    }
}

function setMoveToExtraProducts(key=0)
{   
    $('.jsPayment .jsBill[attr-key="'+key+'"] .jsDoItYourself .jsItem').each(function(_key, val) {
        var item = $(this);
        if(item.find('.jsPrice').text() == 0) {
            //item.remove();
        }
    });

    $('.jsPayment .jsBill[attr-key="'+key+'"] .jsDoItYourself .or_flat .jsItem').each(function(_key, val) {
        var attrNumber = parseInt($(this).closest('or_flat').attr('attr-number'));

        if(_key != 0 && attrNumber != 0) {
            var id = $(this).attr('attr-id');
            var fromNumber = parseInt($(this).find('.jsNumber').text());
            var fromPrice = parseInt($(this).find('.jsPrice').text());
            var categoryId = $(this).closest('.or_flat').attr('attr-id');
    
            if($('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"]').length)
            {
                toPrice =  parseInt($('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"] .jsPrice').text());
                toNumber =  parseInt($('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"] .jsNumber').text());

                number = toNumber + fromNumber;
                $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"] .jsNumber').text(number);
                $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"] .jsPrice').text(fromPrice + toPrice);
                $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsItem[attr-id="'+id+'"] .jsRemoveItem').attr('attr-number', number);

                /*Set total price*/
                _totalPrice = parseFloat($('.jsPayment .jsTotalPrice').text());
                $('.jsPayment  .jsBill .jsTotalPrice').text(_totalPrice + fromNumber*fromPrice);

                $('.jsPayment .jsTotalPrice').text(_totalPrice);
            }else {

                $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsCategory[attr-id="'+categoryId+'"]').removeClass('disabled');
                $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsCategory[attr-id="'+categoryId+'"] .jsItems').append($(this));
                $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraMenus .jsCategory[attr-id="'+categoryId+'"] .jsItem[attr-id="'+id+'"] .pull-right').removeClass('disabled');

                /*Set total price*/
                _totalPrice = parseFloat($('.jsPayment .jsTotalPrice').text());
                $('.jsPayment  .jsBill .jsTotalPrice').text(_totalPrice + fromPrice);

            }
            _totalPrice = parseFloat($('.jsPayment .jsTotalPrice').text());
            $('.jsPayment .jsBill[attr-key="'+key+'"] .jsDoItYourself .jsCategory[attr-id="'+categoryId+'"]').addClass('disabled').attr('attr-number', 0);
            //setHeightBill(key);
        }
    });

    $('.jsPayment .jsBill[attr-key="'+key+'"] .jsDoItYourself .or .jsItem').each(function(_key, val) {
        var attrNumber = parseInt($(this).closest('.or').attr('attr-number'));

        if(_key != 0 && attrNumber != 0) {                
            var id = $(this).attr('attr-id');
            var fromNumber = parseInt($(this).find('.jsNumber').text());
            var fromPrice = parseInt($(this).find('.jsPrice').text());
            var categoryId = $(this).closest('.or').attr('attr-id');

            if($('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"]').length)
            {
                toPrice =  parseInt($('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsPrice').text());
                toNumber =  parseInt($('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsNumber').text());

                number = toNumber + fromNumber;
                $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsNumber').text(number);
                $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsPrice').text(fromPrice + toPrice);
                $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsRemoveItem').attr('attr-number', number);

                /*Set total price*/
                _totalPrice = parseFloat($('.jsPayment .jsTotalPrice').text());
                $('.jsPayment  .jsBill .jsTotalPrice').text(_totalPrice + fromNumber*fromPrice);

                $('.jsPayment .jsTotalPrice').text(_totalPrice);
            }else {
                $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsCategory[attr-id="'+categoryId+'"]').removeClass('disabled');
                $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsCategory[attr-id="'+categoryId+'"] .jsItems').append($(this));
                $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsCategory[attr-id="'+categoryId+'"] .jsItem[attr-id="'+id+'"] .pull-right').removeClass('disabled');

                /*Set total price*/
                _totalPrice = parseFloat($('.jsPayment .jsTotalPrice').text());
                $('.jsPayment  .jsBill .jsTotalPrice').text(_totalPrice + fromPrice);

            }
            _totalPrice = parseFloat($('.jsPayment .jsTotalPrice').text());
            $('.jsPayment .jsBill[attr-key="'+key+'"] .jsDoItYourself .jsCategory[attr-id="'+categoryId+'"]').addClass('disabled').attr('attr-number', 0);
            //setHeightBill(key);
        }
    });

    $('.jsPayment .jsBill[attr-key="'+key+'"] .jsDoItYourself .and').each(function(_key, val) {
        var attrMaxNumber = parseInt($(this).attr('attr-max-number'));
        var numberHidden = 0;
        if(attrMaxNumber != 0) {                
            var categoryId = $(this).attr('attr-id');
            $('.jsPayment .jsBill[attr-key="'+key+'"] .jsDoItYourself .and[attr-id="'+categoryId+'"] .jsItem').each(function(_keyItem, _valItem) {
                var id = $(this).attr('attr-id');      
                var fromNumber =  parseInt($('.jsPayment .jsBill[attr-key="'+key+'"] .jsDoItYourself .and[attr-id="'+categoryId+'"] .jsItem[attr-id="'+id+'"] .jsNumber').text());
                var fromPrice =  parseInt($('.jsPayment .jsBill[attr-key="'+key+'"] .jsDoItYourself .and[attr-id="'+categoryId+'"] .jsItem[attr-id="'+id+'"] .jsPrice').text());
                numberHidden = parseInt(numberHidden) + fromNumber;
                if(numberHidden > attrMaxNumber)
                {
                    if($('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"]').length)
                    {
                        toPrice =  parseInt($('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsPrice').text());
                        var toNumber =  parseInt($('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsNumber').text());

                        number = toNumber + fromNumber;
                        $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsNumber').text(number);
                        $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsPrice').text(fromPrice + toPrice);
                        $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsItem[attr-id="'+id+'"] .jsRemoveItem').attr('attr-number', number);
                        /*Set total price*/
                        _totalPrice = parseFloat($('.jsPayment .jsTotalPrice').text());
                        $('.jsPayment  .jsBill .jsTotalPrice').text(_totalPrice + fromNumber*fromPrice);

                        $('.jsPayment .jsTotalPrice').text(_totalPrice);
                    }else {
                        $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsCategory[attr-id="'+categoryId+'"]').removeClass('disabled');
                        $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsCategory[attr-id="'+categoryId+'"] .jsItems').append($(this));
                        $('.jsPayment .jsBill[attr-key="'+key+'"] .jsExtraProducts .jsCategory[attr-id="'+categoryId+'"] .jsItem[attr-id="'+id+'"] .pull-right').removeClass('disabled');

                        /*Set total price*/
                        _totalPrice = parseFloat($('.jsPayment .jsTotalPrice').text());
                        $('.jsPayment  .jsBill .jsTotalPrice').text(_totalPrice + fromPrice);

                    }
                    _totalPrice = parseFloat($('.jsPayment .jsTotalPrice').text());
                    $(this).remove();
                }
            });
        }
    });
}

function setTotalPriceHidden(billId, key)
{
    var totalPriceHidden = 0;
    $('.jsPayment .jsBill[attr-key="'+key+'"] .jsDoItYourself .jsItem').each(function(key, val) {
        var price = parseFloat($(this).find('.jsPrice').text());
        totalPriceHidden = totalPriceHidden + price; 
    });
    $('#frmCheckout').append('<input type="hidden" name="total_price_hidden['+billId+']" value="'+totalPriceHidden+'"/>');
}

function changeBill(item)
{
    item.on('change', function(){
        var _this = $(this);
        var _billId = _this.val();
        var _dishId = _this.attr('attr-dish-id');

        $('.jsPanier .jsRadioBill').each(function(){
            if($(this).val() != _billId)
            {
                $(this).removeAttr('checked');
            }else {
                $(this).attr('checked', true);
            }
            
        });

        $('.jsPayment .jsRadioBill').each(function(){
            if($(this).val() != _billId)
            {
                $(this).removeAttr('checked');
            }else {
                $(this).attr('checked', true);
            }
            
        });
        setBill(_billId);

        $('#prescription .jsDish').each(function(){
            if($(this).val() != _dishId)
            {
                $(this).removeAttr('checked');
            }else {
                //$(this).attr('checked', true);
                $('#prescription .jsDish[value="'+_dishId+'"]').trigger('click');
            }
            
        });
    });
}

function unCheckRadioBills()
{
    $('.jsPanier .jsRadioBill').each(function(){
        $(this).removeAttr('checked');        
    });

    $('.jsPayment .jsRadioBill').each(function(){
        $(this).removeAttr('checked');
    })
}

function setBill(_billId)
{
    $('.tmpBill').attr('attr-bill-id', _billId);
    $('.jsProduct').each(function(key, val) {
        $(this).find('.jsUpNumber').attr('attr-bill-id', _billId);
        $(this).find('.jsDownNumber').attr('attr-bill-id', _billId);
    });
}

$('.panier .theme-icon-cartButton').click(function() {
    /* Act on the event */
    var heightFull = $(window).height();
    var heightPanier = $('.panier #recapitulatif').height();
    $('.panier #recapitulatif').animate({ 'width': 'toggle' }, 500);
    $(this).toggleClass('active');
    $('.panier').toggleClass('active');
    $('.bg-panier').toggleClass('active');

    if (heightPanier > heightFull) {
        $('.panier #recapitulatif').toggleClass("activeScoll");
    }

    if($(this).hasClass('active')) {
        setPanier();
    }else {
        setPayment();
    }
});

function setPanier()
{
    var htmlPanier = $('.jsPayment .recapitulatif__contentBox').html();
    $('.jsPanier .recapitulatif__contentBox').html(htmlPanier);

    addBill($('.jsPanier .jsAddBill'));
    changeBill($('.jsPanier .jsRadioBill'));   
    /*Remove Item Of Bill*/
    removeItem($('.jsPanier .jsRemoveItem'));
    /*Remove Bill*/
    removeBill($('.jsPanier .jsRemoveBill'));

}

function setPayment()
{
    var htmlPayment = $('.jsPanier .recapitulatif__contentBox').html();
    $('.jsPayment .recapitulatif__contentBox').html(htmlPayment);

    addBill($('.jsPayment .jsAddBill'));
    changeBill($('.jsPayment .jsRadioBill'));   
    /*Remove Item Of Bill*/
    removeItem($('.jsPayment .jsRemoveItem'));
    /*Remove Bill*/
    removeBill($('.jsPayment .jsRemoveBill'));
}

