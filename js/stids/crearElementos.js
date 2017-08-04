/**
 * Created by Jeremy Jose Reyes Barrios on 3/07/2017.
 */

var iconoActualizar = 'fa fa-pencil-square-o fa-2x';
var iconoActualizarRapido = 'fa fa-pencil fa-2x';
var iconoActivo = 'fa fa-toggle-on fa-2x';
var iconoInactivo = 'fa fa-toggle-off fa-2x';
var iconoEliminar = 'fa fa-trash fa-2x';
var iconoDetalle = 'fa fa-eye fa-2x';
var iconoMover = 'fa fa-arrows fa-2x';

var iconoExcel = 'fa fa-file-excel-o';
var iconoWord = 'fa fa-file-word-o';
var iconoPDF = 'fa fa-file-pdf-o';
var iconoTexto = 'fa fa-file-text-o';
var iconoImportar = 'fa fa-cloud-upload';
var iconoCancelar = 'fa fa-times';


var tiempoMostrarIconos = 500;


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _inputBuscador, _botonesExportarImportar, _selectCantidadPagina, _primeraMayuscula.
 *
 * Realiza una peticion por ajax y crea una tabla en la pagina con resultados, paginacion, buscador y opciones.
 *
 * @param array  cabecera:          Arreglo con los nombres de la cabecera de la tabla.
 * @param array  edicion:           Arreglo con los nombres de las columnas que se pueden editar en la opcion de edicion rapida.
 * @param json   json:              JSON con los resultados de la peticion.
 * @param array  opciones:          Arreglo de las opciones que se habilitaran (actualizar, actualizacionRapida, identificacion, estado, eliminar, detalle).
 * @param array  estados:           Arreglo con el diseño de los posibles estados.
 * @param string nombreTabla:       Nombre de la tabla.
 * @param array  exportarImportar:  Arreglo con las configuraciones de exportar e importar.
 * @param string controlador:       Nombre del controlador al que va dirigido.
 * @param string tamanhioPagina:    Tamaño de la pagina a mostrar.
 * @param string funcion:           Nombre de la funcion que se utilizará.
 *
 * @return string: Tabla.
 */
function _crearTabla(cabecera,edicion,json,opciones,estados,nombreTabla,exportarImportar,controlador,tamanhioPagina,funcion){

    var tabla  = _inputBuscador(funcion)+_botonesExportarImportar(exportarImportar,controlador)+_selectCantidadPagina(tamanhioPagina,funcion)+'<div class="col-lg-12"><div class="table-responsive"><table class="table table-bordered table-hover table-striped tablesorter"><thead><tr>';

    // Se llena la cabecera
    $.each(cabecera, function(i, item) {
        tabla += '<th>'+_primeraMayuscula(item.replace("_", " "))+'</th>';
    });

    // Se crea las opciones
    if (opciones.length > 0) {
        tabla += '<th>Opciones</th>';
    }

    tabla += '</tr></thead><tbody>';

    $.each(json, function(ji, jItem) {
        tabla += '<tr id="'+nombreTabla+'_'+jItem['id']+'">';
        $.each(cabecera, function(i, item) {
            if (item != 'opciones' && item != 'estado'){

                if (edicion[i]) {
                    tabla += '<td class="editable '+item+'">'+jItem[item]+'</td>';
                }
                else {
                    tabla += '<td>'+jItem[item]+'</td>';
                }
            }
            if (item == 'estado') {
                tabla += '<td align="center">'+estados[jItem[item]]+'</td>';
            }
        });

        // Si hay opciones se llena los campos de opciones
        if (opciones.length > 0) {

            tabla += '<td>';

            if (opciones.indexOf('actualizacionRapida') > -1) {
                tabla += '<a onclick="actualizacionRapida'+controlador+'('+ jItem['id'] +',true,event)" title="Rapida Edición" class="iconoActualizarRapido" style="display:none"><i class="'+iconoActualizarRapido+'" aria-hidden="true"></i></a> ';
            }

            if (opciones.indexOf('estado') > -1) {

                if (jItem['estado'] == 1) {
                    tabla += '<a onclick="estado'+controlador+'('+ jItem['id']+',0)" title="Activo" class="iconoEstado" style="display:none"><i class="'+iconoActivo+'" aria-hidden="true"></i></a> ';
                }
                else {
                    tabla += '<a onclick="estado'+controlador+'('+ jItem['id']+',1)" title="Inactivo" class="iconoEstado" style="display:none"><i class="'+iconoInactivo+'" aria-hidden="true"></i></a> ';
                }
            }

            if (opciones.indexOf('actualizar') > -1) {
                tabla += '<a onclick="actualizar'+controlador+'('+ jItem['id'] +')" title="Edición completa" class="iconoActualizar" style="display:none"><i class="'+iconoActualizar+'" aria-hidden="true"></i></a> ';
            }

            if (opciones.indexOf('eliminar') > -1) {
                tabla += '<a onclick="eliminar'+controlador+'('+ jItem['id']+',false)" title="Eliminar" class="iconoEliminar" style="display:none"><i class="'+iconoEliminar+'" aria-hidden="true"></i></a> ';
            }

            if (opciones.indexOf('detalle') > -1) {
                tabla += '<a onclick="detalle'+controlador+'('+ jItem['id']+')" title="Ver detalle" class="iconoDetalle" style="display:none"><i class="'+iconoDetalle+'" aria-hidden="true"></i></a> ';
            }

            if (opciones.indexOf('mover') > -1) {
                tabla += '<a onclick="mover'+controlador+'('+ jItem['id']+')" title="Mover" class="iconoMover" style="display:none"><i class="'+iconoMover+'" aria-hidden="true"></i></a> ';
            }

            tabla +='</td>';
        }

        tabla += '</tr>';
    });

    tabla += '</tbody>';
    tabla += '</table></div></div>';

    return tabla;
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _inputBuscador, _botonesExportarImportar, _selectCantidadPagina, _primeraMayuscula.
 *
 * Realiza una peticion por ajax y crea una tabla en la pagina con resultados, paginacion, buscador y opciones.
 *
 * @param array  informacion:       Arreglo con la informacion que se colocara.
 * @param json   json:              JSON con los resultados de la peticion.
 * @param array  opciones:          Arreglo de las opciones que se habilitaran (eliminar, detalle).
 * @param string controlador:       Nombre del controlador al que va dirigido.
 * @param string tamanhioPagina:    Tamaño de la pagina a mostrar.
 * @param string funcion:           Nombre de la funcion que se utilizará.
 * @param string ruta:              Ruta donde esta ubicada la imagen.
 * @param interger ruta:            Tamaño de los bloques.
 *
 * @return string: Tabla.
 */
function _crearBloque(informacion,json,opciones,controlador,tamanhioPagina,funcion,ruta,tamanhioBloque){

    var bloque = '';

    $.each(json, function(ji, jItem) {

        bloque += '<div class="col-lg-'+tamanhioBloque+'">';
        bloque += '<div class="ibox float-e-margins">';
        bloque += '<div class="ibox-title" align="center">';

        if (jItem.titulo && jItem.titulo != null) {bloque += jItem.titulo;}

        bloque += '</div>';
        bloque += '<div class="ibox-content ibox-heading" align="center">';
        bloque += '<img src="'+$('#directorioRecursos').val()+ruta+jItem.id+'.png" width="100%">';
        bloque += '</div>';
        bloque += '<div class="ibox-content inspinia-timeline">';
        bloque += '<p>';

        if (jItem.descripcion) {
            bloque += jItem.descripcion;
        }

        if (jItem.nombre_boton) {
            bloque += '<div><strong>Nombre Boton: </strong>'+jItem.nombre_boton+'</div>';
        }

        if (jItem.enlace) {

            if (jItem.enlace.indexOf('http') > -1 || jItem.enlace.indexOf('www') > -1) {
                bloque += '<div><strong>Enlace: </strong><a href="' + jItem.enlace + '" target="_blank">' + jItem.enlace + '</a></div>';
            }
            else {
                bloque += '<div><strong>Enlace: </strong><a href="../../' + jItem.enlace + '" target="_blank">' + jItem.enlace + '</a></div>';
            }
        }

        if (jItem.posicion_horizontal) {
            bloque += '<div><strong>Posición horizontal: </strong>'+jItem.posicion_horizontal+'</div>';
        }

        if (jItem.posicion_vertical) {
            bloque += '<div><strong>Posición vertical: </strong>'+jItem.posicion_vertical+'</div>';
        }

        bloque += '</p><p align="center"><br>';

        if (opciones.indexOf('actualizar') > -1) {
            bloque += '<button type="button" class="btn btn-primary iconoActualizar" onclick="actualizar'+controlador+'('+ jItem['id']+')" title="Actualizar" style="display:none">Actualizar</button>&nbsp;';
        }

        if (opciones.indexOf('detalle') > -1) {
            bloque += '<button type="button" class="btn btn-success iconoDetalle" onclick="detalle'+controlador+'('+ jItem['id']+')" title="Ver detalle" style="display:none">Ver imagen</button>&nbsp;';
        }

        if (opciones.indexOf('eliminar') > -1) {
            bloque += '<button type="button" class="btn btn-default iconoEliminar" onclick="eliminar'+controlador+'('+ jItem['id']+',false)" title="Eliminar" style="display:none">Eliminar</button>';
        }


        bloque += '</p>';
        bloque += '</div>';
        bloque += '</div>';
        bloque += '</div>';

    });

    return bloque;
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Crea una lista desplegable con los tamaño de la pagina para la tabla.
 *
 * @param string tamanhioPagina: Tamaño de la pagina que se seleccionará.
 * @param string funcion:        Nombre de la funcion que se utilizará.
 *
 * @return string: Listado de paginas a mostrar.
 */
function _selectCantidadPagina(tamanhioPagina,funcion) {

    var numeroPagina = [10,25,50,100,200,500];

    var selectCantidadPagina = '<div class="col-lg-4"><select id="tamanhioPagina" class="form-control" style="width:100px;margin-left:auto" onchange="'+funcion+'(1,this.value)"></div>';

    $.each(numeroPagina, function(i, item) {
        if (tamanhioPagina == item) {
            selectCantidadPagina += '<option value="'+item+'" selected>'+item+'</option>';
        }
        else {
            selectCantidadPagina += '<option value="'+item+'">'+item+'</option>';
        }
    });

    selectCantidadPagina += '</select></div><br>';

    return selectCantidadPagina;
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Crea la paginacion para la tabla.
 *
 * @param string    elemento:       Nombre del indentificador donde aparecerá la paginación.
 * @param string    metodoJS:       Nombre del metodo JS que se uzará al momento de presionar clic en un boton.
 * @param interger  cantidad:       Cantidad de resultados.
 * @param ingerger  paginaActual:   Pagina actual.
 */
function _mostrarPaginacion(elemento,metodoJS,cantidad,paginaActual) {

    var paginacion = '<div class="col-lg-12"><ul class="pagination">';
    var anterior = '';
    var siguiente = '';
    var activo = '';

    if (cantidad > 1) {

        if (paginaActual - 1 > 0) {

            paginacion += '<li><a style="cursor:pointer;" onclick="'+metodoJS+'('+(paginaActual - 1)+')">«</a></li>';
        }

        for (var i=1;i<=cantidad;i++) {

            if (i == paginaActual) {
                activo = ' class="active default" '
            }
            else {
                activo = '';
            }
            paginacion += '<li '+activo+'><a style="cursor:pointer;" onclick="'+metodoJS+'('+i+')">'+i+'</a></li>';
        }

        if (paginaActual + 1 <= cantidad) {

            paginacion += '<li><a style="cursor:pointer;" onclick="'+metodoJS+'(' + (paginaActual + 1) + ')">»</a></li>';
        }
    }

    paginacion += '</ul></div>';

    $("#"+elemento).html(paginacion);
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Crea listado de botones para exportar e importar
 *
 * @param string exportarImportar:  Opciones que se habilitaran de exportar e importar.
 * @param string controlador:       Controlador que se usará.
 *
 * @return string: Listado de botones.
 */
function _botonesExportarImportar(exportarImportar,controlador) {

    var boton = '<div class="col-lg-4">';

    $.each(exportarImportar, function(i, item) {
        switch(item)
        {
            case 'excel':
                boton += '<button type="button" class="btn btn-primary iconoExportar" title="Exportar archivo de Excel" onclick="_exportar(\''+item+'\',\''+controlador+'\')" style="display:none"><i class="'+iconoExcel+'"></i></button>&nbsp;';
                break;

            case 'word':
                boton += '<button type="button" class="btn btn-success iconoExportar" title="Exportar archivo de Word" onclick="_exportar(\''+item+'\',\''+controlador+'\')" style="display:none"><i class="'+iconoWord+'"></i></button>&nbsp;';
                break;

            case 'pdf':
                boton += '<button type="button" class="btn btn-danger iconoExportar" title="Exportar archivo de PDF" onclick="_exportar(\''+item+'\',\''+controlador+'\')" style="display:none"><i class="'+iconoPDF+'"></i></button>&nbsp;';
                break;

            case 'texto':
                boton += '<button type="button" class="btn btn-default iconoExportar" title="Exportar archivo de Texto" onclick="_exportar(\''+item+'\',\''+controlador+'\')" style="display:none"><i class="'+iconoTexto+'"></i></button>&nbsp;';
                break;

            case 'importar':
                boton += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-primary iconoImportar" title="Importar listado CSV " onclick="_importar(\''+controlador+'\')" style="display:none">Importar CSV <i class="'+iconoImportar+'"></i></button>&nbsp;';
                break;
        }
    });

    boton += '</div>';

    return boton;
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Habilita la edicion rapida de una tabla
 *
 * @param string id:            Identificador de la fila en la que se habilitará la edicion.
 * @param string nombreTabla:   Nombre de la tabla en la que se editará.
 * @param string controlador:   Controlador que se usará.
 */
function _edicionRapida(id,nombreTabla,controlador) {

    $('#'+nombreTabla+'_'+id+' .editable').each(function(){
        var nombreCampo = this.className;
        nombreCampo = nombreCampo.replace("editable ", "");
        $(this).html('<input class="form-control" id="'+nombreCampo+'" onkeypress="actualizacionRapida'+controlador+'('+id+',false,event)" type="text" value="'+$(this).text()+'">')
    });
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Guarda los datos modificados de la edicion rapida
 *
 * @param string id:            Identificador de la fila en la que se habilitará la edicion.
 * @param string nombreTabla:   Nombre de la tabla en la que se editará.
 * @param string controlador:   Controlador que se usará.
 * @param string formulario:    Nombre del formulario que se reseteará.
 */
function _guardarEdicionRapida(id,nombreTabla,controlador,formulario) {

    var urlActualizar = '&id='+id;

    $('#'+nombreTabla+'_'+id+' .editable').each(function(){

        var nombreCampo = this.className;
        nombreCampo = nombreCampo.replace("editable ", "");

        var valor = $('#'+nombreTabla+'_'+id+' .editable #'+nombreCampo).val();

        $(this).html(valor)

        urlActualizar += '&'+nombreCampo+'='+valor;
    });

    var data = _urlCrud('Actualizar',controlador)+urlActualizar+'&actualizacionRapida=true';

    _ajax('parametrizacion/'+controlador.toLowerCase(),data,formulario);
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Crea el codigo para el buscador de la tabla
 *
 * @param string funcion: Nombre de la funcion que ejecutará.
 *
 * @return string: Codigo del buscador.
 */
function _inputBuscador(funcion) {

    return '<div class="col-lg-4"><input type="search" id="buscadorBasico'+funcion+'" class="form-control" placeholder="Buscador..." onkeypress="_enterBuscadorBasico(event,\''+funcion+'\')"></div>';
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 *
 * Crea una mascara o copia de un input con sus valores.
 *
 * @param array inputs: Arreglo con el listado de inputs a enmascarar.
 */
function _crearMascaraInput(inputs){

    $.each(inputs, function(i, item) {

        $('#'+item.substring(7)).css('display','none');

        switch($('#'+item.substring(7))[0].type)
        {
            case 'select-one':
                $('#'+item).append('<input type="text" value="'+$('#'+item.substring(7)+' option[value="'+$('#'+item.substring(7)).val()+'"]').text()+'" disabled="disabled" class="form-control m-b">');
                break;

            case 'text':
                $('#'+item).append('<input type="text" value="'+$('#'+item.substring(7)).val()+'" disabled="disabled" class="form-control m-b">');
                break;
        }
    });
}



// Sin definir
function _exportar(tipo,controlador) {
    console.log(tipo+' - '+controlador)
}

function _importar(controlador) {
    console.log(controlador)
}


