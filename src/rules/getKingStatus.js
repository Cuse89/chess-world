import { getPieceProps, loopBoard } from "../utils/helpers";
// kingPlayer is the players colour that controls the king in question

export const getKingStatus = (kingPlayer, board) => {
  let inCheck = false;
  const potentialCoords = [11, -11, 10, -10, 9, -9, 1, -1, 0];
  let availableCoords = [];
  let kingPos = "";

  const getKingPos = ({ rowIdx, square, squareIdx }) => {
    if (square.player === kingPlayer && square.pieceId === "king") {
      kingPos = rowIdx.toString().concat(squareIdx);
    }
  };

  loopBoard(board, getKingPos);

  potentialCoords.forEach(coord => {
    let availableCoord = (kingPos - coord).toString();
    if (
      availableCoord[0] > 7 ||
      availableCoord[0] < 0 ||
      availableCoord[1] > 7 ||
      availableCoord[1] < 0
    ) {
      // square is outside of board boundary
      return false;
    }
    // if its a minus number, its off the board therefore not a potential coord or above 77 is below board
    if (availableCoord >= 0 && availableCoord < 78) {
      // convert 1 to 01
      if (availableCoord.length === 1) {
        availableCoord = "0" + availableCoord;
      }
      const square = board[availableCoord[0]][availableCoord[1]];
      // only include as a available coord if the square is empty, or is opponent or the space is the king itself
      if (
        !square.player ||
        square.player !== kingPlayer ||
        square.pieceId.split("-")[0] === "king"
      ) {
        availableCoords.push(availableCoord);
      }
    }
  });

  // filter available coords and take away any that could be threatened if landed on by king
  availableCoords = availableCoords.filter(availableCoord => {
    let isSafe = true;
    loopBoard(board, ({ rowIdx, square, squareIdx }) => {
      if (square.player && square.player !== kingPlayer && isSafe) {
        // find all available target squares
        const validation = getPieceProps(square.pieceId).validateMove;
        const threatCoord = rowIdx.toString().concat(squareIdx);
        const availableCoordCouldBeTaken = validation(
          threatCoord,
          availableCoord,
          board,
          square.player
        );
        isSafe = !availableCoordCouldBeTaken;
      }
    });
    return isSafe;
  });

  if (availableCoords.length < 1) {
    console.log("checkmate");
    return "checkmate";
  }

  loopBoard(board, ({ rowIdx, square, squareIdx }) => {
    // check for direct threats
    if (square.player && square.player !== kingPlayer) {
      const validation = getPieceProps(square.pieceId).validateMove;
      const threatCoord = rowIdx.toString().concat(squareIdx);
      // is this piece is able to land on kings available target?
      if (validation(threatCoord, kingPos, board, square.player)) {
        inCheck = true;
      }
    }
  });
  if (inCheck) {
    console.log(inCheck);
    return "check";
  }

  return false;
};
