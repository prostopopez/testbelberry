let slideIndex = 1;

showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".fnv-slider .fnv-slide");
    console.log(slides);
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
    items: 3,
    slideBy: 'page',
    gutter: 30,
    speed: 1500,
    autoplay: true,
    autoplayTimeout: 5000,
    swipeAngle: false
});