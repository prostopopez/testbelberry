const dropdown = document.querySelectorAll(`.fnv-dropdowns > .fnv-dropdown`);

for (let i = 0; i < dropdown.length; i++) {
    let dropTrigger = dropdown[i].querySelector(`.fnv-dropTrigger`);
    let dropContent = dropdown[i].querySelector(`.fnv-dropdownContent`);

    dropTrigger.addEventListener('click', function (event) {
        if (dropTrigger.contains(dropTrigger)) {
            let toOpen = dropContent.classList.contains('fnv-openDrop');
            toggleFilterButton(toOpen, dropContent, dropTrigger);
        }
    });
}

function toggleFilterButton(toClose, dropContent, dropTrigger) {
    if (toClose) {
        dropContent.classList.remove(`fnv-openDrop`);
        dropTrigger.classList.remove(`fnv-whileOpened`);
    } else {
        dropContent.classList.add(`fnv-openDrop`);
        dropTrigger.classList.add(`fnv-whileOpened`);
    }
}