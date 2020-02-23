export const knightValidation = (
  checkmate,
  prevCoords,
  nextCoords,
  board,
  player
) => {
  const availableCoords = [21, -21, 19, -19, 12, -12, 8, -8];
  if (availableCoords.includes(parseInt(prevCoords) - parseInt(nextCoords))) {
    const piece = board[nextCoords[0]][nextCoords[1]];
    return !(piece && piece.player == player);
  }
  return false;
};
