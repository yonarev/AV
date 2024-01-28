<?php
include './conexion.php';

try {
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['tabla'])) {
        $nombreTabla = $_POST['tabla'];
        // Obtener los datos de la tabla especificada
        $stmt = $conexion->prepare("SELECT * FROM $nombreTabla");
        $stmt->execute();
        $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Devolver los datos como JSON
        header('Content-Type: application/json');
        echo json_encode($datos);
    } else {
        echo "Método no permitido o falta el parámetro tabla.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
