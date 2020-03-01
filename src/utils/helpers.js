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
import { checkmate } from "../rules/checkmate";

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

export const getNextBoard = (board, sourceCoords, destinationCoords) => {
  console.log("get next board", sourceCoords, destinationCoords)
  let boardCopy = JSON.parse(JSON.stringify(board));
  // new square is taken over
  boardCopy[destinationCoords[0]][destinationCoords[1]] =
    boardCopy[sourceCoords[0]][sourceCoords[1]];
  // old square is emptied
  boardCopy[sourceCoords[0]][sourceCoords[1]] = { player: "", pieceId: "" };
  return boardCopy;
};

export const performValidation = ({
  board,
  ownColor,
  sourceCoords,
  destinationCoords
}) => {
  // work out if valid square has been selected, or another of mine
  const prevSquare = getSquareDetails(sourceCoords, board)
  const nextSquare = getSquareDetails(destinationCoords, board);
  // if clicked on own piece again
  if (nextSquare.player === ownColor) {
    return false;
    // else perform validation

  } else if (
    getPieceProps(prevSquare.pieceId).validateMove(
      false,
      sourceCoords,
      destinationCoords,
      board,
      ownColor
    )
  ) {
    return true;
  }
};

export const loopBoard = (board, func) => {
  return board.forEach((row, rowIdx) => {
    row.forEach((square, squareIdx) => {
      const params = {row, rowIdx, square, squareIdx}
      func(params)
    })
  })
}

export const checkmateOpponent = (nextBoard, turn) => {
  const opponent = turn === "white" ? "black" : "white";
  return checkmate(opponent, nextBoard);
}

export const checkmateYou = (nextBoard, turn) => {
  return checkmate(turn, nextBoard);
}