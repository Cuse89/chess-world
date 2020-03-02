import React, { Component } from "react";
import Board from "../../board";
import { Piece } from "../../piece";
import defaultBoard from "../../../lineups/defaultBoard";

import {
  kingStatusOpponent,
  kingStatusSelf,
  getNextBoard,
  getOpponent,
  getPieceProps,
  getSquareDetails,
  getTargetPiece,
  getUpdatedFallen,
  performValidation
} from "../../../utils/helpers";
import { decideBotMove, getBotMoves } from "../../../utils/onePlayerHelpers";


class Standard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: defaultBoard,
      turn: "white",
      fallen: {
        white: [],
        black: []
      },
      inCheck: ""
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
    const { board, turn } = this.state;
    const sourceCoords = a.source.droppableId;
    const destinationCoords = a.destination.droppableId;
    const validMove = performValidation({
      board,
      sourceCoords,
      destinationCoords,
      ownColor: "white"
    });
    const nextBoard = getNextBoard(board, sourceCoords, destinationCoords);
    const movedSelfIntoCheck = kingStatusSelf(nextBoard, turn) === "check";
    const opponent = getOpponent(turn);
    const opponentKingStatus = kingStatusOpponent(nextBoard, turn);
    if (validMove && !movedSelfIntoCheck) {
      this.setState(({ board, fallen, inCheck, inCheckmate }) => {
        return {
          board: nextBoard,
          turn: opponent,
          // fallen: getUpdatedFallen(
          //   getTargetPiece(board, destinationCoords),
          //   fallen
          // ),
          inCheck: opponentKingStatus === "check" ? opponent : inCheck,
          inCheckmate:
            opponentKingStatus === "checkmate" ? opponent : inCheckmate
        };
      });
    }
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
