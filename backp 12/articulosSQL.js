// presenta
presentaUsuarioActivo()
let idUsuario = idUsuarioActivo();
let transAdd='';
// Obtener datos desde el servidor
fetch('./obtener_articulos.php')
    .then(response => response.json())
    .then(articulos => {
        articulos.forEach(articulo => {
            // console.log(data)
            const div = document.createElement("div");
            div.classList.add("item", "campos");
            const img = document.createElement("img");
            img.src = `./fotos/foto${articulo.idArticulo}.jpg`;
            div.appendChild(img);
            const datos = document.createElement("div");
            crearElemento("label", "Id Artículo:", datos);
            crearElemento("input", "", datos, articulo.idArticulo, true);
            crearElemento("label", "Código del Artículo:", datos);
            crearElemento("input", "", datos, articulo.codigoArticulo, false, `codigoArticulo${articulo.idArticulo}`, 'codigo');
            crearElemento("label", "Nombre del Artículo:", datos);
            crearElemento("input", "", datos, articulo.articulo, false, `articulo${articulo.idArticulo}`, 'idArticulo');
            crearElemento("label", "Descripción del Artículo:", datos);
            crearElemento("input", "", datos, articulo.detalle, false, `detalle${articulo.idArticulo}`, 'descripcion');
            crearElemento("label", "Stock Bodega Central:", datos);
            crearElemento("input", "", datos, articulo.stockBodegaCentral, false, `stockBodegaCentral${articulo.idArticulo}`, 'stockBc');
            crearElemento("label", "Stock Bodega:", datos);
            crearElemento("input", "", datos, articulo.stockBodega, false, `stockBodega${articulo.idArticulo}`, 'stockB');
            crearElemento("label", "Stock Vitrina:", datos);
            crearElemento("input", "", datos, articulo.stockVitrina, false, `stockVitrina${articulo.idArticulo}`, 'stockV');
            crearElemento("label", "Stock Reposición:", datos);
            crearElemento("input", "", datos, articulo.stockRepo, false, `stockRepo${articulo.idArticulo}`, 'stockR');
            crearElemento("label", "Stock Crítico:", datos);
            crearElemento("input", "", datos, articulo.stockCritico, false, `stockCritico${articulo.idArticulo}`, 'stockC');

            const buttonsContainer = document.createElement("div");

            // Crear elemento <p> para mostrar el idUsuario
            const idUsuarioP = document.createElement("p");
            idUsuarioP.textContent = `ID de Usuario: ${articulo.idUsuario}`;
            idUsuarioP.addEventListener("click",() => presentaNombreUsuario(articulo.idUsuario));
            idUsuarioP.classList.add("idUsuario");
            // Agregar el elemento <p> al div
            div.appendChild(idUsuarioP);


            buttonsContainer.classList.add("botones");
            const buttonActualizar = document.createElement("button");
            buttonActualizar.textContent = "Actualizar";
            buttonActualizar.classList.add("btnEdita");
            buttonActualizar.addEventListener("click", () => actualizarDatos(articulo.idArticulo));
            buttonsContainer.appendChild(buttonActualizar);
            buttonsContainer.appendChild(document.createElement("br"));
            const eliminarButton = document.createElement("button");
            eliminarButton.textContent = "Eliminar";
            eliminarButton.classList.add("btnElimina");
            eliminarButton.addEventListener("click", () => eliminarArticulo(articulo.idArticulo));
            buttonsContainer.appendChild(eliminarButton);
            buttonsContainer.appendChild(document.createElement("br"));
            const recalculoButton = document.createElement("button");
            recalculoButton.textContent = "Recalculo";
            recalculoButton.id = `btnRecalculo${articulo.idArticulo}`;
            recalculoButton.type = "button";
            recalculoButton.classList.add("btnRecalculo");
            recalculoButton.addEventListener("click", () => recalculoDatos(articulo.idArticulo));
            buttonsContainer.appendChild(recalculoButton);

            const buttonsRepos = document.createElement("div");
            buttonsRepos.classList.add("botonesRepo");
            const repoVitrinaButton = document.createElement("button");
            repoVitrinaButton.textContent = "Reposición Vitrina";
            repoVitrinaButton.classList.add("btnRepoVitrina");
            repoVitrinaButton.addEventListener("click", () => repoVitrina(articulo.idArticulo));
            buttonsRepos.appendChild(repoVitrinaButton);
            const repoStockVitrinaButton = document.createElement("button");
            repoStockVitrinaButton.textContent = "Abastecer Stock de Reposicion";
            repoStockVitrinaButton.classList.add("btnRepoStockVitrina");
            repoStockVitrinaButton.addEventListener("click", () => repoStockVitrina(articulo.idArticulo));
            buttonsRepos.appendChild(repoStockVitrinaButton);
            const repoBodegaBtn = document.createElement("button");
            repoBodegaBtn.textContent = "Abastecer Bodega Local";
            repoBodegaBtn.classList.add("btnRepoBodega");
            repoBodegaBtn.addEventListener("click", () => repoStockBodegaLocal(articulo.idArticulo));
            buttonsRepos.appendChild(repoBodegaBtn);
            const solicitudRepoBodegaButton = document.createElement("button");
            solicitudRepoBodegaButton.textContent = "Agrega a lista de pedidos";
            solicitudRepoBodegaButton.classList.add("btnSolicitudRepoBodega");
            solicitudRepoBodegaButton.addEventListener("click", () => solicitudRepoBodega(articulo.idArticulo));
            buttonsRepos.appendChild(solicitudRepoBodegaButton);
            const btnPrintPedidos = document.createElement("button");
            btnPrintPedidos.textContent = "Imprime Lista Pedidos";
            btnPrintPedidos.classList.add("btnRepoBodegaLocal");
            btnPrintPedidos.addEventListener("click", () => entregaListaPedidos());
            buttonsRepos.appendChild(btnPrintPedidos);
            const btnEliminaListaP = document.createElement("button");
            btnEliminaListaP.textContent = "Elimina Lista Pedidos";
            btnEliminaListaP.classList.add("btnEliminaList");
            btnEliminaListaP.addEventListener("click", () =>eliminaListaPedidos());
            buttonsRepos.appendChild(btnEliminaListaP);

            datos.appendChild(buttonsContainer);
            datos.appendChild(buttonsRepos);
            div.appendChild(datos);

            const resumenDiv = document.createElement("div");
            resumenDiv.classList.add("resumen");
            const sBc = document.createElement("p");
            sBc.id = `sBc${articulo.idArticulo}`;
            resumenDiv.appendChild(sBc);
            const sBl = document.createElement("p");
            sBl.id = `sBl${articulo.idArticulo}`;
            resumenDiv.appendChild(sBl);
            const sV = document.createElement("p");
            sV.id = `sV${articulo.idArticulo}`;
            resumenDiv.appendChild(sV);
            const sR = document.createElement("p");
            sR.id = `sR${articulo.idArticulo}`;
            resumenDiv.appendChild(sR);
            const sT = document.createElement("p");
            sT.id = `sT${articulo.idArticulo}`;
            resumenDiv.appendChild(sT);
            const sC = document.createElement("p");
            sC.id = `sC${articulo.idArticulo}`;
            resumenDiv.appendChild(sC);

            div.appendChild(resumenDiv);
            const mensajeCriticoP = document.createElement("p");
            mensajeCriticoP.id = `mensajeCritico${articulo.idArticulo}`;
            mensajeCriticoP.classList.add("resumen");
            div.appendChild(mensajeCriticoP);
            div.appendChild(document.createElement("br"));
            document.body.appendChild(div);
            generarResumen(articulo.idArticulo);
        });
    })
    .catch(error => {
        console.error('Error al obtener datos del servidor:', error);
    });
//crea elementos dinamicos en pantalla
function crearElemento(tag, labelText, parent, value, disabled, id, clase) {
        const elemento = document.createElement(tag);
        if (tag === "label") {
            elemento.textContent = `${labelText}`;
        } else if (tag === "input") {
            elemento.type = "text";
            elemento.value = value;
            // elemento.class='input-desabilitado'
            elemento.disabled = disabled;
            //deshabilita
            elemento.setAttribute("readonly", "readonly")
            if (id) {
                elemento.id = id;
            }
            if (clase) {
                elemento.classList.add(clase);
                // elemento.classList.add('input-deshabilitado');
            }
        }
        parent.appendChild(elemento);
}
//presenta resumen abajo
function generarResumen(idArticulo) {
    const stockBc = parseFloat(document.getElementById(`stockBodegaCentral${idArticulo}`).value) || 0;
    const stockBl = parseFloat(document.getElementById(`stockBodega${idArticulo}`).value) || 0;
    const stockR = parseFloat(document.getElementById(`stockRepo${idArticulo}`).value) || 0;
    const stockV = parseFloat(document.getElementById(`stockVitrina${idArticulo}`).value) || 0;
    const stockC = parseFloat(document.getElementById(`stockCritico${idArticulo}`).value) || 0;
    const stockTotal = stockBc + stockBl + stockR + stockV;
    const stockLocal = stockBl + stockR + stockV 
    document.getElementById(`sT${idArticulo}`).innerText = `Stock Total: ${stockTotal} Stock Local : ${stockLocal}`;
    recalculoDatos(idArticulo)    
}
//recalcula datos y los presenta
function recalculoDatos(idArticulo) {
    // transAdd=transAdd+' & Recalculo'
    let sBc = parseFloat(document.getElementById(`stockBodegaCentral${idArticulo}`).value) || 0;
    let sBl = parseFloat(document.getElementById(`stockBodega${idArticulo}`).value) || 0;
    let sR = parseFloat(document.getElementById(`stockRepo${idArticulo}`).value) || 0;
    let sV = parseFloat(document.getElementById(`stockVitrina${idArticulo}`).value) || 0;
    let sC = parseFloat(document.getElementById(`stockCritico${idArticulo}`).value) || 0;
    let accion = "Nada que Hacer aún";
    // Restablecer la clase a su valor predeterminado
    let mensajeCritico = document.getElementById(`mensajeCritico${idArticulo}`);
    // mensajeCritico.classList.remove('texto-rojo');
    mensajeCritico.classList.remove('texto-verde');
    if (sC >= sV) {
        accion = "Reponer vitrina";
        mensajeCritico.classList.add('texto-rojo');
    }
    if (sC >= sV && sR === 0 && sBl >= sC) {
        accion = "Abastecer respaldo reposición y reponer vitrina";
        mensajeCritico.classList.add('texto-rojo');
    }
    if (sC >= sV && sR === 0 && sBl === 0) {
        accion = "! Pedir a bodega Central abastecer reposición y reponer vitrina !";
        mensajeCritico.classList.add('texto-rojo');
    }
    if (sC >= sV && sR === 0 && sBl === 0 && sBc === 0) {
        accion = "Ya no hay stock y es lo que queda del producto";
    }
    if (sR===0 && sBc>0 ){
        accion = "! Abastecer stock para reposicion de vitrina !"
        mensajeCritico.classList.add('texto-rojo');
    }
    if (sBl===0){
        accion = "! Pedir a bodega Central para preveer reposicion del Articulo !";
        mensajeCritico.classList.add('texto-rojo');
    }
    if (sBc===0){
        if (sR===0 && sBl>0) {
            accion = "! Abastecer stock de reposicion en bodega !" ;
            mensajeCritico.classList.add('texto-rojo');
        } else {
            accion = "Ya no queda stock para el articulo en Bodega Central";
            mensajeCritico.classList.add('texto-verde');
            
        }
    }
    if (sBc===0 && sBl===0){
        accion = "Ya no hay stock del articulo en ambas bodegas";
    }
    if (sBc===0 && sBl===0 && sR===0){
        accion = "Ya no hay stock del articulo en ambas bodegas y en reposicion de vitrina";
    }
    if (sR===0 && sBl>0) {
        accion = "! Abastecer stock de reposicion !" ;
        mensajeCritico.classList.add('texto-rojo');
    }
    if (sR===0 && sBl>0) {
        accion = "! Abastecer stock de reposicion !" ;
        mensajeCritico.classList.add('texto-rojo');
    }
    mensajeCritico.innerText = accion;
    // Totales
    let sT = sBc + sBl + sR + sV;
    document.getElementById(`sT${idArticulo}`).innerText = 'Stock Total=' + sT;
}
//calcula reposicion de vitrina y presenta
function repoVitrina(idArticulo) {
    const stockR = parseFloat(document.getElementById(`stockRepo${idArticulo}`).value) || 0;
    const stockV = parseFloat(document.getElementById(`stockVitrina${idArticulo}`).value) || 0;
    // Validar si stockR es igual a 0
    if (stockR === 0) {
        alert('No es posible reponer vitrina, solicite artículos a bodega.');
        return;
    }
    // Consultar cantidad a reponer del artículo
    const reposicion = parseFloat(prompt('Ingrese la cantidad a reponer:', stockR.toString())) || 0;
    // Validar si la cantidad a reponer es menor o igual a stockR
    if (reposicion <= stockR) {
        // Actualizar stockV
        const nuevoStockV = stockV + reposicion;
        document.getElementById(`stockVitrina${idArticulo}`).value = nuevoStockV;
        // Actualizar stockR
        const nuevoStockR = stockR - reposicion;
        document.getElementById(`stockRepo${idArticulo}`).value = nuevoStockR;
    } else {
        // Mostrar confirmación para reponer lo que se puede
        const confirmacion = confirm(`La cantidad máxima a reponer es ${stockR}. ¿Desea reponer esa cantidad?`);
        if (confirmacion) {
            // Reponer la cantidad máxima permitida
            document.getElementById(`stockVitrina${idArticulo}`).value = stockV + stockR;
            document.getElementById(`stockRepo${idArticulo}`).value = 0;
            transAdd=transAdd+' & posible reposicion de vitrina'
        } else {
            return
            // No se hace nada si el usuario cancela la confirmación
        }
    }
    recalculoDatos(idArticulo)
}
//calculo repone stock de vitrina y presenta
function repoStockVitrina(idArticulo) {
    const stockBl = parseFloat(document.getElementById(`stockBodega${idArticulo}`).value) || 0;
    const stockR = parseFloat(document.getElementById(`stockRepo${idArticulo}`).value) || 0;
    // Validar que stockBl no sea 0
    if (stockBl === 0) {
        alert('No es posible realizar esta transacción. El stock en bodega es 0.');
        return;
    }
    // Solicitar la cantidad de artículos a reponer
    const nuevoStockRepo = parseFloat(prompt(`Cuantos artículos va a dejar como stock de reposición en vitrina?`, stockBl.toString())) || 0;
    // Validar que la cantidad sea menor o igual al stock en bodega
    if (stockBl >= nuevoStockRepo) {
        // Actualizar en el formulario
        const nuevoStockR = stockR + nuevoStockRepo;
        const nuevoStockBl = stockBl - nuevoStockRepo;
        document.getElementById(`stockRepo${idArticulo}`).value = nuevoStockR;
        document.getElementById(`stockBodega${idArticulo}`).value = nuevoStockBl;
        transAdd=transAdd+' & posible reposicion de stock de vitrina'

    } else {
        // Indicar que no es posible y no hacer nada
        alert('La cantidad a dejar como stock de reposición en vitrina no puede ser mayor al stock en bodega.');
        return
    }
    recalculoDatos(idArticulo)
}
//calcula abestece bodega local y presenta
function repoStockBodegaLocal(idArticulo) {
    const stockBcElement = document.getElementById(`stockBodegaCentral${idArticulo}`);
    const stockBlElement = document.getElementById(`stockBodega${idArticulo}`);
    let stockBc = parseFloat(stockBcElement.value) || 0;
    let stockBl = parseFloat(stockBlElement.value) || 0;
    // Consultar la cantidad de artículos a ingresar a la bodega local
    const defaultValue = stockBc.toString();
    const nuevoStockBodega = parseFloat(prompt('Ingrese la cantidad de artículos que está ingresando a la bodega local:', defaultValue)) || 0;
    //calidar que no se pase
    if (nuevoStockBodega>stockBc){
        alert('No es posible ingresar mas stock del que hay en Bodega Centarl '+stockBc)
        return
    }
    // Restar la cantidad del stock de bodega central
    stockBc -= nuevoStockBodega;
    // Sumar la cantidad al stock de bodega local
    stockBl += nuevoStockBodega;
    // Actualizar los valores en el formulario del artículo
    stockBcElement.value = stockBc;
    stockBlElement.value = stockBl;
    transAdd=transAdd+' & posible abastecimiento de bodega local'

    recalculoDatos(idArticulo)
}
//carga solicitud por cada articulo para luego impresion
function solicitudRepoBodega(idArticulo) {
    const stockBc = parseFloat(document.getElementById(`stockBodegaCentral${idArticulo}`).value) || 0;
    const stockBl = parseFloat(document.getElementById(`stockBodega${idArticulo}`).value) || 0;
    const stockR = parseFloat(document.getElementById(`stockRepo${idArticulo}`).value) || 0;
    const stockC = parseFloat(document.getElementById(`stockCritico${idArticulo}`).value) || 0;
    const codigoArticulo = document.getElementById(`codigoArticulo${idArticulo}`).value
    const nombreArticulo = document.getElementById(`articulo${idArticulo}`).value
    const detalleArticulo = document.getElementById(`detalle${idArticulo}`).value
    // Validar que stockR sea menor o igual a stockC y que stockBl sea 0
    // if (stockR <= stockC && stockBl === 0) {
    if (stockBl === 0  && stockBc >= stockC) {
        let confirma = confirm('desea agregar el articulo a la lista de pedidos') 
        if (confirma===true){
            transAdd=transAdd+' & solicitud de abastecimiento de bodega local'
            agregaArticuloPedido(idArticulo,codigoArticulo, nombreArticulo+' '+detalleArticulo , stockBc )
        } else {
           
            return
        }
    }  else {
        if (stockBc===0) {
            alert('No puede solicitar si no hay stock en bodega Central')
        } else {
            let confirmaIgual=confirm("Aun hay stock en Bodega Local, ?desea pedir igual")
            if (confirmaIgual){
                transAdd=transAdd+' & solicitud de abastecimiento de bodega local'
                agregaArticuloPedido(idArticulo,codigoArticulo, nombreArticulo+' '+detalleArticulo , stockBc )
            }
        }
    }
}
function agregaArticuloPedido(idArticulo, codigoArticulo, nombreArticulo, stockBc) {
    // Obtener la lista actual de pedidos desde el localStorage
    let solicitudPedidoBodega = JSON.parse(localStorage.getItem('solicitudPedidoBodega')) || [];
    // Verificar si el artículo ya está en la lista por idArticulo o codArticulo
    const articuloExistente = solicitudPedidoBodega.find(item => item.idArticulo === idArticulo || item.codArticulo === codigoArticulo);
    if (articuloExistente) {
        // Si ya existe, puedes manejar la situación según tus necesidades (por ejemplo, mostrar un mensaje de error)
        alert("El artículo ya está en la lista de pedidos.");
        console.error("El artículo ya está en la lista de pedidos.");
    } else {
        solicitudPedidoBodega.push({
            idArticulo,
            codArticulo: codigoArticulo,
            Articulo: nombreArticulo,
            stockBc
        });
        // Guardar la lista actualizada en el localStorage
        localStorage.setItem('solicitudPedidoBodega', JSON.stringify(solicitudPedidoBodega));
        console.log("Artículo agregado exitosamente a la lista de pedidos.");
        transAdd=transAdd+' & Se agrego articulo a la lista de pedidos'
        alert("Artículo agregado exitosamente a la lista de pedidos.");
    }
}
//imprime lista de pedidos
function entregaListaPedidos() {
    // Obtener la lista actual de pedidos desde el localStorage
    const solicitudPedidoBodega = JSON.parse(localStorage.getItem('solicitudPedidoBodega')) || [];
    // Obtener la fecha y hora actual
    const fechaHoraActual = new Date().toLocaleString();
    // Crear una página con la lista de pedidos
    const pagina = `
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Pedidos</title>
            <style>
                /* Puedes personalizar el estilo según tus preferencias */
                body {
                    font-family: Arial, sans-serif;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th, td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>Lista de Pedidos</h1>
            <p>Fecha y hora de impresión: ${fechaHoraActual}</p>
            <table>
                <thead>
                    <tr>
                        <th>ID Artículo</th>
                        <th>Código Artículo</th>
                        <th>Artículo</th>
                        <th>Stock BC</th>
                    </tr>
                </thead>
                <tbody>
                    ${solicitudPedidoBodega.map(item => `
                        <tr>
                            <td>${item.idArticulo}</td>
                            <td>${item.codArticulo}</td>
                            <td>${item.Articulo}</td>
                            <td>${item.stockBc}</td>
                        </tr>`).join('')}
                </tbody>
            </table>
        </body>
        </html>
    `;
    // Crear un objeto Blob con el contenido HTML
    const blob = new Blob([pagina], { type: 'text/html' });
    // Crear una URL del Blob y abrir una nueva ventana para imprimir
    const url = URL.createObjectURL(blob);
    const ventanaImpresion = window.open(url, '_blank');
    ventanaImpresion.print();
}
//elimina de local storage
function eliminaListaPedidos() {
    localStorage.removeItem('solicitudPedidoBodega');
    alert('Lista de pedidos eliminada del localStorage.');
    transAdd=transAdd+' & Se elimino la lista de pedidos'
    console.log('Lista de pedidos eliminada del localStorage.');
}
//HABILITA DESHABILITA
let inputsHabilitados = false;
//habilita inputs
function habilitaInputs() {
    transAdd=transAdd+' & Se editaron los campos'
    // Obtener todos los elementos input en la página
    const inputs = document.querySelectorAll('input');
    // Iterar sobre los inputs y quitar el atributo readonly
    inputs.forEach(input => {
        input.removeAttribute('readonly');
    });
}
// deshabilita inputs
function deshabilitaInputs() {
    // Obtener todos los elementos input en la página
    const inputs = document.querySelectorAll('input');
    // Iterar sobre los inputs y agregar el atributo readonly
    inputs.forEach(input => {
        input.setAttribute('readonly', 'readonly');
    });
}
//alterna habilita deshabilita inputs
function alternarHabilitarInputs() {
    if (inputsHabilitados) {
        deshabilitaInputs();
    } else {
        habilitaInputs();
    }
    inputsHabilitados = !inputsHabilitados;
}

function actualizarDatos(idArticulo) {
    const articuloActualizado = {
        idArticulo: idArticulo,
        codigoArticulo: document.getElementById(`codigoArticulo${idArticulo}`).value,
        articulo: document.getElementById(`articulo${idArticulo}`).value,
        detalle: document.getElementById(`detalle${idArticulo}`).value,
        stockBodegaCentral: document.getElementById(`stockBodegaCentral${idArticulo}`).value,
        stockBodega: document.getElementById(`stockBodega${idArticulo}`).value,
        stockVitrina: document.getElementById(`stockVitrina${idArticulo}`).value,
        stockRepo: document.getElementById(`stockRepo${idArticulo}`).value,
        stockCritico: document.getElementById(`stockCritico${idArticulo}`).value,
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
function eliminarArticulo(idArticulo) {
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

function presentaNombreUsuario(idUsuario) {
    fetch('datos-usuario-activo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'idUsuario=' + idUsuario,
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error:', data.error);
        } else {
            const datos = data.data
            alert("El Usuario que actualizo los datos es "+ datos[0].nombre)
        }
    })
    .catch(error => console.error('Error:', error));
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
// actualiza registro de transaccion
async function transaccion(data,transAdd) {
    // Obtener la fecha y hora actuales
    const fecha = fechaAhora();
    const hora = horaAhora()
    const idTrans = genIdTrans()
    const transaccion="Actualizacion del articulo: "+transAdd

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












