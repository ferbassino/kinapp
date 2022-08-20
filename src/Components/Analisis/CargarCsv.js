import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import { integral } from "../../auxiliares/Integral";
import { arrayIntegralAngulo } from "../../auxiliares/arrayIntegralAngulo";
import Select from "react-select";
import { detectorSentidosEjes } from "../../auxiliares/detectorSentidosEjes";

const CargarCsv = () => {
  const [archivoCsv, setArchivoCsv] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("");
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

  const detectObj = detectorSentidosEjes(
    curvaAngulos.xCurva,
    curvaAngulos.yCurva,
    curvaAngulos.zCurva,
    selected
  );

  const segments = [
    { label: "No específica", value: "noEspecifica" },
    { label: "Cervical", value: "cervical" },
    { label: "Dorsolumbar", value: "dorsoLumbar" },
    { label: "Sacro", value: "sacro" },
    { label: "Brazo", value: "brazo" },
    { label: "Antebrazo", value: "antebrazo" },
    { label: "Mano", value: "mano" },
    { label: "Muslo", value: "macro" },
    { label: "Pierna", value: "pierna" },
    { label: "Pie", value: "pie" },
  ];

  const handleSelectChange = (e) => {
    setSelected(e.value);
  };

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
                <h3>Se realizó el movimiento de {detectObj.mainMovement}</h3>
                <h4>Los ángulos segun los ejes fueron:</h4>
                <p>{dataAnguloGrad.xAngleGrad}° en el eje x</p>
                <p>{dataAnguloGrad.yAngleGrad}° en y</p>
                <p>{dataAnguloGrad.zAngleGrad}° en z</p>
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
