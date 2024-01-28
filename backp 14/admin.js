function guardaLocalStorage(){
    // Obtener datos del Local Storage
    var datosLocalStorage = localStorage.getItem('articulosVitrina');

    // Verificar si hay datos en el Local Storage
    if (datosLocalStorage) {
        // Convertir la cadena JSON a objeto JavaScript
        var articulos = JSON.parse(datosLocalStorage);

        // Crear un objeto Blob con los datos en formato JSON
        var blob = new Blob([JSON.stringify(articulos)], { type: 'application/json' });

        // Crear un enlace para descargar el archivo
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'baseArticulosVitrina.json';

        // Agregar el enlace al documento y simular un clic
        document.body.appendChild(a);
        a.click();

        // Eliminar el enlace del documento
        document.body.removeChild(a);
    } else {
        alert('No hay datos en Local Storage');
    }
} 
function cargarLocalStorage() {
var fileInput = document.getElementById('fileInput');
if (fileInput.files.length > 0) {
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event) {
    var jsonData = event.target.result;
    try {
        var parsedData = JSON.parse(jsonData);
        localStorage.setItem('articulosVitrina', JSON.stringify(parsedData));
        alert('Datos cargados en Local Storage exitosamente.');
    } catch (error) {
        alert('Error al parsear el archivo JSON.');
    }
    };
} else {
    alert('Por favor, selecciona un archivo JSON.');
}
}
//boton elimina articulo
document.getElementById('eliminarLocalStorage').addEventListener('click', function() {
    // Eliminar la clave 'articulosVitrina' del almacenamiento local
    localStorage.removeItem('articulosVitrina');
    alert('Clave "articulosVitrina" eliminada del almacenamiento local.');
});

function grabaJsonAsql() {
const input = document.createElement('input');
input.type = 'file';
input.addEventListener('change', function () {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const jsonData = JSON.parse(e.target.result);
            console.log(jsonData)

            guardarEnSQL(jsonData);
        };
        reader.readAsText(file);
    }
});

input.click();
}

function guardarEnSQL(data) {
// Transformar los datos antes de enviarlos al servidor
const transformedData = data.map(item => {
    // Forzar ciertos campos a ser tratados como cadena (VARCHAR)
    const transformedItem = {
        ...item,
        idArticulo: String(item.idArticulo),
        codigoArticulo: Number(item.codigoArticulo), // Convertir a número si es necesario
        stockBodegaCentral: Number(item.stockBodegaCentral), // Convertir a número si es necesario
        stockBodega: Number(item.stockBodega), // Convertir a número si es necesario
        stockVitrina: Number(item.stockVitrina), // Convertir a número si es necesario
        stockRepo: Number(item.stockRepo), // Convertir a número si es necesario
        stockCritico: Number(item.stockCritico), // Convertir a número si es necesario
        archivo: 'foto' + item.idArticulo // Concatenar 'foto' con el valor de idArticulo
    };
    return transformedItem;
});

fetch('graba_json_sql.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(transformedData)
})
.then(response => response.json())
.then(data => {
    console.log(data);
    alert('Registros insertados en la base de datos.');
})
.catch(error => {
    console.error('Error al insertar en la base de datos:', error);
    alert('Error al insertar en la base de datos.');
});
}