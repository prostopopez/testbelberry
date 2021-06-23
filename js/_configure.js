// dropdown
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

// Final Price Setup
let prices = {
    ssd: 11500,
    cpu: 21000,
    gpu: 101000,
    ram: 4700,
    motherboard: 14000,
    hdd: 2900,
    cooler: 4500,
    bp: 7400
};

let ssdCount;
let gpuCount;
let ramCount;
let hddCount;
let finalPrice;

function changeFinal() {
    ssdCount = document.querySelector('.fnv-ssd .fnv-detailCount').value;
    gpuCount = document.querySelector('.fnv-gpu .fnv-detailCount').value;
    ramCount = document.querySelector('.fnv-ram .fnv-detailCount').value;
    hddCount = document.querySelector('.fnv-hdd .fnv-detailCount').value;

    finalPrice = prices.ssd * ssdCount + prices.cpu + prices.gpu * gpuCount + prices.ram * ramCount + prices.motherboard + prices.hdd * hddCount + prices.cooler + prices.bp;

    document.querySelector(`.fnv-finalPrice`).innerHTML = finalPrice + `₽`;
}

window.onload = function () {
    changeFinal();
};

// PlusMinus buttons
let countDropdowns = document.querySelectorAll('.fnv-dropdowns .fnv-dropdown .fnv-plusMinus');

for (let i = 0; i < countDropdowns.length; i++) {
    let count = 1;

    if (!!countDropdowns[i].querySelector('.fnv-minus')) {
        let minus = countDropdowns[i].querySelector('.fnv-minus');

        minus.addEventListener('click', function () {
            if (count > 1) {
                count--;
                countDropdowns[i].querySelector('.fnv-detailCount').value = count;
            }

            changeFinal();
        });
    }

    if (!!countDropdowns[i].querySelector('.fnv-plus')) {
        let plus = countDropdowns[i].querySelector('.fnv-plus');

        plus.addEventListener('click', function () {
            count++;
            countDropdowns[i].querySelector('.fnv-detailCount').value = count;

            changeFinal();
        });
    }
}

// Changing finalPrice
let dropdowns = document.querySelectorAll('.fnv-dropdowns .fnv-dropdown');

for (let i = 0; i < dropdowns.length; i++) {
    if (!!dropdowns[i].querySelectorAll('.fnv-dropdownItem')) {
        let items = dropdowns[i].querySelectorAll('.fnv-dropdownItem');

        if (!!dropdowns[i].querySelectorAll('.fnv-dropdownItem .fnv-choiceCheck button')) {
            let allChoices = dropdowns[i].querySelectorAll('.fnv-dropdownItem .fnv-choiceCheck button');

            for (let j = 0; j < items.length; j++) {
                let choice = items[j].querySelector('.fnv-choiceCheck');

                choice.querySelector('button').addEventListener('click', function () {
                    for (let f = 0; f < allChoices.length; f++) {
                        allChoices[f].classList.remove(`fnv-active`);
                    }

                    dropdowns[i].querySelector('.fnv-detailShort').innerHTML = choice.querySelector('p').innerHTML;
                    choice.querySelector('button').classList.add(`fnv-active`);

                    if (j === 0) {
                        prices.ssd = 11500;
                    } else {
                        prices.ssd = 19603;
                    }

                    changeFinal();
                });
            }
        }
    }
}

// toBasket
let basketArray;

if (localStorage.getItem('basketLocal') == null) {
    basketArray = [];
} else {
    basketArray = JSON.parse(localStorage.getItem('basketLocal'));
}

let configurePcName = document.querySelector('.fnv-aboutPc h4').innerHTML;
let configureInfo = document.querySelector('.fnv-dropdowns');
let configureToBasket = document.querySelector('.fnv-toBasket');

configureToBasket.addEventListener('click', function () {
    let ssdChoice = configureInfo.querySelector('.fnv-ssd .fnv-detailShort').innerHTML;
    let cpuChoice = configureInfo.querySelector('.fnv-cpu .fnv-detailShort').innerHTML;
    let gpuChoice = configureInfo.querySelector('.fnv-gpu .fnv-detailShort').innerHTML;
    let ramChoice = configureInfo.querySelector('.fnv-ram .fnv-detailShort').innerHTML;
    let hddChoice = configureInfo.querySelector('.fnv-hdd .fnv-detailShort').innerHTML;
    let motherBoardChoice = configureInfo.querySelector('.fnv-motherBoard .fnv-detailShort').innerHTML;
    let coolerChoice = configureInfo.querySelector('.fnv-cooler .fnv-detailShort').innerHTML;
    let bpChoice = configureInfo.querySelector('.fnv-bp .fnv-detailShort').innerHTML;

    basketArray.push({
        pcName: configurePcName,
        ssd: ssdChoice,
        ssdCount: parseInt(ssdCount),
        cpu: cpuChoice,
        gpu: gpuChoice,
        gpuCount: parseInt(gpuCount),
        ram: ramChoice,
        ramCount: parseInt(ramCount),
        hdd: hddChoice,
        hddCount: parseInt(hddCount),
        motherBoard: motherBoardChoice,
        cooler: coolerChoice,
        bp: bpChoice,
        finalPrice
    });

    localStorage.setItem('basketLocal', JSON.stringify(basketArray));
});
