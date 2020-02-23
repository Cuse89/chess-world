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
  return board[coords[0]][coords[1]];
};

export const getNextBoard = (board, prevCoords, nextCoords) => {
  let boardCopy = JSON.parse(JSON.stringify(board));
  // new square is taken over
  boardCopy[nextCoords[0]][nextCoords[1]] =
    boardCopy[prevCoords[0]][prevCoords[1]];
  // old square is emptied
  boardCopy[prevCoords[0]][prevCoords[1]] = { player: "", pieceId: "" };
  return boardCopy;
};

export const performValidation = ({
  board,
  ownColor,
  prevCoords,
  nextCoords
}) => {
  // work out if valid square has been selected, or another of mine
  const prevSquare = getSquareDetails(prevCoords, board)
  const nextSquare = getSquareDetails(nextCoords, board);
  // if clicked on own piece again
  if (nextSquare.player === ownColor) {
    return false;
    // else perform validation

  } else if (
    getPieceProps(prevSquare.pieceId).validateMove(
      false,
      prevCoords,
      nextCoords,
      board,
      ownColor
    )
  ) {
    return true;
  }
};
