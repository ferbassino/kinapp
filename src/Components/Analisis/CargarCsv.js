import React, { useState } from "react";
import Chart from "./Chart";
import { integral } from "../../auxiliares/Integral";
import { arrayIntegral } from "../../auxiliares/arrayIntegral";

const CargarCsv = () => {
  const [archivoCsv, setArchivoCsv] = useState("");
  const [visible, setVisible] = useState(false);
  // const [dataObj, setDataObj] = useState({});

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
  const renderizado = (e) => {
    e.preventDefault(e);
    setVisible(true);
  };

  //obtener un array por cada variable
  const dataObj = {
    time: data.map((el) => Number(el[0]).toFixed(2)),
    xData: data.map((el) => Number(el[1]).toFixed(2)),
    yData: data.map((el) => Number(el[2]).toFixed(2)),
    zData: data.map((el) => Number(el[3]).toFixed(2)),
    absData: data.map((el) => Number(el[4]).toFixed(2)),
  };

  /*obtener angulos en radianes en cada eje intervalo = 1/214, 
  la integral recibe dos parametros, el intervalo y 
  el array a integrar*/

  const dataAnguloRad = {
    xAngleRad: integral(1 / 214, dataObj.xData).toFixed(2),
    yAngleRad: integral(1 / 214, dataObj.yData),
    zAngleRad: integral(1 / 214, dataObj.zData),
  };

  //angulos en grados por cada eje
  const dataAnguloGrad = {
    xAngleGrad: parseInt((dataAnguloRad.xAngleRad * 180) / Math.PI),
    yAngleGrad: parseInt((dataAnguloRad.yAngleRad * 180) / Math.PI),
    zAngleGrad: parseInt((dataAnguloRad.zAngleRad * 180) / Math.PI),
  };

  //array con el angulo en funcion del tiempo, llamamos a arrayIntegral
  const curvaAngulos = {
    xCurva: arrayIntegral(1 / 214, dataObj.xData),
  };
  console.log(curvaAngulos.xCurva);
  return (
    <>
      <div>
        <h3>Carga del archivo .csv</h3>
        <div>
          <input type="file" id="inputGroupFile01" onChange={readFile}></input>
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
                <h2>Los ángulos segun los ejes fueron:</h2>
                <h3>{dataAnguloGrad.xAngleGrad}° en x</h3>
                <h3>{dataAnguloGrad.yAngleGrad}° en y</h3>
                <h3>{dataAnguloGrad.zAngleGrad}° en z</h3>
              </div>
              <div>
                <h2>Gráfico de la velocidad angular</h2>
                <Chart
                  time={dataObj.time}
                  xData={dataObj.xData}
                  yData={dataObj.yData}
                  zData={dataObj.zData}
                  absData={dataObj.absData}
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
