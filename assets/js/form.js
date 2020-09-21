'use strict'

/*---------------------------Обработка всех форм на сайте ---------------------------*/

//шаблон телефона modal
$(function () {
    $("#phone").mask("8(999) 999-9999");
});

//шаблон телефона index
$(function () {
    $("#index-phone").mask("8(999) 999-9999");
});

/* кнопка обратного звонка */

$('#headerBtn').on('click', function () {
    $('#modalForm').modal('show')
    $('body').css({ //стиль body во воремя запуска модального окна формы (не скрываем скролл)
        'overflow-y': 'scroll',
        'padding-right': '0px'
    })
});

/* кнопка услуг */

$('#uslugiBtn').on('click', function () {
    let reservation = `<input type='hidden' name='service' id='service' value='${$(this).attr('data-service')}'>`;
    $('#modalForm').modal('show')
    $('#mainForm').append(reservation);
    $('#modalForm').on('hidden.bs.modal', function (e) {
        $("#service").remove()
    })
});

/* кнопка лота */

$('#objectBtn').on('click', function () {
    let reservation = `<input type='hidden' name='lot' id='lot' value='${$(this).attr('data-object')}'>`;
    $('#modalForm').modal('show')
    $('#mainForm').append(reservation);
    $('#modalForm').on('hidden.bs.modal', function (e) {
        $("#lot").remove()
    })
});


//фокусировка на input в модальном окне
$('#modalForm').on('shown.bs.modal', function () {
    $('#name').trigger('focus')
})

//обработка ответа mainForm

$('#mainForm').on('submit', function () {
    $('.spinner-border').removeClass('d-none'); //add preload
});


$(document).on('af_complete', function (event, response) {
    let form = response.form;


    if (form.attr('id') == 'mainForm') {

        AjaxForm.Message.success = function (message, sticky) {
            $('.spinner-border').addClass('d-none'); //remove preload
            $('#modalForm').modal('hide')

            setTimeout(function () {
                $('#modal-answer').modal('show');
                $('body').css({ //стиль body во воремя запуска модального окна ответа (не скрываем скролл)
                    'overflow-y': 'scroll',
                    'padding-right': '0px'
                });
            }, 300)

        };

        AjaxForm.Message.error = function (message, sticky) {
            $('.spinner-border').addClass('d-none'); //remove preload
            $.each(response.data, function (index, value) {
                form.find("[name=" + index + "]").addClass('is-invalid')
                form.find("[data-name=" + index + "]").addClass('show').html(value)
            });
        };

    } else {
        console.log(response)
    }
});

//обработка ответа indexForm

$('#indexForm').on('submit', function () {
    $('.spinner-border').removeClass('d-none'); //add preload
});


$(document).on('af_complete', function (event, response) {
    let form = response.form;


    if (form.attr('id') == 'indexForm') {

        AjaxForm.Message.success = function (message, sticky) {
            $('.spinner-border').addClass('d-none'); //remove preload
            $('#modalForm').modal('hide')

            setTimeout(function () {
                $('#modal-answer').modal('show');
                $('body').css({ //стиль body во воремя запуска модального окна ответа (не скрываем скролл)
                    'overflow-y': 'scroll',
                    'padding-right': '0px'
                });
            }, 300)

        };

        AjaxForm.Message.error = function (message, sticky) {
            $('.spinner-border').addClass('d-none'); //remove preload
            $.each(response.data, function (index, value) {
                form.find("[name=" + index + "]").addClass('is-invalid')
                form.find("[data-name=" + index + "]").addClass('show').html(value)
            });
        };

    } else {
        console.log(response)
    }
});


//удаление всех inline style body после закрытия модального окна формы
$('#modalForm').on('hidden.bs.modal', function (e) {
    $('body').removeAttr('style');
});

//удаление всех inline style body после закрытия модального окна ответа
$('#modal-answer').on('hidden.bs.modal', function (e) {
    $('body').removeAttr('style');
});


