export const noEspecifico = (xArr, yArr, zArr) => {
  let xMovement,
    yMovement,
    zMovement,
    xGeneralMovement,
    yGeneralMovement,
    zGeneralMovement,
    mainAxis,
    mainMovement,
    axisMovement,
    planeMovement,
    xGeneralAxis,
    yGeneralAxis,
    zGeneralAxis;

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

  //establecemos los ejes principales y los esentidos para retornarlos y renderizarlos

  if (
    //si el eje principal es x
    mainAxis === "x" &&
    //y el sentido es negativo
    xMovement === 0
  ) {
    //entonces el dispositivo rotó hacia atras
    mainMovement = "rotación hacia atrás";
    //el eje es laterolateral
    axisMovement = "x";

    /*y ahora un definiciones y condicionales para el renderizado del 
    analisis de todos los ejes*/

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotación izquierda";
      yGeneralAxis = "y";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación derecha";
      yGeneralAxis = "y";
    }
    if (zMovement === 0) {
      zGeneralMovement = "rotación horaria";
      zGeneralAxis = "z";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotación antihoraria";
      zGeneralAxis = "z";
    }
  } else if (mainAxis === "x" && xMovement === 1) {
    mainMovement = "rotación hacia adelante";
    axisMovement = "x";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotación izquierda";
      yGeneralAxis = "y";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación derecha";
      yGeneralAxis = "y";
    }
    if (zMovement === 0) {
      zGeneralMovement = "rotación horaria";
      zGeneralAxis = "z";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotación antihoraria";
      zGeneralAxis = "z";
    }
  } else if (mainAxis === "y" && yMovement === 0) {
    mainMovement = "rotación a la izquierda";
    axisMovement = "y";

    if (xMovement === 0) {
      xGeneralMovement = "rotación hacia atrás";
      xGeneralAxis = "x";
    } else if (xMovement === 1) {
      xGeneralMovement = "rotación hacia adelante";
      xGeneralAxis = "x";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;

    if (zMovement === 0) {
      zGeneralMovement = "rotación horaria";
      zGeneralAxis = "z";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotación antihoraria";
      zGeneralAxis = "z";
    }
  } else if (mainAxis === "y" && yMovement === 1) {
    mainMovement = "rotación a la derecha";
    axisMovement = "y";

    if (xMovement === 0) {
      xGeneralMovement = "rotación hacia atrás";
      xGeneralAxis = "x";
    } else if (xMovement === 1) {
      xGeneralMovement = "rotación hacia adelante";
      xGeneralAxis = "x";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;

    if (zMovement === 0) {
      zGeneralMovement = "rotación horaria";
      zGeneralAxis = "z";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotación antihoraria";
      zGeneralAxis = "z";
    }
  } else if (mainAxis === "z" && zMovement === 0) {
    mainMovement = "rotación horaria";
    axisMovement = "z";

    if (xMovement === 0) {
      xGeneralMovement = "rotación hacia atrás";
      xGeneralAxis = "x";
    } else if (xMovement === 1) {
      xGeneralMovement = "rotación hacia adelante";
      xGeneralAxis = "x";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación izquierda";
      yGeneralAxis = "y";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación derecha";
      yGeneralAxis = "y";
    }

    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
  } else if (mainAxis === "z" && zMovement === 1) {
    mainMovement = "rotación antihoraria";
    axisMovement = "anteroposterior";

    if (xMovement === 0) {
      xGeneralMovement = "rotación hacia atrás";
      xGeneralAxis = "x";
    } else if (xMovement === 1) {
      xGeneralMovement = "rotación hacia adelante";
      xGeneralAxis = "x";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotación izquierda";
      yGeneralAxis = "y";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotación derecha";
      yGeneralAxis = "y";
    }

    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
  }

  const noEspecificoObj = {
    mainAxis,
    mainMovement,
    axisMovement,
    xMovement,
    yMovement,
    zMovement,
    xGeneralAxis,
    yGeneralAxis,
    zGeneralAxis,
    xGeneralMovement,
    yGeneralMovement,
    zGeneralMovement,
  };
  return noEspecificoObj;
};
