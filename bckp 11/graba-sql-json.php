<!-- graba-sql-json.php -->
<?php
include 'conexion.php';

// Consulta SQL para obtener datos de la tabla 'articulosV'
$consulta = $conexion->prepare("SELECT * FROM articulosV");
$consulta->execute();
$articulos = $consulta->fetchAll(PDO::FETCH_ASSOC);

// Cerrar la conexión a la base de datos
$conexion = null;

// Convertir los datos a formato JSON
$jsonData = json_encode($articulos, JSON_PRETTY_PRINT);

// Guardar los datos en un archivo JSON
$file = 'articulosV-sql.json';
file_put_contents($file, $jsonData);

echo "<p>Los datos se han guardado en el archivo $file</p>";
?>
