export const rookValidation = (
  sourceCoords,
  destinationCoords,
  board,
  player
) => {
  // is next move either vertical or horizontal?
  if (
    sourceCoords[0] === destinationCoords[0] ||
    sourceCoords[1] === destinationCoords[1]
  ) {
    // is the path unobstructed?
    const vertical = sourceCoords[0] !== destinationCoords[0];
    let index = vertical ? 0 : 1;
    // forwards means up the y or x axis, so up or left
    const forwards =
      parseInt(sourceCoords[index]) > parseInt(destinationCoords[index]);
    let start = forwards
      ? parseInt(sourceCoords[index]) - 1
      : parseInt(sourceCoords[index]) + 1;
    let end = parseInt(destinationCoords[index]);
    let validMove = true;

    for (
      start;
      forwards ? start > end : start < end;
      forwards ? start-- : start++
    ) {
      let piece = null;
      // has piece been moved vertically?
      if (vertical) {
        piece = board[start][destinationCoords[1]];
        // if piece is on this square
        if (piece.player) {
          // if its checkmate validation and its a king, allow the opponents king to be the obstruction
          validMove = false
        }
        // else if horizontally and if piece is on this square
      } else {
        piece = board[destinationCoords[0]][start];
        if (piece.player) {
          validMove = false
        }
      }
    }
    return validMove;
  }
};
