<?php
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $codigoArticulo = $_POST['codigoArticulo'];

    $stmt_verificar_codigo = $conexion->prepare("SELECT COUNT(*) FROM tu_tabla WHERE codigoArticulo = ?");
    $stmt_verificar_codigo->bindParam(1, $codigoArticulo);
    $stmt_verificar_codigo->execute();

    $existe_codigo = $stmt_verificar_codigo->fetchColumn() > 0;

    echo json_encode(['existe_codigo' => $existe_codigo]);
} else {
    echo json_encode(['error' => 'Método de solicitud no válido.']);
}
?>
