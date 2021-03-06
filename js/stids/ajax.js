/**
 * Created by Jeremy Jose Reyes Barrios on 3/07/2017.
 */

var limpiarFormulario = true;
var botonCancelar = true;
var limpiarFormulario = true;

/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _cargando, _mensaje.
 *
 * Realiza una peticion por ajax y publica un mensaje en la pagina dependiendo del resultado
 *
 *
 * @param string url:           url a la que va dirigida.
 * @param string data:          Datos que se envian.
 * @param string id:            Nombre del identificador donde se mostraran los resultados.
 * @param string formulario:    Nombre del formulario que se limpiará.
 */
function _ajax(url,data,id,formulario) {

    $.ajax({
        url: url,
        type: 'post',
        data: data+'&carpetaControlador='+carpetaControlador,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        dataType: 'json',
        beforeSend: function(){
            $('#'+id).html(_cargando());
        },
        success: function (json) {
            switch (json.resultado) {
                case 1:
                    _mensaje('realizado',id, json.mensaje);
                    if (limpiarFormulario) {
                        formulario ? document.getElementById(formulario).reset() : '';
                        $('#botonCancelar').slideUp(300);
                        $('#botonActualizar').slideUp(300);
                    }
                    break;
                case 0:
                    console.log(json.mensaje);
                    _mensaje('advertencia',id, json.mensaje);
                    break;
                case -1:
                    _mensaje('error',id, json.mensaje);
                    break;
            }
        },
        error: function(result) {
            _mensaje('error',id, 'Se encontraron errores al momento de procesar la solicitud');
        }
    });
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _cargando, _mensaje.
 *
 * Realiza una peticion por ajax y publica un mensaje en la pagina dependiendo del resultado
 *
 *
 * @param string url:           url a la que va dirigida.
 * @param string data:          Datos que se envian en formato de objecto.
 * @param string id:            Nombre del identificador donde se mostraran los resultados.
 * @param string formulario:    Nombre del formulario que se limpiará.
 */
function _ajaxObject(url,data,id,formulario) {

    $.ajax({
        url: url+'&carpetaControlador='+carpetaControlador,
        type: 'post',
        data: data,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function(){
            $('#'+id).html(_cargando());
        },
        success: function (json) {
            switch (json.resultado) {
                case 1:
                    _mensaje('realizado',id, json.mensaje);
                    if (limpiarFormulario) {
                        formulario ? document.getElementById(formulario).reset() : '';
                        $('#botonCancelar').slideUp(300);
                        $('#botonActualizar').slideUp(300);
                    }
                    break;
                case 0:
                    _mensaje('advertencia',id, json.mensaje);
                    break;
                case -1:
                    _mensaje('error',id, json.mensaje);
                    break;
            }
        },
        error: function(result) {
            _mensaje('error',id, 'Se encontraron errores al momento de procesar la solicitud');
        }
    });
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _cargando, _mensaje, _mostrarPaginacion, _verificarPermisos.
 *
 * Realiza una peticion por ajax y crea una tabla en la pagina con resultados, paginacion, buscador y opciones.
 *
 * @param string controladorUrl:    Nombre del controlador al que va dirigido.
 * @param string data:              Datos que se envian.
 * @param string id:                Nombre del identificador donde se mostraran los resultados.
 * @param array  opciones:          Arreglo de las opciones que se habilitaran (actualizar, actualizacionRapida, identificacion, estado, eliminar, detalle).
 * @param array  cabecera:          Arreglo con los nombres de la cabecera de la tabla.
 * @param array  edicion:           Arreglo con los nombres de las columnas que se pueden editar en la opcion de edicion rapida.
 * @param array  estados:           Arreglo con el diseño de los posibles estados.
 * @param string nombreTabla:       Nombre de la tabla.
 * @param array  paginacion:        Arreglo con las configuraciones de la paginacion.
 * @param array  exportarImportar:  Arreglo con las diferentes exportaciones e importaciones (excel, word, pdf, texto, importar).
 */
function _ajaxTabla(controladorUrl,data,id,opciones,cabecera,edicion,estados,nombreTabla,paginacion,exportarImportar) {

    var url = 'parametrizacion/'+controladorUrl.toLowerCase();

    $.ajax({
        url: url,
        type: 'post',
        data: data+paginacion[0]+'&carpetaControlador='+carpetaControlador,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        dataType: 'json',
        beforeSend: function(){
            $('#'+id).html(_cargando());
        },
        success: function (json) {

            if (parseInt(json.total) > 0) {

                var tabla = _crearTabla(cabecera,edicion,json.data,opciones,estados,nombreTabla,exportarImportar,controladorUrl,paginacion[3],paginacion[1]);

                $("#"+id).html(tabla);

                setTimeout(function(){ _verificarPermisos(); }, tiempoMostrarIconos);

                if (paginacion.length > 0) {

                    _mostrarPaginacion(paginacion[2],paginacion[1],json.last_page,json.current_page);
                }
            }
            else {
                _mensaje('advertencia',id,'No se encontraron resultados para esta consulta')
            }
        },
        error: function(result) {
            _mensaje('error',id, 'Se encontraron errores al momento de procesar la solicitud');
        }
    });
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _cargando, _mensaje, _crearBloque, _verificarPermisos, _mostrarPaginacion.
 *
 * Realiza una peticion por ajax y crea bloques con los resultados paginacion y con opciones.
 *
 * @param string controladorUrl:    Nombre del controlador al que va dirigido.
 * @param string data:              Datos que se envian.
 * @param string id:                Nombre del identificador donde se mostraran los resultados.
 * @param array  opciones:          Arreglo de las opciones que se habilitaran (eliminar, detalle).
 * @param array  informacion:       Arreglo con los nombres de la cabecera de la tabla.
 * @param array  paginacion:        Arreglo con las configuraciones de la paginacion.
 * @param string ruta:              Ruta donde esta ubicada la imagen.
 */
function _ajaxBloques(controladorUrl,data,id,opciones,informacion,paginacion,ruta,tamanhioBloque) {

    $.ajax({
        url: controladorUrl.toLowerCase(),
        type: 'post',
        data: data+paginacion[0]+'&carpetaControlador='+carpetaControlador,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        dataType: 'json',
        beforeSend: function(){
            $('#'+id).html(_cargando());
        },
        success: function (json) {

            if (parseInt(json.total) > 0) {
                var bloques = _crearBloque(informacion,json.data,opciones,controladorUrl,paginacion[3],paginacion[1],ruta,tamanhioBloque);

                $("#"+id).html(bloques);

                setTimeout(function(){ _verificarPermisos(); }, tiempoMostrarIconos);


                if (paginacion.length > 0) {

                    _mostrarPaginacion(paginacion[2],paginacion[1],json.last_page,json.current_page);
                }
            }
            else {
                _mensaje('advertencia',id,'No se encontraron resultados para esta consulta')
            }
        },
        error: function(result) {
            mensaje('error',id, 'Se encontraron errores al momento de procesar la solicitud');
        }
    });
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _cargando, _mensaje.
 *
 * Realiza una peticion por ajax y llena los imputs de la pagina.
 *
 * @param string controladorUrl:    Nombre del controlador al que va dirigido.
 * @param string data:              Datos que se envian.
 * @param string id:                Nombre del identificador donde se mostraran los resultados.
 * @param array  input:             Tipo de elemento.
 * @param array  predeterminado:    Mensaje predeterminado.
 */
function _ajaxLlenarInputs(controladorUrl,data,id,input,predeterminado) {

    $.ajax({
        url: controladorUrl.toLowerCase(),
        type: 'post',
        data: data+'&carpetaControlador='+carpetaControlador,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        dataType: 'json',
        beforeSend: function(){
            $('#'+id).html(_cargando());
        },
        success: function (json) {

            var cnt = 0;
            switch (input) {
                case 'select':
                    $.each(json, function(i, item) {
                        if (cnt == 0) {
                            $('#' + id).append('<option value="">Seleccione una ' + predeterminado + '</option>');
                        }

                        $('#'+id).append('<option value="'+item.id+'">'+item.nombre+'</option>');

                        cnt++;
                    });

                    if (cnt == 0)
                        $('#'+id).append('<option value="">Seleccione una '+predeterminado+'</option>');
                    break;
            }

        },
        error: function(result) {
            _mensaje('error',id, 'Se encontraron errores al momento de procesar la solicitud');
        }
    });
}


/**
 * @autor Jeremy Reyes B.
 * @version 1.0
 * @see _cargando, _mensaje.
 *
 * Realiza una peticion por ajax y llena los imputs de la pagina.
 *
 * @param string url:           url a la que va dirigida.
 * @param string data:          Datos que se envian.
 * @param string id:            Nombre del identificador donde se mostraran los resultados.
 * @param string formulario:    Nombre del formulario que se limpiará.
 * @param string idActualizar:  Indentificador que se enviará de parametro en la funcion de actualizar.
 * @param bool botonCancelar:   Habilita o deshabilita el boton de cancelar.
 */
function _ajaxLlenarCamposActualizar(url,data,campos,id,formulario,idActualizar,botonCancelar) {

    $.ajax({
        url: url,
        type: 'post',
        data: data+'&carpetaControlador='+carpetaControlador,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        dataType: 'json',
        beforeSend: function(){
            $('#'+id).html(_cargando());
        },
        success: function (json) {

            $.each(campos, function(i, item) {
                if(item == 'id_municipio') {
                    $('#'+item).append('<option value="'+json[0][item]+'">'+json[0]['nombre_municipio']+'</option>').val(json[0][item]);
                }
                else {

                    if(json[0]) {
                        $('#'+item).val(json[0][item])
                    }
                    else {
                        $('#'+item).val(json[item])
                    }

                }
            });


            if (botonCancelar) {
                if (!$("#botonCancelar").length) {
                    $('#divGuardar').append('<button id="botonCancelar" class="btn btn-default " type="button" onclick="cancelarGuardar(\'' + formulario + '\')"><i class="' + iconoCancelar + '"></i> Cancelar</button>');
                }
            }

            $('#botonGuardar').slideUp(300,function(){
                if (botonCancelar) {
                    $('#botonCancelar').slideDown(300);
                }
                $('#botonActualizar').attr('onClick',"guardar('true',"+idActualizar+")").slideDown(300);
            });

            $('#'+id).html('');
        },
        error: function(result) {
            _mensaje('error',id, 'Se encontraron errores al momento de procesar la solicitud');
        }
    });
}


