export const promedio = (array) => {
  let acc = 0;
  let promedio = 0;
  for (let i = 0; i <= array.length - 1; i++) {
    acc += Number(array[i]);
  }

  promedio = acc / array.length;

  return promedio;
};
