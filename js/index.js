import readExcelFile from 'https://cdn.jsdelivr.net/npm/read-excel-file@5.8.1/+esm';
document.addEventListener('DOMContentLoaded', (e) => {
    const init = document.getElementById('subir');
    const tabla = document.getElementById('tabla');
    const show = document.getElementById('mostrar');
    const listado = document.getElementById('listado');
    const fileselector = document.getElementById('file');
    const deleteExels = document.getElementById('deleteExels');
    init.addEventListener('click', loadExcel);
    listado.addEventListener('click', showTabla);
    deleteExels.addEventListener('click', deleteExcel);

    showListado()
    async function loadExcel(e) {
        e.preventDefault()
        if (fileselector.files.length == 0) return
        await readExcelFile(fileselector.files[0])
            .then((rows) => {
                let name = rename(fileselector.files[0].name);
                let newjson = JSON.stringify(rows);
                localStorage.setItem(name, newjson);
                fileselector.value = "";
                showListado();
            });
    }
    function rename(file) {
        let name = file.replace(/\.[^/.]+$/, '').replace(/[.\s]/g, '');
        let namef = name.concat('-', fecha());
        return namef
    }
    function fecha() {
        let f = new Date();
        return f.getDay() + "-" + (f.getMonth() + 1) + "-" + f.getDate()

    }
    function showListado() {
        validar();
        Object.keys(window.localStorage).forEach((item) => {
            let li = document.createElement('li');
            li.innerHTML = item
            listado.appendChild(li)
        });
        if (listado.childElementCount == 0) {
            let msj = document.createElement('p');
            msj.innerText = "No Hay Resultados";
            show.appendChild(msj);
        }

    }
    function validar() {
        if (listado.childElementCount > 0) {
            while (listado.firstChild) {
                listado.removeChild(listado.lastChild);
            }
        }
    }
    function showTabla(e) {
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        let archivo = ""

        removeDuplicateTable()
        if (e.target && e.target.tagName == 'LI') {
            archivo = window.localStorage.getItem(e.target.innerText)
        }
        let obj = JSON.parse(archivo)
        let header = obj.shift();
        let trHead = document.createElement('tr');
        Object.entries(header).forEach((item, index) => {
            let th = document.createElement('th');
            th.setAttribute("scope", "col");
            th.innerText = header[index];
            trHead.appendChild(th);
            thead.appendChild(trHead)
            table.appendChild(thead)
        });
        Object.entries(obj).forEach(([item, val]) => {
            let tr = document.createElement('tr');
            val.forEach((items, index) => {
                let td = document.createElement('td');
                td.setAttribute('data-label', header[index])
                td.innerText = items
                tr.appendChild(td);
                tbody.appendChild(tr)
                table.appendChild(tbody)
            })
        });
        table.setAttribute('id', e.target.innerText)
        tabla.appendChild(table)
    }
    function removeDuplicateTable() {
        if (tabla.children.length > 0) {
            tabla.removeChild(tabla.lastChild)
        }
    }
    function deleteExcel() {
        window.localStorage.clear();
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
});