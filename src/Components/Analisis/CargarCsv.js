import React, { useState } from "react";
import Chart from "./Chart";
import { integral } from "../../auxiliares/Integral";
import { arrayIntegralAngulo } from "../../auxiliares/arrayIntegralAngulo";
import Select from "react-select";
import { detectorSentidosEjes } from "../../auxiliares/detectorSentidosEjes";
import { references } from "../../auxiliares/references";
import { noEspecifico } from "../../auxiliares/noEspecifico";

const CargarCsv = () => {
  const [archivoCsv, setArchivoCsv] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectFileVisible, setSetelectFileVisible] = useState(false);
  // const [sendVisible, setSendVisible] = useState(false);
  const [noEspecificoVisible, setNoEspecificoVisible] = useState(false);
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
    selected === "noEspecifica"
      ? setNoEspecificoVisible(true)
      : setVisible(true);
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
  const noEspecificoObj = noEspecifico(
    curvaAngulos.xCurva,
    curvaAngulos.yCurva,
    curvaAngulos.zCurva
  );
  // console.log(noEspecificoObj);

  //selector
  const segments = [
    { label: "No específica", value: "noEspecifica" },
    { label: "Cervical", value: "cervical" },
    { label: "Dorsolumbar", value: "dorsolumbar" },
    { label: "Brazo derecho", value: "brazo derecho" },
    { label: "Brazo izquierdo", value: "brazo izquierdo" },
    { label: "Antebrazo derecho", value: "antebrazo derecho" },
    { label: "Antebrazo izquierdo", value: "antebrazo izquierdo" },
    { label: "Mano derecha", value: "mano derecha" },
    { label: "Mano izquierda", value: "mano izquierda" },
    { label: "Muslo derecho", value: "muslo derecho" },
    { label: "Muslo izquierdo", value: "muslo izquierdo" },
    { label: "Pierna derecha", value: "piernaD" },
    { label: "Pierna izquierda", value: "piernaI" },
    { label: "Pie derecho", value: "pieD" },
    { label: "Pie izquierdo", value: "pieI" },
  ];

  //funcion que captura el select
  const handleSelectChange = (e) => {
    setSelected(e.value);
    setSetelectFileVisible(true);
  };

  /*constante que guarda el return de la funcion con los
  angulos de referencia, se le dan dos parametros, el select que 
  seria el segmento donde esta el dispositivo, y el movimiento principal
  que viene de la funcion detectora*/

  const ref = references(selected, detectObj.mainMovement);

  return (
    <>
      <div>
        <br />
        {/* selector */}
        <div>
          <h3>1. Selección</h3>
          <p>
            Selecciona un segmento a evaluar. Si no lo encuentras dentro de la
            lista podrás elegir la opción "no específica" y orientarte con la
            documentacion sobre su interpretación
          </p>
          <Select options={segments} onChange={handleSelectChange} />
        </div>

        {selectFileVisible && (
          <div>
            <h3>2. Carga del archivo .csv</h3>
            <div>
              <input
                type="file"
                id="inputGroupFile01"
                onChange={readFile}
              ></input>
            </div>

            <div>
              {/* formulario aca */}
              <h3>3. Enviar para analizar</h3>
              <form noValidate onSubmit={(e) => renderizado(e)}>
                {/* boton de envio */}
                <div>
                  <button type="submit">Enviar para analizar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div>
          {visible && (
            <div>
              <div>
                <h3>Tu análisis</h3>
                <h4>
                  Se realizó el movimiento de {detectObj.mainMovement} , plano{" "}
                  {detectObj.planeMovement}, eje {detectObj.axisMovement} con un
                  ángulo de {mainMovementValue}°
                </h4>
                <h4>
                  El angulo de referencia para este movimiento es de {ref}°
                </h4>
                <h4>Análisis tridimensional del movimiento:</h4>
                <p>
                  {detectObj.xGeneralMovement} en el plano{" "}
                  {detectObj.xGeneralPlane}, eje {detectObj.xGeneralAxis} de{" "}
                  {dataAnguloGrad.xAngleGrad}°
                </p>
                <p>
                  {detectObj.yGeneralMovement} en el plano{" "}
                  {detectObj.yGeneralPlane}, eje {detectObj.yGeneralAxis}:{" "}
                  {dataAnguloGrad.yAngleGrad}°
                </p>
                <p>
                  {detectObj.zGeneralMovement} en el plano{" "}
                  {detectObj.zGeneralPlane}, eje {detectObj.zGeneralAxis}:{" "}
                  {dataAnguloGrad.zAngleGrad}°
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
        <div>
          {noEspecificoVisible && (
            <div>
              <div>
                <h3>Análisis no especifico</h3>
                <p>
                  El eje principal de movimiento es "{noEspecificoObj.mainAxis}"
                </p>
                <h4>
                  Se realizó el movimiento de {noEspecificoObj.mainMovement}, en
                  el eje "{noEspecificoObj.axisMovement}" con un ángulo de{" "}
                  {mainMovementValue}°
                </h4>

                <h4>Análisis tridimensional del movimiento:</h4>
                <p>
                  {noEspecificoObj.xGeneralMovement}, eje{" "}
                  {noEspecificoObj.xGeneralAxis} de {dataAnguloGrad.xAngleGrad}°
                </p>
                <p>
                  {noEspecificoObj.yGeneralMovement} eje{" "}
                  {noEspecificoObj.yGeneralAxis}: {dataAnguloGrad.yAngleGrad}°
                </p>
                <p>
                  {noEspecificoObj.zGeneralMovement} , eje{" "}
                  {noEspecificoObj.zGeneralAxis}: {dataAnguloGrad.zAngleGrad}°
                </p>
              </div>
              <div>
                <h2>Gráfico del ángulo en función del tiempo</h2>
                <Chart
                  time={dataObj.time}
                  xData={curvaAngulos.xCurva}
                  yData={curvaAngulos.yCurva}
                  zData={curvaAngulos.zCurva}
                  xAxis={noEspecificoObj.xGeneralAxis}
                  yAxis={noEspecificoObj.yGeneralAxis}
                  zAxis={noEspecificoObj.zGeneralAxis}
                  xPlane={"longitudinal al dispositivo"}
                  yPlane={"transversal al dispositivo"}
                  zPlane={"paralelo al dispositivo"}
                />
              </div>
              <div>
                <h2>Gráfico de la velocidad angular</h2>

                <Chart
                  time={dataObj.time}
                  xData={dataObj.xData}
                  yData={dataObj.yData}
                  zData={dataObj.zData}
                  xAxis={noEspecificoObj.xGeneralAxis}
                  yAxis={noEspecificoObj.yGeneralAxis}
                  zAxis={noEspecificoObj.zGeneralAxis}
                  xPlane={"logngitudinal al dispositivo"}
                  yPlane={"transversal al dispositivo"}
                  zPlane={"paralelo al dispositivo"}
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
