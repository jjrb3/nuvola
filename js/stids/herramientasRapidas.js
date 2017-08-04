/**
 * Created by Jeremy Jose Reyes Barrios on 3/07/2017.
 */


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Crea el codigo para el gif de cargando
 *
 * @return string: Codigo del gif cargando.
 */
function _cargando(){
    return '<p align="center"><img src="temas/' + $('#rutaImagen').val() + '/img/cargando.gif" width="50px"></p>';
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Coloca la primera letra en mayuscula de un texto
 *
 * @param string string: Texto
 *
 * @return string: Texto con la primera letra en mayuscula.
 */
function _primeraMayuscula(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Verifica los permisos para habilitar los botones.
 */
function _verificarPermisos(){

    $.each(globalPermisos, function(i, item) {
        switch(item)
        {
            case 1:
                $('#botonGuardar').slideDown(300);
                break;

            case 2:
                $('.iconoActualizar').slideDown(300);
                $('.iconoActualizarRapido').slideDown(300);
                $('.iconoMover').slideDown(300);

                break;

            case 3:
                $('.iconoEstado').slideDown(300);
                break;

            case 4:
                $('.iconoEliminar').slideDown(300);
                break;

            case 5:
                $('.iconoExportar').slideDown(300);
                break;

            case 6:
                $('.iconoImportar').slideDown(300);
                break;
        }
    });

    $('.iconoDetalle').length ? $('.iconoDetalle').slideDown(300) : '';
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _ejecutarBuscador
 *
 * Al presionar enter ejecuta el buscador.
 *
 * @param event e:          Evento.
 * @param string funcion:   Funcion que se utilizará.
 */
function _enterBuscadorBasico(e,funcion) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==13) {
        ejecutarBuscador(1,$('#tamanhioPagina').val(),$('#buscadorBasico'+funcion).val(),funcion);
    }
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _ajaxLlenarInputs
 *
 * Genera un select por departamento.
 *
 * @param string id: Identificador de input que mostrará los resultados.
 */
function _selectDepartamento(id) {

    _ajaxLlenarInputs('departamento',_urlCrud('ConsultarPorPais','Departamento')+'&idPais='+id, 'id_departamento','select','departamento...');
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _ajaxLlenarInputs
 *
 * Genera un select por Municipio.
 *
 * @param string id: Identificador de input que mostrará los resultados.
 */
function _selectMunicipio(id) {

    _ajaxLlenarInputs('municipio',_urlCrud('ConsultarPorDepartamento','Municipio')+'&idMunicipio='+id, 'id_municipio','select','municipio...');
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Verifica si un correo es valido o no.
 *
 * @param string email: correo para verificar.
 */
function validarCorreo(email) {

    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email) ? true : false;
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Limpia los campos de un formulario.
 *
 * @param array campos: Listado de campos a limpiar.
 */
function _limpiarFormulario(campos){

    $.each(campos, function(i, item) {
        $('#'+item).val('');
    });
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Oculta botones para crear registro y limpia el formulario.
 *
 * @param string formulario: nombre del formulario.
 */
function cancelarGuardar(formulario) {
    $('#botonCancelar').slideUp('300');
    $('#botonActualizar').slideUp('300',function(){
        if (globalPermisos.indexOf(1) > -1) {
            $('#botonGuardar').slideDown('300');
        }
    });
    document.getElementById(formulario).reset();
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Convierte una cadena en formato numerico con comas.
 *
 * @param string cadena formateada.
 */
function formatoNumerico(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}