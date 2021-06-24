function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

window.addEventListener("resize", function (e) {
    if (getWidth() < 1044 && getWidth() > 1004) {
        window.location.reload();
    }
});

//Mobile Main Menu
const mobileButtons = document.querySelector('.fnv-mobileButtons');
const mobileMainMenu = document.querySelector(`.fnv-mainMenu`);
let links = mobileMainMenu.querySelectorAll('li');

let isOpenMobileMainMenu = false;

function toggleMobileMainMenu(val) {
    isOpenMobileMainMenu = val;

    if (isOpenMobileMainMenu) {
        mobileMainMenu.classList.add('fnv-mobile');
        mobileButtons.classList.add(`fnv-opened`);
        document.body.classList.add(`fnv-noScroll`);
    } else {
        mobileMainMenu.classList.remove('fnv-mobile');
        mobileButtons.classList.remove(`fnv-opened`);
        document.body.classList.remove(`fnv-noScroll`);
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
