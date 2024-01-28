<?php
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $idArticulo = $_POST['idArticulo'];

    $stmt_verificar_id = $conexion->prepare("SELECT COUNT(*) FROM tu_tabla WHERE idArticulo = ?");
    $stmt_verificar_id->bindParam(1, $idArticulo);
    $stmt_verificar_id->execute();

    $existe_id = $stmt_verificar_id->fetchColumn() > 0;

    echo json_encode(['existe_id' => $existe_id]);
} else {
    echo json_encode(['error' => 'Método de solicitud no válido.']);
}
?>
