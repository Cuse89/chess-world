export const pawnValidation = (
  checkmate,
  prevCoords,
  nextCoords,
  board,
  player,
  captureOnly
) => {
  // captureOnly is validation to see if it can capture only
  const targetSquareOccupied = captureOnly
    ? true
    : board[nextCoords[0]][nextCoords[1]].player;
  // moved 1 space forward
  if (
    parseInt(prevCoords) - parseInt(nextCoords) ===
    (player === "white" ? 10 : -10)
  ) {
    return !targetSquareOccupied && !checkmate;
    // moved 2 spaces forward
  } else if (
    parseInt(prevCoords) - parseInt(nextCoords) ===
    (player === "white" ? 20 : -20)
  ) {
    const eligibleColumn = player === "white" ? 6 : 1;
    // was moving 2 spaces eligible?

    // Todo: Dont allow pawn to jump over piece when moving 2 squares

    return (
      prevCoords[0] === eligibleColumn && !targetSquareOccupied && !checkmate
    );
    // pawn moved diagonally
  } else if (
    parseInt(prevCoords) - parseInt(nextCoords) ===
      (player == "white" ? 9 : -9) ||
    parseInt(prevCoords) - parseInt(nextCoords) ===
      (player == "white" ? 11 : -11)
  ) {
    // was diagonal move eligible?
    return checkmate ? true : targetSquareOccupied;
  } else {
    return false;
  }
};
