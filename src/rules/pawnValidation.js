import { getOpponent } from "utils/helpers";

export const pawnValidation = ({
  sourceCoords,
  destinationCoords,
  board,
  player,
  captureOnly,
  baselinePlayer,
}) => {
  // captureOnly is validation to see if it can capture only
  const targetSquareOccupied = captureOnly
    ? true
    : board[destinationCoords[0]][destinationCoords[1]].player ===
      getOpponent(player);
  const move = parseInt(sourceCoords) - parseInt(destinationCoords);
  // moved 1 space forward
  if (move === (player === baselinePlayer ? 10 : -10)) {
    return !targetSquareOccupied;
    // moved 2 spaces forward
  } else if (move === (player === baselinePlayer ? 20 : -20)) {
    const eligibleColumn = player === baselinePlayer ? 6 : 1;
    // was moving 2 spaces eligible?
    // Todo: Dont allow pawn to jump over piece when moving 2 squares
    return (
      parseInt(sourceCoords[0]) === eligibleColumn && !targetSquareOccupied
    );
    // pawn moved diagonally
  } else if (
    move === (player === baselinePlayer ? 9 : -9) ||
    move === (player === baselinePlayer ? 11 : -11)
  ) {
    // was diagonal move eligible?
    return targetSquareOccupied;
  } else {
    return false;
  }
};
