let catalogSliderBtn = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="284.929px" height="284.929px" viewBox="0 0 284.929 284.929" style="enable-background:new 0 0 284.929 284.929;"
	 xml:space="preserve">
<g>
	<path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
		L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
		c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
		c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"/>
</g>
</svg>`

/* slider */

const catalogSlider = () => {

    /* catalog */
    let attr = $('[data-item][class~="catalog-slider"]');
    //console.log(attr)
    $(document).find(attr).slick({
        arrows: true,
        infinite: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: 'ondemand',
        prevArrow: '<button class="slick-prev d-flex justify-content-center align-items-center">' + catalogSliderBtn + '</button>',
        nextArrow: '<button class="slick-next d-flex justify-content-center align-items-center">' + catalogSliderBtn + '</button>',

    });

    $(document).find(attr).attr('data-slider', 1)

    /* let attrSliderItems = $(document).find('.catalog-banners-cont').attr('data-item-cont'); */
    $('.catalog-banners-link').fancybox({
        backFocus: false,
        hash: false,
    })

};

$(document).ready(catalogSlider());

/* Разделение цены */
function priceDelimeter() {

    $('.catalog-price').each(function () {
        $(this).text($(this).html().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '))
    })

}

$(document).ready(priceDelimeter());

/* ИЗБРАННОЕ */

$(function () {
    $(document).on('submit', '.favoritesForm', function (e) {
        e.preventDefault();
        let form = $(this),
            actionAdd = 'fAdd',
            actionDelete = 'fDelete';

        form.find(".f-loader").toggleClass('d-none')
        form.find(".f-svg").toggleClass('d-none')

        $.ajax({
            ajax: false,
            url: '/api/favorites',
            type: "POST",
            dataType: "json",
            data: form.serialize(),
            success: function (response) {
                //console.log(response.content)
                $('.favorites-count').html(response.count);
                $('.favorites-main-cont').html(response.content);

                //инициализация слайдера после обновления контейнера в разделе Избранное
                //console.log(window.location.pathname)

                if (window.location.pathname == '/izbrannoe') {
                    catalogSlider();
                    priceDelimeter();
                }

                form.find(".f-loader").toggleClass('d-none')
                form.find(".f-svg").toggleClass('d-none')


                if (form.find('input').attr("name") != actionAdd) {

                    form.find('input').attr("name", actionAdd);
                    form.find('button').removeClass('f-active');
                    form.find('button').find('span').html('В избранное');
                    $.jGrowl("Объект удален из избранного!");

                } else {
                    form.find('input').attr("name", actionDelete);
                    form.find('button').addClass('f-active');
                    form.find('button').find('span').html('В избранном');
                    $.jGrowl("Объект добавлен в избранное!");
                }

            },
            error: function (response) { // Данные не отправлены
                console.log('Ошибка отправки данных!')
            }
        });
    });
});

/* Фильтр */

if (typeof (pdoPage) == 'undefined') {
    console.log("You must load pdoPage's scripts for using ajax mode in this filter!")
} else {

    pdoPage.callbacks['before'] = function (config) {
        $(".catalog-spinner").toggleClass('d-none').toggleClass('d-flex')
    };

    pdoPage.callbacks['after'] = function (config, response) {
        let attr = $('[data-slider][class~="catalog-slider"]');
        $(document).find(attr).slick('unslick');

        $(".catalog-spinner").toggleClass('d-none').toggleClass('d-flex')
        return false;
    }

    $(document).on('pdopage_load', function (e, config, response) {
        catalogSlider();
        priceDelimeter()

        return false;
    });
}

/* select2 */

//адрес
$(document).ready(function () {
    $('.filter-address').select2({
        width: '100%',
        placeholder: '',
        tags: true,
        placeholder: '',
        allowClear: true, // Shows an X to allow the user to clear the value.
        "language": {
            "noResults": function () {
                return '';
            }
        }
    });
});


//категория земель
$(document).ready(function () {
    $('.filter-sector-category').select2({
        tags: false,
        width: '100%',
        placeholder: '',
        allowClear: true,
        language: "ru",
        height: 60,
        "language": {
            "noResults": function () {
                return 'Совпадений не найдено!';
            }
        }
    });
});

//коммуникации
$(document).ready(function () {
    $('.filter-communications').select2({
        tags: false,
        width: '100%',
        placeholder: '',
        allowClear: true,
        language: "ru",
        height: 60,
        "language": {
            "noResults": function () {
                return '';
            }
        }
    });
});

//material&rieltors
$(document).ready(function () {
    $('.filter-material, #rieltor').select2({
        tags: false,
        width: '100%',
        placeholder: '',
        allowClear: true,
        language: "ru",
        height: 60,
        "language": {
            "noResults": function () {
                return '';
            }
        }
    });
});

/* переключение единиц площади в фильтре */

$('.category_select input').not('#property_type3').click(function () {
    $(document).find('#labelArea').html('м<sup>2</sup>');
});

$(document).find('#property_type3').click(function () {
    $(document).find('#labelArea').html('сотки');
});


/* обработка фильтра */
function filterAction() {
    let fomSelector = '#mainFilter ';

    function collectParams() {
        let newParams = {};

        $(fomSelector + 'input, select').each(function () {
            let type = $(this).attr('type'),
                name = $(this).attr('name'),
                disable = $(this).attr('disabled'),
                value = $(this).val();

            if (typeof disable !== typeof undefined && disable !== false) {
                return;
            }
            switch (type) {
                case 'checkbox':
                    if ($(this).is(":checked")) {
                        if (!newParams.hasOwnProperty(name)) {
                            newParams[name] = [];
                        }
                        newParams[name].push(value);
                    }
                    break;
                case 'radio':
                    if ($(this).is(":checked")) {
                        newParams[name] = value;
                    }
                    break;
                case 'text':
                    if (name == 'price[]' || name == 'all_area[]') {

                        if (!newParams.hasOwnProperty(name)) {
                            newParams[name] = [];
                        }
                        newParams[name].push(value);
                    }
                    break;

                default:
                    newParams[name] = value;
                    break;
            }
        });
        //console.log(newParams)
        return newParams;
    }

    $(fomSelector).on('submit', function (e) {
        e.preventDefault()
        $("#loader").toggleClass('d-none') //loader

        $(this).find('input, select').filter(function () {
            return !$.trim(this.value).length;
        }).prop('disabled', true);
        /* target-link */
        $('#targetLink').val('1')
        $('#targetLink').val(location.hostname + '/katalog/?' + $(this).serialize());
    
        /* /target-link */

        if ($(this).attr('data-action') == 1) {
            document.location.href = '/katalog?' + $(this).serialize();
            return;
        }

        let filterParams = collectParams();

        pdoPage.Hash.set(filterParams);
        delete(pdoPage.keys.page);

        let config = pdoPage.configs['page'],
            key = config['pageVarKey'],
            href = location.href,
            page = 1;

        config['connectorUrl'] = href

        if (config.history) {
            pdoPage.Hash.remove(key);
        }
        pdoPage.loadPage(href, config);

        $(this).find('input, select').filter(function () {
            return !$.trim(this.value).length;
        }).prop('disabled', false);

    });

    $(document).on('pdopage_load', function (e, config, response) {
        $(config['rows']).show();
        $(document).find('.catalog_empty').hide();
        if (config['mode'] == 'scroll') {
            pdoPage.Reached = false;
            var $window = $(window);
            if ($window.scrollTop() > $(config['wrapper']).height() - $window.height()) {
                pdoPage.Reached = true;
                pdoPage.addPage(config);
            }
        }
    });

    $(document).on('pdopage_empty', function (e, config, response) {
        $(config['rows']).hide();
        $(config['more']).hide();
        $(".catalog-spinner").toggleClass('d-none').toggleClass('d-flex')
        $(document).find('.catalog_empty').show();
        console.log('empty')
    });

    /* onchange */
    if ($(fomSelector).attr('data-action') != 1) {

        $(fomSelector + 'input, select').on('change', function () {
            $(this).closest(fomSelector).trigger('submit');
        });
    }
};

/* вызов фильра */
$(document).ready(filterAction())

//сброс параметров
$(document).on('click', '#filterReset', function (e) {
    $(".r-loader").toggleClass('d-none')
});

//копирование ссылки
$('#copyLink').on('click', function () {
    let $tmp = $("<input>");
    $("body").append($tmp);
    $tmp.val($('#targetLink').val()).select();
    document.execCommand("copy");
    $tmp.remove();
});