// Función para establecer el foco en el campo "usuario"
function establecerFocoEnusuario() {
    document.getElementById('usuario').focus();
}
// Llamar a la función después de cargar la página
window.onload = establecerFocoEnusuario;
function acceder() {
    // Obtener datos del formulario
    var usuario = document.getElementById('usuario').value;
    var psw = document.getElementById('psw').value;

    // Realizar petición POST al servidor
    fetch('acceso.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario: usuario, psw: psw }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            // Contraseña incorrecta
            alert('Contraseña incorrecta.');
            // Si la contraseña es incorrecta, no cerrar el modal
            // Establecer el foco en el campo "psw"
            document.getElementById('psw').focus();
            document.getElementById('psw').select();
        } else {
            // Contraseña correcta, cierra el modal
            document.getElementById('modal').style.display = 'none';
            setAcceso(data)
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function setAcceso(data){
    // Elimina la contraseña antes de almacenar los datos en sessionStorage
    delete data.psw;
    // Almacena los datos en sessionStorage
    sessionStorage.setItem('av', JSON.stringify(data));
    // localStorage.setItem('av', JSON.stringify(data));

    //despliega usuario activo
    document.getElementById('usuarioActivo').innerText="Usuario Activo: "+ data.nombre 
    //valida accesos
    if(data.tipo==='admin'){
        activaAdmin(true) 
    } else {
        false
    }
}
function activaAdmin(activa) {
    var btnAdmin = document.getElementById('btnAdmin');
    // Cambiar la visibilidad del botón
    if (activa) {
        btnAdmin.classList.remove('invisible');
        btnAdmin.classList.add('visible');
    } else {
        btnAdmin.classList.add('invisible');
    }
}