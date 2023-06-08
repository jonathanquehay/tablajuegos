// Obtener todas las filas de la tabla (excepto la primera, que contiene los encabezados)
const filasJugadores = document.querySelectorAll('tbody tr');

// Crear un objeto para almacenar los contadores de cada jugador
const contadoresJugadores = {};

// Función para actualizar la lista de resultados
function actualizarResultados() {
  const resultadosList = document.getElementById('resultados-list');
  resultadosList.innerHTML = '';

  // Iterar sobre los jugadores y agregarlos a la lista
  for (const jugador in contadoresJugadores) {
    const contadores = contadoresJugadores[jugador];
    const resultadoItem = document.createElement('li');
    resultadoItem.textContent = `${jugador}: Saque (+${contadores.saquePositivo}/-${contadores.saqueNegativo}), Recepción (+${contadores.recepcionPositivo}/-${contadores.recepcionNegativo}), Ataque (+${contadores.ataquePositivo}/-${contadores.ataqueNegativo})`;
    resultadosList.appendChild(resultadoItem);
  }
}

// Iterar sobre cada fila de jugadores
filasJugadores.forEach(function (fila) {
  // Obtener el nombre del jugador de la primera celda de la fila
  const nombreJugador = fila.querySelector('td:first-child').textContent;

  // Verificar si el jugador ya existe en el objeto de contadores
  if (!contadoresJugadores.hasOwnProperty(nombreJugador)) {
    // Si no existe, inicializar los contadores para ese jugador
    contadoresJugadores[nombreJugador] = {
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
    const contadores = contadoresJugadores[nombreJugador];

    if (tipo === 'saque') {
      if (contenedor.firstChild.alt === 'Up') {
        contadores.saquePositivo++;
      } else if (contenedor.firstChild.alt === 'Down') {
        contadores.saqueNegativo++;
      }
    } else if (tipo === 'recepcion') {
      if (contenedor.firstChild.alt === 'Up') {
        contadores.recepcionPositivo++;
      } else if (contenedor.firstChild.alt === 'Down') {
        contadores.recepcionNegativo++;
      }
    } else if (tipo === 'ataque') {
      if (contenedor.firstChild.alt === 'Up') {
        contadores.ataquePositivo++;
      } else if (contenedor.firstChild.alt === 'Down') {
        contadores.ataqueNegativo++;
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
