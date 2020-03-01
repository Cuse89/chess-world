export const kingValidation = (checkmate, sourceCoords, destinationCoords) => {
  const availableCoords = [11, -11, 10, -10, 9, -9, 1, -1];
  return availableCoords.includes(parseInt(sourceCoords) - parseInt(destinationCoords));
};
