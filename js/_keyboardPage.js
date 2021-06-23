let basketArray;

if (localStorage.getItem('basketLocal') == null) {
    basketArray = [];
} else {
    basketArray = JSON.parse(localStorage.getItem('basketLocal'));
}

let contentKeyboard = document.querySelector('.fnv-contentKeyb');

let keyboardName = 'MSI Vigor GK20';
let keyboardType = contentKeyboard.querySelector('.fnv-typeOfKey').innerHTML;
let keyboardConnect = contentKeyboard.querySelector('.fnv-typeOfConnect').innerHTML;
let keyboardLength = contentKeyboard.querySelector('.fnv-length').innerHTML;
let keyboardMaterial = contentKeyboard.querySelector('.fnv-material').innerHTML;
let keyboardPrice = contentKeyboard.querySelector('.fnv-price').innerHTML;
let keyboardImg = document.querySelector('.fnv-viewKeyb img:first-of-type').src;

let keyboardToBasket = contentKeyboard.querySelector('.fnv-toBasket');

keyboardToBasket.addEventListener('click', function () {
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