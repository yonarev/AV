<?php
include './conexion.php';

try {
    // Recibir el contenido del archivo JSON desde la solicitud POST
    $json = file_get_contents('php://input');
    
    // Decodificar el JSON a un array asociativo
    $baseDatos = json_decode($json, true);
    
    // Insertar datos en las tablas correspondientes
    foreach ($baseDatos as $tabla => $datos) {
        $stmt = $conexion->prepare("TRUNCATE TABLE $tabla"); // Vaciar la tabla antes de insertar nuevos datos
        $stmt->execute();
        
        foreach ($datos as $dato) {
            // Construir la consulta de inserción dinámicamente
            $columnas = implode(', ', array_keys($dato));
            $valores = implode(', ', array_fill(0, count($dato), '?'));
            $sql = "INSERT INTO $tabla ($columnas) VALUES ($valores)";
            
            $stmt = $conexion->prepare($sql);
            $stmt->execute(array_values($dato));
        }
    }
    
    echo "Base de datos guardada en la base SQL.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
