<?php
// Incluir el archivo de conexión a la base de datos
include './conexion.php';

try {
    // Preparar la consulta SQL para obtener los nombres de los artículos en orden alfabético
    $consulta = $conexion->query("SELECT articulo FROM articulosv ORDER BY articulo ASC");

    // Obtener el resultado de la consulta como un array asociativo
    $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

    // Devolver los nombres de los artículos en formato JSON
    echo json_encode($resultados);
} catch (PDOException $e) {
    // Manejar errores de la consulta SQL
    echo json_encode(array('error' => 'Error al obtener la lista de artículos: ' . $e->getMessage()));
}
?>

