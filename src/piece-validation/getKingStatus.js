import {
  getNextBoard,
  getPieceProps,
  getSquareDetails,
  loopBoard,
  performValidation
} from "../utils/helpers";
import { kingValidation } from "piece-validation/kingValidation";
import { getDirectThreats } from "utils/helpers";

// kingPlayer is the players colour that controls the king in question

export const getKingStatus = (
  board,
  kingPlayer,
  baselinePlayer,
  boardVariant
) => {
  let kingPos = "";
  const getKingPos = ({ square, coords }) => {
    if (square.player === kingPlayer && square.pieceId === "king") {
      kingPos = coords;
    }
  };
  loopBoard(board, getKingPos);

  let directThreats = getDirectThreats(
    kingPlayer,
    kingPos,
    board,
    boardVariant
  );

  const isInCheck = () => kingPos && directThreats.length > 0;

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
      if (
        (kingValidation({
          sourceCoords: kingPos,
          destinationCoords,
          board,
          boardVariant,
          player: kingPlayer
        }) &&
          !isOwnPlayer) ||
        isOwnKingPiece
      ) {
        availableCoords.push(destinationCoords);
      }
    });

    // filter available coords and take away any that could be threatened if landed on by king
    availableCoords = availableCoords.filter(
      destinationCoords =>
        getDirectThreats(
          kingPlayer,
          destinationCoords,
          getNextBoard(board, kingPos, destinationCoords),
          boardVariant
        ).length < 1
    );

    if (availableCoords.length > 0) {
      return false;
    }

    directThreats.forEach(threat => {
      const getThreatPathway = getPieceProps(threat.pieceId).getPathway;
      if (getThreatPathway) {
        const pathway = getThreatPathway(threat.coords, kingPos);
        threat.canTravel = true;
        pathway.forEach(pathwayCoords => {
          if (kingPos !== pathwayCoords) {
            loopBoard(board, ({ square, coords }) => {
              if (
                square.player === kingPlayer &&
                square.pieceId !== "king" &&
                performValidation({
                  board,
                  boardVariant,
                  player: kingPlayer,
                  destinationCoords: pathwayCoords,
                  sourceCoords: coords,
                  baselinePlayer
                })
              ) {
                threat.canBeBlocked = true;
              }
            });
          }
        });
      }
    });

    const directThreatsCanTravel = directThreats.filter(
      threat => threat.canTravel
    );

    const directThreatsCanBeTaken = directThreats.filter(threat => {
      let canBeTaken = false;
      loopBoard(board, ({ square, coords }) => {
        if (
          square.player === kingPlayer &&
          performValidation({
            board,
            player: kingPlayer,
            destinationCoords: threat.coords,
            sourceCoords: coords,
            baselinePlayer,
            boardVariant
          })
        ) {
          canBeTaken = true;
        }
      });
      return canBeTaken;
    });

    if (directThreatsCanTravel.length > 1) {
      return true;
    }

    if (
      directThreatsCanTravel.length === 1 &&
      directThreatsCanTravel[0].canBeBlocked
    ) {
      return false;
    }

    if (directThreatsCanBeTaken.length > 0) {
      return false;
    }

    // availableCoords.length must be 0
    return true;
  };

  if (isInCheck()) {
    if (isCheckmate()) {
      return "checkmate";
    }
    return "check";
  }

  return false;
};
