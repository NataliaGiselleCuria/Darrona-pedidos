date= "";

//Buscador - Filtro de categorias.
let prodLi = document.querySelectorAll(".li-prod");
let inputBuscador = document.querySelector(".input-buscador");
let titulo_cat = document.querySelector(".cat-selec");
inputBuscador.addEventListener('keyup', buscador);

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

        
        // valorProd = cant[i].parentElement.previousElementSibling.previousElementSibling.innerHTML.slice(1);
        totalProd = (Number(cant[i].value) * Number(precR[i].innerHTML.replace(/[^0-9.-]+/g,"")))*1000;
        
        
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
    total.innerText = format.format(0);
    let totalPedido = 0
    let tpp = 0

    for (let i = 0; i < totalPedProd.length; i++) {
        if(totalPedProd[i].innerHTML!="-"){
            tpp= (Number(totalPedProd[i].innerHTML.replace(/[^0-9.-]+/g,"")))*1000;
            totalPedido+=tpp
        } 
    }
    
    total.innerText = format.format(totalPedido);
}

function radio(x){
    let precRadio = 0;
    if(x.value=='uni'){
        precRadio=x.parentElement.previousElementSibling.previousElementSibling.innerHTML.slice(1);
    }else{
        precRadio=x.parentElement.previousElementSibling.innerHTML.slice(1);
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

nombre.addEventListener('keyup', habilitarEnviar);
apellido.addEventListener('keyup', habilitarEnviar);
horarios.addEventListener('keyup', habilitarEnviar);
telefono.addEventListener('keyup', habilitarEnviar);
check.addEventListener('change', habilitarEnviar);

//rellenar exel
let tablaExel =  document.querySelector('.cont-t.tablaExel');

//inicio Darrona
let logo = document.querySelector('.logo');
let logactive = document.querySelector(".login");
let cerrarLog =  document.querySelector('.fa-solid.fa-xmark');
let usuario = document.querySelector('#usuario');
let clave = document.querySelector('#clave');

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

    inicio.style.height = '275px';
      
}

function cerrar(){
    ventanaEnviar.style.height = '0px';
    ventanaEnviarCont.style.opacity = '0'; 
    ventanaEnviarCont.style.display = "none";
    ventanaEnviarCont.className = 'enviar-cont';
    botonCerrar.style.display = 'none';
    botonFinalizar.style.display = 'unset';

    if(info.style.height==0){
        inicio.style.height = '170px'
    }else{
        inicio.style.height = '210px'
    }
    
}

function categoria(x){

    if(x == "TODOS LOS PRODUCTOS" || x.innerHTML == "TODOS LOS PRODUCTOS"){
        cate = "TODOS LOS PRODUCTOS";

        if( tabla.style.display == 'none'){
            tablaPedidoFinal.style.display = 'none';
            tabla.style.display = 'block';
            botonVerPedido.style.display = 'block';
            botonVolver.style.display = 'none';
            info.style.height = '0px';
            infoCont.style.opacity = '0';
            infoCont.className = 'info-cont';

            if(info.style.height==0){
                inicio.style.height = '170px'
            }else{
                inicio.style.height = '210px'
            }

        }

        for (let i = 0; i < prodLi.length; i++){
            if (cate == "TODOS LOS PRODUCTOS"){
                prodLi[i].style.display="table-row";
            }
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
function verPedido(){
    
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

    tablaPedidoFinal.style.display = 'block';

    if(tablaPedidoFinal.style.display = 'block'){
        botonVerPedido.style.display = 'none';
        botonVolver.style.display = 'block';
    }

    info.style.display = 'flex';
    info.style.height = '45px';
    infoCont.style.opacity = '1';
    infoCont.className = 'info-cont-cerrar';
    
}

function rellenarTablaExel(){

    let prodTFinal = document.querySelectorAll(".tr-tablaFinal");

    let nom = document.createElement('TD');
    nom.innerHTML = nombre.value;
    tablaExel.children[0].children[0].appendChild(nom);

    let ap = document.createElement('TD');
    ap.innerHTML = apellido.value;
    tablaExel.children[0].children[1].append(ap);

    let hor = document.createElement('TD');
    hor.innerHTML = horarios.value;
    tablaExel.children[0].children[2].append(hor); 

    let tel = document.createElement('TD');
    tel.innerHTML = telefono.value;
    tablaExel.children[0].children[3].append(tel)

    let fecha = document.createElement('TD');
    fecha.innerHTML = new Date().toLocaleDateString();
    tablaExel.children[0].children[4].append(fecha);

    date=fecha;


    for (let i = 0; i < prodTFinal.length; i++) {
        var itemProducto = document.createElement('TR');

        let cod = prodTFinal[i].children[1].cloneNode(true);
        let cant = document.createElement('TD');
        cant.innerHTML = prodTFinal[i].children[8].children[0].value;
        let prod = document.createElement('TD');
        prod.innerHTML = prodTFinal[i].children[2].innerHTML;

        itemProducto.appendChild(cod);
        itemProducto.append(cant);
        itemProducto.append(prod);

        tablaExel.childNodes[1].appendChild(itemProducto);
    }
}

function habilitarEnviar(){
    if(nombre.value!='' && apellido.value!='' && horario.value!='' && telefono.value!='' && check.checked==true){    
        enviar.style.backgroundColor = "#EDC98C"
        error.style.display = "none";
    }else{
        enviar.style.backgroundColor = "#80808047"
    }

}

function verificarError(){
    habilitarEnviar()

    if(nombre.value!='' && apellido.value!='' && horario.value!='' && telefono.value!='' && check.checked==true){
        if (error.style.display == "none"){

            rellenarTablaExel();

            const wb = XLSX.utils.table_to_book(tablaExel, {sheet: 'sheet-1'});
  
            /* Export to file (start a download) */
            XLSX.writeFile(wb, 'Pedido-'+nombre.value+'-'+apellido.value+'-'+date.toLocaleDateString()+'.xlsx');
           
        }
    }

    else {
        error.style.display = "unset";
        
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