/* MENU SCROLL */
// $(window).scroll(function() {
//     var menu = $('#header');
//     if ($(window).scrollTop() >= 100) {
//         if (!menu.hasClass('header-scroll-menu')) {
//             menu.addClass('header-scroll-menu', 1000, "easeOutBounce");
//         }
//     } else {
//         if (menu.hasClass('header-scroll-menu')) {
//             menu.removeClass('header-scroll-menu', 1000, "easeOutBounce");
//         }
//     }
// });

/* BACK TO TOP */
// $(document).ready(function() {
//     $('#scroll-back-top').hide();

//     $(window).scroll(function() {
//         if ($(window).scrollTop() >= 300) {
//             $('#scroll-back-top').show()
//         } else {
//             $('#scroll-back-top').hide()
//         }
//     })

//     $('#scroll-back-top').click(function() {
//         $('body,html').animate({
//             scrollTop: 0
//         })
//     });
// });

/* RESIZE HEIGHT IMAGE */
function resizeHeightImage() {
    var items = $('.news-blog-blade__img-background');
    var video = $('#introduceOrVideo');
    items.height(items.width() * 10 / 14);
    video.height(video.width() * 10 / 16);
}

/* RESIZE HEIGHT SPACE */
function resizeHeightSpace() {
    var blades = $('.introduce-fe-blade__title');
    var lengthBlades = blades.length;
    var maxHeight = 0;
    blades.each(function() {
        if (maxHeight < $(this).height())
            maxHeight = $(this).height();
    });
    blades.height(maxHeight);
}

$(document).ready(function() {
    resizeHeightImage();
    resizeHeightSpace();
    $(window).resize(function() {
        resizeHeightImage();
        resizeHeightSpace();
    });
});

/* MAIN */
window.onload = function() {}