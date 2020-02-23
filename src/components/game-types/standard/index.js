import React, { Component } from "react";
import Board from "../../board";
import { Piece } from "../../piece";
import defaultBoard from "../../../lineups/defaultBoard";
import {
  getNextBoard,
  getPieceProps,
  getSquareDetails,
  performValidation
} from "../../../utils/helpers";

class Standard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: defaultBoard
    };
  }

  getStandardSquaresChild = coords => {
    const square = getSquareDetails(coords, this.state.board);
    const { player, pieceId, inCheck } = square;

    return square.pieceId ? (
      <Piece
        key={`${player}-${pieceId}`}
        className={`${player}-${pieceId}`}
        icon={getPieceProps(pieceId).icon}
        pieceColour={player}
        inCheck={inCheck}
      />
    ) : null;
  };

  handlePerformMove = a => {
    const { board } = this.state;
    const nextCoords = a.destination.droppableId;
    const prevCoords = a.source.droppableId;
    console.log(a);
    if (
      performValidation({ board, prevCoords, nextCoords, ownColor: "white" })
    ) {
      // and check for checkmate
      this.performMove(board, prevCoords, nextCoords);
    }
  };

  performMove = (board, prevCoords, nextCoords) => {
    const nextBoard = getNextBoard(board, prevCoords, nextCoords);
    this.setState({ board: nextBoard });
  };

  render() {
    const { board } = this.state;
    return (
      <div>
        <Board
          board={board}
          getSquaresChild={this.getStandardSquaresChild}
          onDragEnd={this.handlePerformMove}
        />
      </div>
    );
  }
}

export default Standard;
