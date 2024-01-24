<?php
// Importar el archivo de conexión
include 'conexion.php';
try {
    // Preparar la sentencia SQL
    $sql = "SELECT * FROM articulosv";
    // $stmt = $pdo->query($sql);
    $stmt = $conexion->prepare($sql);
    $stmt->execute();
    // Obtener los resultados como un array asociativo
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // Devolver los resultados como JSON
    header('Content-Type: application/json');
    echo json_encode($resultados);
} catch (PDOException $e) {
    // En caso de error, devolver un mensaje de error
    echo json_encode(['error' => 'Error al obtener datos de la base de datos']);
}
?>
