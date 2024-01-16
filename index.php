<?php
ini_set('display_errors', '1'); 	
ini_set('display_startup_errors', '1'); 	
error_reporting(E_ALL);

require 'database.php';

$db = new DataBase();
$con = $db->conectar();

$sql = $con->prepare("SELECT * FROM productos");
$sql->execute();
$resultado = $sql->fetchAll(PDO::FETCH_ASSOC);

//$sql1 = $con->prepare("SELECT * FROM information_schema.columns WHERE table_schema = 'if0_35619953_darrona' AND table_name = 'productos'"); 
$sql1 = $con->prepare("SELECT * FROM information_schema.columns WHERE table_schema = 'darrona' AND table_name = 'productos'");
$sql1->execute();
$cabecera = $sql1->fetchAll(PDO::FETCH_ASSOC);

$sql2 = $con->prepare("SELECT distinct CATEGORÍA FROM productos");
$sql2->execute();
$categorias = $sql2->fetchAll(PDO::FETCH_ASSOC);

$sql3 = $con->prepare("SELECT * FROM login");
$sql3->execute();
$log = $sql3->fetchAll(PDO::FETCH_ASSOC);

$sql6 = $con->prepare("SELECT * FROM montominimo");
$sql6->execute();
$monto = $sql6->fetchAll(PDO::FETCH_ASSOC);

print_r($monto);

$categoria = null;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,300;0,400;0,500;1,200&display=swap;family=Montserrat:wght@100;200;300;400&amp;family=Nunito:wght@200;300;400;500&family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet">
    <title>Darrona Alimentos Naturales</title>
    <meta name="description" content="Hacé tu pedido de productos de dietética naturales en Distribuidora Darrona">
    <link rel="icon" type="image/x-icon" href="img/Darrona png.png" alt="Logo Distribuidora de productos naturales dietéticas Darrona">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/270cc5acdb.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>
</head>
<body>
    <header>
        <nav>
            <div class="banner">
                <img src="img/Darrona vertical.png" class="logo" alt="Logo Distribuidora de productos naturales dietéticas Darrona">
                <div class="titulo">
                    <h1 class="t1">Pedidos Dietética Darrona</h1>
                    <h2 class="t2">LISTA DE PRECIOS MAYORISTA</h2>
                    <p class="t3">COMPRA MINIMA $</p><p id="prec-minimo t3"><?php echo $monto[0]['monto']?></p>
                </div>
            </div>
        </nav>
        <div class="nav-pedido">
            <div class="cont-pedido">
                <span class="txt">
                    <p>RESUMEN DE PEDIDO</p>
                </span>
                <span class="valor">
                    <p>TOTAL</p>
                    <p class="total"></p>
                </span>
                <span class="btn">
                    <button class="bt volver" onclick="categoria('TODOS LOS PRODUCTOS')">VOLVER</button>
                    <button class="bt ver-resumen" onclick="verPedido()">VER PEDIDO</button>
                    
                    <button class="bt fin" onclick="abrirVentana(), verPedido()" >FINALIZAR</button>
                    <button class="bt cerrar" onclick="cerrar()">CERRAR</button>
                </span>
            </div>
            <section class="info-precio">
                <div class="info-cont">
                    <span>
                        <p>Los precios de esta lista pueden variar sin previo aviso</p>
                        <p><i class="fa-solid fa-triangle-exclamation"></i> PRECIOS SIN IVA</p>
                    </span>
                    <span>
                        <p>- Pago en efectivo: Precio de lista.</p>
                        <p>- Pago por deposito bancario, transferencia bacaria o mercadopago: recargo 10%</p>
                    </span>
                </div>
            </section>
            <section class="enviar-pedido">
                <div class="enviar-cont">
                    <form>
                        <div class="fila">
                            <span class="label">
                                <label for="nombre">Nombre<p class="asterisco"> * </p>:</label>
                                <input type="text" id="nombre" name="nombre" class="form-control" requireda>
                            </span>
                            <span class="label">
                                <label for="apellido">Apellido<p class="asterisco"> * </p>:</label>
                                <input type="text" id="apellido" name="apellido" class="form-control" required>
                            </span>
                        </div>
                        <div class="fila">
                            <span class="label">
                                <label for="horario">Horarios<p class="asterisco"> * </p>:</label>
                                <input type="text" id="horario" name="horario" class="form-control" required>
                            </span>
                            <span class="label">
                                <label for="telefono">Teléfono<p class="asterisco"> * </p>:</label>
                                <input type="tel" id="telefono" name="telefono" class="form-control" required>
                            </span>
                        </div>
                    </form>
                    <div class="fila btn">
                        <label><input class="check-pedido" type="checkbox" id="check">Revisaste tu pedido? Una vez enviado no podrá modificarse.</label>
                        <span class="btn e">
                            <button class="bt enviar" onclick="verificarError()">ENVIAR</button>
                        </span>
                    </div>
                    <p class="error"><i class="fa-solid fa-triangle-exclamation"></i> Por favor ingrese todos los datos y confirme haber revisado el pedido.</p>
                </div>
            </section>
        </div>
        <hr>
    </header>
    <section id="inicio"></section>
    <main>
        <a href="#inicio" class="inicio"><i class="fa-solid fa-arrow-up"></i></a>
        <a href="https://wa.me/5492215952475?text=Hola%20Darrona!%20" class="whatsapp" target="_blank"> <i class="fa fa-whatsapp whatsapp-icon"></i></a>
        <section class="categorias">
            <div class="cat-buscador">
                <p class="cat">CATEGORIAS</p>
                <div class="buscador">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input class="input-buscador">
                </div>
            </div>
            <div class="list-cat">
                <ul class="ul-cat">
                    <li class="prod-li"><a onclick="categoria(this)">TODOS LOS PRODUCTOS</a></li>
                    <?php
                    foreach ($categorias as $cat) {
                    ?> <li><a onclick="categoria(this)"><h3><?php echo $cat['CATEGORÍA']; ?></h3></a></li>
                    <?php
                    }
                    ?>
                </ul>
            </div>
        </section>
        <section class="tabla">
            <div class="titulo-cat">
                <p class="cat-selec">TODOS LOS PRODUCTOS</p>
                <!-- <p class="alert-pedido">ingrese su pedido</p> -->
            </div>
            <table class="cont-t">
                <tr class="productos">
                    <?php
                    foreach ($cabecera as $column) {
                        if ($column['COLUMN_NAME'] == "Categoría") {
                        } else if ($column['COLUMN_NAME'] == "KG x Unidad" || $column['COLUMN_NAME'] == "KG x Bulto" || $column['COLUMN_NAME'] == "Precio x Unidad" || $column['COLUMN_NAME'] == "Precio x Bulto") {
                    ?> <th class="nombre_column colum-min colum-cen"><?php echo $column['COLUMN_NAME']; ?></th> 
                    <?php
                        } else if ($column['COLUMN_NAME'] == "Código") {
                            ?> <th class="nombre_column colum-min"><?php echo $column['COLUMN_NAME']; ?></th> <?php
                        } else if ($column['COLUMN_NAME'] == "Producto") {
                        ?> <th class="nombre_column prod"><?php echo $column['COLUMN_NAME']; ?></th> <?php
                        } else {
                    ?> 
                    <th class="nombre_column"><?php echo $column['COLUMN_NAME']; ?></th> 
                    <?php
                            }
                        }
                    ?>
                    <th class="cab cab-pres colum-cen">Unidad | Bulto</th>
                    <th class="cab cab-pedido colum-cen">Cantidad x presentacion</th>
                    <th class="cab cab-total colum-cen">Precio Total x Producto</th>
                </tr>
                <?php
                foreach ($resultado as $producto) {
                    $codigo = $producto['Código'];
                    $nombre = $producto['Producto'];
                    $categoria = $producto['Categoría'];
                    $unidad = $producto['KG x Unidad'];
                    $bulto = $producto['KG x Bulto'];
                    $pecioUnidad = $producto['Precio x Unidad'];
                    $precioBulto = $producto['Precio x Bulto'];
                ?>
                    <tr class="li-prod"> 
                        <td class="hidden"><?php echo $categoria ?></td>
                        <td class="smaller"><?php echo $codigo ?></td>
                        <td class="prod-nom"><?php echo $nombre ?></td>
                        <td class="colum-cen"><?php echo $unidad ?></td>
                        <td class="colum-cen"><?php echo $bulto ?></td>
                        <td class="colum-cen"><?php echo $pecioUnidad ?></td>
                        <td class="colum-cen"><?php echo $precioBulto ?></td>
                        <td class="radio"><input type="radio" class="tipo-pres" value="uni" name="tipo-pres-<?php echo $codigo ?>" onclick="radio(this)"><input type="radio" class="tipo-pres" value="bult" name="tipo-pres-<?php echo $codigo ?>" onclick="radio(this)"></td>
                        <td class="colum-cen cant-prod-pedido"><input class="cant-pedido" type="number" min="0" oninput="validity.valid||(value='');"></td>
                        <td class="colum-cen total-prod-pedido"></td>
                        <td class="hidden prec-radio"></td>
                    </tr>
                <?php } ?>
            </table>
            <table class="cont-t pedido-final">   
            <tr class="productos">
                    <?php
                    foreach ($cabecera as $column) {
                        if ($column['COLUMN_NAME'] == "Categoría") {
                        } else if ($column['COLUMN_NAME'] == "KG x Unidad" || $column['COLUMN_NAME'] == "KG x Bulto" || $column['COLUMN_NAME'] == "Precio x Unidad" || $column['COLUMN_NAME'] == "Precio x Bulto") {
                    ?> <th class="nombre_column colum-min colum-cen"><?php echo $column['COLUMN_NAME']; ?></th> 
                    <?php
                        } else if ($column['COLUMN_NAME'] == "Código") {
                            ?> <th class="nombre_column colum-min"><?php echo $column['COLUMN_NAME']; ?></th> <?php
                        } else if ($column['COLUMN_NAME'] == "Producto") {
                        ?> <th class="nombre_column prod"><?php echo $column['COLUMN_NAME']; ?></th> <?php
                        } else {
                    ?> 
                    <th class="nombre_column"><?php echo $column['COLUMN_NAME']; ?></th> 
                    <?php
                            }
                        }
                    ?>
                    <th class="cab cab-pres colum-cen">Unidad | Bulto</th>
                    <th class="cab cab-pedido colum-cen">Cantidad x presentacion</th>
                    <th class="cab cab-total colum-cen">Precio Total x Producto</th>
                </tr>
            </table>
            <table class="cont-t tablaExel hidden">
                <tr><td>Nombre</td></tr>
                <tr><td>Apellido</td></tr>
                <tr><td>Horarios</td></tr>
                <tr><td>Telefono</td></tr>
                <tr><td>Fecha</td></tr>
                <tr><td></td></tr>
                <tr>
                    <td>Código</td>
                    <td>Cantidad x producto</td>
                    <td>Producto</td>
                </tr>   
            </table>
        </section>
        <section class="login">
            <div class="popupbody">
                <div class= cerrar-log><i class="fa-solid fa-xmark"></i></div>
                <div class=login-cont>
                    <p class="titulo-log">DARRONA</p>
                    <p class="sub-log">HERRAMIENTA DE ADMINISTRADOR</p>
                    <span class="label">
                        <label for="usuario">Usuario<p class="asterisco"> * </p>:</label>
                        <input type="text" id="usuario" name="usuario" class="form-control" required>
                    </span>
                    <span class="label">
                        <label for="clave">Contraseña<p class="asterisco"> * </p>:</label>
                        <input type="password" id="clave" name="clave" class="form-control" required>
                    </span>
                    <span class="label"><p class="log-error"></p></span>
                    <p class="ingresar"><a class="adm">INGRESAR</a></p>
                </div>
                <div class="opc-adm opc-cont">
                    <p class="titulo-log">BIENVENIDO</p>
                    <span class="opc-list">
                        <button id="act-list" class="opc-adm opc-bt">ACTUALIZAR LISTADO DE PRODUCTOS</button>
                        <button id="act-monto" class="opc-adm opc-bt">ACTUALIZAR VALOR MINIMO DE COMPRA</button>
                        <button id="act-log" class="opc-adm opc-bt">CAMBIAR USUARIO O CONTRASEÑA</button>
                    </span>
                </div>
                <div class="act-list">
                    <p class="act-list titulo-log">Actualizar Lista</p>
                    <p> </p>
                    <form class="form-upload" action="upload.php" method="post" enctype="multipart/form-data" target="_blank" required>
                        <label for="fileInput">Selecciona un archivo CSV:</label>
                        <input class="selec-arch" type="file" name="fileInput" id="fileInput" accept=".csv" required>
                        <button onclick="uploadCsv()">IMPORTAR</button>
                        <span class="msj-estado"></span>
                    </form>
                    <button class="act-list volver-adm" onclick="volver(this)">VOLVER</button>
                </div>
                <div class="act-monto">
                    <p class="act-monto titulo-log">Actializar Monto Minimo</p>
                    <p> Valor actual del minimo de compra:</p>
                    <p id="prec-minimo"><?php echo $monto[0]['monto']?></p>
                    <form action="act-valor.php" method="post">
                        <label for="nuevo-monto">Ingrese el nuevo monto minimo:</label>
                        <input type="number" name="nuevoMonto" id="nuevo-monto" target="_blank" required>   
                        <button class="act-btn" onclick="actMontoMinimo()">ACTUALIZAR</button>
                        <span class="msj-estado-valor"></span>
                    </form>
                    <button class="act-monto volver-adm" onclick="volver(this)">VOLVER</button>
                </div>
                <div class="act-log">
                    <p class="act-log titulo-log">Actualizar us o cont</p>
                    <p> Ingrese Usuario y contraseña actual:</p>
                    <form action="actualizar.php" method="post" required>
                        <span><input type="text" id="actualUsuario" name="actualUsuario" class="form-control" placeholder="Usuario actual" required><input type="password" id="actualClave" name="actualClave" class="form-control" placeholder="Clave actual" required></span>
                        <p> Ingrese nuevo Usuario y/o contraseña:</p>
                        <span><input type="text" id="nuevoUsuario" name="nuevoUsuario" class="form-control" placeholder="Nuevo Usuario"><input type="password" id="nuevaClave" name="nuevaClave" class="form-control" placeholder="Nueva Clave" required></span>
                        <span class="msj-estado-act"></span>
                    </form>
                    <button class="act-btn" onclick="actUsCon()">ACTUALIZAR</button>
                    <button class="act-log volver-adm" onclick="volver(this)">VOLVER</button>
                </div>
            </div>
        </section>
    </main>
</body>
</html>
<script src="https://cdn.sheetjs.com/xlsx-0.19.3/package/dist/xlsx.full.min.js"></script>
<script src="jquery-3.7.1.min.js"></script>
<script src="código.js"></script>
<script>

    window.addEventListener('beforeunload', function (event) {
        event.preventDefault();
    });

    // secciones adm
    let logCont = document.querySelector('.login-cont');
    let opcCont = document.querySelectorAll('.opc-adm');
    let ingresar = document.querySelector('.ingresar');
    let errorLog = document.querySelector('.log-error');

    function sha256(message) {
        const hash = CryptoJS.SHA256(message);
        return hash.toString(CryptoJS.enc.Hex);
    }

    ingresar.addEventListener("click", () =>{
        const hash = sha256(clave.value);

        if(usuario.value == '<?php echo $log[0]['usuario'] ?>' && hash == '<?php echo $log[0]['clave'] ?>'){
            logCont.style.display = 'none';

            for (let i = 0; i < opcCont.length; i++){
                opcCont[i].style.display = 'flex';
            }
            
        }else{
            errorLog.innerHTML= "Usuario o clave incorrecta"
        }
    });

    //Subir archivo CSV

    function uploadCsv(){

        msjEstado = document.querySelector('.msj-estado');

        event.preventDefault();

        var fileInput = document.querySelector('.selec-arch');
        var file = fileInput.files[0];

        if (file) {

            var formData = new FormData();
            formData.append('fileInput', file);

            var xhr0 = new XMLHttpRequest();
            xhr0.open('POST', 'upload.php', true);

            xhr0.onreadystatechange = function () {
            
                if (xhr0.status == 200) {
                    msjEstado.innerHTML = xhr0.responseText;
                    
                }else if (xhr0.readyState == 4 ){
                    msjEstado.innerHTML = xhr0.responseText;
                }
            };

            xhr0.send(formData);

            var interval = setInterval(function () {
                if (xhr0.readyState === 1) {
                    msjEstado.innerHTML='<div class="loader"></div><p>Esto puede demorar unos segundos...</p>';
                }
            }, 1000);

            setTimeout(function () {
                clearInterval(interval);
            }, 10000);

        } else {
            msjEstado.innerHTML = 'Seleccione un archivo compatible.';
        }
    }

    //actualizar clave / usuario

    function actUsCon(){

        msjEstado = document.querySelector('.msj-estado-act');

        let usuarioActual = document.querySelector('#actualUsuario');
        let claveActual = document.querySelector('#actualClave');

        const hash = sha256(clave.value);

        if(usuario.value == '<?php echo $log[0]['usuario'] ?>' && hash == '<?php echo $log[0]['clave'] ?>'){

            let usuarioNuevo = document.querySelector('#nuevoUsuario').value;
            let claveNueva = document.querySelector('#nuevaClave').value;

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "actualizar.php", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            var datos = "nuevoUsuario=" + usuarioNuevo + "&nuevaClave=" + claveNueva;

            xhr.onreadystatechange = function () {
            
            if (xhr.status == 200) {
                msjEstado.innerHTML = xhr.responseText ;
                
            }else if (xhr.readyState == 4 ){
                msjEstado.innerHTML = xhr.responseText ;
            }
        };

            xhr.send(datos);

        }
    }

    //actualizar monto

    function actMontoMinimo(){

        msjEstado = document.querySelector('.msj-estado-valor');

        let nuevoMonto = document.querySelector('#nuevo-monto').value;

        event.preventDefault();

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "act-valor.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


        var datos = "nuevoMonto=" + nuevoMonto

        xhr.onreadystatechange = function () {

            if (xhr.status == 200) {
                msjEstado.innerHTML = xhr.responseText ;
                
            }else if (xhr.readyState == 4 ){
                msjEstado.innerHTML = xhr.responseText ;
            }
        }

        xhr.send(datos);

        $( "#prec-minimo" ).load(window.location.href + " #prec-minimo" );

        nuevoMonto.value="";

        
    }
</script>
