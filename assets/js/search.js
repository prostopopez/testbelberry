'use strict'

/* Реализация поиска на сайте */

$(document).ready(function () {
    let menuSearch = $("#searchLink"),
        searchFormContainer = $('#formSearchContainer'),
        idInputSearch = $("#search"),
        resultContainer = $('#search-ajax-results-wrap');

    //клик по меню
    menuSearch.click(function (e) {
        e.preventDefault();
        searchFormContainer.slideToggle("slow");
        searchFormContainer.find('#search').trigger('focus');
    });

    $(document).mouseup(function (e) {

        if ($(window).width() > 768 && (!menuSearch.is(e.target) && menuSearch.has(e.target).length === 0) && (!searchFormContainer.is(e.target) && searchFormContainer.has(e.target).length === 0) && (!idInputSearch.is(e.target) && idInputSearch.has(e.target).length === 0) && (!resultContainer.is(e.target) && resultContainer.has(e.target).length === 0)) {
            searchFormContainer.slideUp("slow");
            //e.stopPropagation();
        }
    });

    /* live search */

    idInputSearch.submit(function () {
        // раскоментировать если нужна кнопка
        // $("#search-ajax-results-wrap").load("/simplesearch.html/ .search-ajax-results",$(".search").serialize()).slideDown("fast"); 
        return false;
    });
    // Живой поиск
    idInputSearch.keyup(function () {
        // определяем какие действия нужно делать при нажатии на клавиатуру
        idInputSearch.attr('autocomplete', 'off');

        if (this.value.length > 2) {

            $(document).mouseup(function (e) {

                if ((!idInputSearch.is(e.target) && idInputSearch.has(e.target).length === 0) && (!resultContainer.is(e.target) && resultContainer.has(e.target).length === 0)) {
                    resultContainer.slideUp("slow");
                    //e.stopPropagation();
                }
            });

            idInputSearch.click(function () { // отображаем
                resultContainer.slideDown("slow");
                return false;
            });
            // ajax запрос загрузка результатов поиска от страницы и показ контейнера
            let parsesearch = resultContainer.slideDown("fast").find('#search-ajax-results-items').load("/poisk? .simplesearch-result .search-caption-link", idInputSearch.serialize());
            resultContainer.find('#search-ajax-results-items').html(parsesearch.html());
            //console.log(parsesearch.html());
        } else {
            // Если набрано меньше 2 символов, скрыть контейнер (CSS display:none;)
            resultContainer.slideUp("slow");
        }
    });
});