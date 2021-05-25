//DECLARACIÓN DE URL PARA USAR LLAMADA AJAX
let URL = "https://swapi.dev/api/people/";
//DECLARACIÓN DE VARIABLES GLOBALES Y CONSTANTES
let score = 0;
const startButton = document.querySelector('#start');
const grid = document.querySelector('#juego');
const resultado = document.querySelector('#score');
var tarjetasSeleccionadas = [];
var idTarjetasSeleccionadas = [];
var personajesEncontrados = [];


//DECLARACIÓN DE FUNCIONES
//SALUDO AL USUARIO
function saludo (){
    $('#saludo').append(localStorage.saludo);
}
saludo();


//MANIPULACIÓN DEL DOM
function crearElementosDOM() {
    $("h2").prepend('<h2 style= "display:none">STAR WARS MEMORY GAME</h2>');
    $("h2").fadeIn(4000);
    $('#saludo').append('<br><button id="btnGet">CONSOLE CHARS</button><br>');
//EVENTO GET
    $('#btnGet').click (() => {
        $.get(URL, function (respuesta, estado) {
            if(estado === "success") {
                console.log(respuesta);
                let data = respuesta.results;
                console.log(data);
                $('#btnGet').hide();
                for (const dato of data) {
                    console.log(`${dato.name}`);
                }
            }    
        })
    });
}
crearElementosDOM();


function instrucciones() {
//CREACIÓN DE BOTÓN MOSTRAR CONTROLES Y EVENTO SHOW()
    $('.instrucciones').append('<br><h4 id="instrucciones" style= display:none>Deberás encontrar a 10 personajes de la gran saga de Star Wars antes de que se acabe el tiempo. Para ello, haz click en las tarjetas para darlas vuelta y encontrar su respectivo par. <br>¡Que la Fuerza te acompañe!</h4><button id="mostrarInstrucciones">INSTRUCCIONES</button>')
    $('#mostrarInstrucciones').on('click', function() {
        $('#instrucciones').show();
        $('#mostrarInstrucciones').hide();
//CREACIÓN DE BOTÓN QUITAR CONTROLES Y EVENTO HIDE() CON JQUERY
        $('#instrucciones').prepend('<button id="ocultarInstrucciones">OCULTAR INSTRUCCIONES</button><br>')
//EVENTO HIDE() CON JQUERY
    $('#ocultarInstrucciones').click (() => {
        $('#instrucciones, #ocultarInstrucciones').slideUp(3000);
        $('#mostrarInstrucciones').show(3000);
        })        
    })
}
instrucciones();

//LLAMADA A AJAX PARA CONSOLEAR ALGUNOS PERSONAJES DE LA SAGA
function callAjax () {
    $.ajax ({
        url: URL
    })
    .done (function (data) {
        console.log(data);
        $("body").prepend(data.name);
    })
    .fail (function () {
        $("body").prepend('<h3>Disculpe las molestias, intente refrescar la página en unos instantes</h3>')
    })
}
callAjax();

//ARRAYS DE TARJETAS CON LOS PERSONAJES
const tarjetas = [{name: "Grogu", img: '../img/grogu.jpg'},
                {name: "Grogu", img: '../img/grogu.jpg'},
                {name: "Chewie", img: '../img/chewie.jpg'},
                {name: "Chewie", img: '../img/chewie.jpg'},
                {name: "Luke", img: '../img/trooper.jpg'},
                {name: "Luke", img: '../img/trooper.jpg'},
                {name: "C3PO", img: '../img/c3po.jpg'},
                {name: "C3PO", img: '../img/c3po.jpg'},
                {name: "DarthVader", img: '../img/vader.jpg'},
                {name: "DarthVader", img: '../img/vader.jpg'},
                {name: "Anakin", img: '../img/luke.jpg'},
                {name: "Anakin", img: '../img/luke.jpg'},
                {name: "R2D2", img: '../img/r2d2.jpg'},
                {name: "R2D2", img: '../img/r2d2.jpg'},
                {name: "ObiWan", img: '../img/obiWan.jpg'},
                {name: "ObiWan", img: '../img/obiWan.jpg'},
                {name: "DarthMaul", img: '../img/maul.jpg'},
                {name: "DarthMaul", img: '../img/maul.jpg'},
                {name: "Jabba", img: '../img/jabba.jpg'},
                {name: "Jabba", img: '../img/jabba.jpg'}];

console.log("Personajes del juego: ");
for (const tarjeta of tarjetas) {
    console.log(tarjeta.name);
}

//SURTIR ORDEN DE FICHAS POR SESION
tarjetas.sort(() => 0.5 - Math.random());

//SETEO DE TABLERO DE JUEGO
function juego(){
    for (let i = 0; i < tarjetas.length; i++) {
        var card = document.createElement('img');
        card.setAttribute('src', '../img/blanco.jpg');
        card.setAttribute('data-id', i);
        card.addEventListener('click', voltear)
        grid.appendChild(card);
    }
}

//COMPARAR 2 FICHAS SELECCIONADAS
function chequearTarjetas(){
    var cards = document.querySelectorAll('img');
    const idPrimeraTarjeta = idTarjetasSeleccionadas [0];
    const idSegundaTarjeta = idTarjetasSeleccionadas [1];
    if (/*tarjetasSeleccionadas[0] =! tarjetasSeleccionadas[0] &&*/ tarjetasSeleccionadas[0] === tarjetasSeleccionadas[1]) {
        console.log("¡Bien! Has encontrado 1 personaje");
        cards[idPrimeraTarjeta].style.visibility = "hidden";
        cards[idSegundaTarjeta].style.visibility = "hidden";
        personajesEncontrados.push(tarjetasSeleccionadas);    
    } else {
        cards[idPrimeraTarjeta].setAttribute('src', '../img/blanco.jpg');
        cards[idSegundaTarjeta].setAttribute('src', '../img/blanco.jpg');
        console.log("Sigue intentandolo");
    }
    tarjetasSeleccionadas = [];
    idTarjetasSeleccionadas = [];
    resultado.textContent = "Score:" + personajesEncontrados.length;
    if (personajesEncontrados.length === 10) {
        alert("¡Bien hecho! Has encontrado a todos los personajes y trajiste paz a la República");
    }
}

//EFECTO DE DAR VUELTA LAS FICHAS
function voltear() {
    var cardId = this.getAttribute('data-id');
    tarjetasSeleccionadas.push(tarjetas[cardId].name);
    idTarjetasSeleccionadas.push(cardId);
    this.setAttribute('src', tarjetas[cardId].img);
    if (tarjetasSeleccionadas.length === 2) {
        setTimeout(chequearTarjetas, 400);
    }
}


//FUNCIÓN INICIAR JUEGO
function startGame() {
    $('#start').hide();
    score = 0;
    juego();
}
startButton.addEventListener('click', startGame);