export const rookValidation = (
  checkmate,
  prevCoords,
  nextCoords,
  board,
  player
) => {
  // is next move either vertical or horizontal?
  if (prevCoords[0] == nextCoords[0] || prevCoords[1] == nextCoords[1]) {
    // is the path unobstructed?
    const vertical = prevCoords[0] !== nextCoords[0];
    let index = vertical ? 0 : 1;
    // forwards means up the y or x axis, so up or left
    const forwards = parseInt(prevCoords[index]) > parseInt(nextCoords[index]);
    let start = forwards
      ? parseInt(prevCoords[index]) - 1
      : parseInt(prevCoords[index]) + 1;
    let end = parseInt(nextCoords[index]);
    let validMove = true;

    for (
      start;
      forwards ? start > end : start < end;
      forwards ? start-- : start++
    ) {
      let piece = null;
      // has piece been moved vertically?
      if (vertical) {
        piece = board[start][nextCoords[1]];
        // if piece is on this square
        if (piece.player) {
          // if its checkmate validation and its a king, allow the opponents king to be the obstruction
          validMove =
            checkmate &&
            piece.pieceId.split("-")[0] == "king" &&
            piece.player != player;
        }
        // else if horizontally and if piece is on this square
      } else {
        piece = board[nextCoords[0]][start];
        if (piece.player) {
          validMove =
            checkmate &&
            piece.pieceId.split("-")[0] == "king" &&
            piece.player != player;
        }
      }
    }
    return validMove;
  }
};
