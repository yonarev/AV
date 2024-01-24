<?php
require_once 'conexion.php';

$response = array();

if (isset($_POST['idUsuario'])) {
    $idUsuario = $_POST['idUsuario'];

    try {
        $query = "SELECT * FROM usuariosav WHERE idUsuario = :idUsuario";
        $stmt = $conexion->prepare($query); // Cambio aquí
        $stmt->bindValue(':idUsuario', $idUsuario, PDO::PARAM_STR);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Verificar si se obtuvieron resultados
        if ($result) {
            $response['data'] = $result;
        } else {
            $response['error'] = 'No se encontraron datos para el idUsuario proporcionado.';
        }
    } catch (PDOException $e) {
        $response['error'] = 'Error al recuperar datos: ' . $e->getMessage();
    }
} else {
    $response['error'] = 'El parámetro "idUsuario" no está presente en la solicitud.';
}

// Devolver la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
