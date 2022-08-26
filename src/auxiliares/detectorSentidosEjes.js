export const detectorSentidosEjes = (xArr, yArr, zArr, selected) => {
  /*declaramos las variables
 xMovement es la variable que guarda si es positivo o negativo,
 mainAxis guarda el eje principal del movimiento, 
 mainMovement guarda el movimiento principal, los general guardan las variables
 para renderizar en todos los ejes cuando se musetran los angulos, tambien una 
 variable side para el lado derecho o izquierdo si es el caso*/

  let xMovement,
    yMovement,
    zMovement,
    xGeneralMovement,
    yGeneralMovement,
    zGeneralMovement,
    mainAxis,
    mainMovement,
    mainMovementValue,
    side,
    axisMovement,
    planeMovement,
    xGeneralAxis,
    yGeneralAxis,
    zGeneralAxis,
    xGeneralPlane,
    yGeneralPlane,
    zGeneralPlane;

  /*---VALORES MAXIMOS Y MINIMOS DE CADA EJE---declaramos un obj que encuentra los valores maximos y minimos de 
  los arreglos de los angulos en funcion del tiempo, que vienen por parametros
  desde la carga del csv, obviamente siempre el mayor es el positivo*/
  const minMaxObj = {
    xMax: parseInt(Math.max.apply(null, xArr)),
    xMin: parseInt(Math.min.apply(null, xArr)),
    yMax: parseInt(Math.max.apply(null, yArr)),
    yMin: parseInt(Math.min.apply(null, yArr)),
    zMax: parseInt(Math.max.apply(null, zArr)),
    zMin: parseInt(Math.min.apply(null, zArr)),
  };

  /*---VALOR MAXIMO DE CADA EJE SEGUN SU VALOR ABSOLUTO---declaramos un condicional que compara los valores absolutos
  de los maximos y minimos de cada arreglo, si el valor mayor es 
  el positivo, el movement de cada eje se establece en 1, sino en cero.
  esto es fundamental para encontrar el movimiento principal*/

  if (Math.abs(minMaxObj.xMax) > Math.abs(minMaxObj.xMin)) {
    xMovement = 1;
  } else {
    xMovement = 0;
  }
  if (Math.abs(minMaxObj.yMax) > Math.abs(minMaxObj.yMin)) {
    yMovement = 1;
  } else {
    yMovement = 0;
  }
  if (Math.abs(minMaxObj.zMax) > Math.abs(minMaxObj.zMin)) {
    zMovement = 1;
  } else {
    zMovement = 0;
  }

  /*---EJE PRINCIPAL DE MOVIMIENTO--- declaramos un condicional para encontrar el eje principal de movimiento
  comparando los maximos positivos y negativos del mismo eje y de los ejes entre
  si, el mayor valor es el eje principal*/

  if (
    (Math.abs(minMaxObj.xMax) || Math.abs(minMaxObj.xMin)) >
      (Math.abs(minMaxObj.yMax) || Math.abs(minMaxObj.yMin)) &&
    (Math.abs(minMaxObj.xMax) || Math.abs(minMaxObj.xMin)) >
      (Math.abs(minMaxObj.zMax) || Math.abs(minMaxObj.zMin))
  ) {
    mainAxis = "x";
  } else if (
    (Math.abs(minMaxObj.yMax) || Math.abs(minMaxObj.yMin)) >
      (Math.abs(minMaxObj.xMax) || Math.abs(minMaxObj.xMin)) &&
    (Math.abs(minMaxObj.yMax) || Math.abs(minMaxObj.yMin)) >
      (Math.abs(minMaxObj.zMax) || Math.abs(minMaxObj.zMin))
  ) {
    mainAxis = "y";
  } else if (
    (Math.abs(minMaxObj.zMax) || Math.abs(minMaxObj.zMin)) >
      (Math.abs(minMaxObj.xMax) || Math.abs(minMaxObj.xMin)) &&
    (Math.abs(minMaxObj.zMax) || Math.abs(minMaxObj.zMin)) >
      (Math.abs(minMaxObj.yMax) || Math.abs(minMaxObj.yMin))
  ) {
    mainAxis = "z";
  }

  /*MOVIMIENTO DEFINITIVO: sabiendo el eje principal y el sentido, y obviamente como 
  esta colocado el dispositivo, declaramos un condicional comparando
  estas variables y estableciendo el movimiento definitivo*/

  /*-----------------------COLUMNA CERVICAL Y DORSOLUMBAR  --- 
  
  COLUMNA CERVICAL Dispositivo: ubicacion parte posterior de la cabeza
  y sentido "y" hacia cefálico */
  /*COLUMNA DORSOLUMBAR Dispositivo: línea media, parte posterior, por debajo de C7
  y sentido "y" hacia cefálico */

  if (
    //si el eje principal es x
    mainAxis === "x" &&
    //y el sentido es negativo
    xMovement === 0 &&
    // y la seleccion es cervical o dorsolumbar:
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    //entonces el movimiento principal es de flexion
    mainMovement = "flexión";
    //el eje es laterolateral
    axisMovement = "laterolateral";
    //el plano es sagital
    planeMovement = "sagital";
    /*y ahora un definiciones y condicionales para el renderizado del 
    analisis de todos los ejes*/

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotación izquierda";
      yGeneralAxis = "céfalocaudal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación derecha";
      yGeneralAxis = "céfalocaudal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "inclinación derecha";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    } else if (zMovement === 1) {
      zGeneralMovement = "inclinación izquierda";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    mainMovement = "extensión";
    axisMovement = "laterolateral";
    planeMovement = "sagital";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotación izquierda";
      yGeneralAxis = "céfalocaudal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación derecha";
      yGeneralAxis = "céfalocaudal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "inclinación derecha";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    } else if (zMovement === 1) {
      zGeneralMovement = "inclinación izquierda";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 0 &&
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    mainMovement = "rotación derecha";
    side = "derecha";
    axisMovement = "céfalocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "flexión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "inclinación derecha";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    } else if (zMovement === 1) {
      zGeneralMovement = "inclinación izquierda";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    mainMovement = "rotación izquierda";
    side = "izquierda";
    axisMovement = "céfalocaudal";
    planeMovement = "transversal";
    if (xMovement === 0) {
      xGeneralMovement = "flexión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "inclinación derecha";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    } else if (zMovement === 1) {
      zGeneralMovement = "inclinación izquierda";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    }
  } else if (
    mainAxis === "z" &&
    zMovement === 0 &&
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    mainMovement = "inclinación derecha";

    axisMovement = "anteroposterior";
    planeMovement = "frontal";
    if (xMovement === 0) {
      xGeneralMovement = "flexión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación izquierda";
      yGeneralAxis = "céfalocaudal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación derecha";
      yGeneralAxis = "céfalocaudal";
      yGeneralPlane = "transversal";
    }

    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  } else if (
    mainAxis === "z" &&
    zMovement === 1 &&
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    mainMovement = "inclinación";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
    if (xMovement === 0) {
      xGeneralMovement = "flexión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación izquierda";
      yGeneralAxis = "céfalocaudal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación derecha";
      yGeneralAxis = "céfalocaudal";
      yGeneralPlane = "transversal";
    }

    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  }

  /**-----------FINALIZA COLUMNA CERVICAL Y DORSOLUMBAR  -------*/

  /*------------------MIEMBROS SUPERIORES ---------------*/
  /*---BRAZO Derecho--- Dispositivo: parte lateral media del brazo
  y sentido "y" hacia cefálico */
  if (mainAxis === "x" && xMovement === 0 && selected === "brazo derecho") {
    mainMovement = "abducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "brazo derecho"
  ) {
    mainMovement = "aducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  }
  if (mainAxis === "y" && yMovement === 0 && selected === "brazo derecho") {
    mainMovement = "rotación externa";
    axisMovement = "céfalocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    selected === "brazo derecho"
  ) {
    mainMovement = "rotación interna";
    axisMovement = "céfalocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "z" &&
    zMovement === 0 &&
    selected === "brazo derecho"
  ) {
    mainMovement = "extensión";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  } else if (
    mainAxis === "z" &&
    zMovement === 1 &&
    selected === "brazo derecho"
  ) {
    mainMovement = "flexión";

    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  }

  /*---BRAZO izquierdo--- Dispositivo: parte lateral media del brazo
  y sentido "y" hacia cefálico */
  if (mainAxis === "x" && xMovement === 0 && selected === "brazo izquierdo") {
    mainMovement = "abducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "brazo izquierdo"
  ) {
    mainMovement = "aducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  }
  if (mainAxis === "y" && yMovement === 0 && selected === "brazo izquierdo") {
    mainMovement = "rotación interna";
    axisMovement = "céfalocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    selected === "brazo izquierdo"
  ) {
    mainMovement = "rotación externa";
    axisMovement = "céfalocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "z" &&
    zMovement === 0 &&
    selected === "brazo izquierdo"
  ) {
    mainMovement = "flexión";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  } else if (
    mainAxis === "z" &&
    zMovement === 1 &&
    selected === "brazo izquierdo"
  ) {
    mainMovement = "extensión";

    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  }

  /*---ANTEBRAZO derecho--- Dispositivo: parte anterior del
  antebrazo (o en la mano?)y sentido "y" hacia cefálico, partimos de la posicion intermedia
  con el pulgar hacia arriba */

  if (mainAxis === "x" && xMovement === 0 && selected === "antebrazo derecho") {
    mainMovement = "flexión";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
    if (yMovement === 0) {
      yGeneralMovement = "supinación";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "pronación";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "rotación xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotación inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "antebrazo derecho"
  ) {
    mainMovement = "extensión";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
    if (yMovement === 0) {
      yGeneralMovement = "supinación";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "pronación";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "rotación xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotación inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 0 &&
    selected === "antebrazo derecho"
  ) {
    mainMovement = "supinacion";
    axisMovement = "longitudinal";
    planeMovement = "transversal";
    if (xMovement === 0) {
      xGeneralMovement = "flexión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extensión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;
    if (zMovement === 0) {
      zGeneralMovement = "rotación xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotación inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    selected === "antebrazo derecho"
  ) {
    mainMovement = "pronación";
    axisMovement = "longitudinal";
    planeMovement = "transversal";
    if (xMovement === 0) {
      xGeneralMovement = "flexión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extensión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;
    if (zMovement === 0) {
      zGeneralMovement = "rotación xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotación inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  }
  /*ANTEBRAZO IZQUIERDO */

  if (
    mainAxis === "x" &&
    xMovement === 0 &&
    selected === "antebrazo izquierdo"
  ) {
    mainMovement = "flexión";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "pronación";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "supinación";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "rotación xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotación inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "antebrazo izquierdo"
  ) {
    mainMovement = "extensión";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
    if (yMovement === 0) {
      yGeneralMovement = "pronación";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "supinación";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "rotación xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotación inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 0 &&
    selected === "antebrazo izquierdo"
  ) {
    mainMovement = "pronación";
    axisMovement = "longitudinal";
    planeMovement = "transversal";
    if (xMovement === 0) {
      xGeneralMovement = "flexión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extensión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;
    if (zMovement === 0) {
      zGeneralMovement = "rotación xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotación inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    selected === "antebrazo izquierdo"
  ) {
    mainMovement = "supinación";
    axisMovement = "longitudinal";
    planeMovement = "transversal";
    if (xMovement === 0) {
      xGeneralMovement = "flexión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extensión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;
    if (zMovement === 0) {
      zGeneralMovement = "rotación xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotación inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  }

  /*MANO derecha, el dispositivo en la palma de la mano, con el sentido
  del eje "y" proximal */
  if (mainAxis === "x" && xMovement === 0 && selected === "mano derecha") {
    mainMovement = "flexión";
    axisMovement = "laterolateral";
    planeMovement = "sagital";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "abducción";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    } else if (zMovement === 1) {
      zGeneralMovement = "aducción";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "mano derecha"
  ) {
    mainMovement = "extensión";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
    if (yMovement === 0) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "abducción";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    } else if (zMovement === 1) {
      zGeneralMovement = "aducción";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    }
  } else if (
    mainAxis === "z" &&
    xMovement === 0 &&
    selected === "mano derecha"
  ) {
    mainMovement = "abducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
    if (xMovement === 0) {
      xGeneralMovement = "flexión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
  } else if (
    mainAxis === "z" &&
    xMovement === 1 &&
    selected === "mano derecha"
  ) {
    mainMovement = "aducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
    if (xMovement === 0) {
      xGeneralMovement = "flexión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
  }
  /*MANO IZQUIERDA, el dispositivo en la palma de la mano, con el sentido
  del eje "y" proximal */
  if (mainAxis === "x" && xMovement === 0 && selected === "mano izquierda") {
    mainMovement = "flexión";
    axisMovement = "laterolateral";
    planeMovement = "sagital";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "aducción";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    } else if (zMovement === 1) {
      zGeneralMovement = "abducción";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "mano izquierda"
  ) {
    mainMovement = "extensión";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
    if (yMovement === 0) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "aducción";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    } else if (zMovement === 1) {
      zGeneralMovement = "abducción";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    }
  } else if (
    mainAxis === "z" &&
    xMovement === 0 &&
    selected === "mano izquierda"
  ) {
    mainMovement = "aducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
    if (xMovement === 0) {
      xGeneralMovement = "flexión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
  } else if (
    mainAxis === "z" &&
    xMovement === 1 &&
    selected === "mano izquierda"
  ) {
    mainMovement = "abducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
    if (xMovement === 0) {
      xGeneralMovement = "flexión";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
  }
  /****************** FINALIZA MIEMBROS SUPERIORES ************** */

  /********************** MIEMBROS INFERIORES ************** */

  /*---MUSLO Derecho--- Dispositivo: parte lateral media del muslo
  y sentido "y" hacia cefálico */
  if (mainAxis === "x" && xMovement === 0 && selected === "muslo derecho") {
    mainMovement = "abducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "muslo derecho"
  ) {
    mainMovement = "aducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  }
  if (mainAxis === "y" && yMovement === 0 && selected === "muslo derecho") {
    mainMovement = "rotación externa";
    axisMovement = "céfalocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    selected === "muslo derecho"
  ) {
    mainMovement = "rotación interna";
    axisMovement = "céfalocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "z" &&
    zMovement === 0 &&
    selected === "muslo derecho"
  ) {
    mainMovement = "extensión";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  } else if (
    mainAxis === "z" &&
    zMovement === 1 &&
    selected === "muslo derecho"
  ) {
    mainMovement = "flexión";

    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  }
  /*---MUSLO izquierdo--- Dispositivo: parte lateral media del muslo
  y sentido "y" hacia cefálico */
  if (mainAxis === "x" && xMovement === 0 && selected === "muslo izquierdo") {
    mainMovement = "abducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "muslo izquierdo"
  ) {
    mainMovement = "aducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  }
  if (mainAxis === "y" && yMovement === 0 && selected === "muslo izquierdo") {
    mainMovement = "rotación interna";
    axisMovement = "céfalocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    selected === "muslo izquierdo"
  ) {
    mainMovement = "rotación externa";
    axisMovement = "céfalocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "flexión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensión";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "z" &&
    zMovement === 0 &&
    selected === "muslo izquierdo"
  ) {
    mainMovement = "flexión";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  } else if (
    mainAxis === "z" &&
    zMovement === 1 &&
    selected === "muslo izquierdo"
  ) {
    mainMovement = "extensión";

    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducción";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++
  /*declaramos un condicional para los planos y los ejes 
  segun el movimiento independiente de cual es el principal*/

  if (selected === "cervical" || selected === "dorsolumbar") {
    xGeneralAxis = "laterolateral";
    yGeneralAxis = "cefalocaudal";
    zGeneralAxis = "anteroposterior";
    xGeneralPlane = "sagital";
    yGeneralPlane = "transversal";
    zGeneralPlane = "frontal";
  }
  //brazo derecho ubicacion lateral del dispositivo
  if (selected === "brazo derecho" || selected === "brazo izquierdo") {
    xGeneralAxis = "anteroposterior";
    yGeneralAxis = "longitudinal";
    zGeneralAxis = "laterolateral";
    xGeneralPlane = "frontal";
    yGeneralPlane = "transversal";
    zGeneralPlane = "sagital";
  }

  //antebrazo ubicación anterior del dispositivo
  if (selected === "antebrazo derecho" || selected === "antebrazo izquierdo") {
    xGeneralAxis = "laterolateral";
    yGeneralAxis = "longitudinal";
    zGeneralAxis = "anteroposterior";
    xGeneralPlane = "sagital";
    yGeneralPlane = "transversal";
    zGeneralPlane = "frontal";
  }

  const detectObj = {
    mainMovement,
    xMovement,
    yMovement,
    zMovement,
    side,
    axisMovement,
    planeMovement,
    mainMovementValue,
    xGeneralAxis,
    yGeneralAxis,
    zGeneralAxis,
    xGeneralPlane,
    yGeneralPlane,
    zGeneralPlane,
    xGeneralMovement,
    yGeneralMovement,
    zGeneralMovement,
  };

  return detectObj;
};

// consideramos  el valor de 1 para rotacion positiva y 0 para la negativa
