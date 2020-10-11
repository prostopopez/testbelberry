//user dropdown on header
const userDropdowns = document.querySelectorAll(`.fnv-userDropdown`);

for(let i = 0; i < userDropdowns.length; i++) {
    const userDropdown = document.querySelectorAll(`.fnv-userDropdown`)[i];
    const userToggle = userDropdown.querySelector(`.fnv-newDrop`);
    let userDropdownActive = false;


    userToggle.addEventListener('click', function (event) {
        userDropdownActive = !userDropdownActive;
        toggleDropdown(userDropdownActive, userDropdown);
    });

    function toggleDropdown(active, userDropdown) {
        if (active) {
            userDropdown.classList.add(`fnv-active`);
        } else {
            userDropdown.classList.remove(`fnv-active`);
        }
    }
}

//category modal on header
const categoryToggle = document.querySelector(`.fnv-categoryToggle`);
const categoryModal = document.querySelector(`.fnv-categoryModal`);
const categoryModalBlock = document.querySelector(`.fnv-categoryModalBlock`);
const headerCont = document.querySelector(`.fnv-header`);

let isOpenCategory = false;

function toggleProfileModal(value) {
    isOpenCategory = value;

    if (isOpenCategory) {
        categoryModal.style.top = `${headerCont.offsetHeight}px`;
        categoryModal.style.display = `flex`;
        categoryModalBlock.classList.add(`fnv-modalAnimation`);
    } else {
        categoryModal.style.display = `none`;
        categoryModalBlock.classList.remove(`fnv-modalAnimation`);
    }
}

categoryToggle.addEventListener("click", function (e) {
    toggleProfileModal(!isOpenCategory);
});

document.body.addEventListener("click", function (e) {
    const isCategoryModalBlock = categoryModalBlock.contains(e.target) || categoryToggle.contains(e.target);

    if (!isCategoryModalBlock) {
        toggleProfileModal(false);
    }
});

//1280px element switcher on header
const searchToggle = document.querySelector(`.fnv-headerSearch .fnv-search`);
const phoneBlock = document.querySelector(`.fnv-phoneBlock`);

if (window.screen.width > 1024 && window.screen.width < 1281) {
    searchToggle.onfocus = function () {
        phoneBlock.style.display = 'none';
        document.querySelector(`.fnv-headerSearch`).classList.remove('fnv-inactive');
    };

    searchToggle.onblur = function () {
        phoneBlock.style.display = 'flex';
        document.querySelector(`.fnv-headerSearch`).classList.add('fnv-inactive');
    };
}

//tablet menu
const tabletMenuToggle = document.querySelector(`.fnv-tabletMenuToggle`);
const tabletMenuModal = document.querySelector(`.fnv-tabletMenuModal`);
const tabletMenuModalBlock = document.querySelector(`.fnv-tabletMenuModalBlock`);

let isOpenTabletMenu = false;

function toggleTabletMenuModal(value) {
    isOpenTabletMenu = value;

    if (isOpenTabletMenu) {
        tabletMenuModal.style.top = `${headerCont.offsetHeight}px`;
        tabletMenuModal.style.display = `flex`;
        tabletMenuModalBlock.classList.add(`fnv-modalAnimation`);

        if (window.screen.width < 631) {
            document.body.classList.add(`fnv-noScroll`);
        }
    } else {
        tabletMenuModal.style.display = `none`;
        tabletMenuModalBlock.classList.remove(`fnv-modalAnimation`);
        document.body.classList.remove(`fnv-noScroll`);
        document.body.classList.remove(`fnv-noScroll`);
    }
}

tabletMenuToggle.addEventListener("click", function (e) {
    toggleTabletMenuModal(!isOpenTabletMenu);
});

document.body.addEventListener("click", function (e) {
    const isTabletModalBlock = tabletMenuModalBlock.contains(e.target) || tabletMenuToggle.contains(e.target);

    if (!isTabletModalBlock) {
        toggleTabletMenuModal(false);
    }
});