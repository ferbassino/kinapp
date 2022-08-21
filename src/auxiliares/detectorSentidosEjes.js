export const detectorSentidosEjes = (xArr, yArr, zArr, selected) => {
  /*declaramos las variables
 xMovement es la variable que guarda si es positivo o negativo,
 mainAxis guarda el eje principal del movimiento, 
 mainMovement guarda el movimiento principal, los general guardan las variables
 para renderizar en todos los ejes cuando se musetran los angulos, tambien una 
 variable side para el lado derecho o izquierdo si es el caso*/

  let xMovement, yMovement, zMovement;
  let mainAxis,
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

  /*---COLUMNA CERVICAL--- Dispositivo: ubicacion parte posterior de la cabeza
  y sentido "y" hacia cefálico */
  /*---COLUMNA DORSOLUMBAR--- Dispositivo: línea media, parte posterior, por debajo de C7
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
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    mainMovement = "extensión";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
  } else if (
    mainAxis === "y" &&
    yMovement === 0 &&
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    mainMovement = "rotación";
    side = "derecha";
    axisMovement = "céfalocaudal";
    planeMovement = "transversal";
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    mainMovement = "rotación";
    side = "izquierda";
    axisMovement = "céfalocaudal";
    planeMovement = "transversal";
  } else if (
    mainAxis === "z" &&
    zMovement === 0 &&
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    mainMovement = "inclinación";
    side = "derecha";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
  } else if (
    mainAxis === "z" &&
    zMovement === 1 &&
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    mainMovement = "inclinación";
    side = "izquierda";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
  }

  /*---BRAZO Derecho--- Dispositivo: parte lateral media del brazo
  y sentido "y" hacia cefálico */
  if (mainAxis === "x" && xMovement === 0 && selected === "brazo derecho") {
    mainMovement = "abducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "brazo derecho"
  ) {
    mainMovement = "aducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
  } else if (
    mainAxis === "y" &&
    yMovement === 0 &&
    selected === "brazo derecho"
  ) {
    mainMovement = "rotación externa";

    axisMovement = "céfalocaudal";
    planeMovement = "transversal";
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    selected === "brazo derecho"
  ) {
    mainMovement = "rotación interna";

    axisMovement = "céfalocaudal";
    planeMovement = "transversal";
  } else if (
    mainAxis === "z" &&
    zMovement === 0 &&
    selected === "brazo derecho"
  ) {
    mainMovement = "extensión";
    // side = "";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
  } else if (
    mainAxis === "z" &&
    zMovement === 1 &&
    selected === "brazo derecho"
  ) {
    mainMovement = "flexión";
    // side = "";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
  }

  /*---BRAZO izquierdo--- Dispositivo: parte lateral media del brazo
  y sentido "y" hacia cefálico */
  if (mainAxis === "x" && xMovement === 0 && selected === "brazo izquierdo") {
    mainMovement = "abducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "brazo izquierdo"
  ) {
    mainMovement = "aducción";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
  } else if (
    mainAxis === "y" &&
    yMovement === 0 &&
    selected === "brazo derecho"
  ) {
    mainMovement = "rotación interna";

    axisMovement = "céfalocaudal";
    planeMovement = "transversal";
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    selected === "brazo derecho"
  ) {
    mainMovement = "rotación externa";

    axisMovement = "céfalocaudal";
    planeMovement = "transversal";
  } else if (
    mainAxis === "z" &&
    zMovement === 0 &&
    selected === "brazo izquierdo"
  ) {
    mainMovement = "flexión";
    // side = "";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
  } else if (
    mainAxis === "z" &&
    zMovement === 1 &&
    selected === "brazo izquierdo"
  ) {
    mainMovement = "extensión";
    // side = "";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
  }
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

  //brazo izquierdo ubicación anterior del dispositivo
  if (selected === "brazo" && mainAxis === "x") {
    xGeneralAxis = "laterolateral";
    yGeneralAxis = "longitudinal";
    zGeneralAxis = "anteroposterior";
    xGeneralPlane = "sagital";
    yGeneralPlane = "transversal";
    zGeneralPlane = "frontal";
  }

  const detectObj = {
    mainMovement,
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
  };

  return detectObj;
};

// consideramos  el valor de 1 para rotacion positiva y 0 para la negativa
