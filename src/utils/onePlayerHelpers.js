import {
  getNextBoard,
  getPieceProps,
  loopBoard,
  performValidation
} from "./helpers";
import { getKingStatus } from "piece-validation/getKingStatus";

// getThreats takes moving into check into consideration - a piece that would move into check if it performed the move is NOT a threat
// use useDirectThreats to not take moving into check into consideration
export const getThreats = (
  threatenedPlayer,
  threatenedPlayerCoords,
  board,
  boardTechnicalName
) => {
  let threats = [];

  loopBoard(board, ({ square, coords }) => {
    const threateningPlayer = square.player;
    if (
      threateningPlayer &&
      threateningPlayer !== threatenedPlayer &&
      performValidation({
        sourceCoords: coords,
        destinationCoords: threatenedPlayerCoords,
        board,
        boardTechnicalName,
        player: threateningPlayer,
        captureOnly: true,
        baselinePlayer: "white"
      })
    ) {
      threats.push(square.pieceId);
    }
  });
  return threats;
};

export const getBotMoves = (board, boardTechnicalName) => {
  let moves = [];
  // find black piece
  loopBoard(board, ({ square: prevSquare, coords }) => {
    if (prevSquare.player === "black") {
      // got black piece
      const sourceCoords = coords;

      // loop through board and see if this piece can move there
      loopBoard(board, ({ coords, square: nextSquare }) => {
        const destinationCoords = coords;
        // console.log('next coords', destinationCoords)

        if (
          performValidation({
            board,
            boardTechnicalName,
            player: "black",
            sourceCoords,
            destinationCoords,
            baselinePlayer: "white"
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
              threats: getThreats(
                "black",
                sourceCoords,
                board,
                boardTechnicalName
              )
            },
            destination: {
              pieceId: nextSquare.pieceId && nextSquare.pieceId,
              coords: destinationCoords,
              strength:
                nextSquare.pieceId &&
                getPieceProps(nextSquare.pieceId).strength,
              kingStatusYou: getKingStatus(
                nextBoard,
                "black",
                "white",
                boardTechnicalName
              ),
              kingStatusOpponent: getKingStatus(
                nextBoard,
                "white",
                "white",
                boardTechnicalName
              ),
              threats: getThreats(
                "black",
                destinationCoords,
                nextBoard,
                boardTechnicalName
              ),
              defenders: getThreats(
                "white",
                destinationCoords,
                nextBoard,
                boardTechnicalName
              )
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
    const scoreLog = [];

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

    if (move.destination.kingStatusOpponent === "checkmate") {
      move.wouldPutOpponentInCheckmate = true;
      scoreLog.push(" checkmate");
    }

    if (move.destination.kingStatusOpponent === "check") {
      // the weaker the player, the higher the score (less to sacrifice)
      // Todo: decide on score
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

    move.score = score;
    move.scoreLog = scoreLog.join();
    console.log(
      `${move.source.pieceId} to ${move.destination.coords}, score ${score}`
    );
  });

  moves.forEach(move => {
    if (move.wouldPutOpponentInCheckmate) {
      selectedMove = move;
    } else if (move.score > selectedMove.score) {
      selectedMove = move;
    }
  });

  if (selectedMove.score === 0) {
    // all available moves are into an empty space i.e at beginning of game
    let moveChosen = false;
    while (!moveChosen) {
      const randomMove = moves[parseInt(Math.random() * moves.length)];
      if (randomMove.score === 0) {
        selectedMove = randomMove;
        moveChosen = true;
      }
    }
  }

  console.log("selected move", selectedMove);
  return selectedMove;
};
