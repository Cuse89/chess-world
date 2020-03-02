import { getPieceProps, loopBoard } from "../utils/helpers";
// kingPlayer is the players colour that controls the king in question

export const getKingStatus = (kingPlayer, board) => {
  let inCheck = false;
  const availableCoords = [11, -11, 10, -10, 9, -9, 1, -1, 0];
  let potentialCoords = [];
  let kingPos = "";

  const getKingPos = ({ rowIdx, square, squareIdx }) => {
    if (
      square.player &&
      square.player === kingPlayer &&
      square.pieceId === "king"
    ) {
      kingPos = rowIdx.toString().concat(squareIdx);
    }
  };

  loopBoard(board, getKingPos);

  // determine whether the available coords are potential coords (could the king move there?)
  availableCoords.forEach(coord => {
    let potentialCoord = (kingPos - coord).toString();
    if (
      potentialCoord[0] > 7 ||
      potentialCoord[0] < 0 ||
      potentialCoord[1] > 7 ||
      potentialCoord[1] < 0
    ) {
      // square is outside of board boundary
      return false;
    }
    // if its a minus number, its off the board therefore not a potential coord or above 77 is below board
    if (potentialCoord >= 0 && potentialCoord < 78) {
      // convert 1 to 01
      if (potentialCoord.length === 1) {
        potentialCoord = "0" + potentialCoord;
      }
      const square = board[potentialCoord[0]][potentialCoord[1]];
      // only include as a potential coord if the square is empty, or is opponent or the space is the king itself
      if (
        !square.player ||
        square.player !== kingPlayer ||
        square.pieceId.split("-")[0] === "king"
      ) {
        potentialCoords.push(potentialCoord);
      }
    }
  });
  console.log("potential coords before", potentialCoords);

  // filter potential coords and take away any that could be threatened if landed on by king
  potentialCoords = potentialCoords.filter(potentialCoord => {
    let isSafe = true;
    loopBoard(board, ({ rowIdx, square, squareIdx }) => {
      //
      if (square.player && square.player !== kingPlayer && isSafe) {
        // find all potential target squares
        const validation = getPieceProps(square.pieceId).validateMove;
        const threatCoord = rowIdx.toString().concat(squareIdx);
        const potentialCoordCouldBeTaken = validation(
          threatCoord,
          potentialCoord,
          board,
          square.player
        );
        isSafe = !potentialCoordCouldBeTaken;
      }
    });
    return isSafe;
  });

  console.log("potential coords after", potentialCoords);

  if (potentialCoords.length < 1) {
    return "checkmate";
  }

  loopBoard(board, ({ rowIdx, square, squareIdx }) => {
    // check for direct threats
    if (square.player && square.player !== kingPlayer) {
      const validation = getPieceProps(square.pieceId).validateMove;
      const threatCoord = rowIdx.toString().concat(squareIdx);
      // is this piece is able to land on kings potential target?
      if (validation(threatCoord, kingPos, board, square.player)) {
        inCheck = true;
      }
    }
  });
  return inCheck ? "check" : false;
};
