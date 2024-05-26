class UserInterce {
    filespan(e) {
        const fileNameSpan = document.getElementById('filespan');
        if (e.files.length > 0) {
            fileNameSpan.textContent = e.files[0].name;
        } else {
            fileNameSpan.textContent = 'No file chosen';
        }
    }
    showHide(e) {
        switch (e.attributes.id.value) {
            case 'box': e.classList.toggle('activo');
                break;
            case 'deleteExels': e.classList.toggle('hidden');
                break
            case 'lista': e.classList.toggle('hidden');
                break
            case 'excelActual': e.classList.toggle('hidden');
                break
            case '': e.classList.toggle('hidden');
                break
        }

    }
    validarListado(e) {
        if (e.childElementCount > 1) {
            while (e.firstChild) {
                e.removeChild(e.lastChild);
            }
        }
    }
}
export default UserInterce
/*
function validarListado() {
    if (listado.childElementCount > 0) {
        while (listado.firstChild) {
            listado.removeChild(listado.lastChild);
        }
    }
}
function removeDuplicateTable() {
    if (tabla.children.length > 0) {
        tabla.removeChild(tabla.lastChild)
    }
}
let root = document.querySelector(":root");
let button = document.querySelector("button");

button.addEventListener('click', (e) => {
    e.preventDefault();
    root.classList.toggle('dark');
})
document.getElementById('file').addEventListener('change', function () {
    const fileNameSpan = document.getElementById('filespan');
    if (this.files.length > 0) {
        fileNameSpan.textContent = this.files[0].name;
    } else {
        fileNameSpan.textContent = 'No file chosen';
    }
});
*/
const root = document.querySelector(":root");
const body = document.querySelector('body')
document.getElementById('darkLight').onclick = function () {
    this.classList.toggle('active');
    root.classList.toggle('dark');
}

