let basketArray;

if (localStorage.getItem('basketLocal') == null) {
    basketArray = [];
} else {
    basketArray = JSON.parse(localStorage.getItem('basketLocal'));
}


function removeDuplicates(originalArray, prop) {
    let newArray = [];
    let lookupObject = {};

    for (let i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (let i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    return newArray;
}

let uniqueArray = removeDuplicates(basketArray, "finalPrice");
localStorage.setItem('basketLocal', JSON.stringify(uniqueArray));

let basketContent = document.querySelector('.fnv-basketContent');

uniqueArray.map(item => {
    if (item.hasOwnProperty('pcName')) {
        basketContent.innerHTML += `<div class="fnv-basketItem fnv-pc">
            <div class="fnv-itemInfo">
                <h5>${item.pcName}</h5>
                <div class="fnv-detailsPC">
                    <div class="fnv-detailPC fnv-ssd">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25.493" height="25.493"
                             viewBox="0 0 25.493 25.493">
                            <path
                                d="M3,31.493H28.493V25.12H3Zm2.549-4.78H8.1V29.9H5.549ZM3,6v6.373H28.493V6Zm5.1,4.78H5.549V7.593H8.1ZM3,21.933H28.493V15.56H3Zm2.549-4.78H8.1V20.34H5.549Z"
                                transform="translate(-3 -6)" fill="#737373" />
                        </svg>
                        <div>
                            <p class="fnv-nameOfDetail">
                                твердотелый накопитель
                            </p>
                            <p class="fnv-aboutDetail">${item.ssd} x${item.ssdCount}</p>
                        </div>
                    </div>
                    <div class="fnv-detailPC fnv-cpu">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                             width="31"
                             height="32" viewBox="0 0 31 32">
                            <defs>
                                <pattern id="pattern1" preserveAspectRatio="none" width="100%" height="100%"
                                         viewBox="0 0 24 24">
                                    <image width="24" height="24"
                                           xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB8SURBVHgB5ZVJCsAwCEW15Kw9VC+b0kVAbMQBpUjfKmA0+tEI8BVzzjN6phzQHZQMUslqQMRr+T7nV9BljDyw8xn8dUhmWC5p1fDEqERDMmhBuI90t1yikjmgzWKWyMNPJfIMnkmJrEkulwh3GdAPy0tFo8TJ2Gr9N1p/biebebzePgb0AAAAAElFTkSuQmCC" />
                                </pattern>
                            </defs>
                            <rect id="l_2" width="31" height="32" fill="url(#pattern1)" />
                        </svg>
                        <div>
                            <p class="fnv-nameOfDetail">
                                процессор
                            </p>
                            <p class="fnv-aboutDetail">${item.cpu}</p>
                        </div>
                    </div>
                    <div class="fnv-detailPC fnv-ram">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                             width="31"
                             height="32" viewBox="0 0 31 32">
                            <defs>
                                <pattern id="pattern2" preserveAspectRatio="none" width="100%" height="100%"
                                         viewBox="0 0 24 24">
                                    <image width="24" height="24"
                                           xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABjSURBVHgB7ZNRCsAgDEOb4Vl3qF22Yx/CVlYNWgSh70tiTSy0IkkyC+pBVU8JBMD1ESID3l6lV1B/w2rW6xCHp9g+YDUqIIr9A4p38TdVrEYbjuKOafSyLQFWmO2itRNJMsYNDJgy3QoDOV0AAAAASUVORK5CYII=" />
                                </pattern>
                            </defs>
                            <rect id="l_3" width="31" height="32" fill="url(#pattern2)" />
                        </svg>
                        <div>
                            <p class="fnv-nameOfDetail">
                                оперативная память
                            </p>
                            <p class="fnv-aboutDetail">${item.ram} x${item.ramCount}</p>
                        </div>
                    </div>
                    <div class="fnv-detailPC fnv-gpu">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                             width="31"
                             height="32" viewBox="0 0 31 32">
                            <defs>
                                <pattern id="pattern3" preserveAspectRatio="none" width="100%" height="100%"
                                         viewBox="0 0 24 24">
                                    <image width="24" height="24"
                                           xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADFSURBVHgB7ZU9CgIxEIUTEbbRa1hpo9Wewzt4KE9g5TG00kYbvYaVNvELBFnQlTcSWZbdB49ks/OTzA/jXNvh636EEFbOYsj7tUXe5OCb7MD9GUNVkFsuWKbp80pI9oqe9AKMlywjuIFbWCSHeRyACTxy6zu8sd/BmaJoycGjsi+cCNXBGZaEZQyj8Tm8KIpSkgnLIeVhmY5O8UzRlasoVY1UOVVk7YNPDdf3QTYHER3tg1q0Zh68jUzrqHwZUkfmrw4awxM/Zl2mctjtEgAAAABJRU5ErkJggg==" />
                                </pattern>
                            </defs>
                            <rect id="l_1" width="31" height="32" fill="url(#pattern3)" />
                        </svg>
                        <div>
                            <p class="fnv-nameOfDetail">
                                видеокарта
                            </p>
                            <p class="fnv-aboutDetail">${item.gpu} x${item.gpuCount}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fnv-aboutPrice">
                <p>Стоимость:</p>
                <p class="fnv-price">${parseInt(item.finalPrice)} ₽</p>
                <p>Количество:</p>
                <label>
                    <input class="fnv-itemCount" type="text" size="1" value="1">
                </label>
                <button class="fnv-removeItem">
                    Убрать из корзины
                </button>
            </div>
            <div class="fnv-forImg">
                <img src="${item.img}" alt="">
            </div>
        </div>`;
    }

    if (item.hasOwnProperty('keyboardName')) {
        basketContent.innerHTML += `<div class="fnv-basketItem fnv-keyb">
                <div class="fnv-itemInfo">
                    <h5>${item.keyboardName}</h5>
                    <div class="fnv-flexStats">
                        <div>
                            <span>Тип клавиатуры</span><span class="fnv-typeOfKey">${item.keyboardType}</span>
                        </div>
                        <div>
                            <span>Тип подключения</span><span class="fnv-typeOfConnect">${item.keyboardConnect}</span>
                        </div>
                        <div>
                            <span>Длина кабеля</span><span class="fnv-length">${item.keyboardLength}</span>
                        </div>
                        <div>
                            <span>Материал</span><span class="fnv-material">${item.keyboardMaterial}</span>
                        </div>
                    </div>
                </div>
                <div class="fnv-aboutPrice">
                    <p>Стоимость:</p>
                    <p class="fnv-price">${parseInt(item.finalPrice)} ₽</p>
                    <p>Количество:</p>
                    <label>
                        <input class="fnv-itemCount" type="text" size="1" value="1">
                    </label>
                    <button class="fnv-removeItem">
                        Убрать из корзины
                    </button>
                </div>
                <div class="fnv-forImg">
                    <img src="${item.img}" alt="">
                </div>
            </div>`;
    }
});
//

let basketItems = basketContent.querySelectorAll('.fnv-basketItem');

for (let i = 0; i < basketItems.length; i++) {
    let localPrice = basketItems[i].querySelector('.fnv-price');
    let localCount = basketItems[i].querySelector('.fnv-itemCount');

    let startPrice = parseInt(localPrice.innerHTML);

    localCount.addEventListener('input', function () {
        localPrice.innerHTML = startPrice * localCount.value + ' ₽';
    });

    let removeItem = basketItems[i].querySelector('.fnv-removeItem');

    removeItem.addEventListener('click', function () {
        for (let i = basketArray.length - 1; i >= 0; --i) {
            if (basketArray[i].finalPrice === parseInt(localPrice.innerHTML) / localCount.value) {
                basketArray.splice(i, 1);
            }
        }

        localStorage.setItem('basketLocal', JSON.stringify(basketArray));
        document.location.reload();
    });
}
