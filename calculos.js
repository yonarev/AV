        //presenta al usuario activo
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
        // actualiza registro de transaccion
        function fechaAhora() {
            const date = new Date();
            const anioHoy = date.getFullYear();
            const mesHoy = ("0" + (date.getMonth() + 1)).slice(-2); // Agrega un 0 delante del mes si es menor que 10
            const diaDeHoy = ("0" + date.getDate()).slice(-2); // Agrega un 0 delante del día si es menor que 10
            const fechaHoy = anioHoy + mesHoy + diaDeHoy; // entrega fechaHoy global
            const fechaIng = `${diaDeHoy}/${mesHoy}/${anioHoy}` // en variable global fechaIng
            return fechaIng;
        }
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

        function agregaArticuloPedidoArticulo(idArticulo, codigoArticulo, nombreArticulo, stockBc) {
            // Obtener la lista actual de pedidos desde el localStorage
            let solicitudPedidoBodega = JSON.parse(localStorage.getItem('solicitudPedidoBodega')) || [];
            // Verificar si el artículo ya está en la lista por idArticulo o codArticulo
            const articuloExistente = solicitudPedidoBodega.find(item => item.idArticulo === idArticulo || item.codArticulo === codigoArticulo);
            if (articuloExistente) {
                // Si ya existe, puedes manejar la situación según tus necesidades (por ejemplo, mostrar un mensaje de error)
                alert("El artículo ya está en la lista de pedidos.");
                console.error("El artículo ya está en la lista de pedidos.");
                return
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
                let data = armarJSON() 
                transaccion(data,transAdd)
                alert("Artículo agregado exitosamente a la lista de pedidos.");
            }
        }
        //agrega en local storage a lista de pedidos
        function agregaArticuloPedido(idArticulo, codigoArticulo, nombreArticulo, stockBc) {
            // Obtener la lista actual de pedidos desde el localStorage
            let solicitudPedidoBodega = JSON.parse(localStorage.getItem('solicitudPedidoBodega')) || [];
            // Verificar si el artículo ya está en la lista por idArticulo o codArticulo
            const articuloExistente = solicitudPedidoBodega.find(item => item.idArticulo === idArticulo || item.codArticulo === codigoArticulo);
            if (articuloExistente) {
                // Si ya existe, puedes manejar la situación según tus necesidades (por ejemplo, mostrar un mensaje de error)
                alert("El artículo ya está en la lista de pedidos.");
                console.error("El artículo ya está en la lista de pedidos.");
                return
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
                transaccion(data,transAdd)
                alert("Artículo agregado exitosamente a la lista de pedidos.");
            }
        }
        //elimina de local storage
        function eliminaListaPedidos() {
            localStorage.removeItem('solicitudPedidoBodega');
            alert('Lista de pedidos eliminada del localStorage.');
            transAdd=transAdd+' & Se elimino la lista de pedidos'
            console.log('Lista de pedidos eliminada del localStorage.');
        }
        // ** genera resumen
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
        //REPO VITRINA EDICION ARTICULO
        function repoVitrinaArticulo(idArticulo) {
            const stockR = parseFloat(document.getElementById('stockRepo').value) || 0;
            const stockV = parseFloat(document.getElementById('stockVitrina').value) || 0;
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
                document.getElementById('stockVitrina').value = nuevoStockV;
                // Actualizar stockR
                const nuevoStockR = stockR - reposicion;
                document.getElementById('stockRepo').value = nuevoStockR;
            } else {
                // Mostrar confirmación para reponer lo que se puede
                const confirmacion = confirm(`La cantidad máxima a reponer es ${stockR}. ¿Desea reponer esa cantidad?`);
                if (confirmacion) {
                    // Reponer la cantidad máxima permitida
                    document.getElementById(`stockVitrina${idArticulo}`).value = stockV + stockR;
                    document.getElementById('stockRepo').value = 0;
                    transAdd=transAdd+' & posible reposicion de vitrina'
                } else {
                    return
                    // No se hace nada si el usuario cancela la confirmación
                }
            }
            // recalculoDatos(idArticulo)
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
        //repone el stock de reposicion
        function repoStockVitrinaArticulo(idArticulo) {
            const stockBl = parseFloat(document.getElementById('stockBodega').value) || 0;
            const stockR = parseFloat(document.getElementById('stockRepo').value) || 0;
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
                document.getElementById('stockRepo').value = nuevoStockR;
                document.getElementById('stockBodega').value = nuevoStockBl;
                transAdd=transAdd+' & posible reposicion de stock de vitrina'
        
            } else {
                // Indicar que no es posible y no hacer nada
                alert('La cantidad a dejar como stock de reposición en vitrina no puede ser mayor al stock en bodega.');
                return
            }
            recalculoDatos(idArticulo)
        }
        //calcula abastece bodega local y presenta
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
        
            // recalculoDatos(idArticulo)
        }
        //abastece bodega local
        function repoStockBodegaLocalArticulo(idArticulo) {
            const stockBcElement = document.getElementById('stockBodegaCentral');
            const stockBlElement = document.getElementById('stockBodega');
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
        
            // recalculoDatos(idArticulo)
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
                        transaccion(data,transAdd)
                    }
                }
            }
        }
        //agrega a lista de pedidos
        function solicitudRepoBodegaArticulo(idArticulo) {
            const stockBc = parseFloat(document.getElementById('stockBodegaCentral').value) || 0;
            const stockBl = parseFloat(document.getElementById('stockBodega').value) || 0;
            const stockR = parseFloat(document.getElementById('stockRepo').value) || 0;
            const stockC = parseFloat(document.getElementById('stockCritico').value) || 0;
            const codigoArticulo = document.getElementById('codigoArticulo').value
            const nombreArticulo = document.getElementById('articulo').value
            const detalleArticulo = document.getElementById('detalle').value
            // Validar que stockR sea menor o igual a stockC y que stockBl sea 0
            // if (stockR <= stockC && stockBl === 0) {
            if (stockBl === 0  && stockBc >= stockC) {
                let confirma = confirm('desea agregar el articulo a la lista de pedidos') 
                if (confirma===true){
                    transAdd=transAdd +' & solicitud de abastecimiento de bodega local'
                    agregaArticuloPedidoArticulo(idArticulo,codigoArticulo, nombreArticulo+' '+detalleArticulo , stockBc )
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
        //para impresion o envio
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
        //genera data json
        function armarJSON(idArticulo) {
            var data = {
                idUsuario: document.getElementById('idUsuario').value,
                // idArticulo: document.getElementById('idArticulo').value,
                idArticulo,
                codigoArticulo: document.getElementById('codigoArticulo').value,
                articulo: document.getElementById('articulo').value,
                detalle: document.getElementById('detalle').value,
                imagenArticulo: document.getElementById('imagenArticulo').src,
                archivo: document.getElementById('archivo').value,
                stockBodegaCentral: parseInt(document.getElementById('stockBodegaCentral').value),
                stockBodega: parseInt(document.getElementById('stockBodega').value),
                stockVitrina: parseInt(document.getElementById('stockVitrina').value),
                stockRepo: parseInt(document.getElementById('stockRepo').value),
                stockCritico: parseInt(document.getElementById('stockCritico').value)
            };
            console.log(data); // Puedes ver el objeto JSON en la consola para verificar
            return data;
            // // Ejemplo de cómo puedes usar la función armarJSON() para obtener el objeto JSON
            // var jsonData = armarJSON();
            // console.log(jsonData); 
        }

        function abrirVentanaAlCentro(pagina,width,height) {
            // Calcular la posición X e Y para centrar la ventana
            var left = (window.screen.availWidth - width) / 4;
            var top = 0;
        
            // Abrir una nueva ventana con las propiedades especificadas
            window.open(pagina, '_blank', 'width=' + width + ', height=' + height + ', left=' + left + ', top=' + top);
        }
        function abrirVentanaCentroDerecha(pagina,width,height) {
            // Calcular la posición X e Y para centrar la ventana
            var left = (window.screen.availWidth - width) / 2 +120;
            var top = 0;
        
            // Abrir una nueva ventana con las propiedades especificadas
            window.open(pagina, '_blank', 'width=' + width + ', height=' + height + ', left=' + left + ', top=' + top);
        }
        function abrirVentanaDerechaAbajo(pagina,width,height){
             // Calcular la posición X e Y para centrar la ventana
            // var left = (window.screen.availWidth - width) / 2;
            var left = (window.screen.availWidth - width)
            // var top = (window.screen.availHeight - height) / 2;
            var top = (window.screen.availHeight - height)
        
            // Abrir una nueva ventana con las propiedades especificadas
            window.open(pagina, '_blank', 'width=' + width + ', height=' + height + ', left=' + left + ', top=' + top);

        }
        function abrirVentanaDerechaArriba(pagina,width,height){
             // Calcular la posición X e Y para centrar la ventana
            // var left = (window.screen.availWidth - width) / 2;
            var left = (window.screen.availWidth - width)
            // var top = (window.screen.availHeight - height) / 2;
            var top = 0
            // Abrir una nueva ventana con las propiedades especificadas
            window.open(pagina, '_blank', 'width=' + width + ', height=' + height + ', left=' + left + ', top=' + top);

        }
        function abrirVentanaDerechaArriba(pagina,width,height){
             // Calcular la posición X e Y para centrar la ventana
            // var left = (window.screen.availWidth - width) / 2;
            var left = (window.screen.availWidth - width)
            // var top = (window.screen.availHeight - height) / 2;
            var top = 0
            // Abrir una nueva ventana con las propiedades especificadas
            window.open(pagina, '_blank', 'width=' + width + ', height=' + height + ', left=' + left + ', top=' + top);

        }
        function abrirVentanaIzquierdaArriba(pagina,width,height){
             // Calcular la posición X e Y para centrar la ventana
            // var left = (window.screen.availWidth - width) / 2;
            var left = 0
            // var top = (window.screen.availHeight - height) / 2;
            var top = 0
            // Abrir una nueva ventana con las propiedades especificadas
            window.open(pagina, '_blank', 'width=' + width + ', height=' + height + ', left=' + left + ', top=' + top);

        }