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
const profileModal = document.querySelector(`.fnv-profileModal`);
const profileModalBlock = document.querySelector(`.fnv-profileModalBlock`);
const headerCont = document.querySelector(`.fnv-header`);

let isOpenProfile = false;

function toggleProfileModal(value) {
    isOpenProfile = value;

    if (isOpenProfile) {
        profileModal.style.top = `${headerCont.offsetHeight}px`;
        profileModalBlock.style.width = `100%`;
        profileModal.style.display = `flex`;
        profileModalBlock.classList.add(`fnv-modalAnimation`);
        document.body.classList.add(`fnv-noScroll`);
    } else {
        profileModal.style.display = `none`;
        profileModalBlock.classList.remove(`fnv-modalAnimation`);
        document.body.classList.remove(`fnv-noScroll`);
    }
}

categoryToggle.addEventListener("click", function (e) {
    toggleProfileModal(!isOpenProfile);
});

document.addEventListener("click.Bst", function (event) {
    const isProfileModal = hasEventByElement(event, profileModalBlock) && hasEventByElement(event, categoryToggle);

    if (isOpenProfile && isProfileModal) {
        toggleProfileModal(false);
    }
});