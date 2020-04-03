import { getNextBoard, getSquareDetails, loopBoard } from "../utils/helpers";
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
      // convert to 2 digits - "1" to "01"
      if (destinationCoords.length === 1) {
        destinationCoords = "0" + destinationCoords;
      }
      const squareDetails = getSquareDetails(destinationCoords, board);
      // cannot land on own piece
      const isOwnPlayer = squareDetails && squareDetails.player === kingPlayer;
      // except for itself (staying in same position)
      const isOwnKingPiece = destinationCoords === kingPos;
      console.log("yyyy", kingPlayer, coord, destinationCoords, kingPos);
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
      const threats = getThreats(
        kingPlayer,
        destinationCoords,
        getNextBoard(board, kingPos, destinationCoords)
      );
      return threats.length < 1;
    });
    console.log({ availableCoords });
    return availableCoords.length < 1;
  };

  if (isCheckmate()) {
    return "checkmate";
  }

  const isInCheck = () => {
    return getThreats(kingPlayer, kingPos, board).length > 0;
  };
  if (isInCheck()) {
    return "check";
  }

  return false;
};
