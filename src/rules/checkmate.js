import { getPieceProps, loopBoard } from "../utils/helpers";
// kingPlayer is the players colour that controls the king in question

export const checkmate = (kingPlayer, board) => {
  // console.log("checkmate function for king player", kingPlayer)
  let inCheck = false;
  // unavailableCoords are coordianates that are unavailable to king because threats could take that square
  let unavailableCoords = [];
  const availableCoords = [11, -11, 10, -10, 9, -9, 1, -1, 0];
  let potentialCoords = [];
  let kingPos = "";
  let directThreats = [];
  let directThreatCoords = [];
  let canEscapeCheck = false;

  loopBoard(board, ({ rowIdx, square, squareIdx }) => {
    if (
      square.player &&
      square.player === kingPlayer &&
      square.pieceId.split("-") === "king"
    ) {
      kingPos = rowIdx.toString().concat(squareIdx);
    }
  });

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
    if (potentialCoord > 0 && potentialCoord < 78) {
      // convert 1 to 01
      if (potentialCoord.length === 1) {
        potentialCoord = "0" + potentialCoord;
      }
      const square = board[potentialCoord[0]][potentialCoord[1]];
      const squareTaken = square.player;
      // only include as a potential coord if the square is empty (or opponent) or the space is the king itself
      if (
        !squareTaken ||
        squareTaken !== kingPlayer ||
        square.pieceId.split("-")[0] === "king"
      ) {
        potentialCoords.push(potentialCoord);
      }
    }
  });
  // console.log("potential coords", potentialCoords)

  // find unavailableCoords for the king
  potentialCoords.forEach(potentialCoord => {
    loopBoard(board, ({ rowIdx, square, squareIdx }) => {
      // for each of the attackers pieces...
      if (square.player && square.player != kingPlayer) {
        // find all potential target squares
        const validation = getPieceProps(square.pieceId).validateMove;
        const threatCoord = rowIdx.toString().concat(squareIdx);

        // is this piece is able to land on kings potential target?
        // checkmate param passed through (pawns can pass validation on diagonal move)
        if (
          validation(true, threatCoord, potentialCoord, board, square.player)
        ) {
          // console.log("this piece can land on this square", potentialCoord, piece)
          if (potentialCoord === kingPos) {
            directThreats.push(square.pieceId);
            directThreatCoords.push(threatCoord);
          }
          unavailableCoords.push(potentialCoord);
        }
      }
    });
  });

  // console.log('direct threats', directThreats)
  // console.log('unavailable coords for king', unavailableCoords)

  if (unavailableCoords.includes(kingPos)) {
    inCheck = true;
  }

  if (inCheck) {
    potentialCoords.forEach(potentialCoord => {
      if (unavailableCoords.includes(potentialCoord) && !canEscapeCheck) {
        canEscapeCheck = false;
      } else {
        canEscapeCheck = true;
        // console.log('can escape!', potentialCoord)
      }
    });

    if (inCheck && canEscapeCheck) {
      return "check";
    } else {
      let directThreatTaken = false;
      // console.log('check if directThreats can be taken', directThreats, directThreatCoords)
      // loop through directThreatCoords and see if they can be taken by any player

      directThreatCoords.forEach(directThreatCoord => {
        loopBoard(board, ({ rowIdx, square, squareIdx }) => {
          if (square.player && square.player === kingPlayer) {
            const validation = getPieceProps(square.pieceId).validateMove;
            const threatCoord = rowIdx.toString().concat(squareIdx);
            if (
              validation(
                true,
                threatCoord,
                directThreatCoord,
                board,
                square.player
              )
            ) {
              // direct threat can be taken
              // console.log('DIRECT THREAT CAN BE TAKEN!', directThreatCoord)
              directThreatTaken = true;
            }
          }
        });
      });

      if (directThreatTaken) {
        return "check";
      } else {
        return "checkmate";
      }
    }
  }
};
