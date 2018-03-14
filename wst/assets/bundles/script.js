(function ($) {

    $(function () {});

    $(window).load(function () {
        $(".pagination-part-2").hide();

        // tabs
        $(function () {
            $("#tabs").tabs();
        });

        // check box
        $(function () {
            $(".check-js").checkboxradio();
        });

        // select design
        $(function () {
            $(".salutation").selectmenu();
        });

        // tooltip
        $(function () {
            $(".mytooltip").tooltip();
        });

        // toggle class
        $(function () {
            $('.sort-by-box .btn').click(function () {
                $(this).toggleClass('actives');
            });

            //drop
            $('.translation-service .icon-dropdow-svg').click(function () {
                /* Act on the event */
                $(this).parent().next().slideToggle();
            });
        });
        // click icon check
        $(function () {
            $(".copyright-sigup i").click(function () {
                if ($(this).hasClass("theme-icon-check-out")) {
                    $(this).removeClass("theme-icon-check-out");
                    $(this).addClass("theme-icon-check");
                } else {
                    $(this).removeClass("theme-icon-check");
                    $(this).addClass("theme-icon-check-out");
                }
            });
        });

        // scroll to top
        $("a[href='#top']").click(function () {
            /* Act on the event */
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });

        //bx slider
        $('.main-markets-categories').bxSlider({
            moveSlides: 1,
            slideMargin: 0,
            autoStart: true,
            slideWidth: 1115,
            controls: false
        });

        //bx slider
        $('.main-feature-sellers').bxSlider({
            moveSlides: 1,
            slideMargin: 0,
            autoStart: true,
            slideWidth: 1115
        });

        //bx slider
        $('.slider-serch-box').bxSlider({
            minSlides: 2,
            maxSlides: 3,
            moveSlides: 1,
            slideMargin: 5,
            autoStart: true,
            slideWidth: 165
        });

        //bx slider
        $('.slide-photos-box ul').bxSlider({
            moveSlides: 1,
            slideMargin: 0,
            auto: true,
            slideWidth: 279
        });

        // push bx slider
        $("#markets-categories .bx-controls").after($("#markets-categories .bx-viewport"));
        $("#feature-sellers .bx-controls").after($("#feature-sellers .bx-viewport"));

        // drop dow menu
        $('.button-menu').click(function () {
            $(this).toggleClass('active');
            $('.main-menu-dropdow').slideToggle('slow');
        });

        // drop dow menu
        $('.list-box-make > h2').click(function () {
            $(this).next().toggleClass('active');
            $(this).next().slideToggle('slow');
        });

        // drop dow comments
        $('.group-list-commnets .boot-commnets .comments').click(function () {
            $(this).toggleClass('active');
            $(this).parent().parent().parent().parent().toggleClass('active');
            return false;
        });

        // drop dow comments
        $('.group-list-commnets .boot-commnets .reply').one("click", function () {
            $(this).toggleClass('active');
            $(this).parent().parent().parent().parent().append('<div class="post-commnets"><div class="top-post-commnets"><i class="theme-icon-user"></i><div class="form-post-commnet"><textarea name="commnets" placeholder="Add your comment..."></textarea></div></div><div class="text-right"><button type="button" class="btn btn-cancel">Cancel</button><button type="button" class="btn btn-reply">Reply</button></div></div>');
            return false;
        });

        // drop dow table
        $('.panel-select .theme-icon-selectmenu').click(function () {
            $(this).parent().parent().next().slideToggle('slow');
            $(this).toggleClass('active');
        });

        // drop dow table
        $('.panel-heading-column .icon-dropdow-svg').click(function () {
            $(this).parent().parent().parent().next().slideToggle('slow');
            $(this).toggleClass('active');
        });

        // drop dow table
        $('.mobile-table .item-list h2').click(function () {
            $(this).next().slideToggle('slow');
            $(this).toggleClass('active');
        });

        // page buy-credit  
        $('#show-modal-buy-credit').click(function () {
            $('.modal-checkout').hide();
            $('.modal-credit').show();
        });

        $('#button-checkout').click(function () {
            $('.modal-checkout').show();
            $('.modal-credit').hide();
        });

        $(".mCustomScrollbar").mCustomScrollbar();

        /* Brands Wholesales show filter*/
        $("#filter-wholesales").hide();
        $(".list-shopping .btn-wholesales").click(function () {
            $("#filter-wholesales").slideDown(400);
            $(this).addClass("active");
            $(".list-shopping .btn-shopping").removeClass("active");
        });
        $(".list-shopping .btn-shopping").click(function () {
            $("#filter-wholesales").slideUp(400);
            $(this).addClass("active");
            $(".list-shopping .btn-wholesales").removeClass("active");
        });

        //Grid show filter
        $('#filter-block.show-grid .list-select-box').click(function () {
            $('#filter-block.show-grid .list-select-box').removeClass("active");
            $(this).addClass("active");
        });

        // Brands Wholesales
        // Condition
        $(function () {
            if ($('.slider-start-review').length !== 0) {
                var keypressSlider = document.getElementById('keypresswholesales1');
                var input0 = document.getElementById('input-with-keypress-0-min');
                var input1 = document.getElementById('input-with-keypress-1-max');
                var inputs = [input0, input1];

                noUiSlider.create(keypressSlider, {
                    start: [0, 100],
                    connect: true,
                    range: {
                        'min': [0],
                        'max': 100
                    }
                });

                keypressSlider.noUiSlider.on('update', function (values, handle, positions) {
                    inputs[handle].value = positions[handle].toFixed(0) + '%';
                });
            }
        });

        // Price
        $(function () {
            if ($('.slider-start-review').length !== 0) {
                var keypressSlider = document.getElementById('keypresswholesales2');
                var input0 = document.getElementById('input-with-keypress-01-min');
                var input1 = document.getElementById('input-with-keypress-11-max');
                var inputs = [input0, input1];

                noUiSlider.create(keypressSlider, {
                    start: [0, 3000],
                    connect: true,
                    range: {
                        'min': [0],
                        'max': 3000
                    }
                });

                keypressSlider.noUiSlider.on('update', function (values, handle, positions) {
                    inputs[handle].value = positions[handle].toFixed(0);
                });
            }
        });

        // Rating
        $(function () {
            if ($('.slider-start-review').length !== 0) {
                var keypressSlider = document.getElementById('keypresswholesales3');
                var input0 = document.getElementById('input-with-keypress-02-min');
                var input1 = document.getElementById('input-with-keypress-12-max');
                var inputs = [input0, input1];

                noUiSlider.create(keypressSlider, {
                    start: [0, 10],
                    connect: true,
                    range: {
                        'min': [0],
                        'max': 10
                    },
                    pips: {
                        mode: 'values',
                        values: [6, 7, 8, 9],
                        density: 10
                    }
                });

                keypressSlider.noUiSlider.on('update', function (values, handle, positions) {
                    inputs[handle].value = positions[handle].toFixed(1);
                });
            }
        });

        // Promotion
        $(function () {
            if ($('.slider-start-review').length !== 0) {
                var keypressSlider = document.getElementById('keypresswholesales4');
                var input0 = document.getElementById('input-with-keypress-03-min');
                var input1 = document.getElementById('input-with-keypress-13-max');
                var inputs = [input0, input1];

                noUiSlider.create(keypressSlider, {
                    start: [0, 100],
                    connect: true,
                    range: {
                        'min': [0],
                        'max': 100
                    }
                });

                keypressSlider.noUiSlider.on('update', function (values, handle, positions) {
                    inputs[handle].value = positions[handle].toFixed(0) + '%';
                });
            }
        });

        $(function () {
            if ($('.need-more-credit .slider-start-review').length !== 0) {
                var keypressSlider = document.getElementById('keypress');
                var input0 = document.getElementById('input-with-keypress-0');
                var input1 = document.getElementById('input-with-keypress-1');
                var inputs = [input0, input1];

                noUiSlider.create(keypressSlider, {
                    start: [0, 10],
                    connect: true,
                    range: {
                        'min': [0],
                        'max': 10
                    }
                });

                keypressSlider.noUiSlider.on('update', function (values, handle) {
                    inputs[handle].value = values[handle];
                });
            }
        });

        $(function () {
            if ($('.need-more-credit .slider-start-review').length !== 0) {
                var keypressSlider = document.getElementById('keypress1');
                var input0 = document.getElementById('input-with-keypress-01');
                var input1 = document.getElementById('input-with-keypress-11');
                var inputs = [input0, input1];

                noUiSlider.create(keypressSlider, {
                    start: [0, 10],
                    connect: true,
                    range: {
                        'min': [0],
                        'max': 10
                    }
                });

                keypressSlider.noUiSlider.on('update', function (values, handle) {
                    inputs[handle].value = values[handle];
                });
            }
        });

        $(function () {
            if ($('.need-more-credit .slider-start-review').length !== 0) {
                var keypressSlider = document.getElementById('keypress2');
                var input0 = document.getElementById('input-with-keypress-02');
                var input1 = document.getElementById('input-with-keypress-12');
                var inputs = [input0, input1];

                noUiSlider.create(keypressSlider, {
                    start: [0, 10],
                    connect: true,
                    range: {
                        'min': [0],
                        'max': 10
                    }
                });

                keypressSlider.noUiSlider.on('update', function (values, handle) {
                    inputs[handle].value = values[handle];
                });
            }
        });

        $(function () {
            if ($('.need-more-credit .slider-start-review').length !== 0) {
                var keypressSlider = document.getElementById('keypress3');
                var input0 = document.getElementById('input-with-keypress-03');
                var input1 = document.getElementById('input-with-keypress-13');
                var inputs = [input0, input1];

                noUiSlider.create(keypressSlider, {
                    start: [0, 10],
                    connect: true,
                    range: {
                        'min': [0],
                        'max': 10
                    }
                });

                keypressSlider.noUiSlider.on('update', function (values, handle) {
                    inputs[handle].value = values[handle];
                });
            }
        });

        $(function () {
            if ($('.need-more-credit .slider-start-review').length !== 0) {
                var keypressSlider = document.getElementById('keypress4');
                var input0 = document.getElementById('input-with-keypress-04');
                var input1 = document.getElementById('input-with-keypress-14');
                var inputs = [input0, input1];

                noUiSlider.create(keypressSlider, {
                    start: [0, 10],
                    connect: true,
                    range: {
                        'min': [0],
                        'max': 10
                    }
                });

                keypressSlider.noUiSlider.on('update', function (values, handle) {
                    inputs[handle].value = values[handle];
                });
            }
        });

        $(function () {
            if ($('.need-more-credit .slider-start-review').length !== 0) {
                var keypressSlider = document.getElementById('keypresss');
                var input0 = document.getElementById('input-with-keypresss-0');
                var input1 = document.getElementById('input-with-keypresss-1');
                var inputs = [input0, input1];

                noUiSlider.create(keypressSlider, {
                    start: [0, 10],
                    connect: true,
                    range: {
                        'min': [0],
                        'max': 10
                    }
                });

                keypressSlider.noUiSlider.on('update', function (values, handle) {
                    inputs[handle].value = values[handle];
                });
            }
        });

        $(function () {
            if ($('.need-more-credit .slider-start-review').length !== 0) {
                var keypressSlider = document.getElementById('keypresss1');
                var input0 = document.getElementById('input-with-keypresss-01');
                var input1 = document.getElementById('input-with-keypresss-11');
                var inputs = [input0, input1];

                noUiSlider.create(keypressSlider, {
                    start: [0, 10],
                    connect: true,
                    range: {
                        'min': [0],
                        'max': 10
                    }
                });

                keypressSlider.noUiSlider.on('update', function (values, handle) {
                    inputs[handle].value = values[handle];
                });
            }
        });

        $(function () {
            if ($('.need-more-credit .slider-start-review').length !== 0) {
                var keypressSlider = document.getElementById('keypresss2');
                var input0 = document.getElementById('input-with-keypresss-02');
                var input1 = document.getElementById('input-with-keypresss-12');
                var inputs = [input0, input1];

                noUiSlider.create(keypressSlider, {
                    start: [0, 10],
                    connect: true,
                    range: {
                        'min': [0],
                        'max': 10
                    }
                });

                keypressSlider.noUiSlider.on('update', function (values, handle) {
                    inputs[handle].value = values[handle];
                });
            }
        });

        $(function () {
            if ($('.need-more-credit .slider-start-review').length !== 0) {
                var keypressSlider = document.getElementById('keypresss3');
                var input0 = document.getElementById('input-with-keypresss-03');
                var input1 = document.getElementById('input-with-keypresss-13');
                var inputs = [input0, input1];

                noUiSlider.create(keypressSlider, {
                    start: [0, 10],
                    connect: true,
                    range: {
                        'min': [0],
                        'max': 10
                    }
                });

                keypressSlider.noUiSlider.on('update', function (values, handle) {
                    inputs[handle].value = values[handle];
                });
            }
        });

        $(function () {
            if ($('.need-more-credit .slider-start-review').length !== 0) {
                var keypressSlider = document.getElementById('keypresss4');
                var input0 = document.getElementById('input-with-keypresss-04');
                var input1 = document.getElementById('input-with-keypresss-14');
                var inputs = [input0, input1];

                noUiSlider.create(keypressSlider, {
                    start: [0, 10],
                    connect: true,
                    range: {
                        'min': [0],
                        'max': 10
                    }
                });

                keypressSlider.noUiSlider.on('update', function (values, handle) {
                    inputs[handle].value = values[handle];
                });
            }
        });

        // view girl / list
        $(function () {
            $('#grid').click(function (event) {
                event.preventDefault();
                $('.jslistgrid-template-default .col-branch-well').removeClass('col-md-12');
                $('.jslistgrid-template-default .col-branch-well').removeClass('list-branch-well');
                $('.jslistgrid-template-default .wrap-col-branch-well').removeClass('row');
                $('.jslistgrid-template-default .left-col-branch-well').removeClass('col-md-8');
                $('.jslistgrid-template-default .views-branch-well').removeClass('col-md-4');
                $('.well-box .theme-icon-list').removeClass('active');
                // template search-result-explore-shop
                $('.left-result-explore-shop').removeClass('col-md-3 col-sm-3');
                $('.slider-result-explore-shop').removeClass('col-md-6 col-sm-9');
                $('.right-result-explore-shop').removeClass('col-md-3 col-sm-12');
                $('.jslistgrid-template-default #sponsored-by').hide();

                $('#filter-block.show-grid').slideDown(400);

                $('.jslistgrid-template-default .col-branch-well').addClass('col-md-3');
                $('.jslistgrid-template-default .col-branch-well').addClass('col-sm-4');
                $('.jslistgrid-template-default .col-branch-well').addClass('col-xs-6');
                $('.jslistgrid-template-default .col-branch-well').addClass('grid-branch-well');
                $('.well-box .theme-icon-grid').addClass('active');
            });

            $('#list').click(function (event) {
                event.preventDefault();
                $('.jslistgrid-template-default .col-branch-well').removeClass('col-md-3');
                $('.jslistgrid-template-default .col-branch-well').removeClass('col-sm-4');
                $('.jslistgrid-template-default .col-branch-well').removeClass('col-xs-6');
                $('.jslistgrid-template-default .col-branch-well').removeClass('grid-branch-well');
                $('.well-box .theme-icon-grid').removeClass('active');

                $('.jslistgrid-template-default .col-branch-well').addClass('col-md-12');
                $('.jslistgrid-template-default .col-branch-well').addClass('list-branch-well');
                $('.jslistgrid-template-default .wrap-col-branch-well').addClass('row');
                $('.jslistgrid-template-default .left-col-branch-well').addClass('col-md-8');
                $('.jslistgrid-template-default .views-branch-well').addClass('col-md-4');
                $('.well-box .theme-icon-list').addClass('active');
                // template search-result-explore-shop
                $('.left-result-explore-shop').addClass('col-md-3 col-sm-3');
                $('.slider-result-explore-shop').addClass('col-md-6 col-sm-9');
                $('.right-result-explore-shop').addClass('col-md-3 col-sm-12');
                $('.jslistgrid-template-default #sponsored-by').show();

                $('#filter-block.show-grid').slideUp(400);
            });
        });
        (function ($) {
            // This is the connector function.
            // It connects one item from the navigation carousel to one item from the
            // stage carousel.
            // The default behaviour is, to connect items with the same index from both
            // carousels. This might _not_ work with circular carousels!
            var connector = function connector(itemNavigation, carouselStage) {
                return carouselStage.jcarousel('items').eq(itemNavigation.index());
            };

            $(function () {
                // Setup the carousels. Adjust the options for both carousels here.
                var carouselStage = $('.carousel-stage').jcarousel();
                var carouselNavigation = $('.carousel-navigation').jcarousel();

                // We loop through the items of the navigation carousel and set it up
                // as a control for an item from the stage carousel.
                carouselNavigation.jcarousel('items').each(function () {
                    var item = $(this);

                    // This is where we actually connect to items.
                    var target = connector(item, carouselStage);

                    item.on('jcarouselcontrol:active', function () {
                        carouselNavigation.jcarousel('scrollIntoView', this);
                        item.addClass('active');
                    }).on('jcarouselcontrol:inactive', function () {
                        item.removeClass('active');
                    }).jcarouselControl({
                        target: target,
                        carousel: carouselStage
                    });
                });

                // Setup controls for the stage carousel
                $('.prev-stage').on('jcarouselcontrol:inactive', function () {
                    $(this).addClass('inactive');
                }).on('jcarouselcontrol:active', function () {
                    $(this).removeClass('inactive');
                }).jcarouselControl({
                    target: '-=1'
                });

                $('.next-stage').on('jcarouselcontrol:inactive', function () {
                    $(this).addClass('inactive');
                }).on('jcarouselcontrol:active', function () {
                    $(this).removeClass('inactive');
                }).jcarouselControl({
                    target: '+=1'
                });

                // Setup controls for the navigation carousel
                $('.prev-navigation').on('jcarouselcontrol:inactive', function () {
                    $(this).addClass('inactive');
                }).on('jcarouselcontrol:active', function () {
                    $(this).removeClass('inactive');
                }).jcarouselControl({
                    target: '-=1'
                });

                $('.next-navigation').on('jcarouselcontrol:inactive', function () {
                    $(this).addClass('inactive');
                }).on('jcarouselcontrol:active', function () {
                    $(this).removeClass('inactive');
                }).jcarouselControl({
                    target: '+=1'
                });
            });
        })(jQuery);

        // set width
        $(function () {
            var width = $('.thumbnail-single-product .connected-carousels .carousel-stage').width();
            $('.connected-carousels .carousel-stage li').css({
                'width': width
            });
        });

        //Click par
        $(function () {
            $(".pagination-part-2").hide();
            $('.btn-Previouspart').hide();
            $('.btn-Submit').hide();
            $('.pagination.part-2').hide();
            $('.btn-Nextpart').click(function () {
                $(".pagination-part-1").hide();
                $(".pagination-part-2").slideToggle();
                $(this).hide();
                $('.btn-Previouspart').show();
                $('.btn-Submit').show();
                $('.pagination.part-1').hide();
                $('.pagination.part-2').show();
            });
            $('.btn-Previouspart').click(function () {
                $(".pagination-part-1").slideToggle();
                $(".pagination-part-2").hide();
                $(this).hide();
                $('.btn-Nextpart').show();
                $('.btn-Submit').hide();
                $('.pagination.part-1').show();
                $('.pagination.part-2').hide();
            });
        });
    });

    $(window).resize(function () {
        /* Act on the event */
        $(function () {
            var width = $('.thumbnail-single-product .connected-carousels .carousel-stage').width();
            $('.connected-carousels .carousel-stage li').css({
                'width': width
            });
        });
    });
})(jQuery);

// Xem ảnh trước
function preUpImg() {
    img_up = $('.img_up').val();
    count_img_up = $('.img_up').get(0).files.length;
    // Nếu đã chọn ảnh
    if (img_up != '') {
        for (i = 0; i <= count_img_up - 1; i++) {
            if (count_img_up == 1) {
                $('.main-box-upload .thumb').css({
                    'height': '90px'
                });
            }
            $('.main-box-upload .thumb').append('<img src="' + URL.createObjectURL(event.target.files[i]) + '"/>');
            $('.main-box-upload .thumb .load-images').hide();
        }
    }
}
// Xem ảnh trước 2
function preUpImg2() {
    img_up = $('.img_up2').val();
    count_img_up = $('.img_up2').get(0).files.length;
    // Nếu đã chọn ảnh
    if (img_up != '') {
        for (i = 0; i <= count_img_up - 1; i++) {

            if (count_img_up == 1) {
                $('.main-box-upload2 .thumb').css({
                    'height': '90px'
                });
            }
            $('.main-box-upload2 .thumb').append('<img src="' + URL.createObjectURL(event.target.files[i]) + '"/>');
        }
    }
}
// Xem ảnh trước 3
function preUpImg3() {
    img_up = $('.img_up3').val();
    count_img_up = $('.img_up3').get(0).files.length;
    // Nếu đã chọn ảnh
    if (img_up != '') {
        for (i = 0; i <= count_img_up - 1; i++) {

            if (count_img_up == 1) {
                $('.main-box-upload3 .thumb').css({
                    'height': '90px'
                });
            }
            $('.main-box-upload3 .thumb').append('<img src="' + URL.createObjectURL(event.target.files[i]) + '"/>');
        }
    }
}