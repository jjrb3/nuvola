<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <input type="hidden" id="directorioRecursos" value="{{asset('recursos')}}/">
    <title>.: Prueba Nuvola :.</title>
    <link href="{{asset('temas/stids/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{asset('temas/stids/bootstrap/font-awesome/css/font-awesome.css')}}" rel="stylesheet">
    <link href="{{asset('temas/stids/bootstrap/css/toastr.min.css')}}" rel="stylesheet">
    <link href="{{asset('temas/stids/bootstrap/css/jquery.gritter.css')}}" rel="stylesheet">
    <link href="{{asset('temas/stids/bootstrap/css/animate.css')}}" rel="stylesheet">
    <link href="{{asset('temas/stids/bootstrap/css/style.css')}}" rel="stylesheet">
    <link href="{{asset('css/stids-jeal.css')}}" rel="stylesheet">
</head>
<body>
    <div id="wrapper">
    	<!-- Menú de Stids -->
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="sidebar-collapse">
                <ul class="nav" id="side-menu">
                    <li class="nav-header">
                        <div class="dropdown profile-element">
                            <div style="color:#fff;font-size:16px;font-weight:bold;">Prueba Nuvola</div>
                        </div>
                    </li>
                    <li class="active">
                        <a href="">
                            <i class="fa fa-users"></i>
                            <span class="nav-label">Clientes</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <!-- Fin del menú -->

        <div id="page-wrapper" class="gray-bg dashbard-1">
        <div class="row border-bottom">

        <!-- Barra superior -->
        <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
            <ul class="nav navbar-top-links navbar-right">
                <li>
                    <span class="m-r-sm text-muted welcome-message"></span>
                </li>
            </ul>
        </nav>
        <!-- Fin barra superior -->
        </div>

        @yield('content')

    </div>

    <!-- Modals -->
    <!-- Modal de Eliminar -->
    <div id="modal-eliminar" class="modal fade" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12" style="text-align:center">
                        <h3 class="m-t-none m-b">¿Estas seguro de eliminar esta información?</h3>
                            <div>
                                <button id="siModalEliminar" data-dismiss="modal" class="btn btn-sm btn-primary m-t-n-xs"><strong>Sí quiero eliminarlo</strong></button>
                                <button data-dismiss="modal" class="btn btn-sm btn-default m-t-n-xs"><strong>No quiero eliminarlo</strong></button>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Fin del Modal de Eliminar -->
    <!-- Fin Modals -->
    
	<!-- Mainly scripts -->
    <script src="{{asset('temas/stids/bootstrap/js/jquery-2.1.1.js')}}"></script>
    <script src="{{asset('temas/stids/bootstrap/js/bootstrap.min.js')}}"></script>
    <script src="{{asset('temas/stids/bootstrap/js/jquery.metisMenu.js')}}"></script>

    <!-- Custom and plugin javascript -->
    <script src="{{asset('temas/stids/bootstrap/js/inspinia.js')}}"></script>
    <script src="{{asset('temas/stids/bootstrap/js/pace.min.js')}}"></script>

    <!-- Toastr -->
    <script src="{{asset('temas/stids/bootstrap/js/toastr.min.js')}}"></script>

    <!-- Herramientas Stids -->
    <script type="text/javascript" src="{{asset('js/stids/urls.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/stids/ajax.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/stids/crearElementos.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/stids/herramientasRapidas.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/stids/mensajes.js')}}"></script>

    @yield('script')

</body>
</html>