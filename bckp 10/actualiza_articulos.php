<?php
// Importar el archivo de conexión
include 'conexion.php';
// Obtener los datos del cuerpo de la solicitud
$data = json_decode(file_get_contents("php://input"));
// Verificar si se recibieron datos
if ($data) {
    try {
        // Preparar la sentencia SQL
        $sql = "UPDATE articulosv SET
                codigoArticulo = :codigo,
                articulo = :articulo,
                detalle = :detalle,
                stockBodegaCentral = :stockBc,
                stockBodega = :stockBl,
                stockVitrina = :stockV,
                stockRepo = :stockR,
                stockCritico = :stockC,
                idUsuario = :idUsuario
                WHERE idArticulo = :idArticulo";
        // Preparar la consulta
        $stmt = $conexion->prepare($sql);
        // Enlazar parámetros
        $stmt->bindParam(':codigo', $data->codigoArticulo, PDO::PARAM_INT);
        $stmt->bindParam(':articulo', $data->articulo, PDO::PARAM_STR);
        $stmt->bindParam(':detalle', $data->detalle, PDO::PARAM_STR);
        $stmt->bindParam(':stockBc', $data->stockBodegaCentral, PDO::PARAM_INT);
        $stmt->bindParam(':stockBl', $data->stockBodega, PDO::PARAM_INT);
        $stmt->bindParam(':stockV', $data->stockVitrina, PDO::PARAM_INT);
        $stmt->bindParam(':stockR', $data->stockRepo, PDO::PARAM_INT);
        $stmt->bindParam(':stockC', $data->stockCritico, PDO::PARAM_INT);
        $stmt->bindParam(':idArticulo', $data->idArticulo, PDO::PARAM_INT);
        $stmt->bindParam(':idUsuario', $data->idUsuario, PDO::PARAM_STR);
        // Ejecutar la consulta
        $stmt->execute();
        // Devolver una respuesta exitosa
        echo json_encode(['success' => true, 'message' => 'Datos actualizados correctamente']);
    } catch (PDOException $e) {
        // En caso de error, devolver un mensaje de error
        echo json_encode(['success' => false, 'message' => 'Error al actualizar datos']);
    }
} else {
    // En caso de no recibir datos, devolver un mensaje de error
    echo json_encode(['success' => false, 'message' => 'No se recibieron datos']);
}
?>
