export const round = (num: number, decimalPlaces: number = 0): number => {
  const roundedString = num.toFixed(decimalPlaces);
  return parseFloat(roundedString);
};
