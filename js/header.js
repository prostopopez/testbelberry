//Dropdown on Catalog Pages
const filterDropdown = document.querySelectorAll(`.fnv-dropdown`);

for (let i = 0; i < filterDropdown.length; i++) {
    let filterTrigger = filterDropdown[i].querySelector(`.fnv-filterName`);
    let filterContent = filterDropdown[i].querySelector(`.fnv-dropdown-content`);

    filterTrigger.addEventListener('click', function (event) {
        if (filterTrigger.contains(filterTrigger)) {
            let toOpen = filterContent.classList.contains('fnv-closeDrop');
            toggleFilterButton(toOpen, filterContent, filterTrigger);
        }
    });
}

function toggleFilterButton(toOpen, filterContent, filterTrigger) {
    if (toOpen) {
        filterContent.classList.remove(`fnv-closeDrop`);
        filterTrigger.classList.remove(`fnv-whileClosed`);
    } else {
        filterContent.classList.add(`fnv-closeDrop`);
        filterTrigger.classList.add(`fnv-whileClosed`);
    }
}