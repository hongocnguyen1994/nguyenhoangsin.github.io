$('.jsLoadProducts').on('click', function(){
    loadProducts($(this));
})

function loadProducts(item)
{
    var _this = item;
    var _url = _this.attr('attr-href');
    var _page = _this.attr('attr-page') != undefined ? _this.attr('attr-page') : 1;
    $.ajax({
        url: _url+ '?page=' + _page,
        type: "GET",
        data: {_token: _token},
        dataType: 'JSON',
        success: function(res)
        {
            if(res.status) {
                $('.jsProducts').append('<div class="row jsItems"></div>');
                datas = res.data;
                datas.forEach(function(data) {
                    var _description = data.object_language.description != null ? data.object_language.description : '';
                    var _content = data.object_language.content != null ? data.object_language.content : '';
                    var _title = data.object_language.title != null ? data.object_language.title : '';
                    var _product =   '<a href="#bannerBio">' +
                                        '<div class="gridBlock__listItem col-md-2 col-sm-3 col-xs-4 jsItem" attr-title = "'+ _title+'" attr-description="'+ _description +'" attr-content="'+_content+'">' +
                                            '<div class="gridBlock__thumb">' +
                                                '<div class="gridBlock__mainThumb">' +
                                                    '<img src="/uploads/product/'+ data.image +'" class="w-h-216" data-toggle="modal" data-target="#imgModal-'+data.id+'">' +
                                                '</div>' +
                                            '</div>' +
                                            '<h3>' + data.object_language.title + '</h3>' +              
                                        '</div>' +
                                    '</a>' +
                                    '<div class="modal fade" id="imgModal-'+data.id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
                                        '<div class="modal-dialog" role="document">' +
                                            '<div class="modal-content">' +
                                                '<div class="modal-body">' +
                                                    '<img src="/uploads/product/'+ data.image +'" class="w-h-full">' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>';
                    $('.jsItems:last-child').append(_product);
                    updateDescription($('.jsItem'));
                });

                var _limit = res.limit;
                var _page = parseInt(res.page);
                var _total = res.total;

                if(_page * _limit < _total )
                {
                    _this.attr('attr-href', _url).attr('attr-page', ++_page).show();
                    
                }else {
                    _this.remove();
                }
                setHeightProduct();
            }          
        },
        error:function(){
        }
    });
}



updateDescription($('.jsItem'));
function updateDescription(item)
{
    item.on('click', function() {
        var _this = $(this);
        var  _title = _this.attr('attr-title');
        var _description = _this.attr('attr-description');
        var _content = nl2br(_this.attr('attr-content'));

        $('.jsTitle').text(_title);
        $('.jsDescription').text(_description);
        $('.jsContent').html('<p></p>')
        $('.jsContent p').replaceWith(_content);
    })
}


function setHeightProduct() {
    var _maxHeight = 198;
    var items = $('.jsProducts .jsItem');
    items.each(function(key, element) {
        var _height = $(this).height();
        if(_height > _maxHeight)
        {
            _maxHeight = _height;
        }
    });
    items.each(function(key, element) {
        $(this).height(_maxHeight);
    });
}
setHeightProduct();
