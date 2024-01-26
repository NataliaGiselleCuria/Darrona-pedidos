date= "";

//Buscador - Filtro de categorias.
let prodLi = document.querySelectorAll(".li-prod");
let inputBuscador = document.querySelector(".input-buscador");
let titulo_cat = document.querySelector(".cat-selec");
inputBuscador.addEventListener('keyup', buscador);

//Tool-tip.
let tool = document.querySelector(".tool-div");
let cerrarTool = document.querySelector(".cerrar-tool");

cerrarTool.addEventListener('click', ()=>{
    tool.remove();
})

//Totales por prodcto y total final.
const format = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });
let cant = document.querySelectorAll(".cant-pedido");
let totalPedProd = document.querySelectorAll(".total-prod-pedido");
let total = document.querySelector(".total");
let precR = document.querySelectorAll(".prec-radio");
total.innerText = format.format(0);
let pedidoFinal = [];

for (let i = 0; i < cant.length; i++) {
    cant[i].addEventListener('keyup', totalProd)
}

function totalProd(){
    let valorProd = null;
    let totalProd = null;
    
    for (let i = 0; i < cant.length; i++) {

        totalProd = (Number(cant[i].value) * Number(precR[i].innerHTML.replace(/[^0-9.-]+/g,"")))*1000;

        console.log(totalProd)
           
        if(valorProd!="-"){
            if(totalProd!==0){
                totalPedProd[i].innerHTML = format.format(totalProd);
            } else {
                totalPedProd[i].innerHTML = null;
            }
        } else {
            totalPedProd[i].innerHTML = null;
        }      
    }   

    sumarTotal();
}

function sumarTotal(){
    let totalPedido = null
    let tpp = null

    for (let i = 0; i < totalPedProd.length; i++) {

        if(totalPedProd[i].innerHTML!="-"){

            tpp= (Number(totalPedProd[i].innerHTML.replace(/[^0-9-]+/g,"")))/100;
            console.log(tpp);
            totalPedido+=tpp
            console.log(format.format(totalPedido));
        } 
    }
    
    total.innerHTML = format.format(totalPedido);
}

function radio(x){
    let precRadio = 0;
    if(x.value=='uni'){
        precRadio=x.parentElement.previousElementSibling.previousElementSibling.innerHTML.slice(1);
        x.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML="Unidad";  
    }else{    
        precRadio=x.parentElement.previousElementSibling.innerHTML.slice(1);  
        x.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML="Bulto"; 
    }

    if(precRadio=='-' || precRadio==0){
        precRadio="0";
    }

    x.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML=precRadio;

    totalProd();
}

// Abrir/cerrar ventana
let ventanaEnviar = document.querySelector('.enviar-pedido');
let ventanaEnviarCont = document.querySelector('.enviar-cont');
let botonFinalizar = document.querySelector('.bt.fin');
let botonCerrar = document.querySelector('.bt.cerrar');
let inicio = document.querySelector('#inicio');
let logobanner = document.querySelector('.logo');

//ver pedido
let botonVerPedido = document.querySelector('.bt.ver-resumen');
let botonVolver = document.querySelector('.bt.volver');
let info = document.querySelector('.info-precio');
let infoCont = document.querySelector('.info-cont');
let tabla = document.querySelector('.cont-t');
let tablaPedidoFinal = document.querySelector('.cont-t.pedido-final');

//validar form cliente
let enviar = document.querySelector('.bt.enviar');
let error = document.querySelector('.error');
let nombre = document.querySelector('#nombre');
let apellido = document.querySelector('#apellido');
let horarios = document.querySelector('#horario');
let telefono = document.querySelector('#telefono');
let check = document.querySelector('#check');
let noError = document.querySelector('.no-error');

nombre.addEventListener('keyup', habilitarEnviar);
apellido.addEventListener('keyup', habilitarEnviar);
horarios.addEventListener('keyup', habilitarEnviar);
telefono.addEventListener('keyup', habilitarEnviar);
check.addEventListener('change', habilitarEnviar);

//rellenar excel y redireccion
let tablaExcel =  document.querySelector('.cont-t.tablaExcel');
let redir = document.querySelector('.redireccion');
let irwapp = document.querySelector('.ir-wapp');

irwapp.addEventListener("click", ()=>{
    location.href ="https://wa.me/5492215952475?text=Hola%20Darrona!%20Adjunto%20el%20pedido%20generado%20por%20la%20web%20..."
})

//inicio Darrona y act log
let logo = document.querySelector('.logo');
let logactive = document.querySelector(".login");
let cerrarLog =  document.querySelector('.cerrar-log');
let usuario = document.querySelector('#usuario');
let clave = document.querySelector('#clave');
let ver = document.querySelectorAll('.fa-regular.fa-eye');
let noVer = document.querySelectorAll('.fa-regular.fa-eye-slash');
let usuarioActual = document.querySelector('#actualUsuario');
let claveActual = document.querySelector('#actualClave');
let usuarioNuevo = document.querySelector('#nuevoUsuario');
let claveNueva = document.querySelector('#nuevaClave');

for (let i = 0; i < ver.length; i++){
    ver[i].addEventListener('click', () =>{
        ver[i].style.display = "none";
        noVer[i].style.display = "block";

        if(i==0){
            clave.type="text";
        }else if(i==1){
            claveActual.type="text";
        }else{
            claveNueva.type="text";
        }
        
    })
}

for (let i = 0; i < noVer.length; i++){
    noVer[i].addEventListener('click', () =>{
        
        noVer[i].style.display = "none";
        ver[i].style.display = "block";

        if(i==0){
            clave.type="password";
        }else if(i==1){
            claveActual.type="password";
        }else{
            claveNueva.type="password";
        }
    })
}

//opciones adm
let actList = document.querySelector('#act-list');
let actMonto = document.querySelector('#act-monto');
let actLog = document.querySelector('#act-log');

let actListCont = document.querySelectorAll('.act-list');
let actMontoCont = document.querySelectorAll('.act-monto');
let actLogCont = document.querySelectorAll('.act-log');

//actualizar monto

actList.addEventListener("click", () =>{
    for (let i = 0; i < opcCont.length; i++){
        opcCont[i].style.display = 'none';
    }

    for (let i = 0; i < actListCont.length; i++){
        actListCont[i].style.display = 'flex';
    }

});

actMonto.addEventListener("click", () =>{
    for (let i = 0; i < opcCont.length; i++){
        opcCont[i].style.display = 'none';
    }

    for (let i = 0; i < actMontoCont.length; i++){
        actMontoCont[i].style.display = 'flex';
    }
});

actLog.addEventListener("click", () =>{
    for (let i = 0; i < opcCont.length; i++){
        opcCont[i].style.display = 'none';
    }

    for (let i = 0; i < actLogCont.length; i++){
        actLogCont[i].style.display = 'flex';
    }
});

logo.addEventListener("click", () =>{
    logactive.classList.toggle("login-active");
});

cerrarLog.addEventListener("click", () =>{
    logactive.classList.toggle("login-active");

    for (let i = 0; i < opcCont.length; i++){
        opcCont[i].style.display = 'none';
    }

    for (let i = 0; i < actListCont.length; i++){
        actListCont[i].style.display = 'none';
    }

    for (let i = 0; i < actMontoCont.length; i++){
        actMontoCont[i].style.display = 'none';
    }

    for (let i = 0; i < actLogCont.length; i++){
        actLogCont[i].style.display = 'none';
    }

    logCont.style.display = 'flex';

    usuario.value = "";
    clave.value = "";
    errorLog.innerHTML = "";

    location.reload(true);
});  

function buscador(){
    let filtro = inputBuscador.value.toLowerCase();

    for (let i = 0; i < prodLi.length; i++) {
        if(prodLi[i].children[2].innerHTML.toLowerCase().includes(filtro)){
            prodLi[i].style.display = 'table-row';
        } else {
            prodLi[i].style.display = 'none';
        }
    }   
}

function abrirVentana(){ 
    info.style.height = '0px';
    infoCont.style.opacity = '0'; 
    infoCont.className = 'enviar-cont';

    ventanaEnviar.style.height = '80px'; 
    ventanaEnviarCont.style.display = "flex";
    ventanaEnviarCont.style.opacity = '1'; 
    ventanaEnviarCont.className = 'enviar-cont-cerrar';
    botonFinalizar.style.display = 'none';
    botonCerrar.style.display = 'unset';
      
}

function cerrar(){
    ventanaEnviar.style.height = '0px';
    ventanaEnviarCont.style.opacity = '0'; 
    ventanaEnviarCont.style.display = "none";
    ventanaEnviarCont.className = 'enviar-cont';
    botonCerrar.style.display = 'none';
    botonFinalizar.style.display = 'unset';

    inicio.style.height = '195px'

    if(info.style.display!="none"){
        logo.style.height = '140px';
    }else{
        logo.style.height = '162px';
    }
    
}

function categoria(x){

    if(x == "TODOS LOS PRODUCTOS" || x.innerHTML == "TODOS LOS PRODUCTOS"){
        cate = "TODOS LOS PRODUCTOS";

        if( tabla.style.display == 'none'){
            tablaPedidoFinal.style.display = 'none';
            tabla.style.display = 'inline-table';
            botonVerPedido.style.display = 'block';
            botonVolver.style.display = 'none';
            info.style.display = 'none';
            info.style.height = '0px';
            infoCont.style.opacity = '0';
            infoCont.className = 'info-cont';

        }

        for (let i = 0; i < prodLi.length; i++){
            if (cate == "TODOS LOS PRODUCTOS"){
                prodLi[i].style.display="table-row";
            }
        }

        if(ventanaEnviarCont.style.display=="flex"){
            inicio.style.height = '230px'; 
            logo.style.height = '140px'; 
        }else{
            inicio.style.height = '170px'
            logo.style.height = '162px'; 
        }
        
        
    }else{
        cate = x.innerText;
    }
   
    titulo_cat.innerHTML = cate;

    for (let i = 0; i < prodLi.length; i++){
        if (cate != "TODOS LOS PRODUCTOS"){
            if (prodLi[i].firstElementChild.innerText != cate ){
                prodLi[i].style.display="none";
            }else{
                prodLi[i].style.display="table-row";
            }
        }
    }
}

function verPedido(x){
    
    let elEliminar = document.querySelectorAll(".tr-tablaFinal");

    for (let i = 0; i < (elEliminar.length); i++){
        elEliminar[i].remove();
    }

    let pedidoFinal = [];
    
    for (let i = 0; i < prodLi.length; i++) {
        if (prodLi[i].children[9].innerText != ''){
            
            var itemProducto = document.createElement('TR');

            itemProducto.classList.add("tr-tablaFinal")
            var children = prodLi[i].childNodes;

            children.forEach(function(item){
                let prodLiClone = item.cloneNode(true);
                itemProducto.appendChild(prodLiClone);
            });  
            
            pedidoFinal.push(itemProducto); 
            
        }
    } 

    for(let i = 0; i < pedidoFinal.length; i++){
        tablaPedidoFinal.childNodes[1].appendChild(pedidoFinal[i]);
    }

    titulo_cat.innerText = "TU PEDIDO";

    tabla.style.display = 'none';

    tablaPedidoFinal.style.display = 'inline-table';

    if(tablaPedidoFinal.style.display = 'inline-table'){
        botonVerPedido.style.display = 'none';
        botonVolver.style.display = 'block';
    }

    info.style.display = 'flex';
    info.style.height = '45px';
    infoCont.style.opacity = '1';
    infoCont.className = 'info-cont-cerrar';

    logo.style.height = '140px'

    if(x==1){
        inicio.style.height = '195px';
        logo.style.height = '140px';
    } else{
        inicio.style.height = '275px'; 
    }
    
    
}

function rellenarTablaExcel(){

    let prodTFinal = document.querySelectorAll(".tr-tablaFinal");

    let nom = document.createElement('TD');
    nom.innerHTML = nombre.value;
    tablaExcel.children[0].children[0].appendChild(nom);

    let ap = document.createElement('TD');
    ap.innerHTML = apellido.value;
    tablaExcel.children[0].children[1].append(ap);

    let hor = document.createElement('TD');
    hor.innerHTML = horarios.value;
    tablaExcel.children[0].children[2].append(hor); 

    let tel = document.createElement('TD');
    tel.innerHTML = telefono.value;
    tablaExcel.children[0].children[3].append(tel)

    let fecha = document.createElement('TD');
    fecha.innerHTML = new Date().toLocaleDateString();
    tablaExcel.children[0].children[4].append(fecha);

    date=fecha;

    console.log(date);


    for (let i = 0; i < prodTFinal.length; i++) {
        var itemProducto = document.createElement('TR');

        let cod = prodTFinal[i].children[1].cloneNode(true);
        let cant = document.createElement('TD');
        cant.innerHTML = prodTFinal[i].children[8].children[0].value;
        let pres = document.createElement('TD');
        pres.innerHTML = prodTFinal[i].children[11].innerHTML;
        let prod = document.createElement('TD');
        prod.innerHTML = prodTFinal[i].children[2].innerHTML;

        itemProducto.appendChild(cod);
        itemProducto.append(pres)
        itemProducto.append(cant);
        itemProducto.append(prod);

        tablaExcel.childNodes[1].appendChild(itemProducto);
    }
}

function habilitarEnviar(){
    if(nombre.value!='' && apellido.value!='' && horario.value!='' && telefono.value!='' && check.checked==true){    
        enviar.style.backgroundColor = "#EDC98C"
        error.style.display = "none";
        noError.style.display = "inherit"
    }else{
        enviar.style.backgroundColor = "#80808047"
    }

}

function verificarError(){
    habilitarEnviar()

    if(nombre.value!='' && apellido.value!='' && horario.value!='' && telefono.value!='' && check.checked==true){
        if (error.style.display == "none"){

            noError.style.display="inherit";

            rellenarTablaExcel();

            const wb = XLSX.utils.table_to_book(tablaExcel, {sheet: 'sheet-1'});       
  
            XLSX.writeFile(wb, 'Pedido-'+nombre.value+'-'+apellido.value+'-'+date.innerText+'.xlsx');

            redir.classList.toggle("redir-active"); 
        }
    }

    else {
        error.style.display = "unset";
        noError.style.display="none";
    }
}

function volver(el){
    sect = el.parentElement.className;

    if (sect == "act-list"){
        for (let i = 0; i < actListCont.length; i++){
            actListCont[i].style.display = 'none';
        }  
    }

    if (sect == "act-monto"){
        for (let i = 0; i < actMontoCont.length; i++){
            actMontoCont[i].style.display = 'none';
        }
    }

    if (sect == "act-log"){
        for (let i = 0; i < actLogCont.length; i++){
            actLogCont[i].style.display = 'none';
        }
    }

    for (let i = 0; i < opcCont.length; i++){
        opcCont[i].style.display = 'flex';
    }

}

habilitarEnviar();

//location.href ="https://wa.me/5491155722648?text=Hola