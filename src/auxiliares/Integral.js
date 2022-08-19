export const integral = (interval, array) => {
  let acc = 0;

  for (let i = 0; i < array.length - 1; i++) {
    acc += ((Number(array[i]) + Number(array[i + 1])) * interval) / 2;
  }

  return acc;
};
