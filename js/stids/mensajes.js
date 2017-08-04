/**
 * Created by Jeremy Reyes Barrios on 3/07/2017.
 */

var codigoMensaje = '';
var icono = '';
var color = '';


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Genera codigo para los mensajes de la pagina
 *
 * @param string tipo:    Tipo de mensaje.
 * @param string id:      Nombre del identificador donde se mostraran los resultados.
 * @param string mensaje: Descripción del mensaje.
 */
function _mensaje(tipo,id,mensaje) {

    switch (tipo)
    {
        case 'realizado':
             icono = 'ok-sign';
             color = 'success';
             break;

        case 'informacion':
             icono = 'info-sign';
             color = 'info';
             break;

        case 'advertencia':
             icono = 'exclamation-sign';
             color = 'warning';
             break;

        case 'error':
             icono = 'exclamation-sign';
             color = 'danger';
             break;
    }

    codigoMensaje  = '<div class="alert alert-dismissable alert-'+color+'" align="center">';
    codigoMensaje += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
    codigoMensaje += '<i class="glyphicon glyphicon-'+icono+'" style="font-size: 30px"></i> ';
    codigoMensaje += '<br>';
    codigoMensaje += mensaje;
    codigoMensaje += '</div>';

    $("#"+id).html(codigoMensaje);
}