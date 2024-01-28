<?php
// Incluir el archivo de conexión a la base de datos
include './conexion.php';

// Verificar si se recibió un código de artículo válido
if(isset($_POST['codigoArticulo'])) {
    $codigoArticulo = $_POST['codigoArticulo'];

    try {
        // Preparar la consulta SQL para buscar el artículo por su código
        $consulta = $conexion->prepare("SELECT * FROM articulosv WHERE codigoArticulo = :codigo");
        $consulta->bindParam(':codigo', $codigoArticulo);
        $consulta->execute();

        // Obtener el resultado de la consulta como un array asociativo
        $resultado = $consulta->fetch(PDO::FETCH_ASSOC);

        // Comprobar si se encontró el artículo
        if($resultado) {
            // Devolver los datos del artículo en formato JSON
            echo json_encode($resultado);
        } else {
            // Si no se encontró el artículo, devolver un mensaje de error
            echo json_encode(array('error' => 'Artículo no encontrado'));
        }
    } catch (PDOException $e) {
        // Manejar errores de la consulta SQL
        echo json_encode(array('error' => 'Error al buscar artículo: ' . $e->getMessage()));
    }
} else {
    // Si no se recibió un código de artículo válido, devolver un mensaje de error
    echo json_encode(array('error' => 'Código de artículo no proporcionado'));
}
?>
