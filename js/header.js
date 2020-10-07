//user dropdown on header
const userDropdown = document.querySelector(`.fnv-userDropdown`);
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
        document.body.classList.add(`fnv-noScroll`);
    } else {
        categoryModal.style.display = `none`;
        categoryModalBlock.classList.remove(`fnv-modalAnimation`);
        document.body.classList.remove(`fnv-noScroll`);
    }
}

categoryToggle.addEventListener("click", function (e) {
    toggleProfileModal(!isOpenCategory);
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
        phoneBlock.style.display = 'block';
        document.querySelector(`.fnv-headerSearch`).classList.add('fnv-inactive');
    };
}