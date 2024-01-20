<?php
if (isset($_GET['archivo'])) {
    $archivo = $_GET['archivo'];
    $ruta = './fotos/' . $archivo;

    $respuesta = array('existe' => file_exists($ruta));
    echo json_encode($respuesta);
} else {
    echo json_encode(array('existe' => false));
}
?>
