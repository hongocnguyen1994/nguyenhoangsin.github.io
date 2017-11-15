/* Dropdown semantic-ui */
$('.ui.dropdown').dropdown({ duration: 0 });

/* Tab semantic-ui */
$('.menu .item').tab();

/* Popup semantic-ui */
$(function() {
    var popupShare = true;
    $('.jsPopupShare').hover(function() {
        if (popupShare) {
            $('.jsPopupShare').popup({
                position: 'bottom center',
                hoverable: 'true'
            });
            $(this).popup('show');
            popupShare = false;
        }
    });
});
$('.jsPopupChannel').popup({
    position: 'bottom center',
    on: 'click'
});

/* Rating semantic-ui */
$('.ui.rating').rating();

/* Modal semantic-ui */
$('.ui.modal .close').on('click', function() {
    $('.ui.modal').modal({ duration: 400 }).modal('hide');
});
$('.register').click(function() {
    $('.modal-register').modal('show');
});
$('.modal-register-call').click(function() {
    setTimeout(function() {
        $('.modal-register').modal('show');
    }, 400);
})
$('.login').click(function() {
    $('.modal-login').modal('show');
});
$('.modal-login-call').click(function() {
    setTimeout(function() {
        $('.modal-login').modal('show');
    }, 400);
});
$('.modal-forgot-password-call').click(function() {
    setTimeout(function() {
        $('.modal-forgot-password').modal('show');
    }, 400);
});
$('.profile-export').click(function() {
    $('.modal-choose-language').modal('show');
});
$('.profile-info-general .profile-control__btn').click(function() {
    $('.modal-info-general').modal('show');
    autosize.update($('.autoExpand'));
});
$('.profile-info-skill .profile-info-skill__body .profile-control__btn').click(function() {
    $('.modal-skill.edit').modal('show');
});
$('.profile-info-skill .profile-info-skill__header .profile-control__btn').click(function() {
    $('.modal-skill.add').modal('show');
});
$('.profile-info-exp .profile-info-exp__header .profile-control__btn').click(function() {
    $('.modal-exp.add').modal('show');
});
$('.profile-info-exp .profile-info-exp__body .profile-control__btn').click(function() {
    $('.modal-exp.edit').modal('show');
    autosize.update($('.autoExpand'));
});
$('.profile-info-course .profile-info-course__header .profile-control__btn').click(function() {
    $('.modal-course.add').modal({ autofocus: false }).modal('show');
});
$('.profile-info-course .profile-info-course__body .profile-control__btn').click(function() {
    $('.modal-course.edit').modal({ autofocus: false }).modal('show');
    autosize.update($('.autoExpand'));
});
$('.profile-info-awards .profile-info-awards__header .profile-control__btn').click(function() {
    $('.modal-awards.add').modal('show');
});
$('.profile-info-awards .profile-info-awards__body .profile-control__btn').click(function() {
    $('.modal-awards.edit').modal('show');
    autosize.update($('.autoExpand'));
});
$('.profile-info-scores .profile-info-scores__header .profile-control__btn').click(function() {
    $('.modal-scores.add').modal('show');
});
$('.profile-info-scores .profile-info-scores__body .profile-control__btn').click(function() {
    $('.modal-scores.edit').modal('show');
    autosize.update($('.autoExpand'));
});
$('.profile-info-lan .profile-info-lan__header .profile-control__btn').click(function() {
    $('.modal-lan.add').modal({ autofocus: false }).modal('show');
});
$('.profile-info-lan .profile-info-lan__body .profile-control__btn').click(function() {
    $('.modal-lan.edit').modal({ autofocus: false }).modal('show');
});
$('.write-blog').click(function() {
    $('.modal-write-blog.add').modal('show');
    resizeHeightBox();
});
$('.profile-blog .profile-blog__body .profile-control__btn').click(function() {
    $('.modal-write-blog.edit').modal('show');
    resizeHeightBox();
});
$('.menuCommentReport').click(function() {
    $('.modalCommentReport').modal({ autofocus: false }).modal('show');
});
$('.jsExerciseDone').click(function() {
    $('.jsModalExercise').modal('show');
});
$('.jsAQAnswer').click(function() {
    $('.jsModalAQ').modal('show');
});
$('.jsBtnCompany').click(function() {
    $('.jsModalCompany').modal({ autofocus: false }).modal('show');
});
$('.jsBtnInterview').click(function() {
    $('.jsModalInterview').modal({ autofocus: false }).modal('show');
});
$('.jsBtnChannel').click(function() {
    $('.jsModalChannel').modal({ autofocus: false }).modal('show');
});

/* Upload image */
$('.modal-write-blog__file').change(function(event) {
    var input = event.target;
    var reader = new FileReader();
    var index = $('.modal-write-blog__file').index(this);
    reader.onload = function() {
        var dataURL = reader.result;
        var output = document.getElementsByClassName('modal-write-blog__img');
        output[index].style.background = 'url(' + dataURL + ') center center';
        output[index].style.backgroundSize = 'cover';
    };
    reader.readAsDataURL(input.files[0]);
});

/* Datepicker */
$('.choose-date').datepicker({
    format: "dd/mm/yyyy"
});

/* Applied globally on all textareas with the "autoExpand" class */
autosize($('textarea'));

// Fix modal semantic-ui
$('.autoExpand').on('keyup', function() {
    var current = $(this).closest('.ui.modal');
    if (current.height() >= $(window).height() * 9 / 10) {
        if (!$('body').hasClass('scrolling')) {
            $('body').addClass('scrolling');
        }
        if (!current.hasClass('scrolling')) {
            current.addClass('scrolling');
        }
    } else {
        current.css('margin-top', -current.height() / 2);
        current.css('top', $(window).height() / 2);
        $('body').removeClass('scrolling');
        current.removeClass('scrolling');
    }
});

/* Custom scrollbar */
$(".logged-notifications__wrap").mCustomScrollbar();
$(".logged-noti-small__wrap").mCustomScrollbar();
$('.lesson-bar__body').mCustomScrollbar();
$('.profile-test__table').mCustomScrollbar({
    axis: "x",
    advanced: {
        autoExpandHorizontalScroll: true
    }
});
$('.jsCompanyEvaluationMenu').mCustomScrollbar({
    axis: "x",
    // advanced: {
    //     autoExpandHorizontalScroll: true
    // }
});

/* Back to top */
$(".back-top").click(function() {
    $('body,html').animate({
        scrollTop: 0
    })
});

/* Browser scroll */
$(window).scroll(function() {
    var menu = $('.large-header');
    var blockScroll = document.getElementById('blockScroll');
    var menuInitial = document.querySelector('.large-header .large-header-menu-lv1')
    var menuScroll = document.querySelector('.large-header .large-header-features-action');
    if ($(window).scrollTop() >= 100) {
        if (!menu.hasClass('scroll-large-header')) {
            menu.addClass('scroll-large-header', 1000, "easeOutBounce");
            $('body').css('margin-top', '84px')
        }
        blockScroll.parentNode.removeChild(blockScroll);
        menuInitial.appendChild(blockScroll);
    } else {
        if (menu.hasClass('scroll-large-header')) {
            menu.removeClass('scroll-large-header', 1000, "easeOutBounce");
            $('body').css('margin-top', '0')
        }
        blockScroll.parentNode.removeChild(blockScroll);
        menuScroll.appendChild(blockScroll);
    }

    var e = $(window).scrollTop();
    if (e > 400) {
        $(".scroll-status").css('visibility', 'visible');
    } else {
        $(".scroll-status").css('visibility', 'hidden');
    }
});

/* Resize height box */
function resizeHeightBox() {
    var root = $('.large-header-menu__lv2');
    var blades = $('.large-header-menu-lv3__bg');
    var avataProfileImg = $('.profile-bar__avata-img');
    var profileInfoCourseImg = $('.profile-info-course__img');
    var modalWriteBlogImgAdd = $('.modal-write-blog.add .modal-write-blog__img');
    var modalWriteBlogImgEdit = $('.modal-write-blog.edit .modal-write-blog__img');
    blades.height((root.width() - 32) * 23.5 / 100 * 9 / 16);
    avataProfileImg.height(avataProfileImg.width());
    profileInfoCourseImg.height(profileInfoCourseImg.width() * 3 / 4);
    modalWriteBlogImgAdd.height(modalWriteBlogImgAdd.width() * 9 / 16);
    modalWriteBlogImgEdit.height(modalWriteBlogImgEdit.width() * 9 / 16);
}
resizeHeightBox();

/* Resize change content */
function resizeChangeContent() {
    if ($(window).width() < 568) {
        $('.banner-home__search').attr('placeholder', 'Tên bài học...');
    } else {
        $('.banner-home__search').attr('placeholder', 'Tìm kiếm bài học yêu thích của bạn...');
    }
}
resizeChangeContent();

/* Browser resize */
$(window).resize(function() {
    resizeHeightBox();
    resizeChangeContent();
    setRateImages($('.courseSearchSetRateImages-5-3'));
    setRateImages($('.courseClassifySetRateImages-4-3'), 4, 3);
    setRateImages($('.jsIntroductionSetRateImages-3-2'), 3, 2);
});

/* Mega menu header - large screen */
(function() {
    // event click outside element
    $(window).click(function(event) {
        if (!$(event.target).closest('.large-header-menu-lv1__link.multilevel').length && !$(event.target).closest('.large-header-menu-lv2').length) {
            $('.large-header-menu-lv1__link.multilevel').removeClass('active');
            $('.large-header-menu-lv2').removeClass('active');
        }
    });
    $('.dropdown-toggle').click(function() {
        $('.large-header-menu-lv1__link.multilevel').removeClass('active');
        $('.large-header-menu-lv2').removeClass('active');
    });

    // event click menu lv1
    $('.large-header-menu-lv1__link.multilevel').click(function(event) {
        var menu = $('.large-header-menu-lv1__link.multilevel');
        var index = menu.index(this);
        var menuSub = $('.large-header-menu-lv2');
        if (!$(this).hasClass('active')) {

            menu.removeClass('active');
            menuSub.removeClass('active');
            menu.eq(index).addClass('active');
            menuSub.eq(index).addClass('active');
        } else {
            menu.eq(index).removeClass('active');
            menuSub.eq(index).removeClass('active');
        }
    });

    // event hover menu lv2 mutilevel
    $('.large-header-menu-lv2-multilevel__link').hover(function() {
        if (!$(this).hasClass('active')) {
            var index = $('.large-header-menu-lv2-multilevel__link').index(this);
            var menu = $('.large-header-menu-lv2-multilevel__link');
            var menuSub = $('.large-header-menu-lv3');
            menu.removeClass('active');
            menuSub.removeClass('active');
            menu.eq(index).addClass('active');
            menuSub.eq(index).addClass('active');
        }
    });

})();

/* Menu scroll bar for small screen - event touchend */
$(function() {
    var uiDropdown = document.querySelectorAll('.ui.selection.dropdown');
    for (var i in uiDropdown) {
        if (uiDropdown.hasOwnProperty(i)) {
            uiDropdown[i].addEventListener('touchend', function() {
                $('.dropdown-toggle').attr('aria-expanded', 'false')
                $('.dropdown').removeClass('show');
                $('.dropdown-menu').removeClass('show');
            });
        }
    }
})

/* Menu for small screen - mhead plugin */
$(function() {
    //	create a menu
    $('#menuSmallHeader').mmenu({
        "offCanvas": {
            "zposition": "front",
            "position": "right"
        },
        "extensions": [
            "theme-white", "pagedim-black"
        ],
    });
    //	fire the plugin
    $('.mh-head.first').mhead({
        // scroll: false
    });
    //	for demo only
    $('a[href^="#/"]').click(function() {
        alert('Thank you for clicking, but that\'s a demo link.');
        return;
    })
});

/* Comment */
$('.commentInputMainArea').focus(function() {
    var current = $(this).closest('.commentInputMain').find('.commentInputMainBtn');
    if (!current.hasClass('active')) {
        current.addClass('active');
    }
});
$('.commentInputMainBtnCancel').click(function() {
    var currentBtn = $(this).closest('.commentInputMain').find('.commentInputMainBtn');
    var currentArea = $(this).closest('.commentInputMain').find('.commentInputMainArea');
    if (currentBtn.hasClass('active')) {
        currentBtn.removeClass('active');
        currentArea.val('');
        currentArea.height('auto');
    }
});
//
$('.commentActionWrite').click(function() {
    var current = $(this).closest('.commentContentCurrent').find('.commentInputSub');
    if (!current.hasClass('active')) {
        current.addClass('active');
    }
    current.find('.commentInputSubArea').focus();
});
$('.commentInputSubBtnCancel').click(function() {
    var current = $(this).closest('.commentContentCurrent').find('.commentInputSub');
    if (current.hasClass('active')) {
        current.removeClass('active');
        current.find('.commentInputSubArea').val('');
        current.find('.commentInputSubArea').height('auto');
    }
});
//
$('.commentLoadControlShow').click(function() {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).closest('.commentLoadControl').find('.commentLoadControlHide').addClass('active');
    }
    var current = $(this).closest('.commentBox').find('.commentLoadItemSub');
    if (!current.hasClass('active')) {
        current.addClass('active');
    }
});
$('.commentLoadControlHide').click(function() {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).closest('.commentLoadControl').find('.commentLoadControlShow').addClass('active');
    }
    var current = $(this).closest('.commentBox').find('.commentLoadItemSub');
    if (current.hasClass('active')) {
        current.removeClass('active');
    }
});
//
$('.menuCommentContentEdit').click(function() {
    var current = $(this).closest('.commentItem').find('.commentContentCurrent');
    var currentText = $(this).closest('.commentItem').find('.commentContentCurrentText');
    var edit = $(this).closest('.commentItem').find('.commentContentEdit');
    var editText = $(this).closest('.commentItem').find('.commentInputEditArea');
    if (current.hasClass('active')) {
        current.removeClass('active');
        edit.addClass('active');
        editText.val(currentText.val()).focus();
        autosize.update($('textarea'));
    }
});
$('.commentInputEditBtnCancel').click(function() {
    var current = $(this).closest('.commentItem').find('.commentContentCurrent');
    var edit = $(this).closest('.commentItem').find('.commentContentEdit');
    var editText = $(this).closest('.commentItem').find('.commentInputEditArea');
    if (!current.hasClass('active')) {
        current.addClass('active');
        edit.removeClass('active');
        editText.val('');
    }
});
//
$('.jsCommentReadMore').click(function() {
    var text = $(this).closest('.commentContentCurrent').find('.commentContentCurrentText');
    if (text.hasClass('collapse')) {
        text.removeClass('collapse');

    }
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        text.text((text.val()));
    }
});
//
$(document).ready(function() {
    String.prototype.mySlice = function(x) {
        while (true) {
            if (this[x] === ' ') {
                if (this[x - 1] == '.' && this[x - 2] == '.' & this[x - 3] == '.') {
                    return this.slice(0, x);
                } else if (this[x - 1] == '.') {
                    return this.slice(0, x) + '..';
                } else {
                    return this.slice(0, x) + '...';
                }
            }
            x++;
        }
    }
    $('.commentContentCurrentText').each(function() {
        if ($(this).text().length > 200) {
            $(this).val($(this).text());
            $(this).text($(this).text().mySlice(200))
            $(this).closest('.commentContentCurrent').find('.jsCommentReadMore')
                .removeClass('active').addClass('active');
        }
    });
});

/* Course classify rating & rate */
$(document).ready(function() {
    String.prototype.myRound = function() {
        var x = (this % 1).toFixed(1);
        if (x >= 0.3 && x < 0.8) {
            return Math.floor(this) + 0.5;

        } else {
            return Math.round(this);
        }
    }
    $('.courseClassifyRatingNumber').each(function() {
        var scores = $(this).text().myRound();
        var star = $(this).closest('.courseClassifyRating').find('.courseClassifyRatingStar');
        for (var i = 0; i < 5; i++) {
            if (i <= scores - 1) {
                star.eq(i).addClass('icon-icon_star_review_yellow');
            } else if (i - 0.5 <= scores - 1) {
                star.eq(i).addClass('icon-icon_star_review_part');
            } else {
                star.eq(i).addClass('icon-icon_star_review_grey');
            }
        }
    });
    $('.courseClassifyRateNumber').each(function() {
        if ($(this).text() > 0) {
            $(this).closest('.courseClassifyRate').addClass('active');
            $(this).closest('.courseClassifyRate').find('.courseClassifyProcessCurrent').css('width', $(this).text() + '%')
        }
    });
});

/* Custom set rate images */
function setRateImages(objects, x, y) {
    var rw = x || 5;
    var rh = y || 3;
    var fake = objects.parent().find('.setRateImageBackground');
    if (fake.length == 0) {
        objects.parent().append($('<div class="setRateImageBackground"></div>'));
        objects.parent().find('.setRateImageBackground').css({
            "height": objects.width() * rh / rw
        });
        objects.css({
            'display': 'none'
        });
        objects.each(function() {
            $(this).parent().find('.setRateImageBackground').css({
                "background": "url(" + $(this).attr('src') + ") center center",
                "background-size": "cover"
            });
        });
    } else {
        fake.css({
            "height": fake.width() * rh / rw
        });
    }
}
setRateImages($('.courseSearchSetRateImages-5-3'));
setRateImages($('.courseClassifySetRateImages-4-3'), 4, 3);
setRateImages($('.jsIntroductionSetRateImages-3-2'), 3, 2);

/* Lession list bar */
$('.jsLessonHamburger').click(function() {
    if ($(this).hasClass('is-active')) {
        $(this).removeClass('is-active')
            .closest('.jsLessonListBar').removeClass('col-lg-4').addClass('col-lg-1')
            .find('.jsLessonListDetail').removeClass('active')
            .closest('.jsLesson').find('.jsLessonContent').removeClass('col-lg-8').addClass('col-lg-11');

    } else {
        $(this).addClass('is-active')
            .closest('.jsLessonListBar').removeClass('col-lg-1').addClass('col-lg-4')
            .find('.jsLessonListDetail').addClass('active')
            .closest('.jsLesson').find('.jsLessonContent').removeClass('col-lg-11').addClass('col-lg-8');;
    }
});

$('.jsLessonListMenu').click(function() {
    if ($(window).width() < 992) {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open')
                .closest('.jsLessonListDetail').find('.jsLessonListBody').removeClass('open')
        } else {
            $(this).addClass('open')
                .closest('.jsLessonListDetail').find('.jsLessonListBody').removeClass('open').addClass('open')
        }
    }
});

/* Exercise - clock time */
(function startTimer() {
    var timer_m = document.getElementById('clockTimeM') || null;
    var timer_s = document.getElementById('clockTimeS') || null;
    var warning = false;
    if (timer_m !== null && timer_s !== null) {
        var m = parseInt(timer_m.innerText) || 0;
        var s = parseInt(timer_s.innerText) || 0;
        runTimer(timer_m, timer_s, m, s);
    }

    function runTimer(timer_m, timer_s, m, s) {
        if (m == -1) {
            clearTimeout(runTimer);
        } else {
            if (s == -1) {
                m -= 1;
                s = 59;
            }
            if (m != -1) {
                if (m <= 2 && !warning) {
                    $('.jsClockTime').addClass('warning');
                    $('.jsClockIcon').addClass('warning');
                    warning = true;
                }
                timer_m.innerHTML = m >= 10 ? m : '0' + m;
                timer_s.innerHTML = s >= 10 ? s : '0' + s;
            }
            setTimeout(function() {
                runTimer(timer_m, timer_s, m, --s)
            }, 1000);
        }
    }
})();