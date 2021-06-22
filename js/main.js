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