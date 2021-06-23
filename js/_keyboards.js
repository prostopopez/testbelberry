let basketArray;

if (localStorage.getItem('basketLocal') == null) {
    basketArray = [];
} else {
    basketArray = JSON.parse(localStorage.getItem('basketLocal'));
}

let keyboardBlocks = document.querySelectorAll('.fnv-singleKeyboard');

for (let i = 0; i < keyboardBlocks.length; i++) {
    let keyboardName = keyboardBlocks[i].querySelector('h4').innerHTML;
    let keyboardType = 'Мембранная';
    let keyboardConnect = 'Проводная';
    let keyboardLength = '1.5м';
    let keyboardMaterial = 'Пластик';
    let keyboardPrice = keyboardBlocks[i].querySelector('.fnv-priceKeyb').innerHTML;
    let keyboardImg = keyboardBlocks[i].querySelector('img').src;

    let singleKeyboardToBasket = keyboardBlocks[i].querySelector('.fnv-toBasket')  ;

    singleKeyboardToBasket.addEventListener('click', function () {
        basketArray.push({
            keyboardName,
            keyboardType,
            keyboardConnect,
            keyboardLength,
            keyboardMaterial,
            keyboardPrice,
            img: keyboardImg
        });

        localStorage.setItem('basketLocal', JSON.stringify(basketArray));
    });
}