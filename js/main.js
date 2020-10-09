//alphabet modal under breadcrumbs
const headerCont = document.querySelector(`.fnv-header`);
const alphabetComp = document.querySelector(`.fnv-alphabetComp`);
const alphabetToggles = document.querySelectorAll(`.fnv-filterLetter`);
const alphabetModal = document.querySelector(`.fnv-alphabetModal`);
const alphabetModalBlock = document.querySelector(`.fnv-alphabetModalBlock`);

let isOpenAlphabet = false;

for (let i = 0; i < alphabetToggles.length; i++) {
    const alphabetToggle = alphabetToggles[i];

    //alphabet catalog list wrap
    alphabetToggle.addEventListener("click", function (e) {
        alphabetToggleModal(!isOpenAlphabet);
        alphabetCatalogListWrap();
    });
}

function alphabetToggleModal(value) {
    isOpenAlphabet = value;

    if (isOpenAlphabet) {
        alphabetModal.style.top = `${headerCont.offsetHeight + alphabetComp.offsetHeight}px`;
        alphabetModal.style.display = `flex`;
        alphabetModalBlock.classList.add(`fnv-modalAnimation`);
    } else {
        alphabetModal.style.display = `none`;
        alphabetModalBlock.classList.remove(`fnv-modalAnimation`);
    }
}

document.body.addEventListener("click", function (e) {
    const isAlphabetModalBlock = alphabetModalBlock.contains(e.target) || alphabetComp.contains(e.target);

    if (!isAlphabetModalBlock) {
        alphabetToggleModal(false);
    }
});

//alphabet catalog list wrap
const catalogMenu = document.querySelector(`.fnv-catalogMenu > ul`);
let catalogElements = catalogMenu.querySelectorAll(`li`);
let catalogMaxHeight;

function alphabetCatalogListWrap() {
    if (catalogElements.length > 11) {
        for (let j = 0; j < catalogElements.length; j++) {
            if (window.screen.width >= 1281) {
                catalogMaxHeight = (Math.ceil(catalogElements.length / 5)) * (catalogElements[j].offsetHeight);
            } else if (window.screen.width > 1024 && window.screen.width < 1281) {
                catalogMaxHeight = (Math.ceil(catalogElements.length / 4)) * (catalogElements[j].offsetHeight);
            } else if (window.screen.width <= 1025) {
                catalogMaxHeight = (Math.ceil(catalogElements.length / 3)) * (catalogElements[j].offsetHeight);
            }
            console.log(window.getComputedStyle(catalogElements[j], null).getPropertyValue('padding-bottom')
                .replace('px', ''));
            catalogMenu.style.maxHeight = `${catalogMaxHeight}px`;
        }
    }
}