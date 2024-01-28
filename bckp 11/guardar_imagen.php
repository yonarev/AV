<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

try {
    // Ruta donde deseas guardar las imágenes
    $ruta = "./fotos/";
    
    // Nombre de la imagen (puedes personalizar el nombre como desees)
    $idArticulo = $_POST['idArticulo'];
    $nombreImagen = "foto{$idArticulo}.jpg";
    
    // Obtener la imagen en formato binario desde la solicitud POST
    $imagen = file_get_contents($_FILES['imagen']['tmp_name']);
    
    // Guardar la imagen en la carpeta especificada
    file_put_contents($ruta . $nombreImagen, $imagen);
    
    // Respuesta JSON para el cliente
    echo json_encode(['mensaje' => 'Imagen guardada correctamente en el servidor.']);
} catch (Exception $e) {
    echo json_encode(['error' => 'Error al procesar la solicitud.']);
}
?>
