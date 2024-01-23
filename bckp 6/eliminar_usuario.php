<?php

include 'conexion.php';

// Obtener datos del cuerpo de la solicitud (en formato JSON)
$data = json_decode(file_get_contents("php://input"), true);
// Verificar si se proporciona el ID del usuario
if (isset($data['idUsuario'])) {
    $idUsuario = $data['idUsuario'];

    // Realizar la eliminación del usuario
    $deleteUserQuery = $conexion->prepare("DELETE FROM usuariosav WHERE idUsuario = :idUsuario");
    $deleteUserQuery->bindParam(':idUsuario', $idUsuario);

    try {
        $deleteUserQuery->execute();
        echo json_encode(array("status" => "success", "message" => "Usuario eliminado correctamente."));
    } catch (PDOException $e) {
        echo json_encode(array("status" => "error", "message" => "Error al eliminar el usuario: " . $e->getMessage()));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Falta el ID del usuario en la solicitud."));
}

?>
