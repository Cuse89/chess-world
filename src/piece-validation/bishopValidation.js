import { getSquareDetails } from "utils/helpers";

export const getBishopPathway = (sourceCoords, destinationCoords) => {
  sourceCoords = parseInt(sourceCoords);
  destinationCoords = parseInt(destinationCoords);
  const pathway = [];
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
      pathway.push(coords);
    }
  }
  return pathway;
};

export const bishopValidation = ({
  sourceCoords,
  destinationCoords,
  board
}) => {
  const pathway = getBishopPathway(sourceCoords, destinationCoords);

  for (let i = 0; i < pathway.length; i++) {
    let coords = pathway[i];
    const square = getSquareDetails(coords, board);
    if (!square) {
      // square is outside of board boundary
      return false;
    }
    // Convert single digit to 2 (1 to 01)
    if (coords.length === 1) {
      coords = "0" + coords;
    }
    // dont check first square
    if (coords !== sourceCoords) {
      // if piece is on this square

      if (square.pieceId && coords !== destinationCoords) {
        return false;
      }
      if (coords === destinationCoords) {
        return true;
      }
    }
  }

  return false;
};
