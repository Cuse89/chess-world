import React from "react";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import { getCoords } from "utils/helpers";
import Square from "components/square";
import styles from "./Board.module.scss";

// king on left for white
// king on right for black

const Board = ({ board, getSquaresChild, onDragEnd }) => {
  const rows = [];
  const isGreen = coords => {
    const isEven = n => n % 2 === 0;
    const evenRow = isEven(Number(coords[0]));
    const evenSquare = isEven(Number(coords[1]));
    return evenRow ? !evenSquare : evenSquare;
  };

  board.forEach((row, rowIdx) => {
    const squares = [];

    row.forEach((square, squareIdx) => {
      const coords = getCoords(rowIdx, squareIdx);
      squares.push(
        <Square key={coords} coords={coords} isGreen={isGreen(coords)}>
          {getSquaresChild(square)}
        </Square>
      );
    });
    rows.push(squares);
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board}>{rows}</div>
    </DragDropContext>
  );
};

Board.defaultProps = {
  onDragEnd: () => {}
};

Board.propTypes = {
  board: PropTypes.array.isRequired,
  boardWidth: PropTypes.number,
  onDragEnd: PropTypes.func
};

export default Board;
