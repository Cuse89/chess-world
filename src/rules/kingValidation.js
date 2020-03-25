export const kingValidation = ({sourceCoords, destinationCoords, board, player}) => {
  const availableCoords = [11, -11, 10, -10, 9, -9, 1, -1];
  if (availableCoords.includes(parseInt(sourceCoords) - parseInt(destinationCoords))) {
    const piece = board[destinationCoords[0]][destinationCoords[1]];
    return !(piece && piece.player === player);
  }
  return false;
};
