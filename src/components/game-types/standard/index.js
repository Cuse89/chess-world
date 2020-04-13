import React, { useContext, useState, useEffect } from "react";
import Context from "context";
import firebase from "../../../firebase";
import Board from "components/board";
import { Piece } from "components/piece";
import useGameState from "hooks/useGameState";
import Fallen from "components/fallen";
import { GAME_MODES } from "utils/constants";
import { getOpponent, getPieceProps, getUrlParam } from "utils/helpers";

const StandardChess = ({ history }) => {
  const { user, gameSettings } = useContext(Context);
  const { gameMode, setGameId } = gameSettings;
  const gameId = getUrlParam("game");
  const userId = user && user.id;
  const [message, setMessage] = useState("");

  const {
    gameState,
    handlePerformMove,
    performBotMove,
    canMovePiece,
    gameExists
  } = useGameState({
    gameMode,
    userId,
    gameId
  });

  const isOnePlayer = gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME;
  const isOnlinePlay = gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME;
  const { board, turn, fallen, users, inCheck, inCheckmate } = gameState;

  useEffect(() => {
    if (gameId) {
      setGameId(gameId);
    }
  }, [setGameId, gameId]);

  useEffect(() => {
    const handleNextTurn = () => {
      if (isOnePlayer && turn === "black" && !inCheckmate) {
        performBotMove();
      }
    };
    handleNextTurn();
    // eslint-disable-next-line
  }, [turn]);

  useEffect(() => {
    const handleSetMessage = () => {
      let newMessage = "";
      if (inCheck) {
        newMessage = `${turn} in check`;
      }
      if (inCheckmate) {
        newMessage = `Checkmate. ${turn} wins`;
      }
      if (message !== newMessage) {
        setMessage(newMessage);
      }
    };
    handleSetMessage();
  }, [turn, inCheck, inCheckmate]);

  useEffect(() => {
    const handleGameEnded = async () => {
      if (isOnlinePlay) {
        const lostGame = users[userId].color === inCheckmate;
        const gamesWon = user.gameStats ? user.gameStats.won : 0;
        const gamesLost = user.gameStats ? user.gameStats.lost : 0;
        console.log({ lostGame });
        try {
          // remove game from user
          await firebase.updateUser(userId, "games", { [gameId]: null });
          // update wins or losses
          await firebase.updateUser(userId, "gameStats", {
            played: user.gameStats ? user.gameStats.played + 1 : 1,
            won: lostGame ? gamesWon : gamesWon + 1,
            lost: lostGame ? gamesLost + 1 : gamesLost
          });
        } catch (err) {
          console.log(err);
        }
      }
    };
    if (inCheckmate) {
      console.log("in checkmaate");
      handleGameEnded();
    }
  }, [inCheckmate]);

  useEffect(() => {
    if (!gameExists) {
      history.push("/");
    }
  }, [gameExists, history]);

  function onDrop(a) {
    const sourceCoords = a.source.droppableId;
    const destinationCoords = a.destination.droppableId;
    console.log("on drop", sourceCoords, destinationCoords);
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

  function getFallen(baseline) {
    if (isOnlinePlay && users) {
      const playerColor = users[userId].color;
      return baseline ? fallen[getOpponent(playerColor)] : fallen[playerColor];
    } else {
      return baseline ? fallen.black : fallen.white;
    }
  }

  return (
    <div>
      {message && <div>{message}</div>}
      <Fallen fallen={getFallen()} />
      <Board
        board={board}
        getSquaresChild={getPiece}
        onDragEnd={onDrop}
        turn={turn}
        users={users}
      />
      <Fallen fallen={getFallen(true)} />
    </div>
  );
};

export default StandardChess;
