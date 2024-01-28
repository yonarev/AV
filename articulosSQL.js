// presenta USUARIO ACTIVO ARRIBA
presentaUsuarioActivo()
let idUsuario = idUsuarioActivo();
document.getElementById('idUsuario').value=idUsuario
//
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
            crearElemento("input", "", datos, articulo.articulo, false, `articulo${articulo.idArticulo}`, 'articulo');
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

















