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
        mobileMainMenu.classList.add('modalAnimation');
        mobileButtons.classList.add(`opened`);
        document.body.classList.add(`noScroll`);
    } else {
        mobileMainMenu.classList.remove('mobile');
        mobileMainMenu.classList.remove('modalAnimation');
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
let swiper = new Swiper(".discountSlider", {
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});