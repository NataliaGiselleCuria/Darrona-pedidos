<?php 		
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'database.php';

$db = new DataBase();
$con = $db->conectar();

$directorioDescarga = "descargas/";
$uploadOk = 1;
$targetFile = $directorioDescarga . basename($_FILES["fileInput"]["name"]);
$fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));


    if ($fileType != "csv") {
        echo "Solo pueden subirse archivos en formato CSV.";
        $uploadOk = 0;
    } else{
        if ($uploadOk == 0) {
            echo '<i class="fa-solid fa-xmark"></i>Fallo en la carga del archivo.';
    
        } else { 
    
            $truncateQuery = "TRUNCATE TABLE productos";
            if ($con->query($truncateQuery)) {
                
            } else {
                echo "Error al limpiar la tabla: " . $con->errorInfo()[2];
                exit; // Stop execution if cleaning the table fails
            }
    
            // Get file details
            $fileName = $_FILES['fileInput']['name'];
            $tempFilePath = $_FILES['fileInput']['tmp_name'];
    
            // Move the uploaded file to the specified directory
            $targetFilePath = $directorioDescarga . $fileName;
            move_uploaded_file($tempFilePath, $targetFilePath);
    
            // Open and read the CSV file
            $csvFile = fopen($targetFilePath, 'r');
    
            // Skip the header row
            fgetcsv($csvFile);
    
            // Prepare the INSERT statement
            $sql4 = $con->prepare("INSERT INTO productos (`Código`, `Producto`, `Categoría`, `kG x Unidad`, `KG x Bulto`, `Precio x Unidad`, `Precio x Bulto`) VALUES (?, ?, ?, ?, ?, ?, ?)");
    
            // Loop through the CSV rows and insert into the database
            while (($data = fgetcsv($csvFile)) !== false) {
                $sql4->execute($data);
            }
    
            // Close the file and database connection
            fclose($csvFile);
            $con = null;
    
            echo '<i class="fa-solid fa-check"></i>Archivo importado exitosamente.';
        }
    }

    // Check if the file was uploaded

    





//

// $targetDir = "descargas/";
// $targetFile = $targetDir . basename($_FILES["fileInput"]["name"]);
// $uploadOk = 1;
// $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

// if ($fileType != "csv") {
//     echo "Only CSV files are allowed.";
//     $uploadOk = 0;
// }

// if ($uploadOk == 0) {
//     echo "File not uploaded.";
// } else {
//     $truncateQuery = "TRUNCATE TABLE productos";
//     if ($con->query($truncateQuery)) {
//         echo "Table cleaned successfully.";
//     } else {
//         echo "Error cleaning table: " . $con->errorInfo()[2];
//         exit; // Stop execution if cleaning the table fails
//     }

//     if (move_uploaded_file($_FILES["fileInput"]["tmp_name"], $targetFile)) {
//         // File uploaded successfully, now import data into MySQL
//         $csvFile = $targetFile;
//         $query = "LOAD DATA LOCAL INFILE '$csvFile' INTO TABLE productos FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\r\n' IGNORE 1 LINES";
        
//         if ($con->query($query)) {
//             echo "Data imported successfully.";
//         } else {
//             echo "Error importing data: " . $con->errorInfo()[2];
//         }
//     } else {
//         echo "Error uploading file.";
//     }
// }
    



?>