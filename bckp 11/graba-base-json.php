<?php
include './conexion.php';

try {
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['idArchivo'])) {
        // Obtener el idArchivo del cuerpo de la solicitud
        $idArchivo = $_POST['idArchivo'];

        // Obtener datos de las tablas
        $stmt = $conexion->prepare("SELECT * FROM articulosv");
        $stmt->execute();
        $articulosv = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = $conexion->prepare("SELECT * FROM usuariosav");
        $stmt->execute();
        $usuariosav = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = $conexion->prepare("SELECT * FROM trasaarticulosv");
        $stmt->execute();
        $trasaarticulosv = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Crear un array con los datos
        $baseDatos = [
            'articulosv' => $articulosv,
            'usuariosav' => $usuariosav,
            'trasaarticulosv' => $trasaarticulosv
        ];

        // Concatenar el idArchivo al nombre del archivo JSON
        $nombreArchivo = "baseDatos_$idArchivo.json";

        // Guardar en archivo JSON
        file_put_contents($nombreArchivo, json_encode($baseDatos));

        echo "Base de datos guardada en archivo JSON: $nombreArchivo";
    } else {
        echo "Método no permitido o falta el parámetro idArchivo.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
