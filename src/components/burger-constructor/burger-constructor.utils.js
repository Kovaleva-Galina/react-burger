export const calcKeys = (positions) => {
  let keysNumbers = [];

  positions.forEach((item) => {
    keysNumbers.push(item._id);
  })
  return keysNumbers;
}

export const calcSum = (positions) => {
  let sum = 0;

  positions.forEach((item) => {

    if ( item.type === 'bun') {
      sum =  item.price * 2;
    } else {
      sum += item.price;
    }
  })
  return sum;
}
