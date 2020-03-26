import { getSquareDetails } from "utils/helpers";

export const kingValidation = ({sourceCoords, destinationCoords, board, player}) => {
  const availableCoords = [11, -11, 10, -10, 9, -9, 1, -1, 0];
  if (destinationCoords === "73") {
    console.log("ssss", parseInt(sourceCoords) - parseInt(destinationCoords))
  }
  if (availableCoords.includes(parseInt(sourceCoords) - parseInt(destinationCoords))) {
    const piece = getSquareDetails(destinationCoords, board)
    if (destinationCoords === "73") {
      console.log("vvvvvv", piece)
    }
  return !!piece;
  }
  return false;
};
