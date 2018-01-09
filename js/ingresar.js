
const carpetaControlador = 'Parametrizacion';

let verificarIngreso = () => {
    let url = 'ingresar/verificar'
    let data = 'usuario='+$("#usuario").val()+'&clave='+$("#clave").val()

    _ajax(url,data,'mensaje');

    setTimeout(function(){ 
        if ($("#mensaje .alert-success").length > 0) {
            location.assign('si/inicio');
        }
    }, 3000);
}
