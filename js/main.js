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
