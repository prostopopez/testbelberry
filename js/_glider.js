/* @preserve
    _____ __ _     __                _
   / ___// /(_)___/ /___  ____      (_)___
  / (_ // // // _  // -_)/ __/_    / /(_-<
  \___//_//_/ \_,_/ \__//_/  (_)__/ //___/
                              |___/

  Version: 1.7.4
  Author: Nick Piscitelli (pickykneee)
  Website: https://nickpiscitelli.com
  Documentation: http://nickpiscitelli.github.io/Glider.js
  License: MIT License
  Release Date: October 25th, 2018

*/

/* global define */
let gliderTimeout = [];
let gliderInterval;

(function (factory) {
    typeof define === 'function' && define.amd
        ? define(factory)
        : typeof exports === 'object'
        ? (module.exports = factory())
        : factory()
})(function () {
    ('use strict') // eslint-disable-line no-unused-expressions

    /* globals window:true */
    let _window = typeof window !== 'undefined' ? window : this

    let Glider = (_window.Glider = function (element, settings) {
        let _ = this

        if (element._glider) return element._glider

        _.ele = element
        _.ele.classList.add('fnv-glider')

        // expose glider object to its DOM element
        _.ele._glider = _

        // merge user setting with defaults
        _.opt = Object.assign(
            {},
            {
                slidesToScroll: 1,
                slidesToShow: 1,
                resizeLock: true,
                duration: 1,
                // easeInQuad
                easing: function (x, t, b, c, d) {
                    return c * (t /= d) * t + b
                }
            },
            settings
        )

        // set defaults
        _.animate_id = _.page = _.slide = 0
        _.arrows = {}

        // preserve original options to
        // extend breakpoint settings
        _._opt = _.opt

        if (_.opt.skipTrack) {
            // first and only child is the track
            _.track = _.ele.children[0]
        } else {
            // create track and wrap slides
            _.track = document.createElement('div')
            _.ele.appendChild(_.track)
            while (_.ele.children.length !== 1) {
                _.track.appendChild(_.ele.children[0])
            }
        }

        _.track.classList.add('fnv-glider-track')

        // start glider
        _.init()

        // set events
        _.resize = _.init.bind(_, true)
        _.event(_.ele, 'add', {
            scroll: _.updateControls.bind(_)
        })
        _.event(_window, 'add', {
            resize: _.resize
        })
    })

    let gliderPrototype = Glider.prototype
    gliderPrototype.init = function (refresh, paging) {
        let _ = this

        let width = 0

        let height = 0

        _.slides = _.track.children;

        [].forEach.call(_.slides, function (_, i) {
            _.classList.add('fnv-glider-slide');
            _.setAttribute('data-gslide', i)
        })

        _.containerWidth = _.ele.clientWidth

        let breakpointChanged = _.settingsBreakpoint()
        if (!paging) paging = breakpointChanged

        if (
            _.opt.slidesToShow === 'auto' ||
            typeof _.opt._autoSlide !== 'undefined'
        ) {
            let slideCount = _.containerWidth / _.opt.itemWidth

            _.opt._autoSlide = _.opt.slidesToShow = _.opt.exactWidth
                ? slideCount
                : Math.floor(slideCount)
        }
        if (_.opt.slidesToScroll === 'auto') {
            _.opt.slidesToScroll = Math.floor(_.opt.slidesToShow)
        }

        _.itemWidth = _.opt.exactWidth
            ? _.opt.itemWidth
            : _.containerWidth / _.opt.slidesToShow;

        // set slide dimensions
        [].forEach.call(_.slides, function (__) {
            __.style.height = 'auto'
            __.style.width = _.itemWidth + 'px'
            width += _.itemWidth
            height = Math.max(__.offsetHeight, height)
        })

        _.track.style.width = width + 'px'
        _.trackWidth = width
        _.isDrag = false
        _.preventClick = false

        _.opt.resizeLock && _.scrollTo(_.slide * _.itemWidth, 0)

        if (breakpointChanged || paging) {
            _.bindArrows()
            _.buildDots()
            _.bindDrag()
        }

        _.updateControls()

        _.emit(refresh ? 'refresh' : 'loaded')
    }

    gliderPrototype.bindDrag = function () {
        let _ = this
        _.mouse = _.mouse || _.handleMouse.bind(_)

        let mouseup = function () {
            _.mouseDown = undefined
            _.ele.classList.remove('fnv-drag')
            if (_.isDrag) {
                _.preventClick = true
            }
            _.isDrag = false
        }

        let events = {
            mouseup: mouseup,
            mouseleave: mouseup,
            mousedown: function (e) {
                e.preventDefault()
                e.stopPropagation()
                _.mouseDown = e.clientX
                _.ele.classList.add('fnv-drag')
            },
            mousemove: _.mouse,
            click: function (e) {
                if (_.preventClick) {
                    e.preventDefault()
                    e.stopPropagation()
                }
                _.preventClick = false
            }
        }

        _.ele.classList.toggle('fnv-draggable', _.opt.draggable === true)
        _.event(_.ele, 'remove', events)
        if (_.opt.draggable) _.event(_.ele, 'add', events)
    }

    gliderPrototype.buildDots = function () {
        let _ = this
        let gliderTrigger = new Event('gliderTrigger');

        if (!_.opt.dots) {
            if (_.dots) _.dots.innerHTML = ''
            return
        }

        if (typeof _.opt.dots === 'string') {
            _.dots = document.querySelector(_.opt.dots)
        } else _.dots = _.opt.dots
        if (!_.dots) return

        _.dots.innerHTML = ''
        _.dots.classList.add('fnv-glider-dots')

        for (let i = 0; i < Math.ceil(_.slides.length / _.opt.slidesToShow); ++i) {
            let dot = document.createElement('button')
            dot.dataset.index = i
            dot.setAttribute('aria-label', 'Page ' + (i + 1))
            dot.className = 'fnv-glider-dot ' + (i ? '' : 'active')
            _.event(dot, 'add', {
                click: _.scrollItem.bind(_, i, true),
                gliderTrigger: _.scrollItem.bind(_, i, true)
            })
            _.dots.appendChild(dot)

            gliderTimeout.push(setTimeout((e) => dot.dispatchEvent(gliderTrigger), i * 5000));
        }

        gliderInterval = setInterval((e) => {
            for (let i = 0; i < Math.ceil(_.slides.length / _.opt.slidesToShow); ++i) {
                let dot = document.querySelector('button');
                gliderTimeout.push(setTimeout((e) => dot.dispatchEvent(gliderTrigger), i * 5000));
            }
        }, Math.ceil(_.slides.length / _.opt.slidesToShow) * 5000);
    }

    gliderPrototype.bindArrows = function () {
        let _ = this
        if (!_.opt.arrows) {
            Object.keys(_.arrows).forEach(function (direction) {
                let element = _.arrows[direction]
                _.event(element, 'remove', { click: element._func })
            })
            return
        }
        ['prev', 'next'].forEach(function (direction) {
            let arrow = _.opt.arrows[direction]
            if (arrow) {
                if (typeof arrow === 'string') arrow = document.querySelector(arrow)
                arrow._func = arrow._func || _.scrollItem.bind(_, direction)
                _.event(arrow, 'remove', {
                    click: arrow._func
                })
                _.event(arrow, 'add', {
                    click: arrow._func
                })
                _.arrows[direction] = arrow
            }
        })
    }

    gliderPrototype.updateControls = function (event) {
        let _ = this

        if (event && !_.opt.scrollPropagate) {
            event.stopPropagation()
        }

        let disableArrows = _.containerWidth >= _.trackWidth

        if (!_.opt.rewind) {
            if (_.arrows.prev) {
                _.arrows.prev.classList.toggle(
                    'fnv-disabled',
                    _.ele.scrollLeft <= 0 || disableArrows
                )
            }
            if (_.arrows.next) {
                _.arrows.next.classList.toggle(
                    'fnv-disabled',
                    Math.ceil(_.ele.scrollLeft + _.containerWidth) >=
                    Math.floor(_.trackWidth) || disableArrows
                )
            }
        }

        _.slide = Math.round(_.ele.scrollLeft / _.itemWidth)
        _.page = Math.round(_.ele.scrollLeft / _.containerWidth)

        let middle = _.slide + Math.floor(Math.floor(_.opt.slidesToShow) / 2)

        let extraMiddle = Math.floor(_.opt.slidesToShow) % 2 ? 0 : middle + 1
        if (Math.floor(_.opt.slidesToShow) === 1) {
            extraMiddle = 0
        }

        // the last page may be less than one half of a normal page width so
        // the page is rounded down. when at the end, force the page to turn
        if (_.ele.scrollLeft + _.containerWidth >= Math.floor(_.trackWidth)) {
            _.page = _.dots ? _.dots.children.length - 1 : 0
        }

        [].forEach.call(_.slides, function (slide, index) {
            let slideClasses = slide.classList

            let wasVisible = slideClasses.contains('visible')

            let start = _.ele.scrollLeft

            let end = _.ele.scrollLeft + _.containerWidth

            let itemStart = _.itemWidth * index

            let itemEnd = itemStart + _.itemWidth;

            [].forEach.call(slideClasses, function (className) {
                /^left|right/.test(className) && slideClasses.remove(className)
            })
            slideClasses.toggle('fnv-active', _.slide === index)
            if (middle === index || (extraMiddle && extraMiddle === index)) {
                slideClasses.add('fnv-center')
            } else {
                slideClasses.remove('fnv-center')
                slideClasses.add(
                    [
                        index < middle ? 'fnv-left' : 'fnv-right',
                        Math.abs(index - (index < middle ? middle : extraMiddle || middle))
                    ].join('-')
                )
            }

            let isVisible =
                Math.ceil(itemStart) >= start && Math.floor(itemEnd) <= end
            slideClasses.toggle('fnv-visible', isVisible)
            if (isVisible !== wasVisible) {
                _.emit('slide-' + (isVisible ? 'visible' : 'hidden'), {
                    slide: index
                })
            }
        })
        if (_.dots) {
            [].forEach.call(_.dots.children, function (dot, index) {
                dot.classList.toggle('fnv-active', _.page === index)
            })
        }

        if (event && _.opt.scrollLock) {
            clearTimeout(_.scrollLock)
            _.scrollLock = setTimeout(function () {
                clearTimeout(_.scrollLock)
                // dont attempt to scroll less than a pixel fraction - causes looping
                if (Math.abs(_.ele.scrollLeft / _.itemWidth - _.slide) > 0.02) {
                    if (!_.mouseDown) {
                        // Only scroll if not at the end (#94)
                        if (_.trackWidth > _.containerWidth + _.ele.scrollLeft) {
                            _.scrollItem(_.getCurrentSlide())
                        }
                    }
                }
            }, _.opt.scrollLockDelay || 250)
        }
    }

    gliderPrototype.getCurrentSlide = function () {
        let _ = this
        return _.round(_.ele.scrollLeft / _.itemWidth)
    }

    gliderPrototype.scrollItem = function (slide, dot, e) {
        if (e) e.preventDefault()

        let _ = this

        let originalSlide = slide
        ++_.animate_id

        if (dot === true) {
            slide = slide * _.containerWidth
            slide = Math.round(slide / _.itemWidth) * _.itemWidth
        } else {
            if (typeof slide === 'string') {
                let backwards = slide === 'prev'

                // use precise location if fractional slides are on
                if (_.opt.slidesToScroll % 1 || _.opt.slidesToShow % 1) {
                    slide = _.getCurrentSlide()
                } else {
                    slide = _.slide
                }

                if (backwards) slide -= _.opt.slidesToScroll
                else slide += _.opt.slidesToScroll

                if (_.opt.rewind) {
                    let scrollLeft = _.ele.scrollLeft
                    slide =
                        backwards && !scrollLeft
                            ? _.slides.length
                            : !backwards &&
                            scrollLeft + _.containerWidth >= Math.floor(_.trackWidth)
                            ? 0
                            : slide
                }
            }

            slide = Math.max(Math.min(slide, _.slides.length), 0)

            _.slide = slide
            slide = _.itemWidth * slide
        }

        _.scrollTo(
            slide,
            _.opt.duration * Math.abs(_.ele.scrollLeft - slide),
            function () {
                _.updateControls()
                _.emit('animated', {
                    value: originalSlide,
                    type:
                        typeof originalSlide === 'string' ? 'arrow' : dot ? 'dot' : 'slide'
                })
            }
        )

        return false
    }

    gliderPrototype.settingsBreakpoint = function () {
        let _ = this

        let resp = _._opt.responsive

        if (resp) {
            // Sort the breakpoints in mobile first order
            resp.sort(function (a, b) {
                return b.breakpoint - a.breakpoint
            })

            for (let i = 0; i < resp.length; ++i) {
                let size = resp[i]
                if (_window.innerWidth >= size.breakpoint) {
                    if (_.breakpoint !== size.breakpoint) {
                        _.opt = Object.assign({}, _._opt, size.settings)
                        _.breakpoint = size.breakpoint
                        return true
                    }
                    return false
                }
            }
        }
        // set back to defaults in case they were overriden
        let breakpointChanged = _.breakpoint !== 0
        _.opt = Object.assign({}, _._opt)
        _.breakpoint = 0
        return breakpointChanged
    }

    gliderPrototype.scrollTo = function (scrollTarget, scrollDuration, callback) {
        let _ = this

        let start = new Date().getTime()

        let animateIndex = _.animate_id

        let animate = function () {
            let now = new Date().getTime() - start
            _.ele.scrollLeft =
                _.ele.scrollLeft +
                (scrollTarget - _.ele.scrollLeft) *
                _.opt.easing(0, now, 0, 1, scrollDuration)
            if (now < scrollDuration && animateIndex === _.animate_id) {
                _window.requestAnimationFrame(animate)
            } else {
                _.ele.scrollLeft = scrollTarget
                callback && callback.call(_)
            }
        }

        _window.requestAnimationFrame(animate)
    }

    gliderPrototype.removeItem = function (index) {
        let _ = this

        if (_.slides.length) {
            _.track.removeChild(_.slides[index])
            _.refresh(true)
            _.emit('remove')
        }
    }

    gliderPrototype.addItem = function (ele) {
        let _ = this

        _.track.appendChild(ele)
        _.refresh(true)
        _.emit('add')
    }

    gliderPrototype.handleMouse = function (e) {
        let _ = this
        if (_.mouseDown) {
            _.isDrag = true
            _.ele.scrollLeft +=
                (_.mouseDown - e.clientX) * (_.opt.dragVelocity || 3.3)
            _.mouseDown = e.clientX
        }
    }

    // used to round to the nearest 0.XX fraction
    gliderPrototype.round = function (double) {
        let _ = this
        let step = _.opt.slidesToScroll % 1 || 1
        let inv = 1.0 / step
        return Math.round(double * inv) / inv
    }

    gliderPrototype.refresh = function (paging) {
        let _ = this
        _.init(true, paging)
    }

    gliderPrototype.setOption = function (opt, global) {
        let _ = this

        if (_.breakpoint && !global) {
            _._opt.responsive.forEach(function (v) {
                if (v.breakpoint === _.breakpoint) {
                    v.settings = Object.assign({}, v.settings, opt)
                }
            })
        } else {
            _._opt = Object.assign({}, _._opt, opt)
        }

        _.breakpoint = 0
        _.settingsBreakpoint()
    }

    gliderPrototype.destroy = function () {
        let _ = this

        let replace = _.ele.cloneNode(true)

        let clear = function (ele) {
            ele.removeAttribute('style');
            [].forEach.call(ele.classList, function (className) {
                /^glider/.test(className) && ele.classList.remove(className)
            })
        }
        // remove track
        replace.children[0].outerHTML = replace.children[0].innerHTML
        clear(replace);
        [].forEach.call(replace.getElementsByTagName('*'), clear)
        _.ele.parentNode.replaceChild(replace, _.ele)
        _.event(_window, 'remove', {
            resize: _.resize
        })
        _.emit('destroy')
    }

    gliderPrototype.emit = function (name, arg) {
        let _ = this

        let e = new _window.CustomEvent('glider-' + name, {
            bubbles: !_.opt.eventPropagate,
            detail: arg
        })
        _.ele.dispatchEvent(e)
    }

    gliderPrototype.event = function (ele, type, args) {
        let eventHandler = ele[type + 'EventListener'].bind(ele)
        Object.keys(args).forEach(function (k) {
            eventHandler(k, args[k])
        })
    }

    return Glider
})
