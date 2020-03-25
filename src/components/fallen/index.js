import React from "react";
import { Piece } from "components/piece";
import { getPieceProps } from "utils/helpers";

const Fallen = ({ fallen }) => (
  <div>
    {fallen.map(piece => (
      <Piece
        key={`fallen-${piece.pieceId}`}
        icon={getPieceProps(piece.pieceId).icon}
        player={piece.player}
        pieceId={piece.pieceId}
        pieceColor={piece.player}
        isDraggable={false}
      />
    ))}
  </div>
);
export default Fallen