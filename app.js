// Obtener todas las filas de la tabla (excepto la primera, que contiene los encabezados)
const filasJugadores = document.querySelectorAll('tbody tr');


// Crear un objeto para almacenar los contadores y porcentajes de cada jugador
const estadisticasJugadores = {};
// Iterar sobre cada fila de jugadores

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
  const celdaNombre = fila.querySelector('.nombre-jugador');

  if (celdaNombre) {
    // Obtener el nombre del jugador de la celda
    const nombreJugador = celdaNombre.textContent;

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

    // Agregar evento de doble clic para cambiar el nombre del jugador
    celdaNombre.addEventListener('dblclick', function () {
      const nuevoNombre = prompt('Ingresa el nuevo nombre del jugador:', nombreJugador);
      if (nuevoNombre !== null && nuevoNombre.trim() !== '') {
        const nombreAnterior = nombreJugador;
        const nuevoNombreJugador = nuevoNombre.trim().toUpperCase();
        estadisticasJugadores[nuevoNombreJugador] = estadisticasJugadores[nombreAnterior];
        delete estadisticasJugadores[nombreAnterior];

        // Actualizar el contenido de la celda con el nuevo nombre
        this.textContent = nuevoNombreJugador;
        // Actualizar la lista de resultados
        //actualizarResultados();
      }
    });
  }

  // Obtener los botones de flecha de cada columna para el jugador actual
  const botonesSaque = fila.querySelectorAll('td:nth-child(2) button');
  const botonesRecepcion = fila.querySelectorAll('td:nth-child(3) button');
  const botonesAtaque = fila.querySelectorAll('td:nth-child(4) button');

  function reproducirIncremento() {
    const audio = new Audio('botonincremento.wav'); // Reemplaza 'ruta_del_sonido.wav' con la ruta correcta de tu archivo de sonido
    audio.play();
  }


  // Función para incrementar el contador y actualizar el resultado
  function incrementarConteo(contenedor, tipo) {

    const nombreJugador = contenedor.closest('tr').querySelector('.nombre-jugador').textContent;
    let estadisticas = estadisticasJugadores[nombreJugador];
    if (!estadisticas) {
      estadisticasJugadores[nombreJugador] = {
        saquePositivo: 0,
        saqueNegativo: 0,
        recepcionPositivo: 0,
        recepcionNegativo: 0,
        ataquePositivo: 0,
        ataqueNegativo: 0
      };
      estadisticas = estadisticasJugadores[nombreJugador];
    }
    reproducirIncremento();



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

    contenedor.classList.add('efecto-flecha');
    setTimeout(function () {
      contenedor.classList.remove('efecto-flecha');
    }, 300); // 2000 milisegundos = 2 segundos

    // Actualizar la lista de resultados
    actualizarResultados();
  }

  // Agregar botón Eliminar a la fila
  const eliminarJugadorBtn = document.createElement('button');
  eliminarJugadorBtn.textContent = 'Eliminar';
  eliminarJugadorBtn.style.backgroundColor = 'red';
  eliminarJugadorBtn.style.color = 'white';
  eliminarJugadorBtn.style.border = 'none';
  eliminarJugadorBtn.style.marginTop = '40px';
  eliminarJugadorBtn.style.padding = '10px 10px';
  eliminarJugadorBtn.style.borderRadius = '10px';
  eliminarJugadorBtn.style.cursor = 'pointer';
  eliminarJugadorBtn.textContent = 'Eliminar';
  eliminarJugadorBtn.addEventListener('click', function () {
    // Obtener el nombre del jugador de la celda
    const nombreJugador = this.closest('tr').querySelector('.nombre-jugador').textContent;

    // Eliminar las estadísticas del jugador
    delete estadisticasJugadores[nombreJugador];

    // Eliminar la fila de la tabla
    this.closest('tr').remove();

    // Actualizar la lista de resultados
    actualizarResultados();
  });

  // Agregar el botón al final de la fila
  fila.appendChild(eliminarJugadorBtn);


  //************** */
  // Obtener el elemento de la tabla
  const tablaJugadores = document.querySelector('table');

  // Crear el botón para agregar jugadores
  const agregarJugadorBtn = document.createElement('button');
  agregarJugadorBtn.textContent = 'Agregar Jugador';
  agregarJugadorBtn.style.backgroundColor = 'green';
  agregarJugadorBtn.style.color = 'white';
  agregarJugadorBtn.style.marginLeft = '50%';
  agregarJugadorBtn.style.border = 'none';
  agregarJugadorBtn.style.marginBottom = '20px';
  agregarJugadorBtn.style.padding = '10px 10px';
  agregarJugadorBtn.style.borderRadius = '10px';
  agregarJugadorBtn.style.cursor = 'pointer';

  // Función para agregar un jugador a la tabla
  function agregarJugador() {
    const nombreJugador = prompt('Ingresa el nombre del jugador:');
    if (nombreJugador && nombreJugador.trim() !== '') {
      const nuevaFila = document.createElement('tr');
      const celdaNombre = document.createElement('td');
      const celdaSaque = document.createElement('td');
      const celdaRecepcion = document.createElement('td');
      const celdaAtaque = document.createElement('td');

      const nuevoNombreJugador = nombreJugador.trim().toUpperCase();

      celdaNombre.innerHTML = nuevoNombreJugador;
      celdaNombre.classList.add('nombre-jugador');

      const botonesSaque = document.createElement('td');
      const botonSaqueUp = document.createElement('button');
      const botonSaqueDown = document.createElement('button');
      const imagenSaqueUp = document.createElement('img');
      const imagenSaqueDown = document.createElement('img');

      const botonesRecepcion = document.createElement('td');
      const botonRecepcionUp = document.createElement('button');
      const botonRecepcionDown = document.createElement('button');
      const imagenRecepcionUp = document.createElement('img');
      const imagenRecepcionDown = document.createElement('img');

      const botonesAtaque = document.createElement('td');
      const botonAtaqueUp = document.createElement('button');
      const botonAtaqueDown = document.createElement('button');
      const imagenAtaqueUp = document.createElement('img');
      const imagenAtaqueDown = document.createElement('img');

      botonSaqueUp.appendChild(imagenSaqueUp);
      botonSaqueDown.appendChild(imagenSaqueDown);
      botonRecepcionUp.appendChild(imagenRecepcionUp);
      botonRecepcionDown.appendChild(imagenRecepcionDown);
      botonAtaqueUp.appendChild(imagenAtaqueUp);
      botonAtaqueDown.appendChild(imagenAtaqueDown);

      imagenSaqueUp.src = 'imagenes/arrow_up.png';
      imagenSaqueUp.alt = 'Up';
      imagenSaqueDown.src = 'imagenes/arrow_down.png';
      imagenSaqueDown.alt = 'Down';
      imagenRecepcionUp.src = 'imagenes/arrow_up.png';
      imagenRecepcionUp.alt = 'Up';
      imagenRecepcionDown.src = 'imagenes/arrow_down.png';
      imagenRecepcionDown.alt = 'Down';
      imagenAtaqueUp.src = 'imagenes/arrow_up.png';
      imagenAtaqueUp.alt = 'Up';
      imagenAtaqueDown.src = 'imagenes/arrow_down.png';
      imagenAtaqueDown.alt = 'Down';

      botonesSaque.appendChild(botonSaqueUp);
      botonesSaque.appendChild(botonSaqueDown);
      botonesRecepcion.appendChild(botonRecepcionUp);
      botonesRecepcion.appendChild(botonRecepcionDown);
      botonesAtaque.appendChild(botonAtaqueUp);
      botonesAtaque.appendChild(botonAtaqueDown);

      nuevaFila.appendChild(celdaNombre);
      nuevaFila.appendChild(celdaSaque);
      nuevaFila.appendChild(celdaRecepcion);
      nuevaFila.appendChild(celdaAtaque);

      celdaSaque.appendChild(botonesSaque);
      celdaRecepcion.appendChild(botonesRecepcion);
      celdaAtaque.appendChild(botonesAtaque);

      // Agregar eventos de clic a los botones de flecha para incrementar el conteo
      botonSaqueUp.addEventListener('click', function () {
        incrementarConteo(this, 'saque');
      });

      botonSaqueDown.addEventListener('click', function () {
        incrementarConteo(this, 'saque');
      });

      botonRecepcionUp.addEventListener('click', function () {
        incrementarConteo(this, 'recepcion');
      });

      botonRecepcionDown.addEventListener('click', function () {
        incrementarConteo(this, 'recepcion');
      });

      botonAtaqueUp.addEventListener('click', function () {
        incrementarConteo(this, 'ataque');
      });

      botonAtaqueDown.addEventListener('click', function () {
        incrementarConteo(this, 'ataque');
      });

      // Agregar la fila al inicio de la tabla
      tablaJugadores.prepend(nuevaFila);

      // Actualizar la lista de resultados
      //actualizarResultados();


      actualizarResultados();


      // Agregar el botón al final de la fila
      fila.appendChild(eliminarJugadorBtn);

    }
  }

  // Agregar el evento de clic al botón de agregar jugador
  agregarJugadorBtn.addEventListener('click', agregarJugador);

  // Agregar el botón al inicio del documento
  document.body.insertBefore(agregarJugadorBtn, document.body.firstChild);



  //***************** */
});


