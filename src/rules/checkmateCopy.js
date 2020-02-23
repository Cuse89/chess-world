import { getPieceProps } from "../globalFunctions/getPieceProps";

// kingPlayer is the players colour that controls the king in question
export const checkmate = (kingPlayer, board) => {
  console.log("king player", kingPlayer);
  let inCheck = false;
  // unavailableCoords are coordianates that are unavailable to king because threats could take that square
  let unavailableCoords = [];
  const availableCoords = [11, -11, 10, -10, 9, -9, 1, -1, 0];
  let potentialCoords = [];
  let kingPos = "";
  let directThreats = [];
  let directThreatCoords = [];
  let canEscapeCheck = false;

  function loopBoard(func, params) {
    return board.forEach((row, rowIdx) => {
      row.forEach((piece, pieceIdx) => {
        const loopBoardParams = {
          row: row,
          rowIdx: rowIdx,
          piece: piece,
          pieceIdx: pieceIdx
        };
        func(loopBoardParams, params);
      });
    });
  }

  const getKingPos = ({ piece, rowIdx, pieceIdx }) => {
    if (
      piece &&
      piece.player == kingPlayer &&
      piece.pieceId.split("-") == "king"
    ) {
      kingPos = rowIdx.toString().concat(pieceIdx);
      console.log("kiiing pos", kingPos);
    }
  };

  loopBoard(getKingPos);

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
      if (potentialCoord.length == 1) {
        potentialCoord = "0" + potentialCoord;
      }
      const squareTaken = board[potentialCoord[0]][potentialCoord[1]];
      // only include as a potential coord if the square is empty (or opponent) or the space is the king itself
      if (
        !squareTaken ||
        squareTaken.player !== kingPlayer ||
        squareTaken.pieceId.split("-")[0] == "king"
      ) {
        potentialCoords.push(potentialCoord);
      }
    }
  });
  console.log("potential coords", potentialCoords);

  function pieceValidation({ piece, rowIdx, pieceIdx }, potentialCoord, func) {
    console.log("piiece validation!", piece);
    console.log("oooooooooo ");
    if (piece && piece.player != kingPlayer) {
      console.log("aaaaaa");
      // find all potential target squares
      const validation = getPieceProps(piece).validateMove;
      const threatCoord = rowIdx.toString().concat(pieceIdx);

      // is this piece is able to land on kings potential target?
      // checkmate param passed through (pawns can pass validation on diagonal move)
      if (validation(true, threatCoord, potentialCoord, board, piece.player)) {
        console.log(
          "this piece can land on this square",
          potentialCoord,
          piece
        );
        if (potentialCoord == kingPos) {
          directThreats.push(piece.pieceId);
          directThreatCoords.push(threatCoord);
        }
        unavailableCoords.push(potentialCoord);
      }
    }
  }

  // find unavailableCoords for the king
  potentialCoords.forEach(potentialCoord => {
    loopBoard(pieceValidation, potentialCoord);
  });

  // board.forEach((row, rowIdx) => {
  //     row.forEach((piece, pieceIdx ) => {
  //         // for each of the attackers pieces...
  //         if (piece && piece.player != kingPlayer) {
  //             // find all potential target squares
  //             const validation = getPieceProps(piece).validateMove
  //             const threatCoord = rowIdx.toString().concat(pieceIdx)

  //             // is this piece is able to land on kings potential target?
  //             // checkmate param passed through (pawns can pass validation on diagonal move)
  //             if (validation(true, threatCoord, potentialCoord, board, piece.player)) {
  //                 console.log("this piece can land on this square", potentialCoord, piece)
  //                 if (potentialCoord == kingPos) {
  //                     directThreats.push(piece.pieceId)
  //                     directThreatCoords.push(threatCoord)
  //                 }
  //                 unavailableCoords.push(potentialCoord)
  //             }

  //         }
  //     })
  // })

  console.log("direct threats", directThreats);
  console.log("unavailable coords for king", unavailableCoords);

  if (unavailableCoords.includes(kingPos)) {
    inCheck = true;
  }

  if (inCheck) {
    potentialCoords.forEach(potentialCoord => {
      if (unavailableCoords.includes(potentialCoord) && !canEscapeCheck) {
        canEscapeCheck = false;
      } else {
        canEscapeCheck = true;
        console.log("can escape!", potentialCoord);
      }
    });

    if (inCheck && canEscapeCheck) {
      return "check";
    } else {
      let directThreatTaken = false;
      console.log(
        "check if directThreats can be taken",
        directThreats,
        directThreatCoords
      );
      // loop through directThreatCoords and see if they can be taken by any player

      directThreatCoords.forEach(directThreatCoord => {
        // Todo: make DRY
        board.forEach((row, rowIdx) => {
          row.forEach((piece, pieceIdx) => {
            if (piece && piece.player != kingPlayer) {
              const validation = getPieceProps(piece).validateMove;
              const threatCoord = rowIdx.toString().concat(pieceIdx);
              if (
                validation(
                  true,
                  threatCoord,
                  directThreatCoord,
                  board,
                  piece.player
                )
              ) {
                // direct threat can be taken
                console.log("DIRECT THREAT CAN BE TAKEN!", directThreatCoord);
                directThreatTaken = true;
              }
            }
          });
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

const attemptBotMove = () => {
  blackPiece = null;
  console.log("perform bot move");
  while (!blackPiece) {
    if (
      this.state.board[randomCol][randomRow] &&
      this.state.board[randomCol][randomRow].player == "black"
    ) {
      console.log("black piece", this.state.board[randomCol][randomRow]);
      blackPiece = this.state.board[randomCol][randomRow];
      coords = randomCol.toString().concat(randomRow);
    }
    randomCol = getRandomNum(7);
    randomRow = getRandomNum(7);
  }
};
