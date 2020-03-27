import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getBaselinePlayer, getCoords, getSquareDetails } from "utils/helpers";
import Square from "components/square";
import styles from "./Board.module.scss";
import Context from "context";
import { GAME_MODES } from "utils/constants";

// king on left for white
// king on right for black

const Board = ({ board, getSquaresChild, onDragEnd, turn, users }) => {
  const { user, settings } = useContext(Context);
  const [draggedPieceCoords, setDraggedPieceCoords] = useState("");
  const rows = [];
  const isGreen = coords => {
    const isEven = n => n % 2 === 0;
    const evenRow = isEven(Number(coords[0]));
    const evenSquare = isEven(Number(coords[1]));
    return evenRow ? !evenSquare : evenSquare;
  };

  const isSquareDroppable = coords =>
    getSquareDetails(coords, board).player === turn &&
    coords !== draggedPieceCoords;

  const onDragStart = a => {
    setDraggedPieceCoords(a.source.droppableId);
  };

  const handleOnDragEnd = a => {
    if (a.destination) {
      onDragEnd(a);
    }
  };

  board.forEach((row, rowIdx) => {
    const squares = [];

    row.forEach((square, squareIdx) => {
      const coords = getCoords(rowIdx, squareIdx);
      squares.push(
        <Droppable
          key={`square-${coords}`}
          droppableId={coords}
          isDropDisabled={isSquareDroppable(coords)}
        >
          {(provided, snapshot) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Square
                  coords={coords}
                  isGreen={isGreen(coords)}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {getSquaresChild(square)}
                </Square>
              </div>
            );
          }}
        </Droppable>
      );
    });
    rows.push(squares);
  });

  function isIndicatorActive(baseline) {
    if (users) {
      const baselinePlayer = getBaselinePlayer(users.black, user.id);
      return baseline ? baselinePlayer === turn : baselinePlayer !== turn;
    }
    if (settings.gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME) {
      return false;
    }
    if (settings.gameMode === GAME_MODES.TWO_PLAYER.TECHNICAL_NAME) {
      return baseline ? turn === "white" : turn === "black";
    }
  }

  const topActive = isIndicatorActive();
  const baselineActive = isIndicatorActive(true);
  const indicatorClassname = baseline =>
    cx({
      [styles.indicator]: true,
      [styles.active]: baseline ? baselineActive : topActive
    });

  return (
    <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={onDragStart}>
      <div className={indicatorClassname()} />
      <div
        className={cx({
          [styles.board]: true,
          [styles.topActive]: topActive,
          [styles.baselineActive]: baselineActive
        })}
      >
        {rows}
      </div>
      <div className={indicatorClassname(true)} />
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
