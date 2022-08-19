import React from "react";

export const arrayIntegral = (interval, array) => {
  let acc = 0;
  let arrayAcc = [];
  for (let i = 0; i < array.length - 1; i++) {
    acc += ((Number(array[i]) + Number(array[i + 1])) * interval) / 2;
    arrayAcc.push(acc);
  }

  return arrayAcc;
};
