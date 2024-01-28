//carga la pagina desplefgando articulos
const articulos = JSON.parse(localStorage.getItem("articulosVitrina")) || [];
articulos.forEach(articulo => {
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
    // Nuevo div para contener los botones
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("botones");
    // Botón "Actualizar"
    const buttonActualizar = document.createElement("button");
    buttonActualizar.textContent = "Actualizar";
    buttonActualizar.classList.add("btnEdita");
    buttonActualizar.addEventListener("click", () => actualizarDatos(articulo.idArticulo));
    buttonsContainer.appendChild(buttonActualizar);
    // Agrega un salto de línea después del botón "Actualizar"
    buttonsContainer.appendChild(document.createElement("br"));
    // Botón "Eliminar"
    const eliminarButton = document.createElement("button");
    eliminarButton.textContent = "Eliminar";
    eliminarButton.classList.add("btnElimina");
    eliminarButton.addEventListener("click", () => eliminarArticulo(articulo.idArticulo));
    buttonsContainer.appendChild(eliminarButton);
    // Agrega un salto de línea después del botón "Eliminar"
    buttonsContainer.appendChild(document.createElement("br"));
    // Botón "Recalculo"
    const recalculoButton = document.createElement("button");
    recalculoButton.textContent = "Recalculo";
    recalculoButton.id = `btnRecalculo${articulo.idArticulo}`;
    recalculoButton.type = "button";
    recalculoButton.classList.add("btnRecalculo");
    recalculoButton.addEventListener("click", () => recalculoDatos(articulo.idArticulo));
    buttonsContainer.appendChild(recalculoButton);

    // Nuevo div para contener los botones
    const buttonsRepos = document.createElement("div");
    buttonsRepos.classList.add("botonesRepo");

    // Botón "Reposición Vitrina"
    const repoVitrinaButton = document.createElement("button");
    repoVitrinaButton.textContent = "Reposición Vitrina";
    repoVitrinaButton.classList.add("btnRepoVitrina");
    repoVitrinaButton.addEventListener("click", () => repoVitrina(articulo.idArticulo));
    buttonsRepos.appendChild(repoVitrinaButton);

    // Botón "Reposición Stock de reposicion Vitrina"
    const repoStockVitrinaButton = document.createElement("button");
    repoStockVitrinaButton.textContent = "Abastecer Stock de Reposicion";
    repoStockVitrinaButton.classList.add("btnRepoStockVitrina");
    repoStockVitrinaButton.addEventListener("click", () => repoStockVitrina(articulo.idArticulo));
    buttonsRepos.appendChild(repoStockVitrinaButton);
    
    // Botón "Reposición bodega local"
    const repoBodegaBtn = document.createElement("button");
    repoBodegaBtn.textContent = "Reposición Bodega Local";
    repoBodegaBtn.classList.add("btnRepoBodega");
    repoBodegaBtn.addEventListener("click", () => repoStockBodegaLocal(articulo.idArticulo));
    buttonsRepos.appendChild(repoBodegaBtn);

    // Botón "Solicitud Reposición Bodega para gen lista"
    const solicitudRepoBodegaButton = document.createElement("button");
    solicitudRepoBodegaButton.textContent = "Agrega a lista de pedidos";
    solicitudRepoBodegaButton.classList.add("btnSolicitudRepoBodega");
    solicitudRepoBodegaButton.addEventListener("click", () => solicitudRepoBodega(articulo.idArticulo));
    buttonsRepos.appendChild(solicitudRepoBodegaButton);

    // Botón "impresion lista pedidos"
    const btnPrintPedidos = document.createElement("button");
    btnPrintPedidos.textContent = "Imprime Lista Pedidos";
    btnPrintPedidos.classList.add("btnRepoBodegaLocal");
    btnPrintPedidos.addEventListener("click", () => entregaListaPedidos());
    buttonsRepos.appendChild(btnPrintPedidos);
    // Botón "impresion lista pedidos"
    const btnEliminaListaP = document.createElement("button");
    btnEliminaListaP.textContent = "Elimina Lista Pedidos";
    btnEliminaListaP.classList.add("btnEliminaList");
    btnEliminaListaP.addEventListener("click", () =>eliminaListaPedidos());
    buttonsRepos.appendChild(btnEliminaListaP);
    
    // Agrega el nuevo div con los botones al div principal
    datos.appendChild(buttonsContainer);
    // Agrega el nuevo div con los botones al div principal
    datos.appendChild(buttonsRepos);
    div.appendChild(datos);
    // Crear el bloque de resumen dinámicamente
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
    // Agregar el bloque de resumen al artículo
    div.appendChild(resumenDiv);
    // Crear el bloque de mensaje crítico dinámicamente
    const mensajeCriticoP = document.createElement("p");
    mensajeCriticoP.id = `mensajeCritico${articulo.idArticulo}`;
    mensajeCriticoP.classList.add("resumen");
    // Agregar el bloque de mensaje crítico al artículo
    div.appendChild(mensajeCriticoP);
    // Agregar un salto de línea después del bloque de mensaje crítico
    div.appendChild(document.createElement("br"));
    document.body.appendChild(div);
    // Llamar a la función de resumen con el idArticulo
    generarResumen(articulo.idArticulo);
    
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

// Función para actualizar datos
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
    };

    // Actualizar el elemento en el array y en el localStorage
    const index = articulos.findIndex(a => a.idArticulo === idArticulo);
    if (index !== -1) {
        articulos[index] = articuloActualizado;
        localStorage.setItem("articulosVitrina", JSON.stringify(articulos));
        alert('articulo actualizado')
    }
    recalculoDatos(idArticulo)
}
//elimina articulo de local storage
function eliminarArticulo(idArticulo) {
    let confirma=confirm("?seguro de eliminar el articulo con id " + idArticulo)
    if(!confirma){
        return
    }
    // Eliminar el elemento del array y del localStorage
    const index = articulos.findIndex(a => a.idArticulo === idArticulo);
    if (index !== -1) {
        articulos.splice(index, 1);
        localStorage.setItem("articulosVitrina", JSON.stringify(articulos));
        // Remueve el div correspondiente al artículo eliminado
        document.getElementById(`articulo${idArticulo}`).parentNode.parentNode.remove();
    }
}
//recalcula datos
function recalculoDatos(idArticulo) {
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
//GENERA RESUMEN
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
//repone vitrina
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
        } else {
            return
            // No se hace nada si el usuario cancela la confirmación
        }
    }
    recalculoDatos(idArticulo)
}
//repone stock para la vitrina
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
    } else {
        // Indicar que no es posible y no hacer nada
        alert('La cantidad a dejar como stock de reposición en vitrina no puede ser mayor al stock en bodega.');
        return
    }
    recalculoDatos(idArticulo)
}
//solicita reposicion a bodega
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
            agregaArticuloPedido(idArticulo,codigoArticulo, nombreArticulo+' '+detalleArticulo , stockBc )
        } else {
           
            return
        }
    }  else {
        if (stockBc===0) {
            alert('No puede solicitar si no hay stock en bodega Central')
        } else {
            let confirmaIgual=confirm("Aun hay stock en Bodega Local, ?desea pedir igual")
            if (confirmaIgual){agregaArticuloPedido(idArticulo,codigoArticulo, nombreArticulo+' '+detalleArticulo , stockBc )}
        }
    }
}
//repone stock de bodega local desde bodega central
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
    recalculoDatos(idArticulo)
}
//agrega articulo al pedido del dia
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
    console.log('Lista de pedidos eliminada del localStorage.');
}
//HABILITA DESHABILITA
let inputsHabilitados = false;
//habilita inputs
function habilitaInputs() {
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
