import { getSquareDetails } from "utils/helpers";

export const kingValidation = ({sourceCoords, destinationCoords, board}) => {
  const availableCoords = [11, -11, 10, -10, 9, -9, 1, -1, 0];
  if (availableCoords.includes(parseInt(sourceCoords) - parseInt(destinationCoords))) {
    const piece = getSquareDetails(destinationCoords, board)
  return !!piece;
  }
  return false;
};
