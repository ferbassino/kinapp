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
};
