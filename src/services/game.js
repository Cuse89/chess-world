export const getNextBoard = (prevCoords, nextCoords, fallInTrapdoor) => {
  let boardCopy = JSON.parse(JSON.stringify(this.props.board));
  // new square is taken over
  if (!fallInTrapdoor) {
    boardCopy[nextCoords[0]][nextCoords[1]] =
      boardCopy[prevCoords[0]][prevCoords[1]];
  }
  // old square is emptied
  boardCopy[prevCoords[0]][prevCoords[1]] = { player: false, pieceId: false };
  return boardCopy;
};

export const performValidation = (
  ownColor,
  prevCoords,
  nextCoords,
  pieceId
) => {
  // work out if valid square has been selected, or another of mine
  const selectedSquare = this.getSquareDetails(nextCoords);
  // if clicked on own piece again
  if (selectedSquare.player === ownColor) {
    return false;
    // else perform validation
  } else if (
    this.state.freedom
      ? true
      : getPieceProps(pieceId).validateMove(
          false,
          prevCoords,
          nextCoords,
          this.props.board,
          ownColor
        )
  ) {
    return true;
  }
};
