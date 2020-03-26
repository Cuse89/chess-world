import { getSquareDetails } from "utils/helpers";

export const bishopValidation = ({
  sourceCoords,
  destinationCoords,
  board,
}) => {
  sourceCoords = parseInt(sourceCoords);
  destinationCoords = parseInt(destinationCoords);
  // has the piece moved diagonally?
  if (
    Number.isInteger((sourceCoords - destinationCoords) / 11) ||
    Number.isInteger((sourceCoords - destinationCoords) / 9)
  ) {
    const sWnE = Number.isInteger((sourceCoords - destinationCoords) / 9);
    const up = sourceCoords > destinationCoords;

    for (
      let i = sourceCoords;
      up ? i >= destinationCoords : i <= destinationCoords;
      up
        ? sWnE
          ? (i = i - 9)
          : (i = i - 11)
        : sWnE
        ? (i = i + 9)
        : (i = i + 11)
    ) {
      let coords = i.toString();

      if (coords[0] > 7 || coords[0] < 0 || coords[1] > 7 || coords[1] < 0) {
        // square is outside of board boundary
        return false;
      }
      // Convert single digit to 2 (1 to 01)
      if (coords.length === 1) {
        coords = "0" + coords;
      }
      // dont check first square
      if (i !== sourceCoords) {
        // if piece is on this square
        const square = getSquareDetails(coords, board)
        if (square.pieceId && i !== destinationCoords) {
          return false
        }
        if (i === destinationCoords) {
          return true
        }
      }
    }
  }
  return false;
};
