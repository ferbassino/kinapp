import React from "react";
import { musculos } from "../../auxiliares/musculos";

const RenderMuscles = (props) => {
  if (props.selected === "cervical" && props.movement === "flexión") {
    return (
      <div>
        <p>{musculos.map((el) => el.cervical.flexion.descripcion)}</p>
        <ul>
          {musculos.map((el) =>
            el.cervical.flexion.musculos.map((el, id) => <li key={id}>{el}</li>)
          )}
        </ul>
      </div>
    );
  }
  if (props.selected === "cervical" && props.movement === "extensión") {
    return (
      <div>
        <p>{musculos.map((el) => el.cervical.extension.descripcion)}</p>
        <ul>
          {musculos.map((el) =>
            el.cervical.extension.musculos.map((el, id) => (
              <li key={id}>{el}</li>
            ))
          )}
        </ul>
      </div>
    );
  }
};

export default RenderMuscles;
