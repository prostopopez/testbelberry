const edit = document.querySelectorAll('.fnv-myProfile use');
edit.forEach(element => element.onclick = (e) => {
    let svg = e.target;
    let input = svg.parentNode.previousSibling.previousSibling;
    svg.classList.toggle('fnv-colorEdit');
    input.classList.toggle('fnv-lineInput');
    input.focus();
    input.selectionStart = input.value.length;
    input.removeAttribute("readOnly");
    input.onblur = (e) => {
        svg.classList.toggle('fnv-colorEdit');
        input.classList.toggle('fnv-lineInput');
        input.setAttribute("readOnly", "readOnly");
    }
})