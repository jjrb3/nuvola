
const carpetaControlador = 'Parametrizacion';

var controlador 		= 'Customer';
var nombreTablaGeneral 	= 'tabla'+controlador;


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see listado.
 *
 * Consulta el listado dependiendo por parametro.
 *
 *
 * @param integer pagina     |null:  Posicion de la pagina.
 * @param integer tamanhio   |null:  Tamaño de la pagina.
 * @param string  buscador   |null:  Parametro a buscar.
 * @param string  funcion:           Nombre de la funcion que ejecutará.
 */
function ejecutarBuscador(pagina,tamanhio,buscador,funcion) {

	switch(funcion) 
    {
        case 'listado':
            listado(pagina,tamanhio,buscador);
        break;
    }
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _urlCrud, _ajaxTabla.
 *
 * Muestra el listado de clientes en una tabla con paginacion, buscador y cantidad de resultados a mostrar.
 * Carga las graficas al terminar de mostrar el listado
 *
 *
 * @param integer pagina     |null:  Posicion de la pagina.
 * @param integer tamanhio   |null:  Tamaño de la pagina.
 * @param string  buscador   |null:  Parametro a buscar.
 */
function listado(pagina,tamanhio,buscador) {

	if (!pagina) {pagina = 1;}
	if (!tamanhio) {tamanhio = 10;}
	if (!buscador) {buscador = '';}


	var enlace 	 	 	 = _urlCrud('Consultar',controlador)+'&buscador='+buscador;
	var paginacion   	 = ['&pagina='+pagina+'&tamanhioPagina='+tamanhio, 'listado', 'paginacion',tamanhio];
	var opciones 	 	 = ['actualizacionRapida' ,'identificacion','estado', 'eliminar'];
	var exportarImportar = [];
	var cabecera 	 	 = ['no_documento','nombres','apellidos','sexo','telefono','celular','estado'];
	var edicion 	 	 = [true, true, true, true, true, true];
	var estados  	 	 = ['<span class="label label-default ">INACTIVO</span>','<span class="label label-primary ">ACTIVO</span>'];

	_ajaxTabla(controlador,enlace,'tabla',opciones,cabecera,edicion,estados,nombreTablaGeneral,paginacion,exportarImportar);


    $("#graficaTorta").load( "grafica/torta" );
    $("#graficaBarra").load( "grafica/barra" );
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _urlCrud, _ajax, listado.
 *
 * Guarda los datos digitados.
 *
 *
 * @param bool   actualizar: Si es falso guarda, si es verdadero actualiza.
 * @param string id:         Identificador del item a actulizar o crear.
 */
function guardar(actualizar,id) {

	var data = _urlCrud((actualizar ? 'Actualizar' : 'Guardar'),controlador)+'&'+$('#formulario').serialize()+'&id='+id;

	_ajax(carpetaControlador+'/'+controlador,data,'mensajeGuardar','formulario');

	setTimeout(function(){ listado(); }, 2000);
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _guardarEdicionRapida, _guardarEdicionRapida, listado.
 *
 * Guarda los datos digitados.
 *
 *
 * @param bool   actualizar: Si es falso guarda, si es verdadero actualiza.
 * @param string id:         Identificador del item a actulizar o crear.
 */
function actualizacionRapidaCustomer(id,habilitar,e) {

	tecla = (document.all) ? e.keyCode : e.which;

	if (tecla == 13) {
		_guardarEdicionRapida(id,nombreTablaGeneral,controlador,'mensajeTabla');
        listado();
	}

	if (habilitar) {
		_edicionRapida(id,nombreTablaGeneral,controlador);
	}
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _urlCrud, _ajax, listado.
 *
 * Actualiza el estado.
 *
 *
 * @param string  id:     Identificador del item a actulizar o crear.
 * @param integer estado: Estado que se actualizara "0: Inactivo, 1: Activo".
 */
function estadoCustomer(id,estado) {

	var data = _urlCrud('CambiarEstado',controlador)+'&estado='+estado+'&id='+id;	

	_ajax(carpetaControlador+'/'+controlador,data,'mensajeTabla');

	setTimeout(function(){ listado(); }, 1500);
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _urlCrud, _ajax, listado.
 *
 * Elimina el estado.
 *
 *
 * @param string id:            Identificador del item a eliminar.
 * @param bool   confirmacion:  "false: Muestra ventana de dialogo, true: envia parametros para eliminar.
 */
function eliminarCustomer(id,confirmacion){

	if (!confirmacion) {
		$('#modal-eliminar #siModalEliminar').attr('onClick','eliminarCustomer('+id+',true)');
		$('#modal-eliminar').modal('show');
	}
	else {

		var data = _urlCrud('Eliminar',controlador)+'&id='+id;	

		_ajax('Parametrizacion/'+controlador,data,'mensajeTabla');

		setTimeout(function(){ listado(); }, 1500);
	}
}