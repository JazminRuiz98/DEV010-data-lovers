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

// FUNCION PARA ORDENAR AFABETICAMENTE
export function ordenar (athletes) {
  return athletes.sort((a,b) => a.name.localeCompare(b.name));
}
// agregar comparador de ordenación - función de comparación
/* La función de comparación debe retornar un valor negativo si el primer elemento 
debe estar antes que el segundo, cero si ambos elementos son equivalentes 
y un valor positivo si el primer elemento debe estar después que el segundo.*/

// FUNCION FILTRO POR PAIS
export function filtroPais (input, athletes) {
  return athletes.filter(item => item.team === input);
}

// FUNCION PARA ELIMINAR PAISES REPETIDOS Y ORDENARLOS
export function obtenerPaisesUnicosFiltrados (paisSeleccionado, athletes){
  const paisesFiltrados = filtroPais(paisSeleccionado, athletes);
  // eslint-disable-next-line no-undef
  const paisesUnicosOrdenados = [...new Set(paisesFiltrados.map(athlete => athlete.name))].sort();
  return paisesUnicosOrdenados;
}

// FUNCION PARA CONTAR MEDALLAS POR PAIS
export function conteoMedallas (athletes) {
  const medallasPorPais = {};
  athletes.forEach(athlete => {
    const pais = athlete.team;
    const medalla = athlete.medal;
    if (!medallasPorPais[pais]) {
      medallasPorPais[pais] = { Gold: 0, Silver: 0, Bronze: 0 };
    }
    if (medalla === "Bronze") {
      medallasPorPais[pais].Bronze++;
    } else if (medalla === "Silver") {
      medallasPorPais[pais].Silver++;
    } else if (medalla === "Gold") {
      medallasPorPais[pais].Gold++;
    }
  });
  return medallasPorPais;
}


// FUNCION CONTEO MEDALLAS //  BRENDA
/*
export function conteoMedallas(athletes) {

  const gold = [];
  const silver = [];
  const bronze = [];

  athletes.forEach (athlete => {
    const pais = athlete.team;
    const medalla = athlete.medal;
    if (medalla === "Gold") {
      gold.push(athlete[pais]);
    } else if (medalla === "Silver") {
      silver.push(athlete[pais]);
    } else if (medalla === "Bronze") {
      bronze.push(athlete[pais]);
    }
  });
  const result = `Gold: ${gold.length} Silver: ${silver.length} Bronze: ${bronze.length}`;
  return result;
}
*/

// FUNCION CONTEO MEDALLAS // JAZZ
/*
export function conteoMedallas(athletes){
  let medallaBronce = 0;
  let medallaPlata = 0;
  let medallaOro = 0;

  for (let i = 0; i < athletes.length; i++){
    if (athletes[i].medal === 'Bronze') {
      medallaBronce++;
    }
    else if (athletes[i].medal === 'Silver') {
      medallaPlata++;
    }
    else if(athletes[i].medal === 'Gold'){
      medallaOro++;
    }
  }
  return {
    Bronce: medallaBronce,
    Plata: medallaPlata,
    Oro: medallaOro 
  };
}*/

// FUNCION CONTEO MEDALLAS // CHATGPT
/*
export function conteoMedallas(athletes){
  const medallasPorPais = {}; // Donde las va a guardar

  let medallaBronce = 0;
  let medallaPlata = 0;
  let medallaOro = 0;

  for (let i = 0; i < athletes.length; i++){
    if (athletes[i].medal === 'Bronze') {
      medallaBronce++;
    }
    else if (athletes[i].medal === 'Silver') {
      medallaPlata++;
    }
    else if(athletes[i].medal === 'Gold'){
      medallaOro++;
    }

    const pais = atletas[i].team;

    if (!medallasPorPais[pais]) {
      medallasPorPais[pais] = {
        Bronze: 0,
        Silver: 0,
        Gold: 0,
      };
    }
    medallasPorPais[pais].Bronze = medallaBronce;
    medallasPorPais[pais].Silver = medallaPlata;
    medallasPorPais[pais].Gold = medallaOro;
}
return medallasPorPais;
}
*/


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
