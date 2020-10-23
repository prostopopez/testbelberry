const pathLength = 39;
let sliderTimeout = [];
let sliderInterval;
let rect;
let posX1 = 0;
let posX2 = 0;

const BtnGroup = class BtnGroup {
    constructor(group) {
        this.buttonSpacing = 16;
        this.group = group;
        this.buttons = Array.prototype.slice.call(this.group.querySelectorAll('.fnv-btn'));
        this.slides = Array.prototype.slice.call(document.querySelectorAll('.fnv-slide'));
        this.slideContainer = document.querySelector('.fnv-slides');
        this.bipolarSlideItems = document.querySelectorAll('.fnv-bipolarSliderItem');
        this.slideContainer.style.width = this.slides.length + '00vw';
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('viewbox', '0 0 ' + (this.buttonSpacing * this.buttons.length) + ' 16');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.classList.add('line');
        this.currentPath = 'M ' + (-this.buttonSpacing / 2) + ', 14';
        this.currentIndex = -1;
        this.activateIndex(this.buttons.indexOf(this.group.querySelector('.fnv-active')));
        this.group.appendChild(this.svg);
        this.svg.appendChild(this.path);
        this.refreshPath();
        this.initButtons();
        this.startRepeat(this.buttons);

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].addEventListener('click', e => {
                this.onClick(e);
                this.stopRepeat();
            });
        }

        for (let i = 0; i < this.bipolarSlideItems.length; i++) {
            // Mouse events
            this.bipolarSlideItems[i].addEventListener('mousedown', e => this.dragStart(e, this.bipolarSlideItems[i]));
            this.bipolarSlideItems[i].addEventListener('mousemove', e => this.dragAction(e));
            this.bipolarSlideItems[i].addEventListener('mouseup', e => this.dragEnd(e, this.buttons));
            // Touch events
            this.bipolarSlideItems[i].addEventListener('touchstart', e => this.dragStart(e, this.bipolarSlideItems[i]));
            this.bipolarSlideItems[i].addEventListener('touchmove', e => this.dragAction(e));
            this.bipolarSlideItems[i].addEventListener('touchend', e => this.dragEnd(e, this.buttons));
        }
    }

    dragStart(e, bipolarSliderItem) {
        this.stopRepeat();
        bipolarSliderItem.style.userSelect = 'none';
        rect = bipolarSliderItem.getBoundingClientRect();
        posX1 = e.clientX - rect.left;
    }

    dragAction(e) {
        console.log('inProcess');
    }

    dragEnd(e, buttons) {
        posX2 = e.clientX - rect.left;
        let swipeTrigger = new Event('swipeTrigger');

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].classList.contains(`fnv-active`)) {
                if (posX1 - posX2 > 0 && i + 1 < buttons.length) {
                    buttons[i + 1].addEventListener('swipeTrigger', e => this.onClick(e));
                    buttons[i + 1].dispatchEvent(swipeTrigger);
                    break;
                } else if (posX1 - posX2 < 0 && i - 1 >= 0) {
                    buttons[i - 1].addEventListener('swipeTrigger', e => this.onClick(e));
                    buttons[i - 1].dispatchEvent(swipeTrigger);
                    break;
                }
            }
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    startRepeat(buttons) {
        let sliderTrigger = new Event('sliderTrigger');

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('sliderTrigger', e => this.onClick(e));

            sliderTimeout.push(setTimeout((e) => buttons[i].dispatchEvent(sliderTrigger), i * 5000));
        }

        sliderInterval = setInterval((e) => {
            for (let i = 0; i < buttons.length; i++) {
                sliderTimeout.push(setTimeout((e) => buttons[i].dispatchEvent(sliderTrigger), i * 5000));
            }
        }, buttons.length * 5000);
    }

    stopRepeat() {
        clearInterval(sliderInterval);
        for (let i = 0; i < sliderTimeout.length; i++) {
            clearTimeout(sliderTimeout[i]);
        }
    }

    initButtons() {
        for (var i = 0; i < this.buttons.length; i++) {
            const center = this.center(i);
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            let pathStr = '';
            pathStr += 'M' + (center) + ', 14 ';
            pathStr += 'C' + (center + 3) + ', 14 ';
            pathStr += (center + 6) + ', 11 ';
            pathStr += (center + 6) + ',  8 ';
            pathStr += 'C' + (center + 6) + ',  5 ';
            pathStr += (center + 3) + ',  2 ';
            pathStr += (center) + ',  2 ';
            pathStr += 'C' + (center - 3) + ',  2 ';
            pathStr += (center - 6) + ',  5 ';
            pathStr += (center - 6) + ',  8 ';
            pathStr += 'C' + (center - 6) + ', 11 ';
            pathStr += (center - 3) + ', 14 ';
            pathStr += (center) + ', 14 ';
            path.setAttributeNS(null, 'd', pathStr);
            path.classList.add('circle');
        }
    }

    onClick(e) {
        const index = this.buttons.indexOf(e.srcElement || e.target);
        this.activateIndex(index);
    }

    refreshPath() {
        this.path.setAttributeNS(null, 'd', this.currentPath);
        this.path.style.strokeDashoffset = (-this.path.getTotalLength() + pathLength) * 0.9965;
    }

    center(index) {
        return index * this.buttonSpacing + (this.buttonSpacing / 2);
    }

    removeClass(str) {
        if (this.buttons[this.currentIndex]) {
            this.buttons[this.currentIndex].classList.remove(str);
        }
    }

    addClass(str) {
        if (this.buttons[this.currentIndex]) {
            this.buttons[this.currentIndex].classList.add(str);
        }
    }

    activateIndex(index) {
        this.slideContainer.style.left = -index + '00%';
        const lastCenter = this.center(this.currentIndex);
        const nextCenter = this.center(index);
        const offset = 0;
        const sign = index < this.currentIndex ? -1 : 1;
        this.currentPath += 'C' + (lastCenter + sign * 3) + ', 14 ';
        this.currentPath += (lastCenter + sign * 6) + ', 11 ';
        this.currentPath += (lastCenter + sign * 6) + ',  8 ';
        this.currentPath += 'C' + (lastCenter + sign * 6) + ',  5 ';
        this.currentPath += (lastCenter + sign * 3) + ',  2 ';
        this.currentPath += (lastCenter) + ',  2 ';
        this.currentPath += 'C' + (lastCenter - sign * 3) + ',  2 ';
        this.currentPath += (lastCenter - sign * 6) + ',  5 ';
        this.currentPath += (lastCenter - sign * 6) + ',  8 ';
        this.currentPath += 'C' + (lastCenter - sign * 6) + ', 11 ';
        this.currentPath += (lastCenter - sign * 3) + ', 14 ';
        this.currentPath += (lastCenter) + ', 14 ';
        this.currentPath += 'L' + (nextCenter) + ', 14 ';
        this.currentPath += 'C' + (nextCenter + sign * 3) + ', 14 ';
        this.currentPath += (nextCenter + sign * 6) + ', 11 ';
        this.currentPath += (nextCenter + sign * 6) + ',  8 ';
        this.currentPath += 'C' + (nextCenter + sign * 6) + ',  5 ';
        this.currentPath += (nextCenter + sign * 3) + ',  2 ';
        this.currentPath += (nextCenter) + ',  2 ';
        this.currentPath += 'C' + (nextCenter - sign * 3) + ',  2 ';
        this.currentPath += (nextCenter - sign * 6) + ',  5 ';
        this.currentPath += (nextCenter - sign * 6) + ',  8 ';
        this.currentPath += 'C' + (nextCenter - sign * 6) + ', 11 ';
        this.currentPath += (nextCenter - sign * 3) + ', 14 ';
        this.currentPath += (nextCenter) + ', 14 ';
        this.removeClass('fnv-active');
        this.currentIndex = index;
        this.addClass('fnv-active');
        this.refreshPath();
    }
};

const groups = Array.prototype.slice.call(document.querySelectorAll('.fnv-btn-group'));

for (const group of groups) {
    $(group).parent().parent().find(`.fnv-slides .fnv-bipolarSliderItem`).each((i) => {
        $(group).append(`<div class="fnv-btn${i === 0 ? ' fnv-active' : ''}"></div>`)
    });
    new BtnGroup(group)
}