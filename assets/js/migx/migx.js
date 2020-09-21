/* indexBanners */

//вкладки
[{
    "caption": "Изображения",

    "fields": [{
            "field": "image",
            "caption": "Изображение:",
            "inputTVtype": "image",
            "sourceFrom": "config",
            "sources": "[{\"MIGX_id\":\"11\",\"context\":\"web\",\"sourceid\":\"2\"}]"
        },
        {

            "field": "alt",
            "caption": "alt:"
        }
    ]
}]

//разметка

[{
        "header": "Изображения",
        "width": "50",
        "sortable": "false",
        "dataIndex": "image",
        "renderer": "this.renderImage"
    },
    {
        "header": "alt",
        "width": "160",
        "sortable": "false",
        "dataIndex": "alt"
    }
]

/* Контент услуг */

//вкладки
[{
    "caption": "Контент",

    "fields": [{
            "field": "image",
            "caption": "Изображение:",
            "inputTVtype": "image",
            "sourceFrom": "config",
            "sources": "[{\"MIGX_id\":\"11\",\"context\":\"web\",\"sourceid\":\"2\"}]"
        },
        {

            "field": "caption",
            "caption": "Заголовок:"
        },
        {

            "field": "text",
            "inputTVtype": "richtext",
            "caption": "Контент:"
        }
    ]
}]

//разметка

[{
        "header": "Заголовок",
        "width": "80",
        "sortable": "false",
        "dataIndex": "caption"
    },
    {
        "header": "Изображения",
        "width": "30",
        "sortable": "false",
        "dataIndex": "image",
        "renderer": "this.renderImage"
    },
    {
        "header": "Контент",
        "width": "160",
        "sortable": "false",
        "dataIndex": "text"
    }
]


/* -------------объекты------------- */

/* комнаты */
//вкладки
[{

    "caption": "Квартиры, комнаты",
    "fields": [{
            "field": "caption",
            "caption": "Заголовок:",
            "default": "Дополнительные параметры квартир, комнат (нажмите правой кнопкой мыши для редактирования)"
        },
        {
            "field": "build_section",
            "caption": "Тип перекрытий:",
            "inputTVtype": "resourcelist",
            "inputOptionValues": "182"
        },
        {
            "field": "build_date",
            "caption": "Год постройки:"
        }, {
            "field": "all_floor",
            "caption": "Этажей в доме:"
        }, {
            "field": "area",
            "caption": "Жилая площадь, м2:"
        }, {
            "field": "area_kitchen",
            "caption": "Площадь кухни, м2:"
        }, {
            "field": "balcony",
            "caption": "Балконы/Лоджии:"
        }, {
            "field": "bathroom",
            "caption": "Санузлы:"
        }, {
            "field": "repair",
            "caption": "Ремонт:"
        }, {
            "field": "view_from_window",
            "caption": "Вид из окон:"
        }, {
            "field": "input",
            "caption": "Количество подъездов:"
        }, {
            "field": "lift",
            "caption": "Лифты:"
        }, {
            "field": "heating",
            "caption": "Отопление:"
        }
    ]
}]

//разметка

[{
        "header": "Заголовок",
        "dataIndex": "caption"
    },
    {
        "header": "Общая площадь, м2",
        "dataIndex": "all_area"
    },
    {
        "header": "Жилая площадь, м2",
        "dataIndex": "area"
    },
    {
        "header": "Жилая площадь, м2",
        "dataIndex": "area"
    }
]

/* гаражи */
//вкладки
[{

    "caption": "Гаражи",
    "fields": [{
        "field": "caption",
        "caption": "Заголовок:",
        "default": "Параметры гаражей (нажмите правой кнопкой мыши для редактирования)"
    }, {
        "field": "build_type",
        "caption": "Тип постройки:",
        "inputTVtype": "resourcelist",
        "inputOptionValues": "102"
    }]
}]


/* дома */
//вкладки

[{
    "caption": "Дома",
    "fields": [{
            "field": "caption",
            "caption": "Заголовок:",
            "default": "Дополнительные параметры домов (нажмите правой кнопкой мыши для редактирования)"
        },
        {
            "field": "section_area",
            "caption": "Площадь участка, сотки:"
        }, {
            "field": "area",
            "caption": "Жилая площадь, м2:"
        }

    ]
}]

/* земельные участки */
//вкладки

[{
    "caption": "Земельные участки",
    "fields": [{
            "field": "caption",
            "caption": "Заголовок:",
            "default": "Параметры земельных участков (нажмите правой кнопкой мыши для редактирования)"
        }, {
            "field": "position",
            "caption": "Расположение:",
            "inputTVtype": "resourcelist",
            "inputOptionValues": "200"
        },

        {
            "field": "category",
            "caption": "Категория земель:",
            "inputTVtype": "resourcelist",
            "inputOptionValues": "203"
        }

    ]
}]

/* коммерческая недвижимость */
//вкладки

[{
    "caption": "Коммерческая недвижимость",
    "fields": [{
        "field": "caption",
        "caption": "Заголовок:",
        "default": "Дополнительные параметры коммерческой недвижимости (нажмите правой кнопкой мыши для редактирования)"
    }, {
        "field": "area",
        "caption": "Полезная площадь, м2:"
    }]
}]



//разметка img


[{
    "formtabs":[
      {
        "MIGX_id":5,
        "caption":"Image",
        "print_before_tabs":"0",
        "fields":[
          {
            "field":"title",
            "caption":"Комментарий",
            "MIGX_id":12,
            "pos":1
          },
          {
            "MIGX_id":13,
            "field":"alt",
            "caption":"Alt",
            "description":"",
            "description_is_code":"0",
            "inputTV":"",
            "inputTVtype":"",
            "validation":"",
            "configs":"",
            "restrictive_condition":"",
            "display":"",
            "sourceFrom":"config",
            "sources":"",
            "inputOptionValues":"",
            "default":"test",
            "useDefaultIfEmpty":"0",
            "pos":2
          },
          {
            "MIGX_id":15,
            "field":"image",
            "caption":"Image",
            "description":"",
            "description_is_code":"0",
            "inputTV":"",
            "inputTVtype":"image",
            "validation":"",
            "configs":"",
            "restrictive_condition":"",
            "display":"none",
            "sourceFrom":"migx",
            "sources":"",
            "inputOptionValues":"",
            "default":"",
            "useDefaultIfEmpty":"0",
            "pos":4
          }
        ],
        "pos":1
      }
    ],
    "contextmenus":"edit_migx||duplicate_migx||remove_migx_and_image||movetotop_migx||movetotop_bottom",
    "actionbuttons":"loadfromsource||uploadfiles",
    "columnbuttons":"",
    "filters":"",
    "extended":{
      "migx_add":"Add Image",
      "disable_add_item":1,
      "add_items_directly":"",
      "formcaption":"Image",
      "update_win_title":"",
      "win_id":"resourcegallery",
      "maxRecords":20,
      "addNewItemAt":"bottom",
      "multiple_formtabs":"",
      "multiple_formtabs_label":"",
      "multiple_formtabs_field":"",
      "multiple_formtabs_optionstext":"",
      "multiple_formtabs_optionsvalue":"",
      "actionbuttonsperrow":4,
      "winbuttonslist":"",
      "extrahandlers":"this.handleColumnSwitch",
      "filtersperrow":4,
      "packageName":"",
      "classname":"",
      "task":"",
      "getlistsort":"",
      "getlistsortdir":"",
      "sortconfig":"",
      "gridpagesize":"",
      "use_custom_prefix":"0",
      "prefix":"",
      "grid":"",
      "gridload_mode":1,
      "check_resid":1,
      "check_resid_TV":"",
      "join_alias":"",
      "has_jointable":"yes",
      "getlistwhere":"",
      "joins":"",
      "hooksnippets":"",
      "cmpmaincaption":"",
      "cmptabcaption":"",
      "cmptabdescription":"",
      "cmptabcontroller":"",
      "winbuttons":"",
      "onsubmitsuccess":"",
      "submitparams":""
    },
    "columns":[
      {
        "MIGX_id":1,
        "header":"ID",
        "dataIndex":"MIGX_id",
        "width":10,
        "renderer":"",
        "sortable":"false",
        "show_in_grid":1
      },
      {
        "MIGX_id":2,
        "header":"Заголовок",
        "dataIndex":"title",
        "width":20,
        "sortable":"false",
        "show_in_grid":1,
        "renderer":"",
        "clickaction":"",
        "selectorconfig":"",
        "renderchunktpl":"",
        "renderoptions":"",
        "editor":"this.textEditor"
      },
      {
        "MIGX_id":3,
        "header":"Превью",
        "dataIndex":"image",
        "width":20,
        "renderer":"this.renderImage",
        "sortable":"false",
        "show_in_grid":1
      },
      {
        "MIGX_id":4,
        "header":"Видимость",
        "dataIndex":"published",
        "width":"",
        "sortable":"false",
        "show_in_grid":1,
        "renderer":"this.renderSwitchStatusOptions",
        "clickaction":"switchOption",
        "selectorconfig":"",
        "renderchunktpl":"",
        "renderoptions":[
          {
            "MIGX_id":1,
            "name":"published",
            "use_as_fallback":1,
            "value":1,
            "clickaction":"switchOption",
            "handler":"",
            "image":"assets\/components\/migx\/style\/images\/cb_ticked.png"
          },
          {
            "MIGX_id":2,
            "name":"published",
            "use_as_fallback":"",
            "value":1,
            "clickaction":"switchOption",
            "handler":"",
            "image":"assets\/components\/migx\/style\/images\/cb_ticked.png"
          },
          {
            "MIGX_id":3,
            "name":"unpublished",
            "use_as_fallback":"",
            "value":"0",
            "clickaction":"switchOption",
            "handler":"",
            "image":"assets\/components\/migx\/style\/images\/cb_empty.png"
          }
        ],
        "editor":""
      }
    ],
    "category":""
  }]