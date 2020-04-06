import {
  getNextBoard,
  getOpponent,
  getSquareDetails,
  loopBoard
} from "../utils/helpers";
import { kingValidation } from "rules/kingValidation";
import { getDirectThreats } from "utils/helpers";
import { getThreats } from "utils/onePlayerHelpers";
// kingPlayer is the players colour that controls the king in question

export const getKingStatus = (board, kingPlayer) => {
  let kingPos = "";
  const getKingPos = ({ square, coords }) => {
    if (square.player === kingPlayer && square.pieceId === "king") {
      kingPos = coords;
    }
  };
  loopBoard(board, getKingPos);

  const directThreats = getDirectThreats(kingPlayer, kingPos, board);

  const isInCheck = () => kingPos && directThreats.length > 0;

  const isCheckmate = () => {
    const potentialCoords = [11, -11, 10, -10, 9, -9, 1, -1, 0];
    let availableCoords = [];

    // can direct threats be taken?
    const threatsCannotBeTaken = directThreats.filter(
      ({ coords }) =>
        getDirectThreats(getOpponent(kingPlayer), coords, board).length === 0
    );

    if (threatsCannotBeTaken.length === 0) {
      return false;
    }

    // can threatsCannotBeTaken be blocked instead?


    potentialCoords.forEach(coord => {
      let destinationCoords = (kingPos - coord).toString();
      // convert to 2 digits - "1" to "01"
      if (destinationCoords.length === 1) {
        destinationCoords = "0" + destinationCoords;
      }
      const squareDetails = getSquareDetails(destinationCoords, board);
      // cannot land on own piece
      const isOwnPlayer = squareDetails && squareDetails.player === kingPlayer;
      // except for itself (staying in same position)
      const isOwnKingPiece = destinationCoords === kingPos;
      if (
        (kingValidation({
          sourceCoords: kingPos,
          destinationCoords,
          board,
          player: kingPlayer
        }) &&
          !isOwnPlayer) ||
        isOwnKingPiece
      ) {
        availableCoords.push(destinationCoords);
      }
    });

    // filter available coords and take away any that could be threatened if landed on by king
    availableCoords = availableCoords.filter(destinationCoords => {
      const threats = getDirectThreats(
        kingPlayer,
        destinationCoords,
        getNextBoard(board, kingPos, destinationCoords)
      );
      return threats.length < 1;
    });
    return availableCoords.length < 1;
  };

  if (isInCheck()) {
    if (isCheckmate()) {
      return "checkmate";
    }
    return "check";
  }

  return false;
};
