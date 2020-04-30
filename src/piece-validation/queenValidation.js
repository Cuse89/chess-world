import { bishopValidation, getBishopPathway } from "piece-validation/bishopValidation";
import { getRookPathway, rookValidation } from "piece-validation/rookValidation";

const movedDiagonally = (sourceCoords, destinationCoords) =>
  Number.isInteger((sourceCoords - destinationCoords) / 11) ||
  Number.isInteger((sourceCoords - destinationCoords) / 9);
const movedSideways = (sourceCoords, destinationCoords) =>
  sourceCoords[0] === destinationCoords[0] &&
  sourceCoords[1] !== destinationCoords[1];
const movedVertically = (sourceCoords, destinationCoords) =>
  sourceCoords[0] !== destinationCoords[0] &&
  sourceCoords[1] === destinationCoords[1];

export const getQueenPathway = (sourceCoords, destinationCoords) => {
  if (movedDiagonally(sourceCoords, destinationCoords)) {
    return getBishopPathway(sourceCoords, destinationCoords);
  }
  if (
    movedVertically(sourceCoords, destinationCoords) ||
    movedSideways(sourceCoords, destinationCoords)
  ) {
    return getRookPathway(sourceCoords, destinationCoords);
  }
};

export const queenValidation = ({ sourceCoords, destinationCoords, board }) => {
  if (movedDiagonally(sourceCoords, destinationCoords)) {
    return bishopValidation({ sourceCoords, destinationCoords, board });
  }
  if (
    movedVertically(sourceCoords, destinationCoords) ||
    movedSideways(sourceCoords, destinationCoords)
  ) {
    return rookValidation({ sourceCoords, destinationCoords, board });
  }
  return false;
};
