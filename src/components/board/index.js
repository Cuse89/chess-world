import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getCoords, getSquareDetails } from "utils/helpers";
import Square from "components/square";
import styles from "./Board.module.scss";
import Context from "context";
import { GAME_MODES } from "utils/constants";

// king on left for white
// king on right for black

const Board = ({
  board,
  getSquaresChild,
  onDragEnd,
  turn,
  users,
  onSquareSelect
}) => {
  const { user, gameSettings } = useContext(Context);
  const { gameMode } = gameSettings;
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

  const getPosition = coords => {
    const alphabet = "abcdefgh".split("");
    const positions = [];
    if (coords[1] === "0") {
      positions.push(board.length - coords[0]);
    }
    if (coords[0] === (board.length - 1).toString()) {
      positions.push(alphabet[coords[1]]);
    }
    return positions;
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
                  handleOnClick={onSquareSelect}
                  position={getPosition(coords)}
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
      const playerColor = users[user.id].color;
      return baseline ? playerColor === turn : playerColor !== turn;
    }
    if (gameMode === GAME_MODES.onePlayer.technicalName) {
      return false;
    }
    if (gameMode === GAME_MODES.twoPlayer.technicalName) {
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
  const columnClassName = styles[`columns${board[0].length}`];

  return (
    <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={onDragStart}>
      <div className={columnClassName}>
        <div className={indicatorClassname()} />
        <div
          className={cx({
            [styles.board]: true,
            [styles.topActive]: topActive,
            [styles.baselineActive]: baselineActive,
            [columnClassName]: true
          })}
        >
          {rows}
        </div>
        <div className={indicatorClassname(true)} />
      </div>
    </DragDropContext>
  );
};

Board.defaultProps = {
  onDragEnd: () => {},
  onSquareSelect: () => {}
};

Board.propTypes = {
  board: PropTypes.array.isRequired,
  boardWidth: PropTypes.number,
  onDragEnd: PropTypes.func,
  onSquareSelect: PropTypes.func
};

export default Board;
