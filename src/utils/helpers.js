import {
  faChessPawn,
  faChessRook,
  faChessKnight,
  faChessBishop,
  faChessKing,
  faChessQueen
} from "@fortawesome/free-solid-svg-icons";
import { pawnValidation } from "../rules/pawnValidation";
import { rookValidation } from "../rules/rookValidation";
import { bishopValidation } from "../rules/bishopValidation";
import { knightValidation } from "../rules/knightValidation";
import { kingValidation } from "../rules/kingValidation";
import { getKingStatus } from "../rules/getKingStatus";
import { EMPTY_SQUARE } from "utils/constants";

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
        validateMove: (...params) => {
          if (rookValidation(...params) || bishopValidation(...params)) {
            return true;
          }
        },
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
  if (
    coords[0] > 7 ||
    coords[0] < 0 ||
    coords[1] > 7 ||
    coords[1] < 0 ||
    coords < 0 ||
    coords > 78
  ) {
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
  console.log("get updated baord", board,coords,value)
  let boardCopy = JSON.parse(JSON.stringify(board));
  boardCopy[coords[0]][coords[1]] = value;
  return boardCopy;
};

export const performValidation = ({
  board,
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
      baselinePlayer,
      captureOnly
    })
  ) {
    return false;
  }
  const nextBoard = getNextBoard(board, sourceCoords, destinationCoords);
  const movedSelfIntoCheck =
    getKingStatus(nextBoard, player, baselinePlayer) === "check";
  return !movedSelfIntoCheck;
};

export const loopBoard = (board, func) =>
  board.forEach((row, rowIdx) => {
    row.forEach((square, squareIdx) => {
      const coords = rowIdx.toString().concat(squareIdx);
      func({ square, coords });
    });
  });

export const getOpponent = turn => (turn === "white" ? "black" : "white");

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
    key => obj[key].TECHNICAL_NAME === technicalName
  );
  return obj[key].PRETTY;
};

export const getUrlParam = key => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(key);
};

export const mirrorBoard = board => {
  let boardCopy = JSON.parse(JSON.stringify(board));
  const boardMirrored = [...boardCopy].reverse();
  boardMirrored.forEach(row => row.reverse());
  return boardMirrored;
};
