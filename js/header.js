//user dropdown on header
const userDropdown = document.querySelector(`.fnv-userDropdown`);
const userToggle = userDropdown.querySelector(`.fnv-newDrop`);
let userDropdownActive = false;

userToggle.addEventListener('click', function (event) {
    userDropdownActive = !userDropdownActive;
    toggleDropdown(active, userDropdown);
});

function toggleDropdown(active, userDropdown) {
    if (active) {
        userDropdown.classList.add(`fnv-active`);
    } else {
        userDropdown.classList.remove(`fnv-active`);
    }
}

//category dropdown on header
const categoryDropdown = document.querySelector(``);
const categoryToggle = userDropdown.querySelector(`.fnv-categoryToggle`);
let categoryDropdownActive = false;

categoryToggle.addEventListener('click', function (event) {
    categoryDropdownActive = !categoryDropdownActive;
    toggleDropdown(active, categoryDropdown);
});

function toggleDropdown(active, userDropdown) {
    if (active) {
        categoryDropdown.classList.add(`fnv-active`);
    } else {
        categoryDropdown.classList.remove(`fnv-active`);
    }
}