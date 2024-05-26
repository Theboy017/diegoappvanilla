import LoadExcel from './index.js'
import UI from './ui.js'
document.addEventListener('DOMContentLoaded', () => {
    const init = new LoadExcel()
    const initUI = new UI()
    const archivo = document.getElementById('subir');
    const fileselector = document.getElementById('file');
    const listado = document.getElementById('listado');
    const deleteExels = document.getElementById('deleteExels');
    const lista = document.getElementById('lista');
    const box = document.getElementById('box');
    const excelActual = document.getElementById('excelActual');
    const tabla = document.getElementById('tabla');
    const darkLight = document.getElementById('darkLight');

    if (listado.childElementCount == 0) {
        init.getInfo();
    }
    if (listado.childElementCount > 0) {
        initUI.showHide(deleteExels);
        initUI.showHide(lista);
    }

    archivo.addEventListener('click', (e) => {
        e.preventDefault();
        init.upload(fileselector);
        //initUI.showHide(excelActual);
        initUI.showHide(deleteExels);
        initUI.showHide(lista);
    });
    fileselector.addEventListener('change', function () {
        initUI.filespan(fileselector);
    });
    listado.addEventListener('click', (e) => {
        initUI.validarListado(tabla);
        init.showTabla(e);
        initUI.showHide(box);
        initUI.showHide(excelActual);
    });
    deleteExels.addEventListener('click', (e) => {
        init.deleteInfo();
        initUI.validarListado(listado);
        initUI.showHide(lista);
    });

});