presentaUsuarioActivo()
let idUsuario = idUsuarioActivo();
document.getElementById('idUsuario').value=idUsuario
//datos claves
let idArticulo='';
let transAdd='Actualiza Articulo'
//para el input
let articuloInput = document.getElementById('articuloInput');
let articuloSelect = document.getElementById('articulo');
//para la camara
const video = document.getElementById("videoElement");
const canvas = document.getElementById("canvasElement");
const context = canvas.getContext("2d");
//PARA APAGAR LA CAMARA
function apagarCamara() {
    video.style.display = "none";
}
//ACTIVA LA CAMARA
let selectedCamera = "environment"; // Default to the rear camera
navigator.mediaDevices.getUserMedia({ video: { facingMode: selectedCamera, width: 1920, height: 1080, frameRate: 30 } })
    .then(function(stream) {
        video.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Error al acceder a la cámara:", error);
    });
// Apaga la cámara al cargar la página
// window.addEventListener("DOMContentLoaded", apagarCamara);
//presenta el registro en pantalla    
document.addEventListener("DOMContentLoaded", function() {
    presentaArticulos();
    presentaArticulosList();
    document.getElementById("codigoArticulo").focus(); // Pone el foco en el input de código al cargar la página
    //BUSCA POR CODIGO
    document.getElementById("btnBuscaXcodigo").addEventListener("click", buscaXcodigo);
    //BUSCA POR NOMBRE
    document.getElementById("btnBuscaXnombre").addEventListener("click", buscaXnombre);
    //para llenar conbobox con lista de articulos
    // Implementar la función para grabar los cambios
    document.getElementById("btnGrabar").addEventListener("click", function() {
        // Aquí puedes enviar los datos del formulario actualizados al servidor para actualizar el registro en la base de datos
        // Puedes usar fetch para enviar los datos al archivo PHP correspondiente
    });
});
// LO HACE CON DATA LIST
function presentaArticulos() {
    fetch("./presenta-articulos.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        // Limpiar el datalist
        document.getElementById("articulo").innerHTML = '';
        // Llenar el datalist con los nombres de los artículos
        data.forEach(item => {
            var option = document.createElement("option");
            option.value = item.articulo;
            document.getElementById("articulo").appendChild(option);
        });
    })
    .catch(error => console.error("Error al obtener la lista de artículos:", error));
}    
// LO HACE CON SELECT
function presentaArticulosList() {
        fetch("./presenta-articulos.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            // Limpiar el combo box
            document.getElementById("articuloList").innerHTML = '<option value="">Selecciona un artículo</option>';
            // Llenar el combo box con los nombres de los artículos
            data.forEach(item => {
                var option = document.createElement("option");
                option.text = item.articulo;
                option.value = item.articulo;
                document.getElementById("articuloList").appendChild(option);
            });
        })
        .catch(error => console.error("Error al obtener la lista de artículos:", error));
} 
//toma la foto
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
            // Obtener el nombre del archivo del input
            const archivo = document.getElementById("archivo").value;
            // Convertir la imagen del canvas a formato binario (Blob)
            canvas.toBlob(function(blob) {
                const formData = new FormData();
                formData.append('imagen', blob, archivo);
                formData.append('idArticulo', idArticulo);
                fetch('./guardar_imagen.php', {
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
                    // Actualizar la imagen en la página después de guardarla en el servidor
                    btnFoto.disabled = false;
                    alert('se actualizo la foto')
                    window.location.reload(true);
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

//activa camara para foto
function nuevaFoto() {
    video.style.display = "block";
    selectedCamera = document.getElementById("cameraSelect").value;
    navigator.mediaDevices.getUserMedia({ video: { facingMode: selectedCamera, width: 1920, height: 1080, frameRate: 30 } })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
            document.querySelector('.camara').classList.add('camaraVisible'); // Agrega la clase para mostrar la cámara
            document.getElementById('btnFoto').focus()
            document.getElementById('btnFoto').select()
        })
        .catch(function(error) {
            console.error("Error al acceder a la cámara:", error);
        });
}
//graba en sql
function actualizarDatos() {
            let codigoArticulo= parseInt(document.getElementById('codigoArticulo').value)
            if(!codigoArticulo) {
                alert('Ingrese el codigo del Articulo')
                document.getElementById('codigoArticulo').focus()
                document.getElementById('codigoArticulo').select()
                return
            }
            let articulo=document.getElementById('articuloInput').value
            const articuloActualizado = {
                idArticulo,
                codigoArticulo,
                articulo,
                detalle: document.getElementById('detalle').value,
                stockBodegaCentral: parseInt(document.getElementById("stockBodegaCentral").value, 10) || 0,
                stockBodega: parseInt(document.getElementById("stockBodega").value, 10) || 0,
                stockVitrina: parseInt(document.getElementById("stockVitrina").value, 10) || 0,
                stockRepo: parseInt(document.getElementById("stockRepo").value, 10) || 0,
                stockCritico: parseInt(document.getElementById("stockCritico").value, 10) || 0,
                idUsuario: idUsuario
            };
            // Realizar la solicitud al servidor
            fetch('./actualiza_articulos.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articuloActualizado),
            })
            .then(response => response.json())
            .then(data => {
                location.reload()
                // Manejar la respuesta del servidor (puede ser un mensaje de éxito o error)
                if (data.success) {
                    transaccion(articuloActualizado,transAdd)
                    alert('Artículo actualizado en la base de datos');
                } else {
                    alert('Error al actualizar el artículo en la base de datos');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud al servidor:', error);
            });
}
//busca articulo por nombre
function buscaXnombre() {
                var nombre = document.getElementById("articuloInput").value;
                fetch("./busca-articulo-nombre.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "nombreArticulo=" + nombre
                })
                .then(response => response.json())
                .then(data => {
                    // Llenar los campos del formulario con los datos del artículo encontrado
                    idArticulo=data.idArticulo
                    document.getElementById("idArticulo").innerText=idArticulo;
                    document.getElementById("codigoArticulo").value = data.codigoArticulo;
                    document.getElementById("idArticulo").innerText = data.idArticulo;
                    document.getElementById("detalle").value = data.detalle;
                    document.getElementById("stockBodegaCentral").value = data.stockBodegaCentral;
                    document.getElementById("stockBodega").value = data.stockBodega;
                    document.getElementById("stockVitrina").value = data.stockVitrina;
                    document.getElementById("stockRepo").value = data.stockRepo;
                    document.getElementById("stockCritico").value = data.stockCritico;
                    document.getElementById("archivo").value = data.archivo;
                    document.getElementById("idUsuario").value = data.idUsuario;
                      // Establece la URL de la imagen del artículo
                    let rutaImagen = "./fotos/" + data.archivo; // Ajusta la ruta según la ubicación de las fotos
                    document.getElementById("imagenArticulo").src = rutaImagen;
                    seleccionaEnList(nombre)
                    recalculoDatosArticulo(idArticulo)
                })
                .catch(error => console.error("Error al buscar artículo por nombre:", error));
}
//busca articulo por codigo
function buscaXcodigo() {
                var codigo = parseInt(document.getElementById("codigoArticulo").value);
                console.log(codigo)
                fetch("busca-articulo-codigo.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded" // Usamos este tipo de contenido
                    },
                    body: "codigoArticulo=" + codigo // Enviamos el código directamente en el cuerpo de la solicitud
                })
                .then(response => response.json())
                .then(data => {
                    // Llenar los campos del formulario con los datos del artículo encontrado
                    idArticulo=data.idArticulo
                    document.getElementById("idArticulo").innerText=idArticulo;
                    document.getElementById("articulo").value = data.articulo;
                    document.getElementById("detalle").value = data.detalle;
                    document.getElementById("stockBodegaCentral").value = data.stockBodegaCentral;
                    document.getElementById("stockBodega").value = data.stockBodega;
                    document.getElementById("stockVitrina").value = data.stockVitrina;
                    document.getElementById("stockRepo").value = data.stockRepo;
                    document.getElementById("stockCritico").value = data.stockCritico;
                    document.getElementById("archivo").value = data.archivo;
                    document.getElementById("idUsuario").value = data.idUsuario;
                     // Establece la URL de la imagen del artículo y la actualiza
                    let rutaImagen = "./fotos/" + data.archivo; // Ajusta la ruta según la ubicación de las fotos
                    document.getElementById("imagenArticulo").src = rutaImagen;
                    document.getElementById('articuloInput').value=data.articulo
                    seleccionaEnList(data.articulo)

                })
                .catch(error => console.error("Error al buscar artículo:", error));
    }
//elimina articulo
function eliminarArticulo() {
    let codArticulo=document.getElementById('codigoArticulo').value
    if(!codArticulo) {return}
    // Pregunta al usuario si realmente desea eliminar el artículo
    if (confirm("¿Estás seguro de que deseas eliminar este artículo? con id " +idArticulo)) {
        // Realizar la llamada al archivo PHP para eliminar el artículo
        fetch('./elimina_articulo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'idArticulo=' + idArticulo,
        })
        .then(response => {
            // Verifica si la respuesta tiene un código de estado exitoso (2xx)
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            // Devuelve la respuesta como texto
            return response.text();
        })
        .then(data => {
            alert(data); // Mostrar mensaje de alerta
            transAdd=transAdd+' & se elimino el articulo con id= '+idArticulo +' por el usuario con id '+idUsuario
            transaccion(data,transAdd) //se actualiza igual transaccion
            // Recargar la página después de la eliminación
            location.reload();
            // Puedes realizar otras acciones después de la eliminación si es necesario
        })
        .catch(error => console.error('Error al realizar la llamada:', error));
    }
}
//en el select al seleccionar llena campo datalist
function selecciona(event){
    event.preventDefault();
    let seleccion= document.getElementById('articuloList').value
    document.getElementById('articuloInput').value=seleccion
}

//para dejar seleccionado en el lis de select
function seleccionaEnList(articulo) {
    // Obtener el elemento select
    var selectElement = document.getElementById('articuloList');
    // Iterar sobre las opciones para encontrar la que tiene el nombre del artículo
    var opciones = selectElement.options;
    for (var i = 0; i < opciones.length; i++) {
        if (opciones[i].text === articulo) {
            // Establecer el atributo selected en la opción correspondiente
            opciones[i].selected = true;
            // Salir del bucle una vez que se ha encontrado la opción
            break;
        }
    }
}

// Llamada a la función con el nombre del artículo que deseas seleccionar
selecciona(data.articulo);

// Función para manejar el evento input y filtrar las opciones del datalist
document.getElementById("articuloInput").addEventListener("input", function(event) {
    var inputValue = event.target.value;
    var options = document.getElementById("articulo").childNodes;
    options.forEach(function(option) {
        if (inputValue && option.value.toLowerCase().indexOf(inputValue.toLowerCase()) === -1) {
            option.hidden = true;
        } else {
            option.hidden = false;
        }
    });
});