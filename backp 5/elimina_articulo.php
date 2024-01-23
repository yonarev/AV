<?php
include 'conexion.php';

// Verificar si se proporciona el ID del artículo directamente
if (isset($_POST['idArticulo'])) {
    $idArticulo = $_POST['idArticulo'];

    // Realizar la eliminación del artículo
    $deleteArticleQuery = $conexion->prepare("DELETE FROM articulosV WHERE idArticulo = :idArticulo");
    $deleteArticleQuery->bindParam(':idArticulo', $idArticulo);

    try {
        $deleteArticleQuery->execute();
        echo "Artículo eliminado correctamente";
    } catch (PDOException $e) {
        echo "Error al eliminar el artículo: " . $e->getMessage();
    }
} else {
    echo "Falta el ID del artículo en la solicitud.";
}
?>
