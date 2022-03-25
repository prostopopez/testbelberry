// Поиск
const search = document.querySelector(`.search`);
const searchToggle = document.querySelector(`.search .inputField`);

searchToggle.onfocus = function () {
    search.classList.remove('inactive');
    search.classList.remove(`modalAnimation`);
};

searchToggle.onblur = function () {
    search.classList.add('inactive');
    search.classList.add(`modalAnimation`);
};

// Мобильное меню
const mobileButtons = document.querySelector('.hamburger');
const mobileMainMenu = document.querySelector(`.header`);

let isOpenMobileMainMenu = false;

function toggleMobileMainMenu(val) {
    isOpenMobileMainMenu = val;

    if (isOpenMobileMainMenu) {
        mobileMainMenu.classList.add('mobile');
        mobileButtons.classList.add(`opened`);
        document.body.classList.add(`noScroll`);
    } else {
        mobileMainMenu.classList.remove('mobile');
        mobileButtons.classList.remove(`opened`);
        document.body.classList.remove(`noScroll`);
    }
}

mobileButtons.addEventListener(`click`, function () {
    if (window.screen.width < 1025) {
        toggleMobileMainMenu(!isOpenMobileMainMenu);
    }
});

// Слайдер
let slideIndex = 1;

showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

//Swipe Horizontal
let glideSlide = document.querySelector('.slider');
let itemTouch = new Hammer(glideSlide);
let direction;

itemTouch.on('panleft panright panend', e => {
        if (e.type === 'panleft') {
            direction = 'left';
        } else if (e.type === 'panright') {
            direction = 'right';
        }


        if (e.type == 'panend' && direction == 'left') {
            showSlides(slideIndex += 1);
        } else if (e.type == 'panend' && direction == 'right') {
            showSlides(slideIndex -= 1);
        }
    }
);

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".slider .slide");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}