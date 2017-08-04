@extends('temas.administrador')

@section('content')
    <input type="hidden" id="rutaImagen" value="../../nuvola/temas/stids">

    <div class="row  border-bottom white-bg dashboard-header">
        <div class="col-sm-12">
            <h2 style="font-weight: 500;">Clientes</h2>
            <small>En esta sesion podrá crear, actualizar, consultar y eliminar los cliente</small>
            <div style="float:right;">
                <button type="button" class="btn btn-primary" title="Crear"><i class="fa fa-floppy-o"></i></button>
                <button type="button" class="btn btn-success" title="Rapida actualización"><i class="fa fa-pencil"></i></button>
                <button type="button" class="btn btn-warning" title="Activar y desactivar"><i class="fa fa-toggle-on"></i></button>
                <button type="button" class="btn btn-danger" title="Eliminar"><i class="fa fa-trash"></i></button>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="wrapper wrapper-content">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="ibox float-e-margins">
                            <div class="ibox-title">
                                <h5>Graficas</h5>
                                <div class="ibox-tools">
                                    <a class="collapse-link">
                                        <i class="fa fa-chevron-up"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="ibox-content inspinia-timeline" style="display: block;">
                                <div class="timeline-item">
                                    <div class="row">
                                        <div class="col-lg-6" id="graficaTorta">

                                        </div>
                                        <div class="col-lg-6" id="graficaBarra">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <div class="ibox float-e-margins">
                            <div class="ibox-title">
                                <h5>Crear Usuario</h5>
                                <div class="ibox-tools">
                                    <a class="collapse-link">
                                        <i class="fa fa-chevron-up"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="ibox-content inspinia-timeline" style="display: block;">
                                <div class="timeline-item">
                                    <div class="row">
                                        <div id="mensajeGuardar"></div>
                                        <form id="formulario">
                                            <div class="col-lg-3">
                                                <input id="no_documento" type="text" class="form-control" name="no_documento" placeholder="Digite documento" maxlength="10" required>
                                            </div>
                                            <div class="col-lg-3">
                                                <input id="nombres" type="text" class="form-control m-b" name="nombres" placeholder="Digite los nombres"  maxlength="30" required>
                                            </div>
                                            <div class="col-lg-3">
                                                <input id="apellidos" type="text" class="form-control m-b" name="apellidos" placeholder="Digite los apellidos"  maxlength="30" required>
                                            </div>
                                            <div class="col-lg-3">
                                                <select id="sexo" name="sexo" class="form-control m-b">
                                                    <option value="">Seleccione un sexo...</option>
                                                    <option value="masculino">Masculino</option>
                                                    <option value="femenino">Femenino</option>
                                                </select>
                                            </div>

                                            <div class="col-lg-3">
                                                <input id="telefono" type="number" class="form-control m-b" name="telefono" placeholder="Digite el teléfono" min="0" max="9000000000" required>
                                            </div>
                                            <div class="col-lg-3">
                                                <input id="celular" type="number" class="form-control m-b" name="celular" placeholder="Digite el celular" min="0" max="9000000000" required>
                                            </div>
                                            <div class="col-lg-3" id="divGuardar">
                                                <button id="botonGuardar" class="btn btn-primary " type="button" onClick="guardar(false,'')" style="display:none;">
                                                    <i class="fa fa-floppy-o"></i>&nbsp;
                                                    Guardar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>       
                            </div>
                        </div>
                    </div>
                
                    <div class="col-lg-12">
                        <div class="ibox float-e-margins">
                            <div class="ibox-title">
                                <h5>Lista de clientes</h5>
                                <div class="ibox-tools">
                                    <a class="collapse-link">
                                        <i class="fa fa-chevron-up"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="ibox-content inspinia-timeline" style="display: block;">
                                <div class="timeline-item">
                                    <div class="row">
                                        <div id="mensajeTabla"></div>
                                        <div id='tabla'></div>   
                                        <div id='paginacion'></div>                                        
                                    </div>
                                </div>       
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer">
                <div class="pull-right">
                    <strong>Copyright </strong> Jeremy Reyes B. &copy; 2017
                </div>
            </div>
        </div>
    </div>
    <!-- Fin contenido de la pagina -->

        
    </div>
@endsection

@section('script')
    <script>var globalPermisos = [1,2,3,4,5]</script>
    <script type="text/javascript" src="{{asset('js/si/inicio.js')}}"></script>
    <script>_verificarPermisos();listado();</script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
@endsection