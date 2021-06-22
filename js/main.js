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
        });
    }

    if (!!countDropdowns[i].querySelector('.fnv-plus')) {
        let plus = countDropdowns[i].querySelector('.fnv-plus');

        plus.addEventListener('click', function () {
            count++;
            countDropdowns[i].querySelector('.fnv-detailCount').value = count;
        });
    }
}

let dropdowns = document.querySelectorAll('.fnv-dropdowns .fnv-dropdown');

for (let i = 0; i < dropdowns.length; i++) {
    if (!!dropdowns[i].querySelectorAll('.fnv-dropdownItem')) {
        let items = dropdowns[i].querySelectorAll('.fnv-dropdownItem');

        if (!!dropdowns[i].querySelectorAll('.fnv-dropdownItem .fnv-choiceCheck button')) {
            let allChoices = dropdowns[i].querySelectorAll('.fnv-dropdownItem .fnv-choiceCheck button');
            console.log(allChoices);

            for (let j = 0; j < items.length; j++) {
                let choice = items[j].querySelector('.fnv-choiceCheck button');

                choice.addEventListener('click', function () {
                    for (let f = 0; f < allChoices.length; f++) {
                        allChoices[f].classList.remove(`fnv-active`);
                    }

                    choice.classList.add(`fnv-active`);
                });
            }
        }
    }
}