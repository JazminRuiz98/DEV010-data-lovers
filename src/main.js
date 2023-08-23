/* eslint-disable no-console */
// AQUÍ VA TODO LO RELACIONADO CON EL DOM //

import athletes from './data/athletes/athletes.js';

import{ eliminarRepetidos, obtenerPaisesUnicosFiltrados, ordenar, conteoMedallas, /*filtroPais*/ } from './data.js'; 

// ELEMENTOS PARA RELACIÓN CON EL DOM
const botonAtras = document.getElementById('atras');
const contadorPagina = document.querySelector("#contadorPagina");
calculoMedallas
const botonSiquiente = document.getElementById("siguiente");
const btnPagPrimera = document.getElementById("btnPagPrimera");
const btnPagUltima = document.getElementById("btnPagUltima");
const paginacion = document.querySelector('.paginacion');

const botonAtrasPaises = document.getElementById("atrasPaises");
const botonSiquientePaises = document.getElementById("siguientePaises");
const btnPagPrimeraPaises = document.getElementById("btnPagPrimeraPaises");
const btnPagUltimaPaises = document.getElementById("btnPagUltimaPaises");
const paginacionPaises = document.querySelector('.paginacionPaises');
const contadorPaginaPaises = document.querySelector("#contadorPaginaPaises");

const tituloPaises = document.querySelector('.tituloPaises');
const tituloAtletas = document.querySelector('.tituloAtletas');
const linkPaises = document.querySelector('.Paises');
const linkAtletas = document.querySelector('.Atletas');
const containerPaises = document.querySelector('.seccionPaises');
const container = document.querySelector('.seccionAtletas');
const menuPaises = document.getElementById('menuPaises');
//const menuDesplegable = document.querySelector('.menuDesplegable');
const todosPaises = document.querySelector('.optTodos');


const contenidoTituloAtletas = tituloAtletas.innerHTML;
const contenidoTituloPaises = tituloPaises.innerHTML;
const contenidoMenuPaises = menuPaises.innerHTML;
//const contenidoMenuDesplegable = menuDesplegable.innerHTML;


// VARIABLES DE ATLETAS UNICOS Y  ORDENADOS
const atletasSinRepetidos = eliminarRepetidos(athletes.athletes);
const atletasOrdenados = ordenar(atletasSinRepetidos);

// VARIABLES PARA CALCULAR ITEMS POR PAGINA
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

// Obtener valores únicos de la propiedad 'team' y agregarlos a la lista desplegable
// eslint-disable-next-line no-undef
const paisesUnicosSet = new Set(athletes.athletes.map(athlete => athlete.team));
const paisesUnicos = Array.from(paisesUnicosSet);
paisesUnicos.sort(); // Ordenar alfabéticamente

// CREAR EL MENU DESPLEGABLE CON LOS PAISES
function cargarOpcionesMenu(paisesUnicos, menuPaises) {
  paisesUnicos.forEach(team => {
    const option = document.createElement('option');
    option.value = team;
    option.textContent = team;
    menuPaises.appendChild(option);
  });
}

// DESPLIEGA NOMBRES DE ATLETAS POR PAIS
menuPaises.addEventListener('change', function() {
  const paisSeleccionado = menuPaises.value;
  if (paisSeleccionado) {
    const nombresUnicosFiltrados = obtenerPaisesUnicosFiltrados(paisSeleccionado, athletes.athletes);
    renderizarPaises(nombresUnicosFiltrados, container);  
  } else if (todosPaises) {
    renderizar ();
    primeraPagina(); // Para que regrese a la primera página
    paginaActual = 1;
    // Agrega todos los elementos de paginación nuevamente
    paginacion.appendChild(btnPagPrimera);
    paginacion.appendChild(botonAtras);
    paginacion.appendChild(contadorPagina);
    paginacion.appendChild(botonSiquiente);
    paginacion.appendChild(btnPagUltima);
  } else {
    container.innerHTML = '';
    alert("Seleccione un país para filtrar");
  }
});

// FUNCION QUE LLENA EL NUEVO DOM A PARTIR DE LAS VARIABLLES
function renderizar(){
  const cargaDatos = obtenerDatos(paginaActual);
  contadorPagina.textContent = `${paginaActual} / ${paginasTotales}`;

  container.innerHTML = ''; // Limpiar el contenido previo
  containerPaises.innerHTML = ''; // Eliminar sección paises
  paginacionPaises.innerHTML = ''; // Eliminar paginación paises
  paginacion.innerHTML = ''; // Devolver paginación a cero
  tituloPaises.innerHTML = ''; // Eliminar título paises
  tituloAtletas.innerHTML = contenidoTituloAtletas; // Cargar título atletas
  menuPaises.innerHTML = contenidoMenuPaises; // Cargar menú desplegable
  //menuDesplegable.innerHTML = contenidoMenuDesplegable;
  cargarOpcionesMenu(paisesUnicos, menuPaises);
  
  paginacion.appendChild(btnPagPrimera);
  paginacion.appendChild(botonAtras);
  paginacion.appendChild(contadorPagina);
  paginacion.appendChild(botonSiquiente);
  paginacion.appendChild(btnPagUltima);

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

calculoMedallas
// RENDERIZAR LOS ATLETAS SEGÚN EL PAÍS SELECCIONADO
function renderizarPaises (nombresUnicos, container){
  container.innerHTML = '';
  paginacion.innerHTML = ''; // Elimina los botones de paginación una vez filtrados los atletas por país

  menuPaises.innerHTML = contenidoMenuPaises; // Cargar menú desplegable
  //menuDesplegable.innerHTML = contenidoMenuDesplegable;
  cargarOpcionesMenu(paisesUnicos, menuPaises);
  
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

calculoMedallas
// LLENAR EL NUEVO DOM A PARTIR DE PAISES //

btnNavPais.addEventListener('click',cambioPais);


// VARIABLES PARA CALCULAR ITEMS POR PAGINA
const paisesUnicosOrdenados = paisesUnicos.sort();
const itemsTotalesPaises = paisesUnicosOrdenados.length;
const itemsPaginaPaises = 20;
const paginasTotalesPaises = Math.ceil(itemsTotalesPaises / itemsPaginaPaises); // Usamos Math.ceil para redondear hacia arriba
let paginaActualPaises = 1;

// FUNCION PARA OBTENER ITEMS POR PAGINA
function obtenerDatosPaises (pagina = 1){
  paginaActualPaises = pagina; // Actualizamos la página actual
  const corteInicio = (pagina - 1) * itemsPaginaPaises;
  const corteFinal = corteInicio + itemsPaginaPaises;
  const items = paisesUnicosOrdenados.slice(corteInicio, corteFinal);
  return items;
}

// BOTONES PRIMERA Y ULTIMA PÁGINA
function primeraPaginaPaises() {
  if (paginaActualPaises !== 1){
    paginaActualPaises = 1; // Llamar a renderizar con la página 1
    renderizarCardsPaises();
  } 
}

function ultimaPaginaPaises() {
  if (paginaActualPaises !== paginasTotalesPaises){
    paginaActualPaises = paginasTotalesPaises;// Llamar a renderizar con la última página
    renderizarCardsPaises();
  } 
}

// Función para retroceder de pagina
function retrocederPaginaPaises() {
  paginaActualPaises = paginaActualPaises - 1;
  renderizarCardsPaises();
}

// Funcion para avanzar de pagina
function avanzarPaginaPaises(){
  paginaActualPaises = paginaActualPaises + 1;
  renderizarCardsPaises();
}

// Función que habilita o desactiva los botones de la paginas dependiendo de si nos encontramos en la primera página o en la última.
function gestionBotonesPaises(){
  //Esto comprueba si no se puede retroceder
  if (paginaActualPaises === 1 ) {
    botonAtrasPaises.setAttribute("disabled", true);
  }
  else{
    botonAtrasPaises.removeAttribute("disabled");
  }
  //Esto comprueba si no se puede avanzar
  if (paginaActualPaises === paginasTotalesPaises ) {
    botonSiquientePaises.setAttribute("disabled", true);
  }
  else{
    botonSiquientePaises.removeAttribute("disabled");
  }
}

// FUNCION PARA RENDERIZAR LAS CARDS DE PAISES CON NOMBRE Y MEDALLAS
function renderizarCardsPaises(){

  containerPaises.innerHTML = ''; // Limpiar el contenido previo
  container.innerHTML = ''; // Eliminar sección atletas
  paginacion.innerHTML = ''; // Eliminar paginación atletas
  tituloAtletas.innerHTML = ''; // Eliminar título atletas
  menuPaises.innerHTML = ''; // Eliminar filtro por paises
  tituloPaises.innerHTML = contenidoTituloPaises; // Mostrar título
  //menuDesplegable.innerHTML = '';

  paginacionPaises.appendChild(btnPagPrimeraPaises);
  paginacionPaises.appendChild(botonAtrasPaises);
  paginacionPaises.appendChild(contadorPaginaPaises);
  paginacionPaises.appendChild(botonSiquientePaises);
  paginacionPaises.appendChild(btnPagUltimaPaises);

  const cargaDatosPaises = obtenerDatosPaises(paginaActualPaises);
  contadorPaginaPaises.textContent = `${paginaActualPaises} / ${paginasTotalesPaises}`;

  // Cargar los nombres de paises en  cards
  cargaDatosPaises.forEach(pais => {
    const cardPais = document.createElement("div");
    cardPais.classList.add("cardPais");
    const nombrePais = document.createElement("p");
    nombrePais.textContent = pais;
    cardPais.appendChild(nombrePais);

    // Obtener las medallas por país del objeto medallasPorPais
    const medallasPais = medallasPorPais[pais];
    if (medallasPais) {
      const medallasInfo = document.createElement("div");
      medallasInfo.textContent = `
        ORO: ${medallasPais.Gold}
        PLATA: ${medallasPais.Silver}
        BRONCE: ${medallasPais.Bronze}`;
      medallasInfo.classList.add("medallas");
      cardPais.appendChild(medallasInfo);
    }
    containerPaises.appendChild(cardPais);
  });
  gestionBotonesPaises(); // Llamar a gestionBotones para actualizar los botones
}

// Contar las medallas por equipo
const medallasPorPais = conteoMedallas(athletes.athletes);
console.log(medallasPorPais);

// Llama a los botones para avanzar o retroceder
botonAtrasPaises.addEventListener("click", retrocederPaginaPaises);
botonSiquientePaises.addEventListener('click', avanzarPaginaPaises);
btnPagPrimeraPaises.addEventListener('click', primeraPaginaPaises);
btnPagUltimaPaises.addEventListener('click', ultimaPaginaPaises);

// Acciones cuando se da click en el menú de la barra de navegación
linkPaises.addEventListener("click", renderizarCardsPaises);
linkAtletas.addEventListener("click", renderizar);




// INTENTOS DE CARGAR CONTEO DE MEDALLAS
/*
function renderizarCardsPaises(){
  const cargaDatosPaises = obtenerDatosPaises(paginaActualPaises);
  contadorPaginaPaises.textContent = `${paginaActualPaises} / ${paginasTotalesPaises}`;

  for (let i = 0; i < cargaDatosPaises.length; i++) {
    const cardPais = document.createElement("div");
    cardPais.classList.add("cardPais");
    const card = document.createElement("p");
    card.textContent = cargaDatosPaises[i];
    cardPais.appendChild(card);
    containerPaises.appendChild(cardPais);
  }
  gestionBotonesPaises(); // Llamar a gestionBotones para actualizar los botones
}*/


// FUNCIÓN AGNÓSTICA
// const atletasUnicosOrdenados = eliminarDuplicadosYOrdenar('name', 'name');
// const paisesFiltrados = filtroPais(paisSeleccionado, athletes.athletes);
// const atletasUnicosOrdenadosPorPais = eliminarDuplicadosYOrdenar(paisesFiltrados, 'name', 'name');


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