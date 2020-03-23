import React, { useContext, useEffect } from "react";
import firebase from "../../firebase";
import ChallengePlayer from "components/dashboard-online/challenge-player";
import NameInput from "components/dashboard-online/name-input";
import { Context } from "components/app";
import useAvailableUsers from "hooks/useAvailableUsers";
import { v4 as uuid } from "uuid";
import defaultBoard from "lineups/defaultBoard";

const DashboardOnline = ({ history }) => {
  const { user, settings } = useContext(Context);
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
    history.push(`/${settings.gameType}/${gameId}`);
  };

  const handleStartNewGame = async opponentId => {
    const newGameId = `game-${uuid().split("-")[0]}`;
    try {
      await firebase.updateGame(newGameId, {
        users: { white: user.id, black: opponentId },
        board: defaultBoard,
        turn: user.id,
        gameType: settings.gameType
      });
      await updateGameRequest(opponentId, user.id, null);
      await firebase.updateUser(user.id, "games", { [opponentId]: newGameId });
      console.log("1")
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
            user={user}
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

// class DashboardOnline extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userId: "",
//       gameIdGiven: "",
//       gameIdInput: "",
//       gameId: "",
//       showInput: false,
//       gameRequested: false,
//       waitingForFriend: false,
//       playerColour: "white",
//       playGame: false,
//       existingGames: [],
//       forcedLogout: false,
//       showExistingGames: false,
//       nameEntered: ""
//     };
//   }
//
//   componentDidMount() {
//     this.handleFirebase();
//   }
//
//   handleFirebase = () => {
//     //login and logout
//     firebase.auth().onAuthStateChanged(user => {
//       // will automatically run on mount
//       if (user) {
//         const userId = `user-${user.uid}`;
//         console.log("logged in", userId);
//         // check if user has previously made a request
//         this.handlePrevRequests(userId);
//         this.handlePrevGames(userId);
//         this.handleNameEntered(userId);
//       } else {
//         this.setState({ userId: "" });
//         console.log("logged out");
//         firebase.login()
//       }
//     });
//   };
//
//   handlePrevRequests(userId) {
//     firebase.database
//       .ref(`users/${userId}/request`)
//       .once("value")
//       .then(snapshot => {
//         const gameIdGiven = snapshot.val();
//         this.setState({
//           userId,
//           gameIdGiven: gameIdGiven || "",
//           gameId: gameIdGiven || "",
//           waitingForFriend: gameIdGiven ? true : false,
//           gameRequested: gameIdGiven ? true : false
//         });
//       });
//   }
//
//   handlePrevGames(userId) {
//     let existingGames = [];
//     let opponent = "";
//     let myTurn = false;
//
//     for (let i = 0; i < 10; i++) {
//       firebase.database
//         .ref(`users/${userId}/game${i}`)
//         .once("value")
//         .then(snapshot => {
//           const gameId = snapshot.val();
//           if (gameId) {
//             // get opponents username
//             firebase.database
//               .ref(`games/${gameId}`)
//               .once("value")
//               .then(snapshot => {
//                 const white = snapshot.val().users.white;
//                 const black = snapshot.val().users.black;
//                 if (white === userId) {
//                   opponent = black;
//                   myTurn = snapshot.val().turn === "white";
//                 } else {
//                   opponent = white;
//                   myTurn = snapshot.val().turn === "black";
//                 }
//                 firebase.database
//                   .ref(`users/${opponent}/name`)
//                   .once("value")
//                   .then(snapshot => {
//                     opponent = snapshot.val();
//                     existingGames.push({
//                       gameId,
//                       opponent,
//                       myTurn
//                     });
//                   });
//               });
//           }
//         });
//     }
//     this.setState({ existingGames });
//   }
//
//   handleNameEntered(userId) {
//     firebase.database
//       .ref(`users/${userId}/name`)
//       .once("value")
//       .then(name => {
//         if (name.val()) {
//           this.setState({ nameEntered: name.val() });
//         }
//       });
//   }
//
//
//
//   requestGame() {
//     if (!this.state.gameIdGiven) {
//       const randomId = uuid().split("-")[0];
//
//       firebase.database
//         .ref(`gameRequests/${randomId}`)
//         .set({ white: this.state.userId, black: "" })
//         .then(() => {
//           firebase.database
//             .ref(`users/${this.state.userId}`)
//             .update({
//               request: randomId
//             })
//             .then(() => {
//               this.setState({
//                 gameIdGiven: randomId,
//                 gameId: randomId,
//                 gameRequested: true,
//                 waitingForFriend: true
//               });
//             });
//         });
//     }
//   }
//
//   handleResponse(gameIdGiven) {
//     firebase.database
//       .ref(`gameRequests/${gameIdGiven}/black`)
//       .on("value", blackPlayer => {
//         if (blackPlayer.val()) {
//           this.setState({
//             playerColour: "white",
//             waitingForFriend: false
//           });
//           // remove request from database
//           this.removeRequestAddGame(gameIdGiven);
//         }
//       });
//   }
//
//   removeRequestAddGame(gameId) {
//     firebase.database.ref(`users/${this.state.userId}`).update({
//       request: null,
//       [`game${this.state.existingGames.length}`]: gameId
//     });
//     firebase.database.ref(`gameRequests/${gameId}`).remove();
//     if (this.state.gameIdGiven) {
//       firebase.database.ref(`gameRequests/${this.state.gameIdGiven}`).remove();
//     }
//   }
//
//   joinGame(gameIdInput) {
//     this.setState({
//       gameIdInput: gameIdInput,
//       gameId: gameIdInput
//     });
//
//     // see if the input value exists as a game id in database
//     firebase.database
//       .ref(`gameRequests/${gameIdInput}`)
//       .once("value", snapshot => {
//         const requestIdExists = snapshot.val();
//         if (requestIdExists) {
//           // include black player in request to respond to white player
//           firebase.database
//             .ref(`gameRequests/${this.state.gameIdInput}`)
//             .update({ black: this.state.userId })
//             .then(() => {
//               // include black player in game and set up game in db
//               firebase.database
//                 .ref(`games/${gameIdInput}`)
//                 .set({
//                   users: { black: this.state.userId }
//                 })
//                 .then(() => {
//                   this.removeRequestAddGame(gameIdInput);
//                   // set board
//                   // this.performMove(defaultBoard, "white")
//                   this.playGame("black");
//                 });
//             });
//         } else {
//           console.log(`game id ${gameIdInput} does not exist`);
//         }
//       });
//   }
//
//   handleJoinGame(gameId) {
//     this.setState({
//       gameIdInput: gameId,
//       gameId
//     });
//   }
//
//   playGame(playerColour) {}
//
//   handleWhitePlayGame() {
//     firebase.database
//       .ref(`games/${this.state.gameIdGiven}/users/white`)
//       .set(this.state.userId)
//       .then(() => {
//         this.playGame("white");
//       });
//   }
//
//   handlePlayPrevGame(gameId) {
//     firebase.database
//       .ref(`games/${gameId}`)
//       .once("value")
//       .then(game => {
//         const users = game.val().users;
//         const playerColour =
//           users.white == this.state.userId ? "white" : "black";
//         this.setState({ gameId });
//         this.playGame(playerColour);
//       });
//   }
//
//   nameSubmit(nameEntered) {
//
//     firebase.database
//       .ref(`users/user-xzd1qigM0eSdxkhf1onQh6EPGxg1/name`)
//       .set(nameEntered)
//       .then(() => {
//         this.setState({ nameEntered });
//       });
//   }
//
//   render() {
//     return (
//       <div>
//         {!this.state.nameEntered && this.state.userId && (
//           <InputForm
//             inputType="text"
//             placeholder="Enter your nickname"
//             submitText="Ok"
//             submit={this.nameSubmit}
//             validateInput={input => input.length > 0}
//             id="enter-name"
//           />
//         )}
//
//         {!this.state.playGame && this.state.userId && this.state.nameEntered && (
//           <div>
//             <StartGame/>
//
//             <div className="join-game-wrapper flex">
//               <DashboardButton
//                 displayText="Join New Game"
//                 id="join-game-button"
//                 handleOnClick={() => this.setState({ showInput: true })}
//               />
//               {this.state.showInput && (
//                 <InputForm
//                   inputType="text"
//                   placeholder="Enter Game ID"
//                   submitText="Ok"
//                   submit={this.joinGame}
//                   validateInput={input => input.length > 0}
//                   id="join-game"
//                 />
//               )}
//             </div>
//
//             {this.state.existingGames.length > 0 && (
//               <DashboardButton
//                 displayText="Your Games"
//                 classNames={this.state.showExistingGames ? " selected" : ""}
//                 handleOnClick={() => this.setState({ showExistingGames: true })}
//               />
//             )}
//
//             <div className="users-games-wrapper">
//               {this.state.showExistingGames &&
//                 this.state.existingGames.map(
//                   ({ gameId, opponent, myTurn }, i) => {
//                     return (
//                       <div key={i} className="game-options-wrapper flex">
//                         <DashboardButton
//                           displayText={`${opponent}`}
//                           classNames={
//                             this.state.gameButtonsId == gameId
//                               ? " selected"
//                               : ""
//                           }
//                           handleOnClick={() =>
//                             this.setState({ gameButtonsId: gameId })
//                           }
//                         />
//                         {myTurn && this.state.gameButtonsId != gameId && (
//                           <p className="your-turn">It's Your Turn!</p>
//                         )}
//                         {this.state.gameButtonsId == gameId && (
//                           <div className="game-options flex">
//                             <DashboardButton
//                               displayText={"Play Game"}
//                               handleOnClick={() =>
//                                 this.handlePlayPrevGame(gameId)
//                               }
//                             />
//                             <DashboardButton
//                               displayText={"Abandon Game"}
//                               handleOnClick={() =>
//                                 this.handleAbandonGame(gameId)
//                               }
//                             />
//                           </div>
//                         )}
//                       </div>
//                     );
//                   }
//                 )}
//             </div>
//           </div>
//         )}
//
//         {!this.state.playGame && this.state.nameEntered && (
//           <div>
//             <DashboardButton
//               displayText="Settings"
//               handleOnClick={() => this.openSettings()}
//             />
//
//             {!this.state.userId && (
//               <DashboardButton
//                 displayText="Login"
//                 handleOnClick={() => firebase.login()}
//               />
//             )}
//             {this.state.userId && (
//               <DashboardButton
//                 displayText="Logout"
//                 handleOnClick={() => firebase.logout()}
//               />
//             )}
//           </div>
//         )}
//       </div>
//     );
//   }
// }
//

export default DashboardOnline;
