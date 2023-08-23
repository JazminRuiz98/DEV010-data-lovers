// AQUÍ VAN TODAS LAS FUNCIONES QUE OBTIENEN, PROCESASN Y MANIPULAN DATOS //

// FUNCION PARA ELIMINAR NOMBRES REPETIDOS
export function eliminarRepetidos(athletes) { 
  const atletasUnicos = [];
  const nombresVistos = [];
  athletes.forEach(athlete => {
    if (nombresVistos.includes(athlete.name)) {
      // No hacer nada si el nombre ya está en nombresVistos
    } else {
      nombresVistos.push(athlete.name);
      atletasUnicos.push(athlete);
    }
  });
  return atletasUnicos;
}

// FUNCION PARA ORDENAR ALFABETICAMENTE
export function ordenar (athletes) {
  return athletes.sort((a,b) => a.name.localeCompare(b.name));
}
// agregar comparador de ordenación - función de comparación
/* La función de comparación debe retornar un valor negativo si el primer elemento 
debe estar antes que el segundo, cero si ambos elementos son equivalentes 
y un valor positivo si el primer elemento debe estar después que el segundo.*/

// FUNCION FILTRO POR PAIS
export function filtroPais(input, athletes) {
  return athletes.filter(item => item.team === input);
}

// FUNCION PARA ELIMINAR PAISES REPETIDOS Y ORDENARLOS
export function obtenerPaisesUnicosFiltrados (paisSeleccionado, athletes){
  const paisesFiltrados = filtroPais(paisSeleccionado, athletes);
  // eslint-disable-next-line no-undef
  const paisesUnicosOrdenados = [...new Set(paisesFiltrados.map(athlete => athlete.name))].sort();
  return paisesUnicosOrdenados;
}

//Función para sacar el nombre de los paises
/*export function infoPaises(athletes) {
  // Obtener los nombres únicos de los países de la lista de atletas
  // eslint-disable-next-line no-undef
  const paisesUnicos = [...new Set(athletes.map(athlete => athlete.team))].sort();
  return paisesUnicos;
}*/
/*
// FUNCION FILTRO POR PAIS
// Filtrar y ordenar los nombres eliminando repetidos
export function filtroPais(paisSeleccionado, athletes) {
  const paisesFiltrados = athletes.filter(item => item.team === paisSeleccionado);
  const paisesUnicosOrdenados = [...new Set(paisesFiltrados.map(athlete => athlete.name))].sort();
  return paisesUnicosOrdenados;
}

function renderizarPorPaises(paisesUnicosOrdenados, container) {
  container.innerHTML = '';
  paginacion.innerHTML = '';
  paisesUnicosOrdenados.forEach(team => {
    const option = document.createElement('option');
    option.value = team;
    option.textContent = team;
    menuPaises.appendChild(option)});
  paisesUnicosOrdenados.forEach(nombre => {
    const nombreInfo = document.createElement("div");
    nombreInfo.classList.add("cardAtleta");
    nombreInfo.textContent = nombre;
    container.appendChild(nombreInfo);
  });
}

menuPaises.addEventListener('change', function() {
  const paisSeleccionado = menuPaises.value;
  if (paisSeleccionado) {
    const paisesFiltrados = filtroPais(paisSeleccionado, athletes.athletes);

    container.innerHTML = '';
    paginacion.innerHTML = '';

    nombresUnicosOrdenados.forEach(nombre => {
      const nombreInfo = document.createElement("div");
      nombreInfo.classList.add("cardAtleta");

      nombreInfo.textContent = nombre;
      container.appendChild(nombreInfo);
    });
  } else {
    container.innerHTML = '';
    alert("Seleccione un país para filtrar");
  }
});*/