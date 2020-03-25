import React from "react";
import { Piece } from "components/piece";

const Fallen = ({ fallen }) => (
  <div>
    {fallen.map(piece => (
      <Piece
        key={`fallen-${piece.pieceId}`}
        icon={piece.icon}
        player={piece.player}
        pieceId={piece.pieceId}
        pieceColor={piece.player}
      />
    ))}
  </div>
);
export default Fallen