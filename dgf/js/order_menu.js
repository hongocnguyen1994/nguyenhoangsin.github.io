var _token = $('meta[name="csrf-token"]').attr('content');

/*$(document).on('click', '.jsChoiceCategory',  function(e) {
    var _this = $(this);
    var _class = _this.attr('attr-class');
    if(_this.hasClass('active'))
    {
        return false;
    }
    $('.jsMenus').addClass('disabled');
    $('.' + _class).removeClass('disabled');

    $('.jsChoiceCategory').each(function() {
        $(this).removeClass('active');
    });
    _this.addClass('active');

    if ($('.' + _class + ' .row').length == 0) {
        loadData(_this);
    }

    var _attrKey = _this.attr('attr-key');
    $('.jsRadioChoiceCategory[attr-key = "'+_attrKey+'"]').trigger('click');
});*/

$('.jsLoadMore').on('click', function() {
    loadData($(this));
})
$('.jsRadioChoiceCategory').each(function() {
    var _this = $(this); 
    if($(this).is(":checked")) {
        var _val = _this.val();
        var _class = _this.attr('attr-class');

        $('.jsMenus').addClass('disabled');
        $('.' + _class).removeClass('disabled');
        loadData(_this);
    };
});

$('.jsRadioChoiceCategory').on('change', function() {
    var _this = $(this);
    var _val = _this.val();
    var _class = _this.attr('attr-class');

    $('.jsMenus').addClass('disabled');
    $('.' + _class).removeClass('disabled');

    $('.jsChoiceCategory').each(function() {
        $(this).removeClass('active');
    });

    $('.jsChoiceCategory[attr-key = "'+_val+'"]').addClass('active');

    if ($('.' + _class + ' .row').length == 0) {
        loadData(_this);
    }
});

/*$('.jsChoiceCategory').on('click', function(){
    var _this = $(this);
    var _attrKey = _this.attr('attr-key');
    $('.jsRadioChoiceCategory[value="'+_attrKey+'"]').trigger('click');
    if(!_this.hasClass('active')) {
        _this.trigger('click');
        alert('a');
    }
});*/

function loadData(item) {
    var _this = item;
    var _class = _this.attr('attr-class');
    var _url = _this.attr('attr-href');
    var _page = _this.attr('attr-page') != undefined ? _this.attr('attr-page') : 1;

    var _tmpObject = $('.tmpObject').text();
    var _tmpNumber = $('.tmpNumber').text();
    var _arrTmpObject = _tmpObject.split("_");
    var _arrTmpNumber = _tmpNumber.split("_");

    var _billId = $('.tmpBill').attr('attr-bill-id');
    var flatType = $('.tmpBill').attr('attr-flat-type');

    $.ajax({
        url: _url + '?page=' + _page,
        type: "GET",
        data: { _token: _token },
        dataType: 'JSON',
        success: function(res) {
            if (res.status) {
                $('.' + _class).append('<div class="row"></div>');
                datas = res.data;
                datas.forEach(function(data, key) {
                    var arrMenuCategory = [];
                    var arrCategory = [];
                    var categories = data.menu_categories;
                    var clearFix = '';
                    var last = '';
                    if (key % 2 != 0) {
                        clearFix = '<div class="clearfix"></div>';
                        last = 'last';
                    }

                    var _menu = '<div class="baseProduct__listItem col-sm-6 jsProduct ' + last + '" attr-id="' + data.id + '">' +
                        '<div class="baseProduct__listItem__mainBox">' +
                        '<span class="price"><span>' + data.object_language.title + '</span> - ' + data.object_language.price + ' €</span>' +
                        '<div class="baseProduct__thumb">' +
                        '<img src="/uploads/menu/' + data.image + '" alt="thumb">' +
                        '</div>' +
                        '<div class="">' +
                        '<div class="controleGroup">' +
                        '<span>  ' +
                        '<input type="text" value="0" class="jsNumber">' +
                        '<a class="ui-spinner-button ui-spinner-up jsUpNumber" attr-id="' + data.id + '" attr-bill-id="' + _billId + '"></a>' +
                        '<a class="ui-spinner-button ui-spinner-down jsDownNumber" attr-id="' + data.id + '" attr-bill-id="' + _billId + '"></a>' +
                        '</span>' +
                        '</div>' +
                        '<div class="baseProduct__info text-center">' +
                        '<p class="jsMenuCategories"></p>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' + clearFix;
                    $('.' + _class + ' .row:last-child').append(_menu);
                    Object.keys(categories).forEach(function(key) {
                        var menuCategory = categories[key];
                        var arrDetail = {
                            'title': menuCategory.category.object_language.title,
                            'str': ''
                        };
                        arrMenuCategory.push(arrDetail);
                        arrCategory.push(menuCategory.category.id);

                    });

                    if (data.menu_products.length != 0) {
                        var menuProducts = data.menu_products;
                        Object.keys(menuProducts).forEach(function(key) {
                            var product = menuProducts[key].product;
                            if (product.category != null) {
                                var inc = arrCategory.indexOf(product.category.id);
                                arrMenuCategory[inc]['str'] = arrMenuCategory[inc]['str'] + product.object_language.title + ' / ';
                            }
                        });
                    }

                    if (arrMenuCategory.length != 0) {
                        Object.keys(arrMenuCategory).forEach(function(key) {
                            if (arrMenuCategory[key]['str'] != '') {
                                var strMenuCategory = '<span>' + ucwords(arrMenuCategory[key]['title']) + ' : ' + ucwords(arrMenuCategory[key]['str'].substr(0, arrMenuCategory[key]['str'].length - 2)) + '</span> <br>';
                                $('.jsProduct[attr-id="' + data.id + '"] .jsMenuCategories').append(strMenuCategory);
                            }
                        });
                    }

                    upNumber($('.jsUpNumber'));
                    downNumber($('.jsDownNumber'));
                    changeNumber($('.jsNumber'));

                    /*Tmp Menu*/
                    if (_arrTmpObject.indexOf(data.id)) {
                        var i = _arrTmpObject.indexOf(data.id);
                        if (_arrTmpNumber[i] != undefined) {
                            $('.jsMenus .jsProduct[attr-id="' + data.id + '"]').addClass('active').find('.jsNumber').val(_arrTmpNumber[i]);
                        }
                    } else {
                        $('.jsMenus .jsProduct[attr-id="' + data.id + '"]').addClass('active').find('.jsNumber').val(_arrTmpNumber[0]);
                    }
                });
            }
        },
        error: function() {}
    });
}

function ucwords(str) {
    return str.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}