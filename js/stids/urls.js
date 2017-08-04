/**
 * Created by Jeremy Jose Reyes Barrios on 3/07/2017.
 */

/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Genera url para utilizar CRUD
 *
 * @param string funcion:     Nombre de la funcion que se utilizará.
 * @param string controlador: Nonmbre del controlador que se utilizará.
 *
 * @return Url de la ruta del CRUD.
 */
function _urlCrud(funcion,controlador) {

    var padre = $('#idPadre').val();
    var hijo = $('#idHijo').val();

    var data = 'crud=true&padre='+padre+'&hijo='+hijo+'&funcionesVariables='+funcion+'&controlador='+controlador;

    return data;
}