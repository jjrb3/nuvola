<?php

namespace App\Http\Controllers\Parametrizacion;

use App\Http\Controllers\HerramientasController;

use Illuminate\Http\Request;
use App\Models\Parametrizacion\Customer;
use Psy\Util\Json;


class CustomerController extends Controller
{
    /**
     * @autor Jeremy Reyes B.
     * @version 1.0
     * @see consultarTodo
     *
     * Consulta todos los datos del cliente
     *
     * @param request: Parametros.
     *
     * @return Json Resultado de la consulta
     */
    public static function Consultar(Request $request) {

        return Customer::consultarTodo(
            $request->get('buscador'),
            $request->get('pagina'),
            $request->get('tamanhioPagina')
        );
    }


    /**
     * @autor Jeremy Reyes B.
     * @version 1.0
     * @see verificacion, insertarCampos, ejecutarSave
     *
     * Guarda los datos
     *
     * @param request: Parametros.
     *
     * @return Json Resultado de los parametros guardados
     */
    public function Guardar(Request $request)
    {
        if ($this->verificacion($request))
            return $this->verificacion($request);


        $clase = $this->insertarCampos(new Customer(),$request);

        
        $mensaje = ['Se guardó correctamente',
                    'Se encontraron problemas al guardar'];

        return HerramientasController::ejecutarSave($clase,$mensaje);
    }


    /**
     * @autor Jeremy Reyes B.
     * @version 1.0
     * @see verificacion, insertarCampos, ejecutarSave
     *
     * Actualiza los datos
     *
     * @param request: Parametros.
     *
     * @return Json Resultado de los parametros actualizados
     */
    public function Actualizar(Request $request)
    {
        if ($this->verificacion($request))
            return $this->verificacion($request);


        $clase = $this->insertarCampos(Customer::Find((int)$request->get('id')),$request);

        $mensaje = ['Se actualizó correctamente',
                    'Se encontraron problemas al actualizar'];

        return HerramientasController::ejecutarSave($clase,$mensaje);
    }


    /**
     * @autor Jeremy Reyes B.
     * @version 1.0
     * @see ejecutarSave.
     *
     * Actualiza el estado
     *
     * @param request: Parametros.
     *
     * @return Json Resultado del estado actualizado
     */
    public static function CambiarEstado(Request $request) {

    	$clase = Customer::Find((int)$request->get('id'));

    	$clase->estado = $request->get('estado');

    	$mensaje = ['Se cambió el estado correctamente',
                    'Se encontraron problemas al cambiar el estado'];

        return HerramientasController::ejecutarSave($clase,$mensaje);
    }


    /**
     * @autor Jeremy Reyes B.
     * @version 1.0
     * @see eliminarPorId.
     *
     * Elimina cliente por id
     *
     * @param request: Parametros.
     *
     * @return Json Resultado del cliente eliminado
     */
    public function Eliminar($request)
    {
        return Customer::eliminarPorId($request->get('id'));
    }


    /**
     * @autor Jeremy Reyes B.
     * @version 1.0
     * @see ejecutarSave.
     *
     * Inserta los datos enviados por la URL en el objecto Customer
     *
     * @param object $clase: Clase customer.
     * @param request:       Parametros.
     *
     * @return object Clase customer llena.
     */
    private function insertarCampos($clase,$request) {

        $clase->no_documento    = $request->get('no_documento');
        $clase->nombres         = $request->get('nombres');
        $clase->apellidos       = $request->get('apellidos');
        $clase->sexo            = $request->get('sexo');
        $clase->telefono        = $request->get('telefono');
        $clase->celular         = $request->get('celular');

        $request->get('estado') ? $clase->estado = $request->get('estado') : '';

        return $clase;
    }


    /**
     * @autor Jeremy Reyes B.
     * @version 1.0
     * @see ejecutarSave.
     *
     * Verifica si los parametros estan correctos
     *
     * @param request:       Parametros.
     *
     * @return array Si encuentra error o no.
     */
    public function verificacion($request){

        $campos = array(
            'no_documento' => 'Debe digitar el campo documento para continuar',
            'nombres' => 'Debe digitar el campo nombres para continuar',
            'apellidos' => 'Debe digitar el campo apellidos para continuar',
            'sexo' => 'Debe digitar el campo sexo para continuar',
            'telefono' => 'Debe digitar el campo telefono para continuar',
            'celular' => 'Debe digitar el campo celular para continuar',
        );

        foreach ($campos as $campo => $mensaje) {

            $resultado = HerramientasController::verificacionCampos($request,$campo,$mensaje);

            if ($resultado) {
                return $resultado;
            }
        }
    }
}