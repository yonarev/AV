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

