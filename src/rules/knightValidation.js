export const knightValidation = (
  sourceCoords,
  destinationCoords,
  board,
  player
) => {
  const availableCoords = [21, -21, 19, -19, 12, -12, 8, -8];
  if (availableCoords.includes(parseInt(sourceCoords) - parseInt(destinationCoords))) {
    const piece = board[destinationCoords[0]][destinationCoords[1]];
    return !(piece && piece.player === player);
  }
  return false;
};
