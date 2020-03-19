import React, { useContext } from "react";
import DashboardButton from "components/dashboard-button";
import { v4 as uuid } from "uuid";
import firebase from "../../../firebase";
import { Context } from "components/app";

const StartGame = ({user}) => {

  const requestGame = () => {
    // if (!gameIdGiven) {
    //   const randomId = uuid().split("-")[0];
    //
    //   firebase.database
    //     .ref(`gameRequests/${randomId}`)
    //     .set({ white: this.state.userId, black: "" })
    //     .then(() => {
    //       firebase.database
    //         .ref(`users/${this.state.userId}`)
    //         .update({
    //           request: randomId
    //         })
    //         .then(() => {
    //           this.setState({
    //             gameIdGiven: randomId,
    //             gameId: randomId,
    //             gameRequested: true,
    //             waitingForFriend: true
    //           });
    //         });
    //     });
    // }
  };

  const handleWhitePlayGame = () => {
    // firebase.database
    //   .ref(`games/${this.state.gameIdGiven}/users/white`)
    //   .set(this.state.userId)
    //   .then(() => {
    //     this.playGame("white");
    //   });
  };
  return (
    <div className="start-game-wrapper flex">
      <DashboardButton
        displayText="Start New Game"
        handleOnClick={requestGame}
      />

      <div className="waiting-message">
        {/*<p>{`Waiting for opponent... Invite a friend using game id - ${this.state.gameIdGiven}`}</p>*/}
      </div>

      <DashboardButton
        displayText="Opponent Ready... Click To Play!"
        id="game-ready"
        // handleOnClick={() => this.handleWhitePlayGame()}
      />
    </div>
  );
};

export default StartGame;
