<?php
include 'conexion.php';

// Obtener el cuerpo de la solicitud
$jsonData = file_get_contents("php://input");
// Decodificar el JSON
$dataTrans = json_decode($jsonData, true);
// Preparar la consulta SQL
$sql = "INSERT INTO trasaarticulosv (idTrans, fecha, hora, idUsuario, idArticulo, codigoArticulo, articulo, detalle, stockBodegaCentral, stockBodega, stockVitrina, stockRepo, stockCritico, archivo, transaccion) VALUES (:idTrans, :fecha, :hora, :idUsuario, :idArticulo, :codigoArticulo, :articulo, :detalle, :stockBodegaCentral, :stockBodega, :stockVitrina, :stockRepo, :stockCritico, :archivo, :transaccion)";

// Preparar la declaración SQL
$stmt = $conexion->prepare($sql);

// Asignar valores a los parámetros
$stmt->bindParam(':idTrans', $dataTrans['idTrans']);
$stmt->bindParam(':fecha', $dataTrans['fecha']);
$stmt->bindParam(':hora', $dataTrans['hora']);
$stmt->bindParam(':idUsuario', $dataTrans['idUsuario']);
$stmt->bindParam(':idArticulo', $dataTrans['idArticulo']);
$stmt->bindParam(':codigoArticulo', $dataTrans['codigoArticulo']);
$stmt->bindParam(':articulo', $dataTrans['articulo']);
$stmt->bindParam(':detalle', $dataTrans['detalle']);
$stmt->bindParam(':stockBodegaCentral', $dataTrans['stockBodegaCentral']);
$stmt->bindParam(':stockBodega', $dataTrans['stockBodega']);
$stmt->bindParam(':stockVitrina', $dataTrans['stockVitrina']);
$stmt->bindParam(':stockRepo', $dataTrans['stockRepo']);
$stmt->bindParam(':stockCritico', $dataTrans['stockCritico']);
$stmt->bindParam(':archivo', $dataTrans['archivo']);
$stmt->bindParam(':transaccion', $dataTrans['transaccion']);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode(array('message' => 'Registro insertado con éxito.'));
} else {
    echo json_encode(array('message' => 'Error al insertar el registro.'));
}

?>
