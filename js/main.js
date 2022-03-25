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
const mobileButtons = document.querySelector('.mobileButtons');
const mobileMainMenu = document.querySelector(`.mainMenu`);
let links = mobileMainMenu.querySelectorAll('li');

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
    toggleMobileMainMenu(!isOpenMobileMainMenu);
});

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener(`click`, function () {
        toggleMobileMainMenu(!isOpenMobileMainMenu);
    });
}
