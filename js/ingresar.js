
const carpetaControlador = 'Parametrizacion';

function verificarIngreso() {
    
    var url = 'ingresar/verificar'
    var data = 'usuario='+$("#usuario").val()+'&clave='+$("#clave").val()

    _ajax(url,data,'mensaje');

    setTimeout(function(){ 
        if ($("#mensaje .alert-success").length > 0) {
            location.assign('si/inicio');
        }
    }, 3000);
    
}
