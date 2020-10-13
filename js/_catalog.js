const string = document.querySelectorAll(".fnv-catalogSmallColumn li");
const filterButton = document.getElementById('catalogFilterButton');
const catalogPage = document.querySelector(".fnv-catalogPage");
const catalogFilter = document.querySelector(".fnv-catalogContainerSmall");
const closeButton = document.querySelector(".fnv-close");

string.forEach (
  (element) =>
    (element.onclick = (e) => {
      e.path[0].classList.toggle("fnv-catalogActive");
    })
);

filterButton.onclick = () => {
    catalogPage.classList.add('fnv-catalogShadow');
    catalogFilter.classList.add('fnv-catalogModalWindow');
}

closeButton.onclick = () => {
    catalogPage.classList.remove('fnv-catalogShadow');
    catalogFilter.classList.remove('fnv-catalogModalWindow');
}

document.body.addEventListener("click", function (e) {
    const isCatalogModalOn = catalogFilter.contains(e.target) || filterButton.contains(e.target);

    if (!isCatalogModalOn) {
        catalogPage.classList.remove('fnv-catalogShadow');
        catalogFilter.classList.remove('fnv-catalogModalWindow');
    }
});