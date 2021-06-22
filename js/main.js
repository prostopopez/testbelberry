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

/*------*/
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

/*------*/
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
