export const bishopValidation = (
  checkmate,
  sourceCoords,
  destinationCoords,
  board,
  player
) => {
  sourceCoords = parseInt(sourceCoords);
  destinationCoords = parseInt(destinationCoords);
  // has the piece moved diagonally?
  if (
    Number.isInteger((sourceCoords - destinationCoords) / 11) ||
    Number.isInteger((sourceCoords - destinationCoords) / 9)
  ) {
    // is the path unobstructed
    const sWnE = Number.isInteger((sourceCoords - destinationCoords) / 9);
    const up = sourceCoords > destinationCoords;

    for (
      let i = sourceCoords;
      up ? i > destinationCoords : i < destinationCoords;
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
        const piece = board[coords[0]][coords[1]];
        // if piece is on this square
        if (piece.player) {
          // if its checkmate validation and its a king, allow the oponents king to obstruct
          return (
            checkmate &&
            piece.pieceId.split("-")[0] === "king" &&
            piece.player !== player
          );
        }
      }
    }
    return true;
  }
  return false;
};
