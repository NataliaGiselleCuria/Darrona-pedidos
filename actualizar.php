<?php 	
error_reporting(E_ALL);

require 'database.php';

$db = new DataBase();
$con = $db->conectar();

$nuevoUsuario = $_POST['nuevoUsuario'];
$nuevaClave = $_POST['nuevaClave'];

$sql4 = "UPDATE `login` SET `usuario`='$nuevoUsuario', `clave`= sha2('$nuevaClave',256) WHERE `id`=1";

if ($con->query($sql4)) {
    echo '<i class="fa-solid fa-check"></i>';
} else {
    echo '<i class="fa-solid fa-xmark"></i> Error al actualizar: ' . $con->errorInfo()[2];
}

?>