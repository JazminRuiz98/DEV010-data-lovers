/* eslint-disable no-console */
// AQUÍ VA TODO LO RELACIONADO CON EL DOM //

import athletes from './data/athletes/athletes.js';

import{ eliminarRepetidos, obtenerPaisesUnicosFiltrados, ordenar, /*infoPaises*//*filtroPais*/ } from './data.js'; 

// ELEMENTOS PARA RELACIÓN CON EL DOM
const botonAtras = document.getElementById('atras');
const contadorPagina = document.querySelector("#contadorPagina");
const botonSiquiente = document.getElementById('siguiente');
const btnPagPrimera = document.getElementById('btnPagPrimera');
const btnPagUltima = document.getElementById('btnPagUltima');
const paginacion = document.querySelector('.btnPaginacion');
const menuPaises = document.getElementById('menuPaises');//Menu desplegable
const container = document.querySelector('.seccionAtletas');
const btnAtletas = document.getElementById('btnAtletas');
const btnPais = document.getElementById('btnPais');
const containerAtletas = document.querySelector('.navSeccion');
const containerPaises = document.querySelector('.seccionPaises');//Variable  para la Sección de Países Participantes 
const todosPaises = document.querySelector('.optTodos');//Variable para agregar al menú despegable la opción para volver a despeglar todos los países.


// VARIABLES DE ATLETAS UNICOS Y  ORDENADOS
const atletasSinRepetidos = eliminarRepetidos(athletes.athletes);
const atletasOrdenados = ordenar(atletasSinRepetidos);

// VARIABLESS PARA CALCULAR ITEMS POR PAGINA
const itemsTotales = atletasOrdenados.length;
const itemsPagina = 100;
const paginasTotales = Math.ceil(itemsTotales / itemsPagina); // Usamos Math.ceil para redondear hacia arriba
let paginaActual = 1;

// FUNCION PARA OBTENER ITEMS POR PAGINA
function obtenerDatos (pagina = 1){
  paginaActual = pagina; // Actualizamos la página actual
  const corteInicio = (pagina - 1) * itemsPagina;
  const corteFinal = corteInicio + itemsPagina;
  const items = atletasOrdenados.slice(corteInicio, corteFinal);
  return items;
  //const elementos = Array.from(container.querySelectorAll('.cardAtleta'));
  //return elementos.slice(corteInicio, corteFinal);
}

// FUNCION QUE LLENA EL NUEVO DOM A PARTIR DE LAS VARIABLLES
function renderizar(){
  const cargaDatos = obtenerDatos(paginaActual);
  contadorPagina.textContent = `${paginaActual} / ${paginasTotales}`;

  container.innerHTML = ""; // Limpiar el contenido previo
  containerPaises.innerHTML = ''; // Eliminar sección paises

  cargaDatos.forEach(function (datosSeccion){
    const atletas = document.createElement("div");
    atletas.classList.add("cardAtleta");

    // Actualizar el contenido del elemento de la card
    const card = document.createElement("p");
    card.textContent = datosSeccion.name;
    atletas.appendChild(card);
    container.appendChild(atletas);
  });
  gestionBotones(); // Llamar a gestionBotones para actualizar los botones
}

// Función para retroceder de pagina
function retrocederPagina() {
  paginaActual = paginaActual - 1;
  renderizar();
}

// Funcion para avanzar de pagina
function avanzarPagina(){
  paginaActual = paginaActual + 1;
  renderizar ();
}

// Función que habilita o desactiva los botones de la paginas dependiendo de si nos encontramos en la primera página o en la última.
function gestionBotones(){
  //Esto comprueba si no se puede retroceder
  if (paginaActual === 1 ) {
    botonAtras.setAttribute("disabled", true);
  }
  else{
    botonAtras.removeAttribute("disabled");
  }
  //Esto comprueba si no se puede avanzar
  if (paginaActual === paginasTotales ) {
    botonSiquiente.setAttribute("disabled", true);
  }
  else{
    botonSiquiente.removeAttribute("disabled");
  }
}

// BOTONES PRIMERA Y ULTIMA PÁGINA
function primeraPagina() {
  if (paginaActual !== 1){
    paginaActual = 1; // Llamar a renderizar con la página 1
    renderizar ();
  } 
}

function ultimaPagina() {
  if (paginaActual !== paginasTotales){
    paginaActual = paginasTotales;// Llamar a renderizar con la última página
    renderizar ();
  } 
}

// Llamar a renderizar inicialmente para mostrar la primera página
renderizar();

// Obtener valores únicos de la propiedad 'team' y agregarlos a la lista desplegable
// eslint-disable-next-line no-undef
const paisesUnicosSet = new Set(athletes.athletes.map(athlete => athlete.team));
const paisesUnicos = Array.from(paisesUnicosSet);
paisesUnicos.sort(); // Ordenar alfabéticamente
//const paisesUnicosOrdenados = obtenerPaisesUnicosFiltrados;

// CREAR EL MENU DESPLEGABLE CON LOS PAISES
paisesUnicos.forEach(team => {
  const option = document.createElement('option');
  option.value = team;
  option.textContent = team;
  menuPaises.appendChild(option);
});

// COPIA DEL CONTENIDO DE PAGINACION PARA VOLVERLO A MOSTRAR CON INNERHTML


// DESPLIEGA NOMBRES POR PAIS (MENU DESPLEGABLE)
menuPaises.addEventListener('change', function() {
  const paisSeleccionado = menuPaises.value;
  if (paisSeleccionado) {
    const nombresUnicosFiltrados = obtenerPaisesUnicosFiltrados(paisSeleccionado, athletes.athletes);
    renderizarPaises(nombresUnicosFiltrados, container);  
  } else if (todosPaises) {
    renderizar ();
    paginaActual = 1;
    // Agrega todos los elementos de paginación nuevamente
    paginacion.appendChild(btnPagPrimera);
    paginacion.appendChild(botonAtras);
    paginacion.appendChild(contadorPagina);
    paginacion.appendChild(botonSiquiente);
    paginacion.appendChild(btnPagUltima);
    
  } else {
    container.innerHTML = '';
    // paginacion.innerHTML = '';
    alert("Seleccione un país para filtrar");
  }
});

// RENDERIZAR LOS ATLETAS SEGÚN EL PAÍS SELECCIONADO
function renderizarPaises (nombresUnicos, container){
  container.innerHTML = '';
  paginacion.innerHTML = ''; // Elimina los botones de paginación una vez filtrados los atletas por país

  nombresUnicos.forEach(nombre => {
    const nombreInfo = document.createElement("div");
    nombreInfo.classList.add("cardAtleta");
    nombreInfo.textContent = nombre;
    container.appendChild(nombreInfo);
  });
}

// Llama a los botones para avanzar o retroceder
botonAtras.addEventListener("click", retrocederPagina);
botonSiquiente.addEventListener('click', avanzarPagina);
btnPagPrimera.addEventListener('click', primeraPagina);
btnPagUltima.addEventListener('click', ultimaPagina);
btnAtletas.addEventListener("click", renderizar);// boton para mostrar información de los atletas
btnPais.addEventListener("click", mostrarInformacionPaises);

// Función para mostrar la información de los países
function mostrarInformacionPaises() {
  containerAtletas.innerHTML = ""; //Borra el contenido actual de la sección Atletlas
  paginacion.innerHTML = ""; // Borra los botones de paginación
  container.innerHTML = "";//Borra el menu desplegable

  const seccionPaises = document.querySelector(".seccionPaises");
  //seccionPaises.innerHTML = "<h2>Países participantes</h2>";
  //Funcion que verifica si la sección tiene contenido y evita duplicar cards al momento de volver dar click en el boton de "Paises"  
  if (seccionPaises.hasChildNodes()){
    seccionPaises.innerHTML="";
  }
  // Recorrer el arreglo de países únicos y agrega la información de cada uno a la sección
  paisesUnicos.forEach(function (pais) {
    const cardPais = document.createElement("div");
    cardPais.classList.add("cardPais");
    cardPais.textContent = pais;
    seccionPaises.appendChild(cardPais);
  });
}





//VARABLES PARA PRUEBA DE CAMBIO DE SECCIÓN 
/*const btnNavPais = document.querySelector('.menuPaises');

function cambioPais( ){
  containerAtletas.innerHTML = ""; //Borra el contenido actual de la sección Atletlas
  paginacion.innerHTML = ""; // Borra los botones de paginación
  container.innerHTML = "";//Borra el menu desplegable
  

  const datosPaises =  infoPaises (athletes.athletes);
  // Limpiar el contenido previo
  
  datosPaises.forEach(function (datosPais){
    const pais = document.createElement("div");
    pais.classList.add("cardPais");
    
    // Actualizar el contenido del elemento de la card
    const card = document.createElement("p");
    card.textContent = datosPais.team;
    pais.appendChild(card);console.log(pais);
    containerPaises.appendChild(pais);
    
  });
}

btnNavPais.addEventListener('click',cambioPais);

// FUNCIÓN AGNÓSTICA
// const atletasUnicosOrdenados = eliminarDuplicadosYOrdenar('name', 'name');
// const paisesFiltrados = filtroPais(paisSeleccionado, athletes.athletes);
// const atletasUnicosOrdenadosPorPais = eliminarDuplicadosYOrdenar(paisesFiltrados, 'name', 'name');


/*
// OBTENER DATOS DE PAISES
function eliminarPaisesRepetidos(athletes) {
  const paises = (athletes.team);
  const paisesUnicos = [];
  const paisesVistos = [];
  paises.forEach(athlete => {
    if (paisesVistos.includes(athlete.team)) {
      // No hacer nada si el nombre ya está en paisesVistos
    } else {
      paisesVistos.push(athlete.team);
      paisesUnicos.push(athletes);
    }
  });
  console.log(paisesUnicos);
  return paisesUnicos;
}
eliminarPaisesRepetidos();

const paisesSinRepetidos = eliminarPaisesRepetidos(athletes.athletes.team);

// FUNCION PARA ORDENAR DE LA A A LA Z 
function ordenarPaises (athletes) {
  return athletes.team.sort ((a,b) => a.team.localeCompare(b.team));
}
const paisesOrdenados = ordenarPaises (paisesSinRepetidos);
*/

/*
// PRUEBAS FILTRO POR PAIS

// Ejemplo MIMI
function filtroPais(data, filter) {
  return data.athletes.filter(item => item.team.includes(filter));
}
const search = document.querySelector('.search')

// Ejemplo JAZZ
const atletaData = {
  filtroPais: function (pais) {
    if (pais === "") {
      return atleta.pais;
    } else {
      return atleta.pais.filter(atleta => atleta.pais.includes(pais))
    }
  }
}
*/

// Clonar la plantilla de la tarjeta de atleta //
// const plantillaAtleta = document.querySelector(".cardAtleta");
// const atletas = plantillaAtleta.cloneNode(true);
// const atletas = container.querySelector(".cardAtleta").cloneNode(true);
// const atletas = container.cloneNode(true);

// FUNCIÓN PARA VERIFICAR QUÉ DATOS SE ESTABAN OBTENIENDO //
/* function verificarObtencionDeDatos() {
  for (let pagina = 1; pagina <= paginasTotales; pagina++) {
    const datosPagina = obtenerDatos(pagina);
    console.log(`Página ${pagina}:`, datosPagina);
  } } verificarObtencionDeDatos();*/


// BUCLE FOR PARA MOSTRAR LOS NOMBRES EN LAS CARDS
/*for (let i=0; i < atletasOrdenados.length; i++){
  container.innerHTML += `
    <div class="cardAtleta">
        <p>${atletasOrdenados[i].name}</p>
    </div>`
}*/

// OTRA FORMA DE HACECR LA FUNCION USANDO SET Y ! (! sirve para cambiar el valor boleano)
// function eliminarAtletasRepetidos(athletes) {
//   const atletasUnicos = [];
//   const nombresVistos = new Set();
//   athletes.forEach(athlete => {
//     if (!nombresVistos.has(athlete.name)) {
//       nombresVistos.add(athlete.name);
//       atletasUnicos.push(athlete);
//     }
//   });
//   return atletasUnicos;
// }
// const atletasSinRepetidos = eliminarAtletasRepetidos(data.athletes);
// const container = document.querySelector('.seccionAtletas');


// EJEMPLO CARLOS //
/*const root = document.getElementById('root')
const renderHtml=(todaslasPersonas)=>{
  let html = ''
  todaslasPersonas.forEach(unElemento=>{
    html=html+`
        <p> ${unElemento.nombre}<p>
        `
  })
  return html
}
const nombres=[
  {id:1, nombre:'Jazmin'},
  {id:2, nombre:'Brenda'},
  {id:3, nombre:'Carlos'},
  {id:4, nombre:'Gene'},
]
root.innerHTML= renderHtml(nombres)
root.innerHTML= '<marquee>Soy una serpiente que anda por el bosque</marquee>'*/


// CÓDIGO DE CARO PULIDO PARA PAGINACIÓN //
// const items = 20;
// let totalPages;

// const navBarToggle = document.querySelector('.toggle');
// const navBarButtons = document.querySelector('.links');

// const pageSelector = document.querySelector('#page-selector');
// const backBut = document.querySelector('#back-button');
// const forwardBut = document.querySelector('#forward-button');

// function init() {
//   totalPages = Math.ceil(globalData.length/items);
//   document.querySelector('nav section h3').innerHTML = "Flags of Countries";
//   inputSearch.value = '';
//   switchBut.checked = false;
//   backBut.disabled = true;
//   createPaginator(totalPages, pageSelector);
//   createSelectorForFilterBy();
//   theData = globalData;
//   showCards(theData, cards, parseInt(pageSelector.value) + 1, items);
//   showTable(theData, table, parseInt(pageSelector.value) + 1, items);
//   (switchBut.checked === true) ? cards.style.display = 'none' : table.style.display = 'none';
//   createEventListeners();
// }

// forwardBut.addEventListener('click', (event) => {
//   moveBetweenPages(event);
// }); 
// backBut.addEventListener('click', (event) => {
//   moveBetweenPages(event);
// });

// function moveBetweenPages(event){
//   const actual = parseInt(pageSelector.value);
//   if(event.target.id.endsWith("button")){
//     (actual === 1) ? backBut.disabled = true : backBut.disabled = false;
//     (actual === Math.ceil(theData.length/items) - 2) ? forwardBut.disabled = true : forwardBut.disabled = false;
//   } else if (event.target.id.endsWith("selector")){
//     (actual === 0) ? backBut.disabled = true : backBut.disabled = false;
//     (actual === Math.ceil(theData.length/items) - 1) ? forwardBut.disabled = true : forwardBut.disabled = false;
//   }
//   if ( actual >= 0 && actual < Math.ceil(theData.length/items) ){
//     if(event.target.id === "back-button"){
//       forwardBut.disabled = false;
//       pageSelector.text = parseInt(actual);
//       pageSelector.value = parseInt(actual)-1;
//     } else if(event.target.id === "forward-button"){
//       backBut.disabled = false;
//       pageSelector.text = parseInt(actual)+2;
//       pageSelector.value = parseInt(actual)+1;
//     }
//   }
//   if (switchBut.checked){
//     showTable(theData, table, parseInt(pageSelector.value) + 1, items);
//   } else{
//     showCards(theData, cards, parseInt(pageSelector.value) + 1, items);
//   }
// }