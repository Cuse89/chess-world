import { getSquareDetails } from "utils/helpers";
import { BOARDS } from "utils/constants";

export const pawnValidation = ({
  sourceCoords,
  destinationCoords,
  board,
  captureOnly,
  baselinePlayer,
  boardVariant
}) => {
  const player = getSquareDetails(sourceCoords, board).player;
  // captureOnly is validation to see if it can capture only
  const targetSquareOccupied = captureOnly
    ? true
    : getSquareDetails(destinationCoords, board).pieceId.length > 0;
  const move = parseInt(sourceCoords) - parseInt(destinationCoords);
  // moved 1 space forward
  if (move === (player === baselinePlayer ? 10 : -10)) {
    return !targetSquareOccupied;
    // moved 2 spaces forward
  } else if (move === (player === baselinePlayer ? 20 : -20)) {
    const pawnStartingRow = BOARDS[boardVariant].whitePawnStartingRow;
    const eligibleColumn =
      player === baselinePlayer
        ? pawnStartingRow
        : board.length - 1 - pawnStartingRow;
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
