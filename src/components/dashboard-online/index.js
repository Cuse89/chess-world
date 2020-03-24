import React, { useContext, useEffect, useState } from "react";
import firebase from "../../firebase";
import ChallengePlayer from "components/dashboard-online/challenge-player";
import NameInput from "components/dashboard-online/name-input";
import { Context } from "components/app";
import useAvailableUsers from "hooks/useAvailableUsers";
import { v4 as uuid } from "uuid";
import defaultBoard from "lineups/defaultBoard";
import CreateGame from "components/create-game";

const DashboardOnline = ({ history }) => {
  const { user, settings } = useContext(Context);
  const { gameType } = settings;

  const { getUserAvailability } = useAvailableUsers();

  const login = async () => {
    try {
      await firebase.login();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) {
      login();
    }
  }, [user]);

  const updateGameRequest = async (outgoingUserId, incomingUserId, value) => {
    try {
      await firebase.updateUser(incomingUserId, "requestsIncoming", {
        [outgoingUserId]: value
      });
      await firebase.updateUser(outgoingUserId, "requestsOutgoing", {
        [incomingUserId]: value
      });
    } catch (err) {
      console.log(err);
    }
  };

  const joinGame = gameId => {
    history.push(`/${gameType}?game=${gameId}`);
  };

  const handleStartNewGame = async opponentId => {
    const newGameId = `game-${uuid().split("-")[0]}`;
    try {
      await firebase.updateGame(newGameId, {
        users: { white: user.id, black: opponentId },
        board: defaultBoard,
        turn: user.id,
        gameType: gameType
      });
      await updateGameRequest(opponentId, user.id, null);
      await firebase.updateUser(user.id, "games", { [opponentId]: newGameId });
      await firebase.updateUser(opponentId, "games", { [user.id]: newGameId });
    } catch (err) {
      console.log(err);
    }
    joinGame(newGameId);
  };

  if (user) {
    return (
      <div>
        <NameInput user={user} />
        {user.name && getUserAvailability(user.id) && (
          <ChallengePlayer
            history={history}
            handleStartNewGame={handleStartNewGame}
            updateGameRequest={updateGameRequest}
            joinGame={joinGame}
          />
        )}
      </div>
    );
  }
  return null;
};

export default DashboardOnline;
