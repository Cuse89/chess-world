import { getSquareDetails } from "utils/helpers";

export const knightValidation = ({
  sourceCoords,
  destinationCoords,
  board,
}) => {
  const availableCoords = [21, -21, 19, -19, 12, -12, 8, -8];
  if (
    availableCoords.includes(
      parseInt(sourceCoords) - parseInt(destinationCoords)
    )
  ) {
    const piece = getSquareDetails(destinationCoords, board)
    return !!piece;
  }
  return false;
};
