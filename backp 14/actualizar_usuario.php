<?php

include 'conexion.php';

// Obtener datos del cuerpo de la solicitud (en formato JSON)
$data = json_decode(file_get_contents("php://input"), true);

// Verificar si se proporciona el ID del usuario
if (isset($data['idUsuario'])) {
    $idUsuario = $data['idUsuario'];
    $nombre = $data['nombre'];
    $usuario = $data['usuario'];
    $psw = $data['psw'];
    $tipo = $data['tipo'];
    $detalle = $data['detalle'];

    // Realizar la actualización del usuario
    $updateUserQuery = $conexion->prepare("UPDATE usuariosav SET nombre = :nombre, usuario = :usuario, psw = :psw, tipo = :tipo, detalle = :detalle WHERE idUsuario = :idUsuario");
    $updateUserQuery->bindParam(':idUsuario', $idUsuario);
    $updateUserQuery->bindParam(':nombre', $nombre);
    $updateUserQuery->bindParam(':usuario', $usuario);
    $updateUserQuery->bindParam(':psw', $psw);
    $updateUserQuery->bindParam(':tipo', $tipo);
    $updateUserQuery->bindParam(':detalle', $detalle);

    try {
        $updateUserQuery->execute();
        echo json_encode(array("status" => "success", "message" => "Usuario actualizado correctamente."));
    } catch (PDOException $e) {
        echo json_encode(array("status" => "error", "message" => "Error al actualizar el usuario: " . $e->getMessage()));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Falta el ID del usuario en la solicitud."));
}

?>
