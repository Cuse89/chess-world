import { getNextBoard, getPieceProps, loopBoard, performValidation } from "./helpers";

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
      const prevCoords = rowIdx.toString().concat(squareIdx);

      // loop through board and see if this piece can move there
      loopBoard(board, ({ rowIdx, squareIdx, square: nextSquare }) => {
        const nextCoords = rowIdx.toString().concat(squareIdx);
        // console.log('next coords', nextCoords)

        if (
          performValidation({
            board,
            ownColor: "black",
            prevCoords,
            nextCoords
          })
        ) {
          const nextBoard = getNextBoard(board, prevCoords, nextCoords);

          let move = {
            begin: {
              pieceId: prevSquare.pieceId,
              coords: prevCoords,
              strength: getPieceProps(prevSquare.pieceId).strength,
              checkmateYou: this.game.current.checkmateYou(this.props.board),
              checkmateOpponent: this.game.current.checkmateOpponent(
                this.props.board
              ),
              threats: getThreats("black", prevCoords, board)
            },
            end: {
              pieceId: nextSquare.pieceId && nextSquare.pieceId,
              coords: nextCoords,
              strength:
                nextSquare.pieceId &&
                getPieceProps(nextSquare.pieceId).strength,
              checkmateYou: this.game.current.checkmateYou(nextBoard),
              checkmateOpponent: this.game.current.checkmateOpponent(nextBoard),
              threats: getThreats("black", nextCoords, nextBoard),
              defenders: getThreats("white", nextCoords, nextBoard)
            }
          };

          // console.log('bot move handlePerformMove returned true', square && square.player)
          if (move.end.strength > 0 || move.end.checkmate) {
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
    let score = move.end.strength || 0;
    const targetIsThreatened = move.end.threats.length > 0;
    const targetIsDefended = move.end.defenders.length > 0;
    let scoreLog = [];

    // if the black piece is currently threatened, add points to escape threat
    if (move.begin.threats.length > 0) {
      score += move.begin.strength;
      scoreLog.push(
        ` +${move.begin.strength} (own strength score) to escape threat`
      );
      console.log(
        `${
          move.begin.pieceId
        } is currently threatened by ${move.begin.threats.join()}`
      );
    }

    if (move.end.checkmateOpponent === "checkmate") {
      score = "checkmate";
      scoreLog.push(" checkmate");
    }

    if (move.end.checkmateOpponent === "check") {
      // the weaker the player, the higher the score (less to sacrifice)
      // To do: decide on score
      // score += 3
      console.log(
        `${move.begin.pieceId} can put king in check move this piece`
      );
    }

    if (targetIsThreatened) {
      score -= move.begin.strength;
      scoreLog.push(
        ` -${
          move.begin.strength
        } (own strength score) target square is threatened by ${move.end.threats.join()}`
      );

      // only add points for targetIsDefended if also targetIsThreatened
      if (targetIsDefended) {
        score += move.begin.strength;
        scoreLog.push(
          ` +${move.begin.strength} (own strength score) target square is defended`
        );
      }
    }

    if (move.begin.checkmateYou === "check" && !move.end.checkmateYou) {
      move.wouldEscapeCheck = true;
    }

    if (!move.begin.checkmateYou && move.end.checkmateYou === "check") {
      move.wouldMoveIntoCheck = true;
    }

    move.score = score;
    move.scoreLog = scoreLog.join();
    console.log(`${move.begin.pieceId} to ${move.end.coords}, score ${score}`);
  });

  const moveIsValid = move => {
    return (
      (this.state.inCheck === "black" ? move.wouldEscapeCheck : true) &&
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
