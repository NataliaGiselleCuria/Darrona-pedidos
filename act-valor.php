<?php 		
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'database.php';

$db = new DataBase();
$con = $db->conectar();

        
$nuevoMonto = $_POST['nuevoMonto'];

$sql5 = "UPDATE `montominimo` SET `monto`='$nuevoMonto' WHERE `id`=1";

if ($con->query($sql5)) {
    echo '<i class="fa-solid fa-check"></i>';
} else {
    echo '<i class="fa-solid fa-xmark"></i> Error al actualizar: ' . $con->errorInfo()[2];
}



?>