'use strict'

/* Отображение подменю Услуг */

$(document).ready(function () {

    let elemClick = $('.menuList-8'),
        elemView = $('#menuList-8'),
        addClass = 'sub-active';

    elemClick.hover(
        function () {
            $('#menuList-8').addClass(addClass);
        },
        function () {
            $('#menuList-8').removeClass(addClass);
        }
    );

    // при клике вне элемента
    $(document).mouseup(function (e) {

        if (!elemView.is(e.target) && elemView.has(e.target).length === 0) {
            elemView.removeClass(addClass);
        }
    });

    // при клике по кнопке ESC
    $(document).keydown(function (eventObject) {
        if (eventObject.which == 27) {
            elemView.removeClass(addClass);
        };
    });

    // при клике по кнопке Close
    $("#closeMenuList").click(function () {
        $('#closeMenuList').parent().parent().removeClass(addClass);
    });

});


/* BURGER MENU */

$(document).ready(function () {

    let burgerMenu = $('.menu-list-burger'),
        addClass = 'menu-active';

    $(".menu__mobile_button").click(function () {
        burgerMenu.toggleClass(addClass);
    });

    $(document).keydown(function (eventObject) {
        if (eventObject.which == 27) {
            burgerMenu.toggleClass(addClass);
        };
    });

    // при клике вне элемента
    $(document).mouseup(function (e) {

        if (!burgerMenu.is(e.target) && burgerMenu.has(e.target).length === 0) {
            burgerMenu.removeClass(addClass);
        }
    });

    jQuery(burgerMenu).swipe({
        swipeStatus: function (event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {
            /* if (phase == "start") {
                // сработает в начале swipe
            }
            if (phase == "end") {
                //сработает через 20 пикселей то число которое выбрали в threshold
            }
            if (direction == 'left') {
                //сработает при движении влево
            }
            if (direction == 'right') {
                //сработает при движении вправо
            } */
            if (direction == 'up') {
                burgerMenu.removeClass(addClass);
            }
            /* if (direction == 'down') {
                //сработает при движении вниз
            } */
        },
        triggerOnTouchEnd: false,
        threshold: 30 // сработает через 20 пикселей
    });

});


/* SLIDERS */

let sliderBtn = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="284.929px" height="284.929px" viewBox="0 0 284.929 284.929" style="enable-background:new 0 0 284.929 284.929;"
	 xml:space="preserve">
<g>
	<path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
		L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
		c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
		c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"/>
</g>
</svg>`

$(document).ready(function () {

    /* slider Index banners */

    $('#indexBannerSlider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: 'ondemand',
        autoplay: true,
        infinite: true,
        arrows: false,
        dots: true,
        responsive: [

            {
                breakpoint: 768,
                dots: false
            }
        ]

    });

    /* slider Index articles */

    $('#indexNewsSlider, #indexArticlesSlider').slick({
        arrows: true,
        infinite: false,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        lazyLoad: 'ondemand',
        prevArrow: '<button class="slick-prev d-flex justify-content-center align-items-center">' + sliderBtn + '</button>',
        nextArrow: '<button class="slick-next d-flex justify-content-center align-items-center">' + sliderBtn + '</button>',
        responsive: [

            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },

            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    /* partners */

    $('#indexPartnersSlider').slick({
        arrows: true,
        infinite: false,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        lazyLoad: 'ondemand',
        prevArrow: '<button class="slick-prev d-flex justify-content-center align-items-center">' + sliderBtn + '</button>',
        nextArrow: '<button class="slick-next d-flex justify-content-center align-items-center">' + sliderBtn + '</button>',
        responsive: [

            {
                breakpoint: 1140,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },

            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },

            {
                breakpoint: 568,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });


    /* rieltorLicense */

    $('.rieltorLicenseSlider').slick({
        arrows: true,
        vertical: true,
        infinite: false,
        dots: false,
        verticalSwiping: true,
        focusOnSelect: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        lazyLoad: 'ondemand',
        prevArrow: '<button class="slick-prev d-flex justify-content-center align-items-center">' + sliderBtn + '</button>',
        nextArrow: '<button class="slick-next d-flex justify-content-center align-items-center">' + sliderBtn + '</button>',
        responsive: [

            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    vertical: false,
                }
            },

            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    vertical: false,
                }
            },

            {
                breakpoint: 568,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    vertical: false,
                }
            }
        ]

    });

});