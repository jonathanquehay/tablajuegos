// Obtener todas las filas de la tabla (excepto la primera, que contiene los encabezados)
const filasJugadores = document.querySelectorAll('tbody tr');

// Crear un objeto para almacenar los contadores y porcentajes de cada jugador
const estadisticasJugadores = {};

// Función para calcular el porcentaje de rendimiento
function calcularPorcentaje(aciertos, total) {
  if (total === 0) {
    return '-'; // O también puedes usar '-' en lugar de 'N/A'
  }
  return ((aciertos / total) * 100).toFixed(2);
}

function calcularPorcentajeTotal(estadisticas) {
  const totalPositivo = estadisticas.saquePositivo + estadisticas.recepcionPositivo + estadisticas.ataquePositivo;
  const totalNegativo = estadisticas.saqueNegativo + estadisticas.recepcionNegativo + estadisticas.ataqueNegativo;
  const total = totalPositivo + totalNegativo;

  if (total === 0) {
    return '-';
  }

  const porcentaje = ((totalPositivo / total) * 100).toFixed(2);

  // Aplicar estilos según el valor del porcentaje
  let estilo = '';
  if (porcentaje <= 50) {
    estilo = 'color: red;';
  } else {
    estilo = 'color: green;';
  }

  return `<span style="${estilo} font-size: 40px;">${porcentaje}%</span>`;
}


// Función para actualizar la lista de resultados
function actualizarResultados() {
  const resultadosList = document.getElementById('resultados-list');
  resultadosList.innerHTML = '';

  // Iterar sobre los jugadores y agregarlos a la lista
  for (const jugador in estadisticasJugadores) {
    const estadisticas = estadisticasJugadores[jugador];
    const resultadoItem = document.createElement('li');
    resultadoItem.innerHTML = `<span>${jugador}</span><br><br>Saque (+${estadisticas.saquePositivo}/-${estadisticas.saqueNegativo} <span>${calcularPorcentaje(estadisticas.saquePositivo, estadisticas.saquePositivo + estadisticas.saqueNegativo)}%)</span><br> Recepción (+${estadisticas.recepcionPositivo}/-${estadisticas.recepcionNegativo}, <span>${calcularPorcentaje(estadisticas.recepcionPositivo, estadisticas.recepcionPositivo + estadisticas.recepcionNegativo)}%)</span> <br> Ataque (+${estadisticas.ataquePositivo}/-${estadisticas.ataqueNegativo}, <span>${calcularPorcentaje(estadisticas.ataquePositivo, estadisticas.ataquePositivo + estadisticas.ataqueNegativo)}%)</span> <br> AVG: ${calcularPorcentajeTotal(estadisticas)}`;
    resultadosList.appendChild(resultadoItem);
  }
}

// Iterar sobre cada fila de jugadores
filasJugadores.forEach(function (fila) {
  // Obtener el nombre del jugador de la primera celda de la fila
  const nombreJugador = fila.querySelector('td:first-child').textContent;

  // Verificar si el jugador ya existe en el objeto de estadísticas
  if (!estadisticasJugadores.hasOwnProperty(nombreJugador)) {
    // Si no existe, inicializar las estadísticas para ese jugador
    estadisticasJugadores[nombreJugador] = {
      saquePositivo: 0,
      saqueNegativo: 0,
      recepcionPositivo: 0,
      recepcionNegativo: 0,
      ataquePositivo: 0,
      ataqueNegativo: 0
    };
  }

  // Obtener los botones de flecha de cada columna para el jugador actual
  const botonesSaque = fila.querySelectorAll('td:nth-child(2) button');
  const botonesRecepcion = fila.querySelectorAll('td:nth-child(3) button');
  const botonesAtaque = fila.querySelectorAll('td:nth-child(4) button');

  // Función para incrementar el contador y actualizar el resultado
  function incrementarConteo(contenedor, tipo) {
    const estadisticas = estadisticasJugadores[nombreJugador];

    if (tipo === 'saque') {
      if (contenedor.firstChild.alt === 'Up') {
        estadisticas.saquePositivo++;
      }
      else if (contenedor.firstChild.alt === 'Down') {
        estadisticas.saqueNegativo++;
      }
    } else if (tipo === 'recepcion') {
      if (contenedor.firstChild.alt === 'Up') {
        estadisticas.recepcionPositivo++;
      } else if (contenedor.firstChild.alt === 'Down') {
        estadisticas.recepcionNegativo++;
      }
    } else if (tipo === 'ataque') {
      if (contenedor.firstChild.alt === 'Up') {
        estadisticas.ataquePositivo++;
      } else if (contenedor.firstChild.alt === 'Down') {
        estadisticas.ataqueNegativo++;
      }
    }

    // Actualizar la lista de resultados
    actualizarResultados();
  }

  // Asignar el evento de clic a los botones de flecha de cada columna
  botonesSaque.forEach(function (boton) {
    boton.addEventListener('click', function () {
      incrementarConteo(this, 'saque');
    });
  });

  botonesRecepcion.forEach(function (boton) {
    boton.addEventListener('click', function () {
      incrementarConteo(this, 'recepcion');
    });
  });

  botonesAtaque.forEach(function (boton) {
    boton.addEventListener('click', function () {
      incrementarConteo(this, 'ataque');
    });
  });
});