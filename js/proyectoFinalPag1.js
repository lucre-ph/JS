//INGRESO DE USUARIO Y CONTRASEÑA
function logIn () {
    let usuario = document.getElementById("username").value;
    let saludo = ("¡Hola, " + usuario + "!"); 
    
    //GUARDADO DE VALORES POR LOCAL STORAGE
    localStorage.setItem("usuario", usuario);
    console.log(localStorage.getItem("usuario"));
    localStorage.setItem("saludo", saludo);
}

function twoPlayers(){
$('#falsoBtn').click (() => {
    $('#container1').append('<p id="noDisp">Disponible Próximamente</p>')
    $('#noDisp').fadeIn(2000);
    $('#noDisp').fadeOut(2000);
    })        
}
twoPlayers();

function ingreso () {
    document.querySelector("#ingresar").addEventListener("click", logIn);    
}

function animaciones (){
    var titulo = $("#title");
    var login = $("#logIn");
    var btn = $("#ingresar");
    var fakeBtn = $("#falsoBtn");

    titulo.fadeIn(5000);
    login.fadeIn(5000).animate({opacity: '1'}, "slow");
    btn.fadeIn(5000).animate({opacity: '1'}, "slow");
    fakeBtn.fadeIn(5000).animate({opacity: '0.6'}, "slow");
};
animaciones(); 

//INHABILITAR LINK A JUEGO HASTA INGRESO DE USUARIO   
document.getElementById('ingresar').style.pointerEvents="none";
document.getElementById('ingresar').style.cursor="default";  
document.querySelector("#username").addEventListener("input", habilitarIngreso);

function habilitarIngreso (){
    document.getElementById('ingresar').style.pointerEvents="auto";
    document.getElementById('ingresar').style.cursor="pointer";
    ingreso();
}