<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Link principal
Route::get('/',function(){
    return redirect('inicio');
});


// Acciones de todos los modulos para consultar, crear, editar y eliminar 
Route::post('/{carpeta}/{pagina}','FuncionesVariablesController@AsignarFuncion');

// Grafica de torta
Route::get('/grafica/{tipo}','GraficasController@GenerarGrafica');

// Navegacion de la parte publica o el home de la pagina
Route::get('/{pagina}','NavegacionController@Publico');
