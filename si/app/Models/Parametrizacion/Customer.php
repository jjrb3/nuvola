<?php

namespace App\Models\Parametrizacion;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\DB;

class Customer extends Model
{
    public $timestamps = false;
    protected $table = "customer";


    /**
     * @autor Jeremy Reyes B.
     * @version 1.0
     *
     * Consulta los datos de la tabla customer y los pagina
     *
     * @param string  $buscar:          Parametros a buscar.
     * @param integer $pagina:          Pagina en la que se hubicará.
     * @param integer $tamanhioPagina;  Tamaño de la pagina.
     *
     * @return Object Resultado de la consulta
     */
    public static function consultarTodo($buscar,$pagina,$tamanhioPagina) {
        try {
            $currentPage = $pagina;

            // Fuerza a estar en la pagina
            Paginator::currentPageResolver(function() use ($currentPage) {
                return $currentPage;
            });

            return Customer::whereRaw(
                "( nombres like '%$buscar%'
                OR apellidos like '%$buscar%'
                OR no_documento like '%$buscar%'
                OR sexo like '%$buscar%'
                OR telefono like '%$buscar%')")
                ->orderBy('id','desc')
                ->paginate($tamanhioPagina);

        } catch (Exception $e) {
            return array();
        }
    }


    /**
     * @autor Jeremy Reyes B.
     * @version 1.0
     *
     * Consulta los estados y los agrupa
     *
     * @return array Resultado de los estados agrupados
     */
    public static function agruparPorEstado() {
    	try {
            return Customer::select("estado", DB::raw('count(*) as total'))
                ->groupBy('estado')
                ->get()
                ->toArray();
	    } catch (Exception $e) {
            return array();
        }
    }


    /**
     * @autor Jeremy Reyes B.
     * @version 1.0
     *
     * Consulta los sexos y los agrupa
     *
     * @return array Resultado de los sexos agrupados
     */
    public static function agruparPorSexo() {
    	try {
            return Customer::select("sexo", DB::raw('count(*) as total'))
                ->groupBy('sexo')
                ->get()
                ->toArray();
	    } catch (Exception $e) {
            return array();
        }
    }


    /**
     * @autor Jeremy Reyes B.
     * @version 1.0
     *
     * Elimina la transaccion de una tabla por su clave primaria
     *
     * @param string $id: Parametros a buscar.
     *
     * @return array Si se elimino o no
     */
    public static function eliminarPorId($id) {
        try {
            if (Customer::destroy($id)) {
                return array(
                    'resultado' => 1,
                    'mensaje'   => 'Se eliminó correctamente',
                );
            }
            else {
                return array(
                    'resultado' => 0,
                    'mensaje'   => 'Se encontraron problemas al eliminar',
                );
            }
        }
        catch (Exception $e) {
            return array(
                'resultado' => -2,
                'mensaje'   => 'Grave error: ' . $e,
            );
        }
    }
}