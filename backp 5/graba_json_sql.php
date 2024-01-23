<?php
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $jsonFile = file_get_contents("php://input");
        $data = json_decode($jsonFile, true);

        if ($data === null) {
            throw new Exception('Error al decodificar el archivo JSON.');
        }

        $stmt = $conexion->prepare("INSERT INTO articulosV (idArticulo, codigoArticulo, articulo, detalle, stockBodegaCentral, stockBodega, stockVitrina, stockRepo, stockCritico, archivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        foreach ($data as $item) {
            $stmt->execute([
                $item['idArticulo'],
                $item['codigoArticulo'],
                $item['articulo'],
                $item['detalle'],
                $item['stockBodegaCentral'],
                $item['stockBodega'],
                $item['stockVitrina'],
                $item['stockRepo'],
                $item['stockCritico'],
                $item['archivo']
            ]);
        }

        $response = ['success' => true];
    } catch (Exception $e) {
        $response = ['success' => false, 'error' => $e->getMessage()];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    http_response_code(405);
    echo 'Método no permitido';
}
?>
