<?php 		
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'database.php';

$db = new DataBase();
$con = $db->conectar();


$targetDir = "descargas/";
$targetFile = $targetDir . basename($_FILES["fileInput"]["name"]);
$uploadOk = 1;
$fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

if ($fileType != "csv") {
    echo "Only CSV files are allowed.";
    $uploadOk = 0;
}

if ($uploadOk == 0) {
    echo "File not uploaded.";
} else {
    $truncateQuery = "TRUNCATE TABLE productos";
    if ($con->query($truncateQuery)) {
        echo "Table cleaned successfully.";
    } else {
        echo "Error cleaning table: " . $con->errorInfo()[2];
        exit; // Stop execution if cleaning the table fails
    }

    if (move_uploaded_file($_FILES["fileInput"]["tmp_name"], $targetFile)) {
        // File uploaded successfully, now import data into MySQL
        $csvFile = $targetFile;
        $query = "LOAD DATA LOCAL INFILE '$csvFile' INTO TABLE productos FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\r\n' IGNORE 1 LINES";
        
        if ($con->query($query)) {
            echo "Data imported successfully.";
        } else {
            echo "Error importing data: " . $con->errorInfo()[2];
        }
    } else {
        echo "Error uploading file.";
    }
}
    



?>