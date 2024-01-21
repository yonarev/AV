<?php
// Incluir el archivo de conexión
include 'conexion.php';
// Verificar si la solicitud es de tipo POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Recuperar los datos JSON del cuerpo de la solicitud
    $json_data = file_get_contents("php://input");
    // Decodificar los datos JSON a un array asociativo
    $datos_articulo = json_decode($json_data, true);
    // Verificar si se decodificaron correctamente los datos JSON
    if ($datos_articulo === null) {
        $response = [
            'success' => false,
            'message' => 'Error al decodificar los datos JSON.'
        ];
    } else {
        try {
            // Proceder con la inserción
            $stmt = $conexion->prepare("INSERT INTO articulosV (idArticulo, codigoArticulo, articulo, detalle, stockBodegaCentral, stockBodega, stockVitrina, stockRepo, stockCritico, archivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bindParam(1, $datos_articulo['idArticulo']);
            $stmt->bindParam(2, $datos_articulo['codigoArticulo']);
            $stmt->bindParam(3, $datos_articulo['articulo']);
            $stmt->bindParam(4, $datos_articulo['detalle']);
            $stmt->bindParam(5, $datos_articulo['stockBodegaCentral']);
            $stmt->bindParam(6, $datos_articulo['stockBodega']);
            $stmt->bindParam(7, $datos_articulo['stockVitrina']);
            $stmt->bindParam(8, $datos_articulo['stockRepo']);
            $stmt->bindParam(9, $datos_articulo['stockCritico']);
            $stmt->bindParam(10, $datos_articulo['archivo']);
            if ($stmt->execute()) {
                $response = [
                    'success' => true,
                    'message' => 'Datos insertados correctamente en la base de datos.'
                ];
            } else {
                // Capturar la excepción cuando el código de artículo es duplicado
                if ($conexion->errorInfo()[1] == 1062) {
                    $response = [
                        'success' => false,
                        'message' => 'El código de artículo ya existe en la tabla.'
                    ];
                } else {
                    $response = [
                        'success' => false,
                        'message' => 'Error al insertar datos en la base de datos.'
                    ];
                }
            }
        } catch (PDOException $e) {
            $response = [
                'success' => false,
                'message' => 'Error de conexión: ' . $e->getMessage()
            ];
        }
    }
} else {
    $response = [
        'success' => false,
        'message' => 'Método de solicitud no válido.'
    ];
}
// Devolver la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
