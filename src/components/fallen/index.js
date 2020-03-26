import React from "react";
import { Piece } from "components/piece";
import { getPieceProps } from "utils/helpers";

import styles from "./Fallen.module.scss";

const Fallen = ({ fallen }) => (
  <div className={styles.root}>
    {fallen.map(piece => (
      <div key={`fallen-${piece.pieceId}`} className={styles.piece}>
        <Piece
          key={`fallen-${piece.pieceId}`}
          icon={getPieceProps(piece.pieceId).icon}
          player={piece.player}
          pieceId={piece.pieceId}
          pieceColor={piece.player}
          isDraggable={false}
        />
      </div>
    ))}
  </div>
);
export default Fallen;
