/* eslint-disable no-undef */
/* eslint-disable no-console */
// AQUÍ VA TODO LO RELACIONADO CON EL DOM //

import athletes from './data/athletes/athletes.js';

import{ eliminarRepetidos, obtenerPaisesUnicosFiltrados, ordenar, conteoMedallas, conteoMujeres, ordenarPaisesMujeres, /*filtroPais*/ } from './data.js'; 


// ELEMENTOS PARA RELACIÓN CON EL DOM
const botonAtras = document.getElementById("atras");
const contadorPagina = document.querySelector("#contadorPagina");
const botonSiquiente = document.getElementById("siguiente");
const btnPagPrimera = document.getElementById("btnPagPrimera");
const btnPagUltima = document.getElementById("btnPagUltima");
const paginacionAtletas = document.querySelector('.paginacionAtletas');

const botonAtrasPaises = document.getElementById("atrasPaises");
const botonSiquientePaises = document.getElementById("siguientePaises");
const btnPagPrimeraPaises = document.getElementById("btnPagPrimeraPaises");
const btnPagUltimaPaises = document.getElementById("btnPagUltimaPaises");
const paginacionPaises = document.querySelector('.paginacionPaises');
const contadorPaginaPaises = document.querySelector("#contadorPaginaPaises");

const tituloPaises = document.querySelector('.tituloPaises');
const tituloAtletas = document.querySelector('.tituloAtletas');
const tituloEquidad = document.querySelector('.tituloEquidad');
const textoEquidad = document.querySelector('.textoEquidad');
const linkPaises = document.querySelector('.Paises');
const linkAtletas = document.querySelector('.Atletas');
const linkEquidad = document.querySelector('.Equidad');
const containerPaises = document.querySelector('.seccionPaises');
const containerAtletas = document.querySelector('.seccionAtletas');
const containerEquidad = document.querySelector('.seccionEquidad');
//const cardAtleta = document.querySelectorAll('.cardAtleta');
const dialog = document.querySelector('dialog');

const menuPaises = document.getElementById('menuPaises');
//const menuDesplegable = document.querySelector('.menuDesplegable');
const todosPaises = document.querySelector('.optTodos');
const contenidoMenuPaises = menuPaises.innerHTML;
//const contenidoMenuDesplegable = menuDesplegable.innerHTML;

const contenidoTituloAtletas = tituloAtletas.innerHTML;
const contenidoTituloPaises = tituloPaises.innerHTML;


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

    //const nombresPorPais = [...new Set(nombresUnicosFiltrados.map(athlete => athlete.name))].sort();
    //console.log(nombresPorPais);

    renderizarPaises(nombresUnicosFiltrados, containerAtletas);  
  } else if (todosPaises) {
    renderizar ();
    primeraPagina(); // Para que regrese a la primera página
    paginaActual = 1;
    // Agrega todos los elementos de paginación nuevamente
    paginacionAtletas.appendChild(btnPagPrimera);
    paginacionAtletas.appendChild(botonAtras);
    paginacionAtletas.appendChild(contadorPagina);
    paginacionAtletas.appendChild(botonSiquiente);
    paginacionAtletas.appendChild(btnPagUltima);
  } else {
    containerAtletas.innerHTML = '';
    alert("Seleccione un país para filtrar");
  }
});

// FUNCION QUE LLENA EL NUEVO DOM A PARTIR DE LAS VARIABLLES
function renderizar(){
  const cargaDatos = obtenerDatos(paginaActual);
  contadorPagina.textContent = `${paginaActual} / ${paginasTotales}`;

  tituloAtletas.innerHTML = contenidoTituloAtletas; // Cargar título atletas
  containerAtletas.innerHTML = ''; // Limpiar el contenido previo
  paginacionAtletas.innerHTML = ''; // Devolver paginación a cero

  tituloAtletas.style.display = "flex";
  containerAtletas.style.display = "grid";
  paginacionAtletas.style.display = "flex";
  menuPaises.style.display = "inline-block";
  menuPaises.innerHTML = contenidoMenuPaises; // Cargar menú desplegable

  tituloPaises.style.display = "none";
  containerPaises.style.display = "none";
  paginacionPaises.style.display = "none";
  tituloEquidad.style.display = "none";
  textoEquidad.style.display = "none";
  containerEquidad.style.display = "none";
  dialog.style.display = "none";

  //menuDesplegable.innerHTML = contenidoMenuDesplegable;
  cargarOpcionesMenu(paisesUnicos, menuPaises);
  
  paginacionAtletas.appendChild(btnPagPrimera);
  paginacionAtletas.appendChild(botonAtras);
  paginacionAtletas.appendChild(contadorPagina);
  paginacionAtletas.appendChild(botonSiquiente);
  paginacionAtletas.appendChild(btnPagUltima);

  cargaDatos.forEach(function (datosSeccion){
    const atletas = document.createElement("div");
    atletas.classList.add("cardAtleta");

    // Actualizar el contenido del elemento de la card
    const card = document.createElement("p");
    card.textContent = datosSeccion.name;
    atletas.appendChild(card);
    containerAtletas.appendChild(atletas);

    // Evento de clic en la card de atleta para mostrar modal
    atletas.addEventListener('click', () => {
      mostrarModal(datosSeccion); // Llama a la función para mostrar el modal
      dialog.style.display = "flex";
    });
    
  });
  gestionBotones(); // Llamar a gestionBotones para actualizar los botones
}

// MODAL
// Función para mostrar el modal con los datos del atleta seleccionado
function mostrarModal(datosSeccion) {
  modal.innerHTML =  '';

  const cerrar = document.createElement("button");
  cerrar.textContent = `x`;
  modal.appendChild(cerrar);
  cerrar.addEventListener('click', () => {
    dialog.style.display = "none";
    modal.close();
  });
  
  const nombre = document.createElement("p");
  nombre.textContent = `${datosSeccion.name}`;
  modal.appendChild(nombre);
  nombre.style.backgroundColor = "#FCBE0E";
  nombre.style.height = "4rem";
  nombre.style.fontWeight = "500";

  const edad = document.createElement("p");
  edad.textContent = `Edad: ${datosSeccion.age}`;
  modal.appendChild(edad);

  const genero = document.createElement("p");
  genero.textContent = `Género: ${datosSeccion.gender}`;
  modal.appendChild(genero);

  const peso = document.createElement("p");
  peso.textContent = `Peso: ${datosSeccion.weight} kg`;
  modal.appendChild(peso);

  const altura = document.createElement("p");
  altura.textContent = `Altura: ${datosSeccion.height} cm`;
  modal.appendChild(altura);

  const equipo = document.createElement("p");
  equipo.textContent = `País: ${datosSeccion.team}`;
  modal.appendChild(equipo);

  const deporte = document.createElement("p");
  deporte.textContent = `Deporte: ${datosSeccion.sport}`;
  modal.appendChild(deporte);

  modal.showModal();
}

// Evento de clic en el modal para cerrarlo
modal.addEventListener('click', () => {
  dialog.style.display = "none";
  modal.close();
});



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

// RENDERIZAR LOS ATLETAS SEGÚN EL PAÍS SELECCIONADO
function renderizarPaises (nombresUnicos, container){
  container.innerHTML = '';
  modal.innerHTML =  '';
  dialog.style.display = "none";
  modal.close();
  paginacionAtletas.innerHTML = ''; // Elimina los botones de paginación una vez filtrados los atletas por país

  menuPaises.innerHTML = contenidoMenuPaises; // Cargar menú desplegable
  //menuDesplegable.innerHTML = contenidoMenuDesplegable;
  cargarOpcionesMenu(paisesUnicos, menuPaises);

  //vover a quitar repetidos y ordenarlos alfabeticamente
  const atletasPorPais = [...new Set(nombresUnicos.map(athlete => athlete.name))].sort();
  
  atletasPorPais.forEach(nombre => {
    //aquí obtendremos solo el nombre para las cards pero sin perder la información completa
    const atleta = nombresUnicos.find(athlete => athlete.name === nombre);
    const atletas = document.createElement("div");
    atletas.classList.add("cardAtleta");
    atletas.textContent = nombre;
    container.appendChild(atletas);

    // Cargar el modal en la sección por paises // NO FUNCIONA !!!
    atletas.addEventListener('click', () => {
      mostrarModal(atleta);
      dialog.style.display = "flex";
    });
  });
}

// Llama a los botones para avanzar o retroceder
botonAtras.addEventListener("click", retrocederPagina);
botonSiquiente.addEventListener('click', avanzarPagina);
btnPagPrimera.addEventListener('click', primeraPagina);
btnPagUltima.addEventListener('click', ultimaPagina);





// LLENAR EL NUEVO DOM A PARTIR DE PAISES //

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
  menuPaises.innerHTML = ''; // Eliminar filtro por paises
  paginacionPaises.innerHTML = '';

  tituloPaises.style.display = "flex";
  tituloPaises.innerHTML = contenidoTituloPaises; // Mostrar título
  //menuDesplegable.innerHTML = '';
  containerPaises.style.display = "grid";
  paginacionPaises.style.display = "flex";

  tituloAtletas.style.display = "none";
  containerAtletas.style.display = "none";
  paginacionAtletas.style.display = "none";
  menuPaises.style.display = "none";

  tituloEquidad.style.display = "none";
  textoEquidad.style.display = "none";
  containerEquidad.style.display = "none";

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

// Llama a los botones para avanzar o retroceder
botonAtrasPaises.addEventListener("click", retrocederPaginaPaises);
botonSiquientePaises.addEventListener('click', avanzarPaginaPaises);
btnPagPrimeraPaises.addEventListener('click', primeraPaginaPaises);
btnPagUltimaPaises.addEventListener('click', ultimaPaginaPaises);



// FUNCION PARA RENDERIZAR EQUIDAD DE GÉNERO
function renderizarEquidad(){

  containerEquidad.innerHTML = ''; // Limpiar el contenido previo
  tituloEquidad.style.display = "grid";
  textoEquidad.style.display = "grid";
  containerEquidad.style.display = "grid";

  tituloAtletas.style.display = "none";
  containerAtletas.style.display = "none";
  paginacionAtletas.style.display = "none";
  menuPaises.style.display = "none";
  tituloPaises.style.display = "none";
  containerPaises.style.display = "none";
  paginacionPaises.style.display = "none";

  const paisesOrdenadosPorMujeres = ordenarPaisesMujeres(mujeresPorPais);

  // Cargar los nombres de paises en  cards
  paisesOrdenadosPorMujeres.forEach(pais => {
    const cardEquidad = document.createElement("div");
    cardEquidad.classList.add("cardEquidad");
    const nombrePais = document.createElement("p");
    nombrePais.textContent = pais;
    cardEquidad.appendChild(nombrePais);

    // Obtener las mujeres por país del objeto mujeresPorPais
    const mujeresPais = mujeresPorPais[pais];
    if (mujeresPais) {
      const mujeresInfo = document.createElement("div");
      mujeresInfo.textContent = `${mujeresPais.F}`;
      /*mujeresInfo.innerHTML = `
      <p>MUJERES: ${mujeresPais.F}</p>
      <p>HOMBRES: ${mujeresPais.M}</p>`;*/
      mujeresInfo.classList.add("gender");
      cardEquidad.appendChild(mujeresInfo);

      // Integrar la función colorear para cambiar el color de fondo
      const contenidoDiv = mujeresInfo.textContent; // Obtiene el contenido del div como texto ("149")
      const cantidad = parseInt(contenidoDiv, 10);
      if (cantidad >= 70) {
        cardEquidad.style.backgroundColor = "#2B993e";
        cardEquidad.style.color = "white";
      } else if (cantidad >= 10) {
        cardEquidad.style.backgroundColor = "#FCBE0E";
      } else if (cantidad >= 2) {
        cardEquidad.style.backgroundColor = "#F47320";
      } else {
        cardEquidad.style.backgroundColor = "#F2511C";
      }
    }
    containerEquidad.appendChild(cardEquidad);
  });
}

// Contar las mujeres por equipo
const mujeresPorPais = conteoMujeres(athletes.athletes);


// Acciones cuando se da click en el menú de la barra de navegación
linkPaises.addEventListener("click", renderizarCardsPaises);
linkAtletas.addEventListener("click", renderizar);
linkEquidad.addEventListener("click", renderizarEquidad);


// FUNCIÓN PARA CERRAR EL MENÚ DESPLEGABLE CON EL TOGGLE
document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".menu a");
  const toggle = document.getElementById("toggle");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggle.checked = false; // Cierra el menú al hacer clic en un enlace
    });
  });
});


// CREAR GRÁFICA DE BARRAS // NO FUNCIONA //
/*google.charts.load("current", {packages:["bar", "corechart"]});
google.charts.setOnLoadCallback(drawChart);*/

google.load('visualization','1.0',{'packages':['corechart']});
google.setOnLoadCallback(drawChart);
function drawChart () {
  const data = new google.visualization.DataTable();
  data.addColumn('string','País');
  data.addColumn('number','# Mujeres');
  data.addRows(
    [
      ['USA',     149],
      ['Russia',   82],
      ['China',    75],
      ['Germany',  63],
      ['Canada',   59],
    ]
  );
  const options = {
    title: 'Mujeres participantes por país'};
  const chart = new google.visualization.BarChart(document.getElementById('grafica'));
  chart.draw(data, options);
}





/* FUNCIONAMIENTO PARA EL MODAL
const atletaSeleccionado = cardAtleta.value;
console.log(atletaSeleccionado);
const datosAtletas = document.createElement("p");
datosAtletas.textContent = `${atletaSeleccionado.name}`;
datosAtletas.classList.add("modal");
modal.appendChild(datosAtletas);
atletas.addEventListener('click', () => {
  modal.showModal()
})
const btnCerrarDatos = document.getElementById('btnCerrarDatos');
//CERRAR MODAL (POR DEFECTO YA ESCUCHA ALFUNAS TECLAS COMO "ESC")
btnCerrarDatos.addEventListener('click', () =>{
  const modal = document.querySelector('#modal');
  modal.close();
}); */


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