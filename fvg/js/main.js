/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _menu = __webpack_require__(1);

var _menu2 = _interopRequireDefault(_menu);

var _dropdown = __webpack_require__(2);

var _dropdown2 = _interopRequireDefault(_dropdown);

var _owlCarousel = __webpack_require__(3);

var _owlCarousel2 = _interopRequireDefault(_owlCarousel);

var _modal = __webpack_require__(4);

var _modal2 = _interopRequireDefault(_modal);

var _autoSearch = __webpack_require__(5);

var _autoSearch2 = _interopRequireDefault(_autoSearch);

var _buttonBackTop = __webpack_require__(6);

var _buttonBackTop2 = _interopRequireDefault(_buttonBackTop);

var _quantity = __webpack_require__(7);

var _quantity2 = _interopRequireDefault(_quantity);

var _noUiSlider = __webpack_require__(8);

var _noUiSlider2 = _interopRequireDefault(_noUiSlider);

var _ratingCustomer = __webpack_require__(9);

var _ratingCustomer2 = _interopRequireDefault(_ratingCustomer);

var _managePassword = __webpack_require__(10);

var _managePassword2 = _interopRequireDefault(_managePassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Main menu */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var menu = function () {
    // Menu mobile to desktop when resize screen
    var resize = void 0;
    $(window).resize(function () {
        clearTimeout(resize);
        resize = setTimeout(function () {
            var w = $(window).width();
            if (w >= 992) {
                var _menu = $('#headerMobileMenu');
                if (_menu.hasClass('active')) {
                    _menu.removeClass('active ');
                    $('body').removeClass('m-lock-y');
                }
            }
        }, 300);
    });

    // Menu mobile
    $('#callHeaderMobileMenu').click(function () {
        var menu = $('#headerMobileMenu');
        if (!menu.hasClass('active')) {
            menu.addClass('active ');
            $('body').addClass('m-lock-y');
        } else {
            menu.removeClass('active ');
            $('body').removeClass('m-lock-y');
        }
    });
}();

exports.default = menu;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Dropdown */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var dropdown = function () {
    // Semantic UI
    $('.ui.dropdown').dropdown({
        duration: 0
    });
    // Bootstap Datepicker
    $('.jsDatepicker').datepicker({
        format: "dd/mm/yyyy"
    });
}();

exports.default = dropdown;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Slide config */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var owlCarousel = function () {
    // Slide highlights hotel & tour
    $(".js3ItemOwlCarousel").owlCarousel({
        loop: true,
        autoplay: true,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        },
        nav: true,
        navText: [' <img class="" src="images/ic-sl.png" alt="">', '<img class="" src="images/ic-sr.png" alt="">']
    });

    $(".js4ItemOwlCarousel").owlCarousel({
        loop: true,
        autoplay: true,
        margin: 20,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            992: {
                items: 4
            }
        },
        nav: true,
        navText: [' <img class="" src="images/ic-sl.png" alt="">', '<img class="" src="images/ic-sr.png" alt="">']
    });
}();

exports.default = owlCarousel;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Bootstrap modal */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var modal = function () {
    // Login
    $('.callModalLogin').click(function () {
        $('#modalLogin').modal('show');
    });
    // Register
    $('.callModalRegister').click(function () {
        $('#modalRegister').modal('show');
    });
    // Comment
    $('.callModalComment').click(function () {
        $('#modalComment').modal('show');
    });
    // Call register from login
    $('#callRegiterFromLogin').click(function () {
        $('#modalLogin').modal('hide');
        setTimeout(function () {
            $('#modalRegister').modal('show');
        }, 200);
    });
    // Call login from register
    $('#callLoginFromRegiter').click(function () {
        $('#modalRegister').modal('hide');
        setTimeout(function () {
            $('#modalLogin').modal('show');
        }, 200);
    });
    // Call forget from login
    $('#callForgetFromLogin').click(function () {
        $('#modalLogin').modal('hide');
        setTimeout(function () {
            $('#modalForgetPassword').modal('show');
        }, 200);
    });
    // Call register from forget
    $('#callRegisterFromForget').click(function () {
        $('#modalForgetPassword').modal('hide');
        setTimeout(function () {
            $('#modalRegister').modal('show');
        }, 200);
    });
    // Create custom tour success
    $('.callModalCreateTourSuccess').click(function () {
        $('#modalCreateTourSuccess').modal('show');
    });
}();

exports.default = modal;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Semantic UI autoSearch */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var autoSearch = function () {
    var content = [{
        title: 'Bà Nà - Địa điểm Đà Nẵng',
        description: 'ba na - dai diem da nang'
        // url: 'https://semantic-ui.com/modules/search.html#/definition'
    }, {
        title: 'Phố Cổ Hội An - Địa điểm Quảng Nam',
        description: 'pho co hoi an - dia diem quang nam'
        // url: 'https://semantic-ui.com/modules/search.html#/definition'
    }];

    // Search tour
    $('#searchTour').search({
        source: content,
        templates: {
            message: function message() {
                var html = '<div class="message empty"><div class="description">Không tìm thấy kết quả</div></div>';
                return html;
            }
        }
    });

    // Search hotel
    $('#searchHotel').search({
        source: content,
        templates: {
            message: function message() {
                var html = '<div class="message empty"><div class="description">Không tìm thấy kết quả</div></div>';
                return html;
            }
        }
    });

    // Search car from
    $('#searchCarFrom').search({
        source: content,
        templates: {
            message: function message() {
                var html = '<div class="message empty"><div class="description">Không tìm thấy kết quả</div></div>';
                return html;
            }
        }
    });

    // Search car to
    $('#searchCarTo').search({
        source: content,
        templates: {
            message: function message() {
                var html = '<div class="message empty"><div class="description">Không tìm thấy kết quả</div></div>';
                return html;
            }
        }
    });
}();

exports.default = autoSearch;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Button back top */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var buttonBackTop = function () {
    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('#buttonBackTop').fadeIn();
        } else {
            $('#buttonBackTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('#buttonBackTop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
}();

exports.default = buttonBackTop;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* quantity */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var quantity = function () {
    // quantity form to select number
    $('.quantity-form__adult .quantity-form__plus').click(function () {
        var num = $(".quantity-form__adult .quantity-form__result").text();
        $(".quantity-form__adult .quantity-form__result").text(parseInt(num) + 1);
    });
    $('.quantity-form__adult .quantity-form__sub').click(function () {
        var num = $(".quantity-form__adult  .quantity-form__result").text();
        if (num > 0) {
            $(".quantity-form__adult .quantity-form__result").text(parseInt(num) - 1);
        }
    });
    $('.quantity-form__child .quantity-form__plus').click(function () {
        var num = $(".quantity-form__child .quantity-form__result").text();
        $(".quantity-form__child .quantity-form__result").text(parseInt(num) + 1);
    });
    $('.quantity-form__child .quantity-form__sub').click(function () {
        var num = $(".quantity-form__child  .quantity-form__result").text();
        if (num > 0) {
            $(".quantity-form__child .quantity-form__result").text(parseInt(num) - 1);
        }
    });
}();

exports.default = quantity;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* noUiSlider - JavaScript Range Slider */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var uiSlider = function () {
    var keypressSlider = document.getElementById('noUiSliderPickPrice') || false;
    var input0 = document.getElementById('noUiSliderPickPriceInput1') || false;
    var input1 = document.getElementById('noUiSliderPickPriceInput2') || false;
    var inputs = [input0, input1];

    if (keypressSlider) {
        var setSliderHandle = function setSliderHandle(i, value) {
            var r = [null, null];
            r[i] = value;
            keypressSlider.noUiSlider.set(r);
        };

        // Listen to keydown events on the input field.


        noUiSlider.create(keypressSlider, {
            start: [4, 16],
            connect: true,
            // direction: 'rtl',
            range: {
                'min': 1,
                'max': 20
            },
            step: 0.5
            // tooltips: true,
        });

        // Set value for input
        keypressSlider.noUiSlider.on('update', function (values, handle) {
            inputs[handle].setAttribute("value", values[handle]);
        });

        inputs.forEach(function (input, handle) {

            input.addEventListener('change', function () {
                setSliderHandle(handle, this.value);
            });

            input.addEventListener('keydown', function (e) {

                var values = keypressSlider.noUiSlider.get();
                var value = Number(values[handle]);
                // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
                var steps = keypressSlider.noUiSlider.steps();
                // [down, up]
                var step = steps[handle];
                var position = void 0;
                // 13 is enter,
                // 38 is key up,
                // 40 is key down.
                switch (e.which) {
                    case 13:
                        setSliderHandle(handle, this.value);
                        break;
                    case 38:
                        // Get step to go increase slider value (up)
                        position = step[1];

                        // false = no step is set
                        if (position === false) {
                            position = 1;
                        }
                        // null = edge of slider
                        if (position !== null) {
                            setSliderHandle(handle, value + position);
                        }
                        break;
                    case 40:
                        position = step[0];
                        if (position === false) {
                            position = 1;
                        }
                        if (position !== null) {
                            setSliderHandle(handle, value - position);
                        }
                        break;
                }
            });
        });
    }
}();

exports.default = uiSlider;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Rating score of customer */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ratingCustomer = function () {
    var setStatus = function setStatus() {
        $('.jsRatingCustomerScore').each(function () {
            if (parseFloat($(this).text()) > 0 && parseFloat($(this).text()) <= 10) {
                $(this).closest('.jsRatingCustomerItem').find('.jsRatingCustomerStatus').css('width', parseFloat($(this).text()) / 10 * 100 + '%');
            } else {
                console.log('Giá trị đầu vào của điểm đánh giá méo hợp lệ!');
            }
        });
    };
    setStatus();

    // Reset status bar when resize screen
    var resize = void 0;
    $(window).resize(function () {
        clearTimeout(resize);
        resize = setTimeout(function () {
            setStatus();
        }, 300);
    });

    // Draw circle chart by canvas
    var canvas = document.getElementById("jsRatingCustomerCircle") || false;

    if (canvas) {
        var ctx = canvas.getContext("2d");
        var eva = canvas.getAttribute('eva');
        var score = canvas.getAttribute('score');
        var des = canvas.getAttribute('des');

        if (parseFloat(score) >= 0 && score <= 10) {
            canvas.width = 200;
            canvas.height = 200;

            // Begin draw text 1
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '400 16px Roboto';
            ctx.fillStyle = '#4A4A4A';
            ctx.fillText(eva, 100, 60);

            // Begin draw text 2
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '700 36px Roboto';
            ctx.fillStyle = '#EBA32E';
            ctx.fillText(score, 100, 95);

            // Begin draw text 3
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '400 13px Roboto';
            ctx.fillStyle = '#4A4A4A';
            ctx.fillText(des, 100, 130);

            // Begin draw outer circle
            ctx.beginPath();
            ctx.arc(100, 100, 92, 0, 2 * Math.PI);
            ctx.strokeStyle = '#E2E2E2';
            ctx.lineWidth = 8;
            ctx.stroke();

            // Begin draw inner circle
            ctx.beginPath();
            ctx.arc(100, 100, 93, -0.5 * Math.PI, 2 * score / 10 * Math.PI - 0.5 * Math.PI);
            ctx.strokeStyle = '#EBA32E';
            ctx.lineWidth = 10;
            ctx.shadowBlur = 1;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.shadowColor = '#E2E2E2';
            ctx.stroke();
        } else {
            console.log('Giá trị đầu vào của điểm đánh giá méo hợp lệ!');
        }
    }
}();

exports.default = ratingCustomer;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Control form change password in manage info page */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var managePassword = function () {
    $('#managePassword').hide();
    $('#managePasswordControl').click(function () {
        $('#managePasswordCheck').is(":checked") ? $('#managePassword').show(500) : $('#managePassword').hide(500);
    });
}();

exports.default = managePassword;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map