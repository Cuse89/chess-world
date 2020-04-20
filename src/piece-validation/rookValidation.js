import { getSquareDetails } from "utils/helpers";

export const getRookPathway = (sourceCoords, destinationCoords) => {
  const pathway = [];
  if (
    sourceCoords[0] === destinationCoords[0] ||
    sourceCoords[1] === destinationCoords[1]
  ) {
    const vertical = sourceCoords[0] !== destinationCoords[0];
    let index = vertical ? 0 : 1;
    // forwards means up the y or x axis, so up or left
    const forwards =
      parseInt(sourceCoords[index]) > parseInt(destinationCoords[index]);
    let position = parseInt(sourceCoords[index]);
    let end = parseInt(destinationCoords[index]);

    for (
      position;
      forwards ? position >= end : position <= end;
      forwards ? position-- : position++
    ) {
      let coords;
      // has piece been moved vertically?
      if (vertical) {
        coords = position.toString() + destinationCoords[1];
        // else if horizontally and if piece is on this square
      } else {
        coords = destinationCoords[0] + position;
      }
      // do not include initial square
      if (coords !== sourceCoords) {
        // Convert single digit to 2 (1 to 01)
        if (coords.length === 1) {
          coords = "0" + coords;
        }
        pathway.push(coords);
      }
    }
  }
  return pathway;
};

export const rookValidation = ({ sourceCoords, destinationCoords, board }) => {
  const pathway = getRookPathway(sourceCoords, destinationCoords);

  for (let i = 0; i < pathway.length; i++) {
    let coords = pathway[i];
    // dont check first square

    const square = getSquareDetails(coords, board);

    if (square.pieceId && coords !== destinationCoords) {
      return false;
    }
    if (coords === destinationCoords) {
      return true;
    }
  }
  return false;
};
