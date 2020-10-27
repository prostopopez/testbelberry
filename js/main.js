//slider for cards adjust
window.onload = function () {
    cardAdjust();

    window.onresize = function () {
        cardAdjust();
    }
};


function cardAdjust() {
    if (window.screen.width > 1024) {
        let sliderCards = [];
        let dotConts = [];
        const sliderCardContainers = document.querySelectorAll(`.fnv-productCardContainer`);

        for (let i = 0; i < sliderCardContainers.length; i++) {
            let whileInCont = sliderCardContainers[i].querySelectorAll(`.fnv-productCard`);
            Array.from(whileInCont).map(item => sliderCards.push(item));

            let dotsCont = sliderCardContainers[i].querySelector(`.fnv-glider-dots`);
            dotConts.push(dotsCont);
        }

        sliderCards.map(item => {
            item.style.height = '386px';

            item.addEventListener('mouseover', function (e) {
                changeCardHeight(item, true);
            });

            item.addEventListener('mouseout', function (e) {
                changeCardHeight(item, false);
            });
        })

        function changeCardHeight(item, change) {
            if (change) {
                item.style.height = 'auto'

                dotConts.map(dot => {
                    dot.style.zIndex = '1';
                })
            } else {
                item.style.height = '386px';

                dotConts.map(dot => {
                    dot.style.zIndex = '3';
                })
            }
        }
    }
}

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
    alphabetToggle.addEventListener('click', function (e) {
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

document.body.addEventListener('click', function (e) {
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


// Modal window
let isModalOpened = false;
let modalWindowContent;
let modalWindowCloseButton;

function modalAction(id, value) {
    const modal = document.querySelector(id);
    modalWindowContent = modal.querySelector(`.fnv-modalWindowContent`);
    modalWindowCloseButton = modal.querySelector(`.fnv-modalWindowCloseButton`);
    isModalOpened = value;

    modalWindowCloseButton.addEventListener("click", function (e) {
        modalAction(id, false);
    });

    document.body.addEventListener("click", function (e) {
        const isModalBlock = modalWindowContent.contains(e.target) || openCallBackButton.contains(e.target);

        if (!isModalBlock) {
            modalAction(id, false);
        }
    });

    if (isModalOpened) {
        document.body.classList.add(`fnv-noScroll`);
        modal.style.display = `flex`;
    } else {
        document.body.classList.remove(`fnv-noScroll`);
        modal.style.display = `none`;
    }
}

function callBackModal() {
    modalAction(`#callBackModal`, !isModalOpened);
}

function openAuthModal() {
    modalAction(`#authModal`, !isModalOpened);
}

function openRegistrationModal() {
    modalAction(`#registrationModal`, !isModalOpened);
}

function openThanksModal() {
    modalAction(`#thanksModal`, !isModalOpened);
}

let bigNumbers = document.querySelectorAll(`.fnv-bigNumber`);

for (let i = 0; i < bigNumbers.length; i++) {
    bigNumbers[i].textContent = bigNumbers[i].textContent.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' Р';
}
