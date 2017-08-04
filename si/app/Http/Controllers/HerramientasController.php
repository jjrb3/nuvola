<?php

namespace App\Http\Controllers;

class HerramientasController extends Controller
{
    /**
     * Guarda datos de un objeto
     *
     * @param objecto $clase
     * @param array $mesaje
     * @return  JSON resultado sastifactorio o errores
     */
    public static function ejecutarSave($clase,$mensaje) {
        try {
            if ($clase->save()) {
                return response()->json(array(
                    'resultado' => 1,
                    'mensaje' => $mensaje[0],
                    'id' => $clase->id,
                ));
            } else {
                return response()->json(array(
                    'resultado' => 0,
                    'mensaje' => $mensaje[1],
                ));
            }
        } catch (Exception $e) {
            return response()->json(array(
                'resultado' => -1,
                'mensaje' => 'Grave error: ' . $e,
            ));
        }
    }


    /**
     * Verifica los datos por post
     *
     * @param Request
     * @param string $nonmbre
     * @param string $mesaje
     * @return  JSON resultado sastifactorio o errores
     */
    public static function verificacionCampos($request,$nombre,$mensaje){
        if (!$request->get($nombre) && !$request->file($nombre)) {
            return response()->json(array(
                'resultado' => 0,
                'mensaje' => $mensaje,
            ));
        }
    }
}
