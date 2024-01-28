<?php
include './conexion.php';

try {
    // Consulta SQL para obtener todos los registros de 'trasaarticulosv'
    $query = "SELECT * FROM trasaarticulosv";
    $statement = $conexion->query($query);

    // Obtener todos los resultados como un array asociativo
    $resultados = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Devolver resultados en formato JSON
    header('Content-Type: application/json');
    echo json_encode($resultados);
} catch (PDOException $e) {
    // Manejar errores de la base de datos
    echo "Error: " . $e->getMessage();
}
// No es necesario cerrar la conexión, ya que PHP lo hará automáticamente al finalizar el script
?>
