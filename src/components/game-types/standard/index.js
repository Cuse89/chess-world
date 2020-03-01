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
import { decideBotMove, getBotMoves } from "../../../utils/onePlayerHelpers";

class Standard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: defaultBoard,
      turn: "white"
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.turn !== this.state.turn) {
      this.handleNextTurn();
    }
  }

  handleNextTurn() {
    if (this.props.gameMode === "onePlayer") {
      const selectedMove = decideBotMove(getBotMoves(this.state.board));
      console.log("selected move", selectedMove);
      this.setState({
        board: getNextBoard(
          this.state.board,
          selectedMove.source.coords,
          selectedMove.destination.coords
        )
      });
    }
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
    const destinationCoords = a.destination.droppableId;
    const sourceCoords = a.source.droppableId;
    if (
      performValidation({ board, sourceCoords, destinationCoords, ownColor: "white" })
    ) {
      // and check for checkmate
      this.performMove(board, sourceCoords, destinationCoords);
    }
  };

  performMove = (board, sourceCoords, destinationCoords) => {
    const { turn } = this.state;
    const nextBoard = getNextBoard(board, sourceCoords, destinationCoords);
    this.setState({
      board: nextBoard,
      turn: turn === "white" ? "black" : "white"
    });
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
