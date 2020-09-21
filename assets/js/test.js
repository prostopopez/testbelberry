function test(a = 0) {
    let b = $.Deferred()
    if (a == 0) {
        jQuery.event.special.testBad = {
            bindType: "DOMContentLoaded",
            delegateType: "DOMContentLoaded"

        };
        b.reject()
    } else {
        jQuery.event.special.testGood = {
            bindType: "DOMContentLoaded",
            delegateType: "DOMContentLoaded"

        };
        b.resolve();
    }

    let json = {
        "key1": "1",
        "key2": "2"
    }

    $.ajax({
        type: "POST",
        url: '/test/',
        data: json,
        dataType: 'json',
        success: function (response) { //Данные отправлены успешно
            console.log(response)
        },
        error: function (response) { // Данные не отправлены
            console.log('Ошибка отправки данных!')
        }
    });
    return b;
};

let f = test();

/* f.done(function () {
    alert('Good callback!')
})
f.fail(function () {
    alert('No!')
})

$(document).on('testGood', function () {
    alert('Test Good!!!');
})

$(document).on('testBad', function () {
    alert('Test Bad!!!');
}) */