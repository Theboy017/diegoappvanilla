import readExcelFile from 'https://cdn.jsdelivr.net/npm/read-excel-file@5.8.1/+esm';
class LoadExcel {
    async upload(fileselector) {
        if (fileselector.files.length == 0) return
        await readExcelFile(fileselector.files[0])
            .then((rows) => {
                let name = this.rename(fileselector.files[0].name);
                let newjson = JSON.stringify(rows);
                localStorage.setItem(name, newjson);
                fileselector.value = "";
                this.getInfo();
            });
    }
    getInfo() {
        Object.keys(window.localStorage).forEach((item) => {
            let li = document.createElement('li');
            li.innerHTML = item
            listado.appendChild(li)
        });
        if (window.localStorage.length > 0) {
            return false
        } else {
            return true
        }
    }
    setInfo() {

    }
    showTabla(e) {

        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        let archivo = ""

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
    rename(file) {
        let name = file.replace(/\.[^/.]+$/, '').replace(/[.\s]/g, '');
        let namef = name.concat('-', this.fecha());
        return namef
    }
    fecha() {
        let f = new Date();
        return (f.getDate()) + "-" + (f.getMonth() + 1)
    }
    validarListado() {
        if (listado.childElementCount > 0) {
            while (listado.firstChild) {
                listado.removeChild(listado.lastChild);
            }
        }
    }
    deleteInfo() {
        window.localStorage.clear();
    }
}
export default LoadExcel