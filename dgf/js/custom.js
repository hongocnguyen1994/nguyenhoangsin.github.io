jQuery(function($) {

    function themeTabs() {
        //hide all products,categories and show first category and its products
        var cat = $('.noslpatsMenu__thumb.active').attr('id');
        $('section.baseProduct').hide();
        $('[data-catid=' + cat + ']').show();

        // active menu icon items
        $('.theme-tabs .noslpatsMenu__thumb').on('click', function() {
            $('.noslpatsMenu__thumb').removeClass('active');
            $(this).addClass('active');

            // show tabs icon menu
            var listCat = $(this).attr('id');
            $('section.baseProduct').hide();
            $('[data-catid=' + listCat + ']').show(); //show selected
        });
    };

    /* document ready */
    var checkLoadPage = true;
    $(document).ready(function() {
        function fbfixmenu() {
            //menu mobile
            $(function() {
                $(".navbar-nav").prepend("<i class='theme-icon-close'></i>");
                // add class active 
                $('.button-menu').click(function() {
                    $('.navbar-nav').addClass('navbar-nav__mobile');
                    $('.navbar .theme-icon-close').show(400);
                });
                $('.navbar .theme-icon-close').click(function() {
                    $('.navbar-nav').removeClass('navbar-nav__mobile');
                    $(this).hide(400);
                });

            });

            // iconDropwDowMenu  
            $(function() {
                var widthScreen = $(window).width();
                if (widthScreen < 992) {
                    $('.navbar-nav > li').each(function(index) { // kiem tra tung thanh phan element
                        if ($(this).find('ul').length > 0) {
                            $(this).prepend("<i class='theme-icon-parentMenu'></i>");
                        }
                    });
                };
            });

            //menu 
            $(function() {
                if ($('.theme-icon-parentMenu').length != 0) {
                    $('.theme-icon-parentMenu').parent().click(function() {

                        $(this).children('ul').toggle();

                        if ($(this).children('i').hasClass("hasitem")) {
                            $(this).children('i').removeClass("hasitem");
                        } else {
                            $(this).children('i').addClass("hasitem");
                        }
                    });
                };
            });
            checkLoadPage = false;
        };
        if (checkLoadPage)
            fbfixmenu();

        // header fixed
        $(function() {
            var div_top = $('.navbar').offset().top;
            var navbar_height = $('.navbar').height();
            // if ($('#bannerBio').length != 0) {
            //  var div_bannerBio = $('#bannerBio').offset().top;
            // }            
            // var div_bannerBio_done = div_bannerBio;
            // var bannerBio_height = $('#bannerBio').height();


            $(window).scroll(function() {
                if ($(window).scrollTop() >= div_top) {
                    $('.navbar').addClass('navbar-fixed-top');
                } else {
                    $('.navbar').removeClass('navbar-fixed-top');
                }

                // if ($("body").scrollTop() >= div_bannerBio_done) {
                //     $('#bannerBio').addClass('bannerBio-fixed-top');
                // } else {
                //  $('#bannerBio').removeClass('bannerBio-fixed-top');
                // }

                // if ($("body").scrollTop() >= div_bannerBio_done) {
                //     $('#listProduct').css({'margin-top': (bannerBio_height * 3) + 'px'});
                // } else {
                //  $('#listProduct').css({'margin-top': '0px'});
                // }
            });
        });

        // window load open modal
        $(function() {
            $(window).on('load', function() {
                $('#myModal').modal('show');
            });
        });

        // select design
        $(function() {
            $(".salutation").selectmenu();
        });

        $(function() {
            $(".checkboxradio").checkboxradio();
        });

        $(function() {
            $(".spinner").spinner();
        });


        $(function() {
            $(document).on('click', 'a[href^="#"]', function(e) {
                // target element id
                var id = $(this).attr('href');
                var navbar_height = $('.navbar').height();

                // target element
                var $id = $(id);
                if ($id.length === 0) {
                    return;
                }

                // prevent standard hash navigation (avoid blinking in IE)
                e.preventDefault();

                // top position relative to the document
                var pos = ($id.offset().top) - navbar_height;

                // animated top scrolling
                $('body, html').animate({ scrollTop: pos });
            });

            $('.nomCompte__nav li a').click(function() {
                $('.nomCompte__nav li').removeClass('active');
                $(this).parent().addClass('active');
            });

            // tabs menu icons
            $(function() {
                //themeTabs();
            });

            // clickShowBt listItem add buton
            $(function() {
                $('.clickShowBt .gridBlock__mainThumb').hover(function() {
                    /* Act on the event */
                    //$('.clickShowBt .gridBlock__mainThumb').parent().parent().removeClass('active');
                    var _items = $('.clickShowBt .jsProduct');
                    _items.each(function() {
                        var _this = $(this);
                        var _number = parseInt(_this.find('.jsNumber').val());
                        if (isNaN(_number)) {
                            _number = parseInt(_this.find('.jsNumber').text());
                        }
                        if (_number == 0) {
                            $(this).removeClass('active');
                        }
                    });

                    $(this).parent().parent().addClass('active');
                });

                $('.smoothie__listItems .smoothie__thumb').hover(function() {
                    /* Act on the event */
                    //$('.clickShowBt .gridBlock__mainThumb').parent().parent().removeClass('active');
                    var _items = $('.smoothie .jsProduct');
                    _items.each(function() {
                        var _this = $(this);
                        var _number = parseInt(_this.find('.jsNumber').val());
                        if (isNaN(_number)) {
                            _number = parseInt(_this.find('.jsNumber').text());
                        }
                        if (_number == 0) {
                            $(this).removeClass('active');
                        }
                    });
                    $(this).parent().addClass('active');
                });


                /*$('.smoothie__listItems .smoothie__thumb').click(function () {
                 $('.smoothie__listItems .smoothie__thumb').parent().removeClass('active');
                 $(this).parent().addClass('active');
                 });*/
            });

            // odercar
            /*$(function() {
                $('.panier .theme-icon-cartButton').click(function() {
                    var heightFull = $(window).height();
                    var heightPanier = $('.panier #recapitulatif').height();
                    $('.panier #recapitulatif').animate({ 'width': 'toggle' }, 500);
                    $(this).toggleClass('active');
                    $('.panier').toggleClass('active');
                    $('.bg-panier').toggleClass('active');

                    if (heightPanier > heightFull) {
                        $('.panier #recapitulatif').toggleClass("activeScoll");
                    }
                });
            });*/
        });


        // recapitulatif detail menu
        $(function() {
            /*var heightLeft = $('.recapitulatif__mainContentBox.left').height();
            var heightRight = $('.recapitulatif__mainContentBox.right').height();

            if (heightRight <= heightLeft) {
                $('.recapitulatif__mainContentBox.right').css("min-height", heightLeft);
            } else {
                $('.recapitulatif__mainContentBox.right').css("min-height", heightRight + 50);
            }*/

            $('.menu__showmore').click(function() {
                $(this).parents('.has-list').find('.recapitulatif__detail__menu').toggle(function() {});

                if ($(this).find('.fa').hasClass("fa-plus")) {
                    $(this).find('.fa').removeClass("fa-plus");
                    $(this).find('.fa').addClass("fa-minus");
                } else {
                    $(this).find('.fa').removeClass("fa-minus");
                    $(this).find('.fa').addClass("fa-plus");
                }
            });


            //            $('.menu__showmore .fa-minus').click(function () {
            //                $(this).removeClass("fa-minus");
            //                $(this).addClass("fa-plus");
            //            });

        });
        $('.bannerList-carousel').owlCarousel({
            loop: true,
            margin: 0,
            dots: false,
            nav: true,
            navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
            autoplay: true,
            smartSpeed: 400,
            autoHeight: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 6
                }
            }
        });
        var OwlHeight = $('.bannerList-carousel .owl-item').width();
        $('.bannerList-carousel .owl-item img').css("height", OwlHeight);
    });
});

/* viet plugin dat ten function */
/* slideToggleMenu */
//$.slideToggleMenu = function () { //(cach viet plugin ko tra ve dc gia tri return)
// tra ve duoc gia tri return 
function slideToggleMenu() {
    var widthScreen = $(window).width();
    var slideToggle = function() {
        $('.navbar-nav > li').hover(function() {
            $(this).children('ul').show('400');
        }, function() {
            $(this).children('ul').hide('200');
        });
    };

    if (widthScreen > 991) {
        return slideToggle();
    }
};

$(window).resize(function() {
    var widthScreen = $(window).width();
    if (widthScreen >= 768) {
        // iconDropwDowMenu
        $(function() {
            if (widthScreen <= 992) {
                $('.navbar-nav > li').each(function(index) {
                    if ($(this).find('ul').length > 0 && $(this).find('i').length < 1) {
                        $(this).prepend("<i class='theme-icon-parentMenu'></i>");
                    }
                });
            } else {
                if ($('.theme-icon-parentMenu').length != 0) {
                    $('.theme-icon-parentMenu').remove();
                };
            };
        });
        // menu 
        $(function() {
            // slideToggleMenu();
            if ($('.theme-icon-parentMenu').length != 0) {
                $('.theme-icon-parentMenu').parent().click(function() {
                    $(this).children('ul').toggle();
                    if ($(this).children('i').hasClass("hasitem")) {
                        $(this).children('i').removeClass("hasitem");
                    } else {
                        $(this).children('i').addClass("hasitem");
                    }
                });
            };
        });
    }
});

// RESIZE HEIGHT IMAGE WRAP
function resizeImage() {
    var items = $('.postThumbnail__mainItem');
    var imagesInstagram = $('#imagesInstagram .jsImages img');
    imagesInstagram.height(imagesInstagram.width());
    if ($(window).width() < 568) {
        items.height(items.width() * 3 / 4);
    } else {
        items.height(items.width() / 2);
    }
}

function datePicker(params) {
    $('.date-pick').datepicker({
        format: "dd/mm/yyyy"
    });
}


$(document).ready(function() {
    resizeImage();
    $(window).resize(function() {
        resizeImage();
    });
    datePicker();
});


/* BACK TO TOP */
$(document).ready(function() {
    /*$('#scroll-back-top').hide();

    $(window).scroll(function() {
        if ($(window).scrollTop() >= 300) {
            $('#scroll-back-top').show()
        } else {
            $('#scroll-back-top').hide()
        }
    })

    $('#scroll-back-top').click(function() {
        $('body, html').animate({
            scrollTop: 0
        })
    });*/
});