//user dropdown on header
const userDropdown = document.querySelector(`.fnv-userDropdown`);
const newDrop = userDropdown.querySelector(`.fnv-newDrop`);
let active = false;

newDrop.addEventListener('click', function (event) {
    active = !active;
    toggleDropdown(active, userDropdown);
});

function toggleDropdown(active, userDropdown) {
    if (active) {
        userDropdown.classList.add(`fnv-active`);
    } else {
        userDropdown.classList.remove(`fnv-active`);
    }
}