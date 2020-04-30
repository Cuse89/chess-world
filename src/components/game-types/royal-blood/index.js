import React, { useContext, useState, useEffect, Fragment } from "react";
import Context from "context";
import { Piece } from "components/piece";
import useGameState from "hooks/useGameState";
import { GAME_MODES } from "utils/constants";
import {
  getOpponent,
  getPieceProps,
  getUrlParam,
  isRoyalty,
  uppercaseFirstLetter
} from "utils/helpers";
import GameFooter from "components/game-footer";
import Game from "components/game";
import { getBotMoves } from "utils/onePlayerHelpers";

const decideBotMove = moves => {
  let selectedMove = { score: -100 };

  moves.forEach(move => {
    let score = move.destination.strength || 0;
    const targetIsThreatened = move.destination.threats.length > 0;
    const targetIsDefended = move.destination.defenders.length > 0;
    const scoreLog = [];

    // if the piece is currently threatened, add points to escape threat
    if (move.source.threats.length > 0) {
      score += 10;
      scoreLog.push(" +10 to escape threat");
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
      score -= 10;
      scoreLog.push(
        " -10 (own strength score) target square is threatened by ${move.destination.threats.join()}"
      );

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
    if (isRoyalty(move.destination.pieceId)) {
      selectedMove = move;
    }
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

const RoyalBlood = ({ history }) => {
  const { user, gameSettings, setGameId } = useContext(Context);
  const { gameMode, boardVariant } = gameSettings;
  const gameId = getUrlParam("gameId");
  const userId = user && user.id;
  const [message, setMessage] = useState("");

  const {
    gameState,
    handlePerformMove,
    performMove,
    canMovePiece,
    handleGameEnded,
    removeGame
  } = useGameState({
    gameMode,
    userId,
    gameId,
    boardVariant
  });

  const isOnePlayer = gameMode === GAME_MODES.onePlayer.technicalName;
  const { board, turn, inCheck, inCheckmate, fallen } = gameState;
  const whiteWinsRoyalBlood = fallen.black.length > 0;
  const blackWinsRoyalBlood = fallen.white.length > 0;

  useEffect(() => {
    if (gameId) {
      setGameId(gameId);
    }
  }, [setGameId, gameId]);

  useEffect(() => {
    const handleNextTurn = () => {
      if (isOnePlayer && turn === "black" && !inCheckmate) {
        const selectedMove = decideBotMove(getBotMoves(board, boardVariant));
        const { source, destination } = selectedMove;
        performMove(source.coords, destination.coords);
      }
    };

    const handleSetMessage = () => {
      let newMessage = "";
      if (inCheck) {
        newMessage = `${uppercaseFirstLetter(turn)} in check`;
      }
      if (inCheckmate) {
        newMessage = `Checkmate. ${turn} wins`;
      }
      if (blackWinsRoyalBlood) {
        newMessage = "Black wins";
      }
      if (whiteWinsRoyalBlood) {
        newMessage = "White wins";
      }
      if (message !== newMessage) {
        setMessage(newMessage);
      }
    };

    if (whiteWinsRoyalBlood || blackWinsRoyalBlood) {
      handleGameEnded(getOpponent(turn));
    }
    if (inCheckmate) {
      handleGameEnded(turn);
    }
    handleNextTurn();
    handleSetMessage();
  }, [turn, inCheck, inCheckmate]);

  useEffect(() => {
    if (gameState.status === "ended") {
      history.push("/");
    }
  }, [gameState, history]);

  function onDrop(a) {
    const sourceCoords = a.source.droppableId;
    const destinationCoords = a.destination.droppableId;
    handlePerformMove(sourceCoords, destinationCoords);
  }

  function getPiece(square) {
    const { player, pieceId, inCheck } = square;
    return square.pieceId ? (
      <Piece
        key={`${player}-${pieceId}`}
        id={`${player}-${pieceId}`}
        icon={getPieceProps(pieceId).icon}
        pieceColor={player}
        inCheck={inCheck}
        available={canMovePiece(player)}
      />
    ) : null;
  }

  return (
    <Fragment>
      <Game
        gameState={gameState}
        getSquaresChild={getPiece}
        onDrop={onDrop}
        message={message}
      />
      <GameFooter resignGame={removeGame} />
    </Fragment>
  );
};

export default RoyalBlood;
