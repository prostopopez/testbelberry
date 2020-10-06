function hasEventByElement(event, element) {
    return element.has(event.target).length == 0 && !element.is(event.target);
}