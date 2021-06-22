const dropdown = document.querySelectorAll(`.fnv-dropdowns > .fnv-dropdown`);

for (let i = 0; i < dropdown.length; i++) {
    let dropBody = dropdown[i].querySelector(`.fnv-dropTrigger`);
    let dropTrigger = dropBody.querySelector('.fnv-leftSvgs');
    let dropContent = dropdown[i].querySelector(`.fnv-dropdownContent`);

    dropTrigger.addEventListener('click', function (event) {
        if (dropTrigger.contains(dropTrigger)) {
            let toOpen = dropContent.classList.contains('fnv-openDrop');
            toggleFilterButton(toOpen, dropContent, dropBody);
        }
    });
}

function toggleFilterButton(toClose, dropContent, dropBody) {
    if (toClose) {
        dropContent.classList.remove(`fnv-openDrop`);
        dropBody.classList.remove(`fnv-whileOpened`);
    } else {
        dropContent.classList.add(`fnv-openDrop`);
        dropBody.classList.add(`fnv-whileOpened`);
    }
}