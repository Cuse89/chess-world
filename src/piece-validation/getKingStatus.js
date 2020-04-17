import {
  getNextBoard,
  getOpponent,
  getPieceProps,
  getSquareDetails,
  loopBoard,
  performValidation
} from "../utils/helpers";
import { kingValidation } from "piece-validation/kingValidation";
import { getDirectThreats } from "utils/helpers";

// kingPlayer is the players colour that controls the king in question

export const getKingStatus = (board, kingPlayer, baselinePlayer, boardTechnicalName) => {
  let kingPos = "";
  const getKingPos = ({ square, coords }) => {
    if (square.player === kingPlayer && square.pieceId === "king") {
      kingPos = coords;
    }
  };
  loopBoard(board, getKingPos);

  let directThreats = getDirectThreats(kingPlayer, kingPos, board, boardTechnicalName);

  const isInCheck = () => kingPos && directThreats.length > 0;

  const isCheckmate = () => {
    const potentialCoords = [11, -11, 10, -10, 9, -9, 1, -1, 0];
    let availableCoords = [];

    // can directThreats be taken?
    directThreats = directThreats.filter(
      ({ coords }) =>
        getDirectThreats(getOpponent(kingPlayer), coords, board, boardTechnicalName).length === 0
    );

    // can directThreats be blocked instead?
    directThreats = directThreats.filter(threat => {
      let cannotBeBlocked = true;
      const getThreatPathway = getPieceProps(threat.pieceId).getPathway;
      if (getThreatPathway) {
        const pathway = getThreatPathway(threat.coords, kingPos);
        console.log({ pathway });
        pathway.forEach(pathwayCoords => {
          if (kingPos !== pathwayCoords) {
            loopBoard(board, ({ square, coords }) => {
              if (square.player === kingPlayer && square.pieceId !== "king") {
                if (
                  performValidation({
                    board,
                    boardTechnicalName,
                    kingPlayer,
                    destinationCoords: pathwayCoords,
                    sourceCoords: coords,
                    baselinePlayer
                  })
                ) {
                  // todo: only allow for 1 move to happen

                  cannotBeBlocked = false;
                }
              }
            });
          }
        });
      }
      return cannotBeBlocked;
    });

    // if (directThreats.length === 0) {
    //   return false;
    // }

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
            boardTechnicalName,
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
      return (
        getDirectThreats(
          kingPlayer,
          destinationCoords,
          getNextBoard(board, kingPos, destinationCoords),
          boardTechnicalName
        ).length < 1
      );
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
