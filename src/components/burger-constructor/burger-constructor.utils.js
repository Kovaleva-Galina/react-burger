export const calcKeys = (positions) => {
  return positions.reduce((acc, item) => {
    return [...acc, item._id]
  }, []);
}

export const calcSum = (positions) => {
  return positions.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
}
