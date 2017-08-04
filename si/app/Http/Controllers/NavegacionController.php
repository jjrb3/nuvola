<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

use App\Models\Parametrizacion\PermisoUsuarioModulo;
use App\Models\Parametrizacion\PermisoModuloRol;

class NavegacionController extends Controller
{
    /**
     * Apunta a los archivos de la rutas indicadas en el navegador
     *
     * @param string $pagina
     *
     * @return  render
     */
    public function Publico($pagina) {

        return View($pagina);
    }
}
