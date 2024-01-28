<?php

include './conexion.php';

// Obtener datos del cuerpo de la solicitud (en formato JSON)
$data = json_decode(file_get_contents("php://input"), true);

// Verificar si todos los campos requeridos están presentes
if (
    isset($data['idUsuario'], $data['nombre'], $data['usuario'], $data['psw'], $data['tipo'], $data['detalle'])
) {
    $idUsuario = $data['idUsuario'];
    $nombre = $data['nombre'];
    $usuario = $data['usuario'];
    $psw = $data['psw'];
    $tipo = $data['tipo'];
    $detalle = $data['detalle'];

    // Verificar si el usuario ya existe
    $checkUserQuery = $conexion->prepare("SELECT * FROM usuariosav WHERE idUsuario = :idUsuario OR nombre = :nombre OR usuario = :usuario");
    $checkUserQuery->bindParam(':idUsuario', $idUsuario);
    $checkUserQuery->bindParam(':nombre', $nombre);
    $checkUserQuery->bindParam(':usuario', $usuario);
    $checkUserQuery->execute();

    if ($checkUserQuery->rowCount() > 0) {
        echo json_encode(array("status" => "error", "message" => "El usuario con ID, nombre o usuario ya existe."));
    } else {
        // Insertar nuevo usuario
        $insertUserQuery = $conexion->prepare("INSERT INTO usuariosav (idUsuario, nombre, usuario, psw, tipo, detalle) VALUES (:idUsuario, :nombre, :usuario, :psw, :tipo, :detalle)");
        $insertUserQuery->bindParam(':idUsuario', $idUsuario);
        $insertUserQuery->bindParam(':nombre', $nombre);
        $insertUserQuery->bindParam(':usuario', $usuario);
        $insertUserQuery->bindParam(':psw', $psw);
        $insertUserQuery->bindParam(':tipo', $tipo);
        $insertUserQuery->bindParam(':detalle', $detalle);

        try {
            $insertUserQuery->execute();

            // Obtener la lista actualizada de usuarios
            $usersListQuery = $conexion->query("SELECT * FROM usuariosav");
            $usuarios = $usersListQuery->fetchAll(PDO::FETCH_ASSOC);

            // Enviar respuesta JSON con éxito y la lista de usuarios
            echo json_encode(array("status" => "success", "message" => "Usuario agregado correctamente.", "usuarios" => $usuarios));
        } catch (PDOException $e) {
            echo json_encode(array("status" => "error", "message" => "Error al agregar el usuario: " . $e->getMessage()));
        }
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Faltan campos obligatorios en la solicitud."));
}

?>
