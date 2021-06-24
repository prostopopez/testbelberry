function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

//
let slideIndex = 1;

showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

//Swipe Horizontal
let glideSlide = document.querySelector('.fnv-slider');
let itemTouch = new Hammer(glideSlide);
let direction;

itemTouch.on('panleft panright panend', e => {
        if (e.type === 'panleft') {
            direction = 'left';
        } else if (e.type === 'panright') {
            direction = 'right';
        }


        if (e.type == 'panend' && direction == 'left') {
            showSlides(slideIndex += 1);
        } else if (e.type == 'panend' && direction == 'right') {
            showSlides(slideIndex -= 1);
        }
    }
);

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".fnv-slider .fnv-slide");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}

// stock slider
let slider = tns({
    container: '.fnv-stockSlider',
    loop: true,
    controls: false,
    autoplayButtonOutput: false,
    nav: false,
    items: getWidth() > 1024 ? 3 : 1,
    slideBy: 'page',
    gutter: 30,
    speed: 1500,
    autoplay: true,
    autoplayTimeout: 5000,
    swipeAngle: false
});

let stockSliderItems = document.querySelectorAll('.fnv-stockSlider .tns-item');
for (let i = 0; i < stockSliderItems.length; i++) {
    stockSliderItems[i].style.height = '100%';
}

let slider2 = tns({
    container: '.fnv-gallerySlider1',
    axis: "vertical",
    loop: true,
    controls: false,
    autoplayButtonOutput: false,
    nav: false,
    items: 1,
    gutter: 30,
    speed: 2000,
    autoplay: true,
    autoplayTimeout: 3500,
    swipeAngle: false
});

let slider3 = tns({
    container: '.fnv-gallerySlider2',
    loop: true,
    controls: false,
    autoplayButtonOutput: false,
    nav: false,
    items: 1,
    gutter: 30,
    speed: 2000,
    autoplay: true,
    autoplayTimeout: 3500,
    swipeAngle: false
});