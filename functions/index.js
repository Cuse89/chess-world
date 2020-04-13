const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.notifyUsersTurn = functions.database
  .ref("/games/{gameId}/turn")
  .onWrite(async (change, context) => {
    const gameId = context.params.gameId;

    async function getUserIds() {
      return admin
        .database()
        .ref(`games/${gameId}`)
        .once("value")
        .then(gameSnapshot => {
          let userId = "";
          let opponentId = "";
          const game = gameSnapshot.val();
          Object.keys(game.users).forEach(id => {
            if (game.users[id].color === game.turn) {
              userId = id;
            } else {
              opponentId = id;
            }
          });
          return { userId, opponentId };
        });
    }

    const { userId, opponentId } = await getUserIds();
    const tokensSnapshot = await admin
      .database()
      .ref(`users/${userId}/notificationTokens`)
      .once("value");

    // Check if there are any device tokens.
    if (!tokensSnapshot.hasChildren()) {
      return console.log("There are no notification tokens to send to.");
    }
    const tokens = Object.keys(tokensSnapshot.val());
    const payload = {
      notification: {
        title: "It's your turn!",
        body: `${opponentId} took their turn`,
        icon: "/android-chrome-192x192.png",
      }
    };

    const response = await admin.messaging().sendToDevice(tokens, payload);
    // For each message check if there was an error.
    const tokensToRemove = [];
    response.results.forEach((result, index) => {
      const error = result.error;
      if (error) {
        console.error("Failure sending notification to", tokens[index], error);
        // Cleanup the tokens who are not registered anymore.
        if (
          error.code === "messaging/invalid-registration-token" ||
          error.code === "messaging/registration-token-not-registered"
        ) {
          tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
        }
      }
    });
    return Promise.all(tokensToRemove);
  });
