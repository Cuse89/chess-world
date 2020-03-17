import React from "react";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import { getCoords } from "utils/helpers";
import Square from "components/square";
import styles from "./Board.module.scss";

const Board = ({ board, boardWidth, getSquaresChild, onDragEnd }) => {
  const rows = [];
  for (let rowIdx = 0; rowIdx < boardWidth; rowIdx++) {
    const squares = [];
    board.forEach((square, squareIdx) => {
      const coords = getCoords(rowIdx, squareIdx);
      squares.push(
        <Square key={coords} coords={coords}>
          {getSquaresChild(coords)}
        </Square>
      );
    });
    rows.push(squares);
  }
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div className={styles.board}>{rows}</div>
    </DragDropContext>
  );
};

Board.defaultProps = {
  boardWidth: 8,
  onDragEnd: () => {}
};

Board.propTypes = {
  board: PropTypes.array.isRequired,
  boardWidth: PropTypes.number,
  onDragEnd: PropTypes.func,
};

export default Board;
