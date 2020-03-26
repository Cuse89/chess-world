import {
  getNextBoard,
  loopBoard,
} from "../utils/helpers";
import { getThreats } from "utils/onePlayerHelpers";
import { kingValidation } from "rules/kingValidation";
// kingPlayer is the players colour that controls the king in question

export const getKingStatus = (board, kingPlayer) => {
  let kingPos = "";
  const getKingPos = ({ square, coords }) => {
    if (square.player === kingPlayer && square.pieceId === "king") {
      kingPos = coords;
    }
  };
  loopBoard(board, getKingPos);

  const isCheckmate = () => {
    const potentialCoords = [11, -11, 10, -10, 9, -9, 1, -1, 0];
    let availableCoords = [];

    potentialCoords.forEach(coord => {
      let destinationCoords = (kingPos - coord).toString();
      if (
        kingValidation({
          sourceCoords: kingPos,
          destinationCoords,
          board,
          player: kingPlayer
        })
      ) {
        availableCoords.push(destinationCoords);
      }
    });

    // filter available coords and take away any that could be threatened if landed on by king
    availableCoords = availableCoords.filter(destinationCoords => {
      const threats = getThreats(
        kingPlayer,
        destinationCoords,
        getNextBoard(board, kingPos, destinationCoords)
      );
      return threats.length < 1;
    });
    return availableCoords.length < 1;
  };

  const isInCheck = () => {
    return getThreats(kingPlayer, kingPos, board).length > 0;
  };

  if (isCheckmate()) {
    console.log("checkmate");
    return "checkmate";
  }

  if (isInCheck()) {
    console.log("check");
    return "check";
  }

  return false;
};
