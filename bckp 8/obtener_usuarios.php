<?php

include './conexion.php';

// Obtener datos de la tabla
$usersListQuery = $conexion->query("SELECT * FROM usuariosav");
$usuarios = $usersListQuery->fetchAll(PDO::FETCH_ASSOC);

// Enviar la respuesta en formato JSON
echo json_encode(array("usuarios" => $usuarios));

?>
