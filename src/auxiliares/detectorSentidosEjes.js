export const detectorSentidosEjes = (xArr, yArr, zArr, selected) => {
  //declaramos las variables

  let xMovement, yMovement, zMovement;
  let mainAxis, mainMovement, axisMovement, planeMovement;
  /*declaramos un obj que encuentra los valores maximos y minimos de 
  los arreglos de los angulos en funcion del tiempo, que vienen por parametros
  desde la carga del csv*/
  const minMaxObj = {
    xMax: parseInt(Math.max.apply(null, xArr)),
    xMin: parseInt(Math.min.apply(null, xArr)),
    yMax: parseInt(Math.max.apply(null, yArr)),
    yMin: parseInt(Math.min.apply(null, yArr)),
    zMax: parseInt(Math.max.apply(null, zArr)),
    zMin: parseInt(Math.min.apply(null, zArr)),
  };

  /*declaramos un condicional que establece las variables declaradas
  arriba en 1 si el movimiento es positivo y 0 si es negativo*/

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

  /*declaramos un condicional para encontrar el eje principal de movimiento
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

  /*sabiendo el eje pri principal y el sentido, y obviamente como 
  esta colocado el dispositivo, declaramos un condicional comparando
  estas variables y estableciendo el movimiento definitivo*/

  if (mainAxis === "x" && xMovement === 0 && selected === "cervical") {
    mainMovement = "Flexion de la columna cervical";
    axisMovement = "laterolateral";
    planeMovement = "medio";
  } else if (mainAxis === "x" && xMovement === 1 && selected === "cervical") {
    mainMovement = "Extensión de la columna cervical";
    axisMovement = "laterolateral";
    planeMovement = "medio";
  } else if (mainAxis === "y" && yMovement === 0 && selected === "cervical") {
    mainMovement = "Rotación de la columna cervical a la derecha";
    axisMovement = "céfalocaudal";
    planeMovement = "transversal";
  } else if (mainAxis === "y" && yMovement === 1 && selected === "cervical") {
    mainMovement = "Rotación de la columna cervical a la izquierda";
    axisMovement = "céfalocaudal";
    planeMovement = "transversal";
  } else if (mainAxis === "z" && zMovement === 0 && selected === "cervical") {
    mainMovement = "Inclinación de la columna cervical a la derecha";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
  } else if (mainAxis === "z" && zMovement === 1 && selected === "cervical") {
    mainMovement = "Inclinación de la columna cervical a la Izquierda";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
  }

  const detectObj = {
    mainMovement,
    axisMovement,
    planeMovement,
  };

  return detectObj;
};

// consideramos  el valor de 1 para rotacion positiva y 0 para la negativa
