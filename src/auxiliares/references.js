export const references = (selected, mainMovement) => {
  if (selected === "cervical" && mainMovement === "flexión") return 60;
  if (selected === "cervical" && mainMovement === "extensión") return 50;
  if (selected === "cervical" && mainMovement === "inclinación") return 70;
  if (selected === "cervical" && mainMovement === "rotación") return 80;
};
