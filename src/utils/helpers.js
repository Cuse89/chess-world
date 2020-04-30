import {
  faChessPawn,
  faChessRook,
  faChessKnight,
  faChessBishop,
  faChessKing,
  faChessQueen
} from "@fortawesome/free-solid-svg-icons";

import {
  getRookPathway,
  rookValidation
} from "piece-validation/rookValidation";
import {
  bishopValidation,
  getBishopPathway
} from "piece-validation/bishopValidation";
import { knightValidation } from "piece-validation/knightValidation";
import { kingValidation } from "piece-validation/kingValidation";
import { getKingStatus } from "piece-validation/getKingStatus";
import { EMPTY_SQUARE } from "utils/constants";
import { pawnValidation } from "piece-validation/pawnValidation";
import {
  getQueenPathway,
  queenValidation
} from "piece-validation/queenValidation";

export const getPieceProps = pieceId => {
  switch (pieceId && pieceId.split("-")[0]) {
    case "pawn":
      return {
        icon: faChessPawn,
        validateMove: pawnValidation,
        strength: 1
      };
    case "rook":
      return {
        icon: faChessRook,
        validateMove: rookValidation,
        getPathway: getRookPathway,
        strength: 5
      };
    case "knight":
      return {
        icon: faChessKnight,
        validateMove: knightValidation,
        strength: 3
      };
    case "bishop":
      return {
        icon: faChessBishop,
        validateMove: bishopValidation,
        getPathway: getBishopPathway,
        strength: 3
      };
    case "king":
      return {
        icon: faChessKing,
        validateMove: kingValidation,
        strength: 10
      };
    case "queen":
      return {
        icon: faChessQueen,
        validateMove: queenValidation,
        getPathway: getQueenPathway,
        strength: 9
      };
    default:
      return null;
  }
};

export const getCoords = (row, col) => {
  return `${row}${col}`;
};

export const getSquareDetails = (coords, board) => {
  const boardLengthIndex = board.length - 1;
  const outOfBoard =
    coords[0] > boardLengthIndex ||
    coords[0] < 0 ||
    coords[1] > boardLengthIndex ||
    coords[1] < 0 ||
    coords < 0 ||
    coords > boardLengthIndex.toString() + board[0].length;
  if (outOfBoard) {
    return false;
  }
  return board[coords[0]][coords[1]];
};

export const getNextBoard = (board, sourceCoords, destinationCoords) => {
  let boardCopy = JSON.parse(JSON.stringify(board));
  // new square is taken over
  boardCopy[destinationCoords[0]][destinationCoords[1]] =
    boardCopy[sourceCoords[0]][sourceCoords[1]];
  // old square is emptied
  boardCopy[sourceCoords[0]][sourceCoords[1]] = EMPTY_SQUARE;
  return boardCopy;
};

export const getUpdatedBoard = (board, coords, value) => {
  let boardCopy = JSON.parse(JSON.stringify(board));
  boardCopy[coords[0]][coords[1]] = value;
  return boardCopy;
};

export const performValidation = ({
  board,
  boardVariant,
  player,
  sourceCoords,
  destinationCoords,
  baselinePlayer,
  captureOnly
}) => {
  // work out if valid square has been selected, or another of mine
  const sourceSquare = getSquareDetails(sourceCoords, board);
  const destinationSquare = getSquareDetails(destinationCoords, board);

  // nextSquare doesnt exist
  if (!destinationSquare) {
    return false;
  }
  // if clicked on own piece again
  if (destinationSquare.player === player) {
    return false;
    // else perform validation
  }

  if (
    !getPieceProps(sourceSquare.pieceId).validateMove({
      sourceCoords,
      destinationCoords,
      board,
      boardVariant,
      baselinePlayer,
      captureOnly
    })
  ) {
    return false;
  }
  const nextBoard = getNextBoard(board, sourceCoords, destinationCoords);
  const movedSelfIntoCheck =
    getKingStatus(nextBoard, player, baselinePlayer, boardVariant) === "check";
  return !movedSelfIntoCheck;
};

export const loopBoard = (board, func) =>
  board.forEach((row, rowIdx) =>
    row.forEach((square, squareIdx) => {
      const coords = rowIdx.toString().concat(squareIdx);
      return func({ square, coords });
    })
  );

export const getOpponent = player => (player === "white" ? "black" : "white");

export const getUpdatedFallen = (targetPiece, fallen) => {
  const { player, pieceId } = targetPiece;
  if (!player) {
    return fallen;
  }
  return {
    ...fallen,
    [player]: pieceId ? [...fallen[player], targetPiece] : [...fallen[player]]
  };
};

export const getTargetPiece = (board, destinationCoords) =>
  board[destinationCoords[0]][destinationCoords[1]];

export const getPrettyFromTechnicalName = (obj, technicalName) => {
  const key = Object.keys(obj).filter(
    key => obj[key].technicalName === technicalName
  );
  return obj[key].pretty;
};

export const getUrlParam = key => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(key);
};

export const createUrlParams = params =>
  Object.keys(params)
    .map(paramKey => `${paramKey}=${params[paramKey]}`)
    .join("&");

export const mirrorBoard = board => {
  let boardCopy = JSON.parse(JSON.stringify(board));
  const boardMirrored = [...boardCopy].reverse();
  boardMirrored.forEach(row => row.reverse());
  return boardMirrored;
};

// uses validateMove directly, does not consider whether the threat would move into check or not
export const getDirectThreats = (
  threatenedPlayer,
  threatenedPlayerCoords,
  board,
  boardVariant
) => {
  let threats = [];
  loopBoard(board, ({ square, coords }) => {
    const threateningPlayer =
      square.player && square.player !== threatenedPlayer && square.player;
    if (
      threateningPlayer &&
      getPieceProps(square.pieceId).validateMove({
        sourceCoords: coords,
        destinationCoords: threatenedPlayerCoords,
        board,
        boardVariant,
        player: threateningPlayer,
        captureOnly: true,
        baselinePlayer: "white"
      })
    ) {
      threats.push({ coords, pieceId: square.pieceId });
    }
  });
  return threats;
};

export const uppercaseFirstLetter = str =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const isRoyalty = pieceId =>
  ["rook", "bishop", "knight", "queen", "king"].includes(pieceId.split("-")[0]);
