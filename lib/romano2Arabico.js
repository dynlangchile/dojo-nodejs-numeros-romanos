
// Sacamos el parámetro de la línea de comandos
var romano = process.argv[2] || '';

// El usuario se va de chuchadas si no ingresa un parámetro ;-D
if (romano === '') {
  console.log('ingresa un parámetro po wn oh!');
  process.exit(0);
}

// Trabajemos los romanos en mayúsculas
romano = romano.toUpperCase();

// Inicia Arabescos
var arabico = 0;

/**
 *  Inicializa Vector de Equivalencias
 *
 *  Esta es la leyenda:
 *
 *  Primer índice:      Tramo (3: Miles, 2: Centenas, 1: Decenas, 0: Unidades).
 *  Segundo índice:     Longitud del númeral romano.
 *  Array (elementos):  El númeral romano y su valor en unidades.
 *
 */
var romanoToArabico =
  { 0 :
      { 4 : [ ['VIII',    8]
            ]
      , 3 : [ ['III',     3]
            , ['VII',     7]
            ]
      , 2 : [ ['VI',      6]
            , ['II',      2]
            , ['IX',      9]
            , ['IV',      4]
            ]
      , 1 : [ ['V',       5]
            , ['I',       1]
            ]
      }
  , 1 :
      { 4 : [ ['LXXX',    80]
            ]
      , 3 : [ ['XXX',     30]
            , ['LXX',     70]
            ]
      , 2 : [ ['LX',      60]
            , ['XX',      20]
            , ['XC',      90]
            , ['XL',      40]
            ]
      , 1 : [ ['L',       50]
            , ['X',       10]
            ]
      }
  , 2 :
      { 4 : [ ['DCCC',    800]
            ]
      , 3 : [ ['CCC',     300]
            , ['DCC',     700]
            ]
      , 2 : [ ['DC',      600]
            , ['CC',      200]
            , ['CM',      900]
            , ['CD',      400]
            ]
      , 1 : [ ['D',       500]
            , ['C',       100]
            ]
      }
  , 3 :
      { 4 : [ ['MMMM',    4000]
            ]
      , 3 : [ ['MMM',     3000]
            ]
      , 2 : [ ['MM',      2000]
            ]
      , 1 : [ ['M',       1000]
            ]
      }
  };

// Entry point (o `main()` para los chapados a la antigua)
procesaRomano(romano);

// Y la definición de la función de arriba
function procesaRomano (romano) {
  try {
    // Llamando inmediatamente a nuestra función recursiva:
    // (Empezamos del tramo de los miles `3` a procesar)
    arabico = procesaRomanoAux(romano, 3, 0);
    console.log('\nUd introdujo el romano: ' + romano);
    console.log('\nEsto me da como resultado el arábico: ' + arabico + '\n');
  } catch (e) {
    console.log(e);
  }

  // Salimos de la aplicación
  process.exit(0);
}

// Función auxiliar recursiva y todas las yerbas
// NOTA: `acc` es por acumulador
function procesaRomanoAux (romano, tramo, acc) {
  // Caso base (ya que es recursivo)
  if (tramo === -1) {
    if (romano.length === 0) {
      // Solo retornamos el valor si es que logramos "vaciar"
      // el romano, si no, es error
      return acc;
    } else {
      throw 'Error en el número romano ingresado!';
    }
  }

  // Resto de los casos:
  // El truco es iterar por tramo, e ir cambiando la longitud
  // Si encontramos _match_, agregamos y bajamos el tramo.
  for (var i = 4; i > 0; i--) {
    for (var j = romanoToArabico[tramo][i].length - 1; j >= 0; j--) {
      // Extraemos el valor buscado de nuestro objeto
      var valorBuscado = romanoToArabico[tramo][i][j][0];
      // La longitud, recordemos es `i`, así que hacemos substring con ese valor
      if (romano.substring(0, i) === valorBuscado) {
        // Encontramos el valor, bajamos un nivel, cortando el string
        return procesaRomanoAux( romano.substring(i, romano.length)
                               , tramo - 1
                               , acc + romanoToArabico[tramo][i][j][1]
                               );
      }
    }
  }

  // Si por alguna razón llegué acá, significa que no encontré el número
  // De todas maneras debo bajar un nivel de tramo
  return procesaRomanoAux(romano, tramo - 1, acc);
}

// Gracias !!!!
