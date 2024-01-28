//SETING DE USUARIO ACTIVO 
presentaUsuarioActivo()
let idUsuario = idUsuarioActivo();
const video = document.getElementById("videoElement");
const canvas = document.getElementById("canvasElement");
const context = canvas.getContext("2d");
const idArticulo = genIdArt();
const archivo = `foto${idArticulo}.jpg`;
const ruta = "/fotos/";
const rutaYarchivo = ruta + archivo;
//SETEA ID DEL ARCHIVO QUE ES EL ID DEL ARTICULO
document.getElementById('idArticulo').innerText="Id Articulo "+idArticulo
//SELECCIONA EL CAMPO CODIGO
document.getElementById('codigoArticulo').focus()
document.getElementById('codigoArticulo').select()
//ACTIVA LA CAMARA
let selectedCamera = "environment"; // Default to the rear camera
navigator.mediaDevices.getUserMedia({ video: { facingMode: selectedCamera, width: 1920, height: 1080, frameRate: 30 } })
    .then(function(stream) {
        video.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Error al acceder a la cámara:", error);
    });
//TOMA LA FOTO
function takePhoto() {
        const btnFoto = document.getElementById("btnFoto");
        btnFoto.disabled = true;
        selectedCamera = document.getElementById("cameraSelect").value;
        navigator.mediaDevices.getUserMedia({ video: { facingMode: selectedCamera, width: 1920, height: 1080, frameRate: 30 } })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
            })
            .then(function() {
                return new Promise(resolve => setTimeout(resolve, 500));
            })
            .then(function() {
                // Ajustar el canvas para asegurar una orientación vertical
                const aspectRatio = video.videoWidth / video.videoHeight;
                canvas.width = 1080; // Puedes ajustar este valor según tus necesidades
                canvas.height = 1920; // Puedes ajustar este valor según tus necesidades

                // Dibujar el fotograma actual del video
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                // Convertir la imagen del canvas a formato binario (Blob)
                canvas.toBlob(function(blob) {
                    const formData = new FormData();
                    formData.append('imagen', blob, archivo);
                    formData.append('idArticulo', idArticulo);

                    fetch('guardar_imagen.php', {
                        method: 'POST',
                        body: formData
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        document.getElementById('codigoArticulo').focus()
                        document.getElementById('codigoArticulo').select()
                        console.log(data);
                        btnFoto.disabled = false;
                    })
                    .catch(error => {
                        console.error("Error al enviar la imagen al servidor:", error);
                        btnFoto.disabled = false;
                    });

                }, 'image/jpeg', 1.0, 'image/jpeg');
            })
            .catch(function(error) {
                console.error("Error al acceder a la cámara:", error);
                btnFoto.disabled = false;
            });
    }
//CONFIRMA INPUT    
function confirmField(fieldId) {
    document.getElementById(fieldId).focus();
    // document.getElementById(fieldId).select();
    resumen()
}
//GRABA NUEVO ARTICULO EN LOCAL STORAGE
function grabaDatosArticulo(event) {
    event.preventDefault();
    const codigoArticulo = document.getElementById("codigoArticulo").value;

    // Verifica si el código de artículo ya existe en el localStorage
    const existingArticulos = JSON.parse(localStorage.getItem("articulosVitrina")) || [];
    const codigoExistente = existingArticulos.some(item => item.codigoArticulo === codigoArticulo);

    if (codigoExistente) {
        alert("El código de artículo ya existe. Ingresa un código único.");
        return;
    }
    const articulo = document.getElementById("articulo").value;
    const detalle = document.getElementById("detalle").value;
    const stockBodegaCentral = document.getElementById("stockBodegaCentral").value;
    const stockBodega = document.getElementById("stockBodega").value;
    const stockVitrina = document.getElementById("stockVitrina").value;
    const stockRepo = document.getElementById("stockRepo").value;
    const stockCritico = document.getElementById("stockCritico").value;
    const articuloData = {
        idArticulo,
        codigoArticulo,
        articulo,
        detalle,
        stockBodegaCentral,
        stockBodega,
        stockVitrina,
        stockRepo,
        stockCritico,
        archivo,
        idUsuario
    };
    
    existingArticulos.push(articuloData);
    localStorage.setItem("articulosVitrina", JSON.stringify(existingArticulos));

    alert("Datos grabados en local storage");
    verificarExistenciaFoto(archivo)
        .then(existe => {
            if (!existe) {
                alert("La foto no existe en la ruta './fotos/'.");
                console.log("La foto no existe en la ruta './fotos/'.");
            } else {
                location.reload();
            }
        });
}

//GRABA EN LA TABLA DE LA BASE DE DATOS SQL
async function grabaDatosArticuloSQL(event) {
    event.preventDefault();
    try {
        // SE VERIFICA QUE SE HAYA SACADO LA FOTO
        const existeFoto = await verificarExistenciaFoto(archivo);
        if (!existeFoto) {
            alert("La foto no existe en la ruta './fotos/'.");
            console.log("La foto no existe en la ruta './fotos/'.");
            return;
        }
        // Continuar con el código si la foto existe
        const codigoArticulo = parseInt(document.getElementById("codigoArticulo").value, 10) || 0;
        const datosArticulo = {
            idArticulo,
            codigoArticulo,
            articulo: document.getElementById("articulo").value,
            detalle: document.getElementById("detalle").value,
            stockBodegaCentral: parseInt(document.getElementById("stockBodegaCentral").value, 10) || 0,
            stockBodega: parseInt(document.getElementById("stockBodega").value, 10) || 0,
            stockVitrina: parseInt(document.getElementById("stockVitrina").value, 10) || 0,
            stockRepo: parseInt(document.getElementById("stockRepo").value, 10) || 0,
            stockCritico: parseInt(document.getElementById("stockCritico").value, 10) || 0,
            archivo,
            idUsuario
        };
        const response = await fetch('./nuevo_articulo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosArticulo),
        });
        const data = await response.json();
        if (data.success) {
            //graba datos de la transaccion
            transaccion(datosArticulo)
            alert("Datos grabados en la base de datos con éxito.");
            location.reload()
        } else {
           // Analizar el mensaje de error para obtener información detallada
            if (data.message.includes("Duplicate entry") && data.message.includes("for key 'codigoArticulo'")) {
                alert("Error: El código de artículo ingresado ya existe en la base de datos. Por favor, ingrese un código único.");
            } else if (data.message.includes("Duplicate entry") && data.message.includes("for key 'idArticulo'")) {
                alert("Error: El ID de artículo ingresado ya existe en la base de datos. Por favor, ingrese un ID de artículo único.");
            } else {
                alert("Error al grabar los datos en la base de datos. Mensaje: " + data.message);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        console.log("Error al grabar los datos en la base de datos. Consulta la consola para más detalles.");
    }
}
//GENERA ID UNICO DEL ARTICULO
function genIdArt() {
    const currentDate = new Date();
    const hora = currentDate.getHours();
    const minutos = currentDate.getMinutes();
    const segundos = currentDate.getSeconds();
    const hor = hora < 10 ? "0" + hora.toString() : hora.toString();
    const min = minutos < 10 ? "0" + minutos.toString() : minutos.toString();
    const seg = segundos < 10 ? "0" + segundos.toString() : segundos.toString();
    const horaTrans = hor + min + seg;
    const horaIng = hor + ":" + min + ":" + seg;
    const anioHoy = currentDate.getFullYear();
    const mesHoy = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const diaDeHoy = ("0" + currentDate.getDate()).slice(-2);
    const fechaIng = `${diaDeHoy}/${mesHoy}/${anioHoy}`;
    const id = fechaIng.replace(/\//g, '') + horaIng.replace(/:/g, '');
    return id;
}
function genIdTrans() {
    const currentDate = new Date();
    const hora = currentDate.getHours();
    const minutos = currentDate.getMinutes();
    const segundos = currentDate.getSeconds();
    const hor = hora < 10 ? "0" + hora.toString() : hora.toString();
    const min = minutos < 10 ? "0" + minutos.toString() : minutos.toString();
    const seg = segundos < 10 ? "0" + segundos.toString() : segundos.toString();
    const horaTrans = hor + min + seg;
    const horaIng = hor + ":" + min + ":" + seg;
    const anioHoy = currentDate.getFullYear();
    const mesHoy = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const diaDeHoy = ("0" + currentDate.getDate()).slice(-2);
    const fechaIng = `${diaDeHoy}/${mesHoy}/${anioHoy}`;
    const id = fechaIng.replace(/\//g, '') + horaIng.replace(/:/g, '');
    return id;
}
function horaAhora() {
    let currentTime = new Date();
    let hora = currentTime.getHours();
    let minutos = currentTime.getMinutes();
    let segundos = currentTime.getSeconds();
    // Convierte a string
    let hor = hora < 10 ? "0" + hora.toString() : hora.toString();
    let min = minutos < 10 ? "0" + minutos.toString() : minutos.toString();
    let seg = segundos < 10 ? "0" + segundos.toString() : segundos.toString();
    // Hora actual
    let horaTrans = hor + min + seg;
    var horaIng = hor + ":" + min + ":" + seg; // Entrega hora global horaIng
    // console.log("horaTrans: " + horaTrans);
    // console.log("hora Ingreso: " + horaIng); //*
    return horaIng;
}
function fechaAhora() {
    const date = new Date();
    const anioHoy = date.getFullYear();
    const mesHoy = ("0" + (date.getMonth() + 1)).slice(-2); // Agrega un 0 delante del mes si es menor que 10
    const diaDeHoy = ("0" + date.getDate()).slice(-2); // Agrega un 0 delante del día si es menor que 10
    const fechaHoy = anioHoy + mesHoy + diaDeHoy; // entrega fechaHoy global
    const fechaIng = `${diaDeHoy}/${mesHoy}/${anioHoy}` // en variable global fechaIng
    return fechaIng;
}
//VERIFICA SI EXISTE ARCHIVO FOTO
function verificarExistenciaFoto(archivo) {
    return fetch(`verificar_foto.php?archivo=${archivo}`)
        .then(response => response.json())
        .then(data => {
            return data.existe;
        })
        .catch(error => {
            console.error("Error al verificar la existencia de la foto:", error);
            return false;
        });
}
//DA RESUMEN
function resumen() {
    let sBc = parseFloat(document.getElementById('stockBodegaCentral').value) || 0;
    let sBl = parseFloat(document.getElementById('stockBodega').value) || 0;
    let sR = parseFloat(document.getElementById('stockRepo').value) || 0;
    let sV = parseFloat(document.getElementById('stockVitrina').value) || 0;
    let sC = parseFloat(document.getElementById('stockCritico').value) || 0;
    let accion = "Nada que Hacer aun";
    // Restablecer la clase a su valor predeterminado
    let mensajeCritico = document.getElementById('mensajeCritico');
    mensajeCritico.classList.remove('texto-rojo');
    if (sC >= sV) {
        accion = "Reponer vitrina";
        mensajeCritico.classList.add('texto-rojo');
    }
    if (sC >= sV && sR === 0 && sBl >= sC) {
        accion = "Abastecer respaldo reposición y reponer vitrina";
        mensajeCritico.classList.add('texto-rojo');
    }
    if (sC >= sV && sR === 0 && sBl === 0) {
        accion = "Pedir a bodega Central abastecer reposición y reponer vitrina";
        mensajeCritico.classList.add('texto-rojo');
    }
    if (sC >= sV && sR === 0 && sBl === 0 && sBc === 0) {
        accion = "Ya no hay stock y es lo que queda del producto";
    }
    mensajeCritico.innerText = accion;
    // Totales
    let sT = sBc + sBl + sR + sV;
    document.getElementById('sT').innerText = 'Stock Total=' + sT;
}
//para recuperar el id del usuario activo que graba el nuevo articulo 
function idUsuarioActivo() {
    // Obtener el valor almacenado en sessionStorage con la clave 'av'
    let avValue = sessionStorage.getItem('av');

    // Verificar si el valor existe y no es nulo
    if (avValue) {
        try {
            // Intentar convertir el valor de 'av' a un objeto JavaScript
            let avObject = JSON.parse(avValue);
            // Devolver el valor del campo 'idUsuario' si está presente
            return avObject.idUsuario || null;
        } catch (error) {
            console.error('Error al analizar el valor de "av":', error);
            alert('Error al analizar el valor de "av":'+ error);
        }
    } else {
        console.error('No se encontró ningún valor en sessionStorage con la clave "av".');
        alert('No se encontró ningún valor en sessionStorage ');
    }
    // En caso de error o si no se encuentra el valor esperado, devolver null
    return null;
}
function presentaUsuarioActivo(){
    let avValue = sessionStorage.getItem('av');
    if (avValue) {
        try {
            // Intentar convertir el valor de 'av' a un objeto JavaScript
            let avObject = JSON.parse(avValue);
            // Devolver el valor del campo 'idUsuario' si está presente
            let nombre=avObject.nombre || null;
            document.getElementById('usuarioActivo').innerText="Usuario Activo: "+ nombre

        } catch (error) {
            console.error('Error al analizar el valor de "av":', error);
            alert('Error al analizar el valor de "av":'+ error);
        }
    } else {
        console.error('No se encontró ningún valor en sessionStorage con la clave "av".');
        alert('No se encontró ningún valor en sessionStorage ');
    }
}  
async function transaccion(data) {
    // Obtener la fecha y hora actuales
    const fecha = fechaAhora();
    const hora = horaAhora()
    const idTrans = genIdTrans()
    const transaccion="Generacion de un nuevo Articulo"

    // Crear el objeto dataTrans
    const dataTrans = {
        idTrans,
        fecha,
        hora,
        transaccion,
        ...data // Agregar todos los campos del objeto original
    };
    // debugger

    // Enviar la solicitud utilizando Fetch
    const response = await fetch('./graba-transa-articulo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataTrans)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(responseData => {
        // Manejar la respuesta del servidor si es necesario
        console.log(responseData);
    })
    .catch(error => {
        // Manejar errores de la solicitud
        console.error('Error:', error);
    });
}


