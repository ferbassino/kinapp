export const references = (selected, mainMovement) => {
  //---cervical---
  if (selected === "cervical" && mainMovement === "flexión") return 60;
  if (selected === "cervical" && mainMovement === "extensión") return 50;
  if (selected === "cervical" && mainMovement === "inclinación") return 40;
  if (selected === "cervical" && mainMovement === "rotación") return 80;
  //---dorsolumbar---
  if (selected === "dorsolumbar" && mainMovement === "flexión") return 96;
  if (selected === "dorsolumbar" && mainMovement === "extensión") return 34;
  if (selected === "dorsolumbar" && mainMovement === "inclinación") return 53;
  if (selected === "dorsolumbar" && mainMovement === "rotación") return 40;
  //---brazo---
  if (
    (selected === "brazo derecho" || selected === "brazo izquierdo") &&
    mainMovement === "flexión"
  )
    return 180;
  if (
    (selected === "brazo derecho" || selected === "brazo izquierdo") &&
    mainMovement === "extensión"
  )
    return 50;
  if (
    (selected === "brazo derecho" || selected === "brazo izquierdo") &&
    mainMovement === "abducción"
  )
    return 180;
  if (
    (selected === "brazo derecho" || selected === "brazo izquierdo") &&
    mainMovement === "abucción"
  )
    return 30;
  if (
    (selected === "brazo derecho" || selected === "brazo izquierdo") &&
    mainMovement === "rotación interna"
  )
    return 80;
  if (
    (selected === "brazo derecho" || selected === "brazo izquierdo") &&
    mainMovement === "rotación externa"
  )
    return 30;

  /* antebrazo */
  if (
    (selected === "antebrazo derecho" || selected === "antebrazo izquierdo") &&
    mainMovement === "flexión"
  )
    return 145;
  if (
    (selected === "antebrazo derecho" || selected === "antebrazo izquierdo") &&
    mainMovement === "extensión"
  )
    return 145;
  if (
    (selected === "antebrazo derecho" || selected === "antebrazo izquierdo") &&
    mainMovement === "pronación"
  )
    return 85;
  if (
    (selected === "antebrazo derecho" || selected === "antebrazo izquierdo") &&
    mainMovement === "supinación"
  )
    return 90;
  /* mano */
  if (
    (selected === "mano derecha" || selected === "mano izquierda") &&
    mainMovement === "flexión"
  )
    return 85;
  if (
    (selected === "mano derecha" || selected === "mano izquierda") &&
    mainMovement === "extensión"
  )
    return 85;
  if (
    (selected === "mano derecha" || selected === "mano izquierda") &&
    mainMovement === "aducción"
  )
    return 30;
  if (
    (selected === "mano derecha" || selected === "mano izquierda") &&
    mainMovement === "abducción"
  )
    return 15;

  //---muslo---
  if (
    (selected === "muslo derecho" || selected === "muslo izquierdo") &&
    mainMovement === "flexión"
  )
    return 180;
  if (
    (selected === "muslo derecho" || selected === "muslo izquierdo") &&
    mainMovement === "extensión"
  )
    return 50;
  if (
    (selected === "muslo derecho" || selected === "muslo izquierdo") &&
    mainMovement === "abducción"
  )
    return 180;
  if (
    (selected === "muslo derecho" || selected === "muslo izquierdo") &&
    mainMovement === "abucción"
  )
    return 30;
  if (
    (selected === "muslo derecho" || selected === "muslo izquierdo") &&
    mainMovement === "rotación interna"
  )
    return 80;
  if (
    (selected === "muslo derecho" || selected === "muslo izquierdo") &&
    mainMovement === "rotación externa"
  )
    return 30;
};
