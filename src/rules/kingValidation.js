export const kingValidation = (checkmate, prevCoords, nextCoords) => {
  const availableCoords = [11, -11, 10, -10, 9, -9, 1, -1];
  return availableCoords.includes(parseInt(prevCoords) - parseInt(nextCoords));
};
