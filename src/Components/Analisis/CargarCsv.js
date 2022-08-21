import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import { integral } from "../../auxiliares/Integral";
import { arrayIntegralAngulo } from "../../auxiliares/arrayIntegralAngulo";
import Select from "react-select";
import { detectorSentidosEjes } from "../../auxiliares/detectorSentidosEjes";
import { references } from "../../auxiliares/references";

/*IMPORTANTE: EN LOS MIEMBROS, LA UBICACION DEL DISPOSITIVO
 ES LATERAL A LA DERECHA Y ANTERIOR A LA IZQUIERDA, 
 SIEMPRE CON EL EJE Y POSITIVO PROXIMAL*/
const CargarCsv = () => {
  const [archivoCsv, setArchivoCsv] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("");
  let mainMovementValue;
  //lectura del archivo csv
  const readFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      setArchivoCsv(reader.result);
    };
  };
  //proceso para obtener las filas con cada variable
  const data = archivoCsv
    .split("\n")
    .splice(1)
    .map((line) => line.split(","));
  data.pop();
  data.splice(0, 100);

  // renderizado
  const renderizado = (e) => {
    e.preventDefault(e);
    setVisible(true);
  };

  //obtener un array por cada variable
  const dataObj = {
    time: data.map((el) => Number(el[0]).toFixed(2)),
    xData: data.map((el) => Number(el[1])),
    yData: data.map((el) => Number(el[2])),
    zData: data.map((el) => Number(el[3])),
  };

  /*obtener angulos en radianes en cada eje intervalo = 1/214, 
  la integral recibe dos parametros, el intervalo y 
  el array a integrar*/

  const dataAnguloRad = {
    xAngleRad: integral(1 / 214, dataObj.xData).toFixed(2),
    yAngleRad: integral(1 / 214, dataObj.yData).toFixed(2),
    zAngleRad: integral(1 / 214, dataObj.zData).toFixed(2),
  };

  //angulos en grados por cada eje
  const dataAnguloGrad = {
    xAngleGrad: parseInt((dataAnguloRad.xAngleRad * 180) / Math.PI),
    yAngleGrad: parseInt((dataAnguloRad.yAngleRad * 180) / Math.PI),
    zAngleGrad: parseInt((dataAnguloRad.zAngleRad * 180) / Math.PI),
  };

  /*declaramos un condicional para imprimir el algulo del eje principal de 
  movimiento en valor absoluto */
  if (
    Math.abs(dataAnguloGrad.xAngleGrad) > Math.abs(dataAnguloGrad.yAngleGrad) &&
    Math.abs(dataAnguloGrad.xAngleGrad) > Math.abs(dataAnguloGrad.zAngleGrad)
  ) {
    mainMovementValue = Math.abs(dataAnguloGrad.xAngleGrad);
  } else if (
    Math.abs(dataAnguloGrad.yAngleGrad) > Math.abs(dataAnguloGrad.xAngleGrad) &&
    Math.abs(dataAnguloGrad.yAngleGrad) > Math.abs(dataAnguloGrad.zAngleGrad)
  ) {
    mainMovementValue = Math.abs(dataAnguloGrad.yAngleGrad);
  } else if (
    Math.abs(dataAnguloGrad.zAngleGrad) > Math.abs(dataAnguloGrad.xAngleGrad) &&
    Math.abs(dataAnguloGrad.zAngleGrad) > Math.abs(dataAnguloGrad.yAngleGrad)
  ) {
    mainMovementValue = Math.abs(dataAnguloGrad.zAngleGrad);
  }

  //array con el angulo en funcion del tiempo, llamamos a arrayIntegral
  const curvaAngulos = {
    xCurva: arrayIntegralAngulo(1 / 214, dataObj.xData),
    yCurva: arrayIntegralAngulo(1 / 214, dataObj.yData),
    zCurva: arrayIntegralAngulo(1 / 214, dataObj.zData),
  };

  /*llamamos a la funcion detectorsentidosejes para obtener el movimiento 
  exacto segun el el archivo cargado y el selector*/

  const detectObj = detectorSentidosEjes(
    curvaAngulos.xCurva,
    curvaAngulos.yCurva,
    curvaAngulos.zCurva,
    selected
  );

  //selector
  const segments = [
    { label: "No específica", value: "noEspecifica" },
    { label: "Cervical", value: "cervical" },
    { label: "Dorsolumbar", value: "dorsolumbar" },

    { label: "Brazo derecho", value: "brazo derecho" },
    { label: "Brazo izquierdo", value: "brazo izquierdo" },
    { label: "Antebrazo derecho", value: "antebrazoD" },
    { label: "Antebrazo izquierdo", value: "antebrazoI" },
    { label: "Mano derecha", value: "manoD" },
    { label: "Mano izquierda", value: "manoI" },
    { label: "Muslo derecho", value: "musloD" },
    { label: "Muslo izqierdo", value: "musloI" },
    { label: "Pierna derecha", value: "piernaD" },
    { label: "Pierna izquierda", value: "piernaI" },
    { label: "Pie derecho", value: "pieD" },
    { label: "Pie izquierdo", value: "pieI" },
  ];

  //funcion que captura el select
  const handleSelectChange = (e) => {
    setSelected(e.value);
  };

  /*constante que guarda el return de la funcion con los
  angulos de referencia, se le dan dos parametros, el select que 
  seria el segmento donde esta el dispositivo, y el movimiento principal
  que viene de la funcion detectora*/

  const ref = references(selected, detectObj.mainMovement);

  return (
    <>
      <div>
        <h3>Carga del archivo .csv</h3>
        <div>
          <input type="file" id="inputGroupFile01" onChange={readFile}></input>
        </div>

        <br />
        {/* selector */}
        <div>
          <Select options={segments} onChange={handleSelectChange} />
          <p>usted seleccionó: {selected}</p>
        </div>
        <div>
          {/* formulario aca */}
          <form noValidate onSubmit={(e) => renderizado(e)}>
            {/* boton de envio */}
            <div>
              <button type="submit">Enviar para analizar</button>
            </div>
          </form>
        </div>

        <div>
          {visible && (
            <div>
              <div>
                <h3>
                  Se realizó el movimiento de {detectObj.mainMovement} de{" "}
                  {selected} {detectObj.side}, plano {detectObj.planeMovement},{" "}
                  eje {detectObj.axisMovement} con un ángulo de{" "}
                  {mainMovementValue}°
                </h3>
                <h3>
                  El angulo de referencia para este movimiento es de {ref}°
                </h3>
                <h4>Los ángulos segun los ejes fueron:</h4>
                <p>
                  Plano {detectObj.xGeneralPlane}, eje {detectObj.xGeneralAxis}:{" "}
                  {Math.abs(dataAnguloGrad.xAngleGrad)}°
                </p>
                <p>
                  Plano {detectObj.yGeneralPlane}, eje {detectObj.yGeneralAxis}:{" "}
                  {Math.abs(dataAnguloGrad.yAngleGrad)}°
                </p>
                <p>
                  Plano {detectObj.zGeneralPlane}, eje {detectObj.zGeneralAxis}:{" "}
                  {Math.abs(dataAnguloGrad.zAngleGrad)}°
                </p>
              </div>
              <div>
                <h2>Gráfico del ángulo en función del tiempo</h2>
                <Chart
                  time={dataObj.time}
                  xData={curvaAngulos.xCurva}
                  yData={curvaAngulos.yCurva}
                  zData={curvaAngulos.zCurva}
                  xAxis={detectObj.xGeneralAxis}
                  yAxis={detectObj.yGeneralAxis}
                  zAxis={detectObj.zGeneralAxis}
                  xPlane={detectObj.xGeneralPlane}
                  yPlane={detectObj.yGeneralPlane}
                  zPlane={detectObj.zGeneralPlane}
                />
              </div>
              <div>
                <h2>Gráfico de la velocidad angular</h2>

                <Chart
                  time={dataObj.time}
                  xData={dataObj.xData}
                  yData={dataObj.yData}
                  zData={dataObj.zData}
                  xAxis={detectObj.xGeneralAxis}
                  yAxis={detectObj.yGeneralAxis}
                  zAxis={detectObj.zGeneralAxis}
                  xPlane={detectObj.xGeneralPlane}
                  yPlane={detectObj.yGeneralPlane}
                  zPlane={detectObj.zGeneralPlane}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CargarCsv;
