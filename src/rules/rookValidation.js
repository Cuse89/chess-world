export const rookValidation = ({ sourceCoords, destinationCoords, board }) => {
  // is next move either vertical or horizontal?
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
      // dont check first square
      if (position !== parseInt(sourceCoords[index])) {
        let piece = null;
        // has piece been moved vertically?
        if (vertical) {
          piece = board[position][destinationCoords[1]];
          // else if horizontally and if piece is on this square
        } else {
          piece = board[destinationCoords[0]][position];
        }

        if (piece.pieceId && position !== end) {
          return false;
        }
        if (position === end) {
          return true;
        }
      }
    }
  }
  return false;
};
