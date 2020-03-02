import {
  kingStatusOpponent,
  kingStatusSelf,
  getNextBoard,
  getPieceProps,
  loopBoard,
  performValidation
} from "./helpers";

export const getThreats = (threatenedPlayer, nextCoords, board) => {
  let threats = [];
  loopBoard(board, ({ rowIdx, square, squareIdx }) => {
    if (square.player && square.player !== threatenedPlayer) {
      const prevCoords = rowIdx.toString().concat(squareIdx);
      const validateMove = getPieceProps(square.pieceId).validateMove;

      // threat cant come from that square itself
      if (
        prevCoords !== nextCoords &&
        validateMove(false, prevCoords, nextCoords, board, square.player, true)
      ) {
        // console.log(piece.player, piece.pieceId, "is a threat to", threatenedPlayer, threatenedPiece)
        threats.push(square.pieceId);
      }
    }
  });
  return threats;
};

export const getBotMoves = board => {
  let moves = [];
  // find black piece
  loopBoard(board, ({ rowIdx, square: prevSquare, squareIdx }) => {
    if (prevSquare.player === "black") {
      // got black piece
      const sourceCoords = rowIdx.toString().concat(squareIdx);

      // loop through board and see if this piece can move there
      loopBoard(board, ({ rowIdx, squareIdx, square: nextSquare }) => {
        const destinationCoords = rowIdx.toString().concat(squareIdx);
        // console.log('next coords', destinationCoords)

        if (
          performValidation({
            board,
            ownColor: "black",
            sourceCoords,
            destinationCoords
          })
        ) {
          const nextBoard = getNextBoard(
            board,
            sourceCoords,
            destinationCoords
          );

          let move = {
            source: {
              pieceId: prevSquare.pieceId,
              coords: sourceCoords,
              strength: getPieceProps(prevSquare.pieceId).strength,
              checkmateYou: kingStatusSelf(board, "black"),
              checkmateOpponent: kingStatusOpponent(board),
              threats: getThreats("black", sourceCoords, board)
            },
            destination: {
              pieceId: nextSquare.pieceId && nextSquare.pieceId,
              coords: destinationCoords,
              strength:
                nextSquare.pieceId &&
                getPieceProps(nextSquare.pieceId).strength,
              checkmateYou: kingStatusSelf(nextBoard, "black"),
              checkmateOpponent: kingStatusOpponent(nextBoard, "black"),
              threats: getThreats("black", destinationCoords, nextBoard),
              defenders: getThreats("white", destinationCoords, nextBoard)
            }
          };

          // console.log('bot move handlePerformMove returned true', square && square.player)
          if (move.destination.strength > 0 || move.destination.checkmate) {
            moves.push(move);
          } else if (!nextSquare.player) {
            moves.push(move);
          }
        }
      });
    }
  });

  console.log("moves", moves);
  return moves;
};

export const decideBotMove = moves => {
  let selectedMove = { score: -100 };

  moves.forEach(move => {
    let score = move.destination.strength || 0;
    const targetIsThreatened = move.destination.threats.length > 0;
    const targetIsDefended = move.destination.defenders.length > 0;
    let scoreLog = [];

    // if the black piece is currently threatened, add points to escape threat
    if (move.source.threats.length > 0) {
      score += move.source.strength;
      scoreLog.push(
        ` +${move.source.strength} (own strength score) to escape threat`
      );
      console.log(
        `${
          move.source.pieceId
        } is currently threatened by ${move.source.threats.join()}`
      );
    }

    if (move.destination.checkmateOpponent === "checkmate") {
      score = "checkmate";
      scoreLog.push(" checkmate");
    }

    if (move.destination.checkmateOpponent === "check") {
      // the weaker the player, the higher the score (less to sacrifice)
      // To do: decide on score
      // score += 3
      console.log(
        `${move.source.pieceId} can put king in check move this piece`
      );
    }

    if (targetIsThreatened) {
      score -= move.source.strength;
      scoreLog.push(
        ` -${
          move.source.strength
        } (own strength score) target square is threatened by ${move.destination.threats.join()}`
      );

      // only add points for targetIsDefended if also targetIsThreatened
      if (targetIsDefended) {
        score += move.source.strength;
        scoreLog.push(
          ` +${move.source.strength} (own strength score) target square is defended`
        );
      }
    }

    if (
      move.source.checkmateYou === "check" &&
      !move.destination.checkmateYou
    ) {
      move.wouldEscapeCheck = true;
    }

    if (
      !move.source.checkmateYou &&
      move.destination.checkmateYou === "check"
    ) {
      move.wouldMoveIntoCheck = true;
    }

    move.score = score;
    move.scoreLog = scoreLog.join();
    console.log(
      `${move.source.pieceId} to ${move.destination.coords}, score ${score}`
    );
  });

  const moveIsValid = move => {
    return (
      // (this.state.inCheck === "black" ? move.wouldEscapeCheck : true) &&
      !move.wouldMoveIntoCheck
    );
  };

  moves.forEach(move => {
    if (moveIsValid(move) && move.score > selectedMove.score) {
      selectedMove = move;
    }
  });

  if (selectedMove.score === 0) {
    // all available moves are into an empty space i.e at beginning of game
    let moveChosen = false;
    while (!moveChosen) {
      const randomMove = moves[parseInt(Math.random() * moves.length)];
      if (moveIsValid(randomMove) && randomMove.score === 0) {
        selectedMove = randomMove;
        moveChosen = true;
      }
    }
  }

  return selectedMove;
};
