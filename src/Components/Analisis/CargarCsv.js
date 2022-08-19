import React, { useState } from "react";
import Chart from "./Chart";
import { integral } from "../../auxiliares/Integral";
import { arrayIntegralAngulo } from "../../auxiliares/arrayIntegralAngulo";
import { promedio } from "../../auxiliares/promedio";

const CargarCsv = () => {
  const [archivoCsv, setArchivoCsv] = useState("");
  const [visible, setVisible] = useState(false);
  const [join, setJoin] = useState("");
  const [side, setSide] = useState("");
  const [axial, setAxial] = useState(false);
  const [supDer, setSupDer] = useState(false);
  const [supIzq, setSupIzq] = useState(false);
  const [infDer, setInfDer] = useState(false);
  const [infIzq, setInfIzq] = useState(false);

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

  //array con el angulo en funcion del tiempo, llamamos a arrayIntegral
  const curvaAngulos = {
    xCurva: arrayIntegralAngulo(1 / 214, dataObj.xData),
    yCurva: arrayIntegralAngulo(1 / 214, dataObj.yData),
    zCurva: arrayIntegralAngulo(1 / 214, dataObj.zData),
  };

  //velocidad angular promedio
  // const velAngProm = {
  //   xVelProm: promedio(dataObj.xData).toFixed(2),
  //   yVelProm: promedio(dataObj.yData).toFixed(2),
  //   zVelProm: promedio(dataObj.zData).toFixed(2),
  // };
  // console.log(dataObj.zData);

  const selectDivition = (e) => {
    if (e.target.value === "noEspecifico") {
      console.log("no especifico");
    } else if (e.target.value === "axial") {
      setAxial(true);
    } else if (e.target.value === "supDer") {
      setSupDer(true);
    } else if (e.target.value === "supIzq") {
      setSupIzq(true);
    } else if (e.target.value === "infDer") {
      setInfDer(true);
    } else if (e.target.value === "infIzq") {
      setInfIzq(true);
    }
  };
  const selectJoin = (e) => {
    setJoin(e.target.value);
  };

  const selectSide = (e) => {
    setSide(e.target.value);
  };
  return (
    <>
      <div>
        <h3>Carga del archivo .csv</h3>
        <div>
          <input type="file" id="inputGroupFile01" onChange={readFile}></input>
        </div>

        {/* selectores de articulaciones */}
        <div>
          <h3>Seleccione parte corporal</h3>
          <select onChange={selectDivition}>
            <option value="noEspecifico">No específico</option>
            <option value="axial">Axial</option>
            <option value="supDer">Apendicular superior derecho</option>
            <option value="supIzq">Apendicular superior izquierdo</option>
            <option value="infDer">Apendicular inferior derecho</option>
            <option value="infIzq">Apendicular inferior izquierdo</option>
          </select>
          <div>
            {axial && (
              <div>
                <h4>División axial, seleccione el segmento</h4>
                <select
                // onChange={selectAxialJoin}
                >
                  <option value="cervical">Cervical</option>
                  <option value="dorsoLumbar">Dorsolumbar</option>
                  <option value="dorsoLumbar">Dorsolumbar</option>
                  <option value="sacro">Sacro</option>
                </select>
              </div>
            )}
          </div>
          <div>
            {" "}
            {supDer && (
              <div>
                <h4>Miembro superior derecho, seleccione un segmento</h4>
                <select
                // onChange={selectUpperJoin}
                >
                  <option value="munonDelHombro">Muñon del Hombro</option>
                  <option value="brazo">Brazo</option>
                  <option value="antebrazo">Antebrazo</option>
                  <option value="mano">Mano</option>
                </select>
              </div>
            )}
          </div>
          <div>
            {" "}
            {supIzq && (
              <div>
                <h4>Miembro superior Izquierdo, seleccione un segmento</h4>
                <select
                // onChange={selectUpperJoin}
                >
                  <option value="munonDelHombro">Muñon del Hombro</option>
                  <option value="brazo">Brazo</option>
                  <option value="antebrazo">Antebrazo</option>
                  <option value="mano">Mano</option>
                </select>
              </div>
            )}
          </div>
          <div>
            {infDer && (
              <div>
                <h4>Miembro inferior derecho, seleccione un segmento</h4>
                <select
                // onChange={selectLowerJoin}
                >
                  <option value="muslo">muslo</option>
                  <option value="pierna">Pierna</option>
                  <option value="pie">Pie</option>
                </select>
              </div>
            )}
          </div>
          <div>
            {infIzq && (
              <div>
                <h4>Miembro inferior Izquierdo, seleccione un segmento</h4>
                <select
                // onChange={selectLowerJoin}
                >
                  <option value="muslo">muslo</option>
                  <option value="pierna">Pierna</option>
                  <option value="pie">Pie</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <br />
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
                <h2>Gráfico del ángulo en función del tiempo</h2>
                <Chart
                  time={dataObj.time}
                  xData={curvaAngulos.xCurva}
                  yData={curvaAngulos.yCurva}
                  zData={curvaAngulos.zCurva}
                />
              </div>
              <div>
                <h2>Gráfico de la velocidad angular</h2>

                <Chart
                  time={dataObj.time}
                  xData={dataObj.xData}
                  yData={dataObj.yData}
                  zData={dataObj.zData}
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
