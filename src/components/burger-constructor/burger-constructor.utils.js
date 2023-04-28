export const calcKeys = (bread, filling) => {
  let keysNumbers = [];

  if (bread) {
    keysNumbers.push(bread._id);
  }

  filling.forEach((item) => {
    keysNumbers.push(item._id);
  })
  return keysNumbers;
}

export const calcSum = (bread, filling) => {
  let sum = 0;

  if (bread) {
    sum = bread.price * 2;
  }

  filling.forEach((item) => {
    sum += item.price;
  })
  return sum;
}
