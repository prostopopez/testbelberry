function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

window.addEventListener("resize", function (e) {
    if (getWidth() < 1044 && getWidth() > 1004) {
        window.location.reload();
    }
});