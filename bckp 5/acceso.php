<?php
// Incluir el archivo de conexión
include './conexion.php';

// Obtener datos del cuerpo de la solicitud en formato JSON
$inputJSON = file_get_contents("php://input");
$data = json_decode($inputJSON);

// Verificar si se decodificó correctamente el JSON
if ($data === null) {
    // Manejar error en el JSON, si es necesario
    header('Content-Type: application/json');
    echo json_encode(array('error' => 'Error en el formato JSON.'));
    exit;
}

// Obtener datos del objeto JSON
$usuario = $data->usuario;
$psw = $data->psw;

// Consultar en la tabla 'usuariosav'
$sql = "SELECT * FROM usuariosav WHERE usuario = :usuario AND psw = :psw";
$stmt = $conexion->prepare($sql);
$stmt->bindParam(':usuario', $usuario, PDO::PARAM_STR);
$stmt->bindParam(':psw', $psw, PDO::PARAM_STR);

try {
    $stmt->execute();
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verificar si la contraseña es correcta
    if ($resultado) {
        // Retornar el resultado como JSON
        header('Content-Type: application/json');
        echo json_encode($resultado);
    } else {
        // Contraseña incorrecta
        header('Content-Type: application/json');
        echo json_encode(array('error' => 'Contraseña incorrecta.'));
    }
} catch (PDOException $e) {
    // En caso de error, devolver un mensaje de error como JSON
    header('Content-Type: application/json');
    echo json_encode(array('error' => $e->getMessage()));
}
?>
