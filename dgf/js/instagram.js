var _token = $('meta[name="csrf-token"]').attr('content');

$('.jsLoadMore').on('click', function(){
    var _this = $(this);
    var _url = _this.attr('attr-href');
    var _page = _this.attr('attr-page') != undefined ? _this.attr('attr-page') : 1;
    _this.hide();

    $.ajax({
        url: _url + '?page=' + _page,
        type: "GET",
        data: {_token: _token},
        dataType: 'JSON',
        success: function(res)
        {
            if(res.status) {
                datas = res.data;
                datas.forEach(function(data) {
                    var _item = '<div class="col-sm-3">' +
                                    '<a class="javascript:void(0);">' +
                                        '<div class="instagram" style="background:url('+data.url+') no-repeat center center; background-size:cover;"></div>' +
                                    '</a>' +
                                '</div>';
                    $('.jsImages').append(_item);
                });

                var _limit = res.limit;
                var _page = parseInt(res.page);
                var _total = res.total;

                if(_page * _limit >= _total )
                {
                    _this.hide().attr('attr-href', _url).attr('attr-page', 2);
                }else {
                    _this.attr('attr-href', _url).attr('attr-page', ++_page).show();
                }
                setSizeImage();
            }
        },
        error:function(){
        }
    });
})

setSizeImage();
function setSizeImage()
{
    var size = $('.col-sm-3').width();
    $('.instagram').each(function(key, obj) {
        $(this).height(size).width(size);

    });
}