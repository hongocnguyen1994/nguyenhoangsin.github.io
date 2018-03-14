var _token = $('meta[name="csrf-token"]').attr('content');

$('.baseProduct').show();

function nl2br (str) {   
    var breakTag = '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}

function ucwords(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// Uppercase every first letter of a word
jQuery.fn.setUcwords = function() {
  return this.each(function(){
    var val = $(this).text(), newVal = '';
    newVal = ucwords(val);
    $(this).text(newVal);
  });
}

function truncateString(str, num = 120) {
  if (num > str.length){
    return str;
  } else{
    str = str.substring(0,num);
    return str+"...";
  }

}

/*Up Number*/
upNumber($('.jsUpNumber'));
function upNumber(item)
{
    item.on('click', function(event){
        var _this = $(this);
        if ($(this).is("[disabled]")) {
            return false;
        }
        _this.attr('disabled', 'disabled');
        $('.jsBill').removeClass('disabled');

        /*Get min && max */
        var _maxChoice = _this.closest('.jsFlatCategory').attr('attr-choice-max');
        var _minChoice = _this.closest('.jsFlatCategory').attr('attr-choice-min');

        if(parseInt(_minChoice) >= parseInt(_maxChoice))
        {
            var title =  Lang.get('general.label.message');
            var type = "error";
            var msg= "You can only select "+_maxChoice+" item";
            toastr[type](msg, title);
            _this.removeAttr('disabled');
            return false;
        }
        var _tmpObject = $('.jsTmpObject').text();
        var _tmpNumber = $('.jsTmpNumber').text();
        var _arrTmpObject = _tmpObject.split("_");
        var _arrTmpNumber = _tmpNumber.split("_");
        var _url = _this.closest('.jsProduct').attr('attr-href');
        $.ajax({
            url: _url,
            type: "POST",
            data: {_token: _token},
            dataType: 'JSON',
            success: function(res){
                if(res.status)
                {
                    var _totalPrice = parseFloat($('.jsBill .jsTotalPrice').text());
                    var _data = res.data;
                    if(res.type == 1) /*Product*/
                    {
                        var numberDoItYourSelf = $('.jsBill .jsDoItYourself .jsCategory[attr-id="'+_data.category_id+'"]').attr('attr-number');
                        var maxNumberDoItYourSelf = $('.jsBill .jsDoItYourself .jsCategory[attr-id="'+_data.category_id+'"]').attr('attr-max-number');

                        if(numberDoItYourSelf < maxNumberDoItYourSelf)/*DoItYourSelf*/
                        {   
                            var numberItem = parseInt($('.jsBill .jsDoItYourself .jsItems[attr-id="'+_data.category_id+'"] .jsItem[attr-id="'+_data.id+'"] .jsNumber').text());
                            if(!isNaN(numberItem))
                            {
                                $('.jsBill .jsDoItYourself .jsItems[attr-id="'+_data.category_id+'"] .jsItem[attr-id="'+_data.id+'"] .jsNumber').text(numberItem + 1);
                            }else
                            {
                                var _item = '<div class="jsItem" attr-id="'+_data.id+'"><p><span class="jsNumber">1</span> '+ _data.object_language.title+'</p></div>';
                                $('.jsBill .jsDoItYourself .jsItems[attr-id="'+_data.category_id+'"]').append(_item);
                            }                            

                            $('.jsBill .jsDoItYourself .jsItems[attr-id="'+_data.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                $('.jsBill .jsDoItYourself').removeClass('disabled');

                            $('.jsBill .jsDoItYourself .jsCategory[attr-id="'+_data.category_id+'"]').attr('attr-number', parseInt(numberDoItYourSelf) + 1);
                        }else {
                            var numberItem = parseInt($('.jsBill .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+_data.category_id+'"] .jsItem[attr-id="'+_data.id+'"] .jsNumber').text());
                            if(!isNaN(numberItem))
                            {
                                $('.jsBill .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+_data.category_id+'"] .jsItem[attr-id="'+_data.id+'"] .jsNumber').text(numberItem + 1);
                            }else
                            {
                                var _item = '<div class="jsItem" attr-id="'+_data.id+'"><p><span class="jsNumber">1</span> '+ _data.object_language.title+' <span class="pull-right">… <span class="jsPrice">'+ _data.object_language.price+'</span>€</span></p></div>';

                                $('.jsBill .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+_data.category_id+'"]').closest('.jsCategory').removeClass('disabled');
                                $('.jsBill .jsChoiceProduct .jsExtraProducts .jsItems[attr-id="'+_data.category_id+'"]').append(_item);

                                _totalPrice = _totalPrice + (_data.object_language.price);
                            }
                        }
                        var inc = 0;
                        /*Tmp product category*/
                        if(_data != null && _arrTmpObject.indexOf(_data.id) >= 0)
                        {
                            var i = _arrTmpObject.indexOf(_data.id);
                            $('.jsFlatCategory .jsProduct[attr-id="'+ _data.id +'"]').addClass('active jsActive').find('.jsNumber').text(_arrTmpNumber[i]);

                            $('.jsFlatCategory .jsProduct[attr-id="'+ _data.id +'"]').addClass('active jsActive').find('.jsNumber').val(_arrTmpNumber[i]);

                            inc++;
                            var _minChoice = $('.jsFlatCategory .jsProduct[attr-id="'+ _data.id +'"]').closest('.jsFlatCategory').attr('attr-choice-min');
                            $('.jsFlatCategory .jsProduct[attr-id="'+ _data.id +'"]').closest('.jsFlatCategory').attr('attr-choice-min', parseInt(_minChoice) + 1);
                        } 
                    }else {/*Menu*/
                        var _item = $('.jsBill .jsChoiceMenus .jsItem[attr-id="'+_data.id+'"]');

                        if(_item.length > 0)
                        {
                            var _number = parseInt(_item.find('.jsNumber').text()) + 1;
                            _item.find('.jsNumber').text(_number);
                            _item_panier.find('.jsNumber').text(_number);

                            var _price = parseFloat(_item.find('.jsPrice').text()) + _data.object_language.price;
                            _item.find('.jsPrice').text(_price);
                            _item_panier.find('.jsPrice').text(_price);
                        }else {
                            var _item = '<div class="recapitulatif__listGroup__main jsItem" attr-id="'+_data.id+'">' +
                                        '<p><span class="jsNumber">1</span> x '+_data.object_language.title+' <span class="pull-right">……… <span class="jsPrice">'+_data.object_language.price+'</span>€</span></p>' +
                                    '</div>';
                            $('.jsBill .jsChoiceMenus').append(_item);
                        }
                         _totalPrice = _totalPrice + _data.object_language.price;
                    }

                    $('.jsBill .jsTotalPrice').text(_totalPrice); 

                    var _number = parseInt(_this.closest('.jsProduct').find('.jsNumber').val());
                    if(isNaN(_number))
                    {
                        _number = parseInt(_this.closest('.jsProduct').find('.jsNumber').text());
                    }

                    _this.closest('.jsProduct').find('.jsNumber').val(_number + 1).text(_number + 1);
                    if(_number == 0) {                        
                        _this.closest('.jsFlatCategory').attr('attr-choice-min', parseInt(_minChoice) + 1);
                    }

                    /*Set height*/
                    setHeightBill();
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
        if ($(this).is("[disabled]")) {
            return false;
        }
        _this.attr('disabled', 'disabled');
        var _number = parseInt(_this.closest('.jsProduct').find('.jsNumber').val());
        if(_number >= 1)
        {
            var _url = _this.attr('attr-href');
            $.ajax({
                url: _url,
                type: "POST",
                data: {_token: _token},
                dataType: 'JSON',
                success: function(res){
                    if(res.status)
                    {
                        var _totalPrice = parseFloat($('.jsBill .jsTotalPrice').text());
                        var _data = res.data;
                        if(res.type == 1) /*Product*/
                        {
                            if(_data.category.type == 3) /*product extra*/
                            {
                                var _category  = $('.jsBill .jsChoiceProduct .jsCategory[attr-id = "'+_data.category_id+'"]');
                            }else {
                                var _category  = $('.jsBill .jsDoItYourself .jsCategory[attr-id = "'+_data.category_id+'"]');

                                var _numberDoItYourSelf = parseInt($('.jsBill .jsDoItYourself').attr('attr-number')) - 1;
                                $('.jsBill .jsDoItYourself').attr('attr-number', _numberDoItYourSelf);

                                if(_numberDoItYourSelf == 0)
                                {
                                    $('.jsBill .jsDoItYourself').addClass('disabled');
                                }
                            }

                            if(_category.length > 0)
                            {
                                var _number = parseInt(_category.find('.jsItem[attr-id="'+_data.id+'"]').find('.jsNumber').text()) - 1;
                                _category.find('.jsItem[attr-id="'+_data.id+'"]').find('.jsNumber').text(_number);

                                var _price = parseFloat(_category.find('.jsItem[attr-id="'+_data.id+'"]').find('.jsPrice').text()) - _data.object_language.price;
                                _category.find('.jsItem[attr-id="'+_data.id+'"]').find('.jsPrice').text(_price);

                                if(_number == 0)
                                {
                                    _category.find('.jsItem[attr-id="'+_data.id+'"]').remove();
                                }

                                if(_category.find('.jsItem[attr-id="'+_data.id+'"]').length == 0)
                                {
                                    _category.addClass('disabled');
                                }
                            }
                            _totalPrice = _totalPrice - _data.object_language.price;   
                        }else {/*Menu*/
                            var _item = $('.jsBill .jsChoiceMenus .jsItem[attr-id="'+_data.id+'"]');

                            if(_item.length > 0)
                            {
                                var _number = parseInt(_item.find('.jsNumber').text()) - 1;
                                _item.find('.jsNumber').text(_number);
                                _item_panier.find('.jsNumber').text(_number);

                                var _price = parseFloat(_item.find('.jsPrice').text()) - _data.object_language.price;
                                _item.find('.jsPrice').text(_price);
                                _item_panier.find('.jsPrice').text(_price);

                                if(_number == 0)
                                {
                                    _item.remove();
                                    _item_panier.remove();
                                }
                            }
                             _totalPrice = _totalPrice - _data.object_language.price;
                        }

                        $('.jsBill .jsTotalPrice').text(_totalPrice); 

                        var _number = parseInt(_this.closest('.jsProduct').find('.jsNumber').val());
                        if(isNaN(_number))
                        {
                            _number = parseInt(_this.closest('.jsProduct').find('.jsNumber').text());
                        }

                        _this.closest('.jsProduct').find('.jsNumber').val(_number - 1).text(_number - 1);

                        if(_number == 1)
                        {
                            /*Get min && max */
                            var _minChoice = _this.closest('.jsFlatCategory').attr('attr-choice-min');
                            if(parseInt(_minChoice) >= 0)
                            {
                                _this.closest('.jsFlatCategory').attr('attr-choice-min', parseInt(_minChoice) -1);
                            }
                        }
                        
                        /*Set height*/
                        setHeightBill();
                        _this.removeAttr('disabled');
                    }
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
function setHeightBill()
{
    var _height= $('.jsBill .jsChoiceProduct').height();

    $('.jsBill .recapitulatif__mainContentBox.right').css("height", _height + 300);
}

/*View PDF File*/
$('.showPdf').on('click',function(){
    var pdf_link = $(this).attr('attr-href');
    var iframe = '<div class="iframe-container" style="min-height: 400px;"><iframe class="embed-container allowfullscreen webkitallowfullscreen" src="'+pdf_link+'"></iframe></div>'
    $('#pdf .modal-body').html(iframe);
    $('#pdf .modal-footer .download').attr('href', pdf_link);
    $('.jsPDF').trigger('click');
    return false;        
}); 
