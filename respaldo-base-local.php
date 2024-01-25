<?php
// Incluir el archivo de conexión a la base de datos
include 'conexion.php';

try {
    // Obtener los datos de las tablas de la base de datos
    $datos = array();
    // Consulta para la tabla 'articulosv'
    $stmt_articulosv = $conexion->query("SELECT * FROM articulosv");
    $datos['articulosv'] = $stmt_articulosv->fetchAll(PDO::FETCH_ASSOC);

    // Consulta para la tabla 'usuariosav'
    $stmt_usuariosav = $conexion->query("SELECT * FROM usuariosav");
    $datos['usuariosav'] = $stmt_usuariosav->fetchAll(PDO::FETCH_ASSOC);

    // Consulta para la tabla 'trasaarticulosv'
    $stmt_trasaarticulosv = $conexion->query("SELECT * FROM trasaarticulosv");
    $datos['trasaarticulosv'] = $stmt_trasaarticulosv->fetchAll(PDO::FETCH_ASSOC);

    // Convertir los datos a formato JSON
    $datos_json = json_encode($datos);

    // Enviar los datos JSON de vuelta al cliente
    echo $datos_json;
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
