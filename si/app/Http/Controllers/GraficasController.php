<?php

namespace App\Http\Controllers;

use App\Models\Parametrizacion\Customer;

class GraficasController extends Controller
{
    /**
     * @autor Jeremy Reyes B.
     * @version 1.0
     *
     * Muestra las graficas.
     *
     * @param string $tipo: Tipo de grafica a mostrar.
     *
     * @return render.
     */
    public function GenerarGrafica($tipo) {

        switch ($tipo)
        {
            case 'torta';
                return View($tipo,['data' => Customer::agruparPorEstado()]);
            break;

            case 'barra';
                return View($tipo,['data' => Customer::agruparPorSexo()]);
            break;
        }
    }
}
