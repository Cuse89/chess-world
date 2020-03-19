import React, { Component, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import InputForm from "components/input-form";
import DashboardButton from "components/dashboard-button";
import firebase from "../../firebase";
import StartGame from "components/dashboard-online/start-game";
import NameInput from "components/dashboard-online/name-input";
import useUser from "hooks/useUser";

const DashboardOnline = () => {
  const user = useUser();
  useEffect(() => {
    if (!user) {
      firebase.login();
    }
  }, [user]);

  if (user) {
    return (
      <div>
        <NameInput user={user} />
        <StartGame user={user} />
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
