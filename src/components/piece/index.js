import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { Draggable } from "react-beautiful-dnd";

import styles from "./Piece.module.scss";

export const Piece = memo(({ id, icon, available, pieceColor, inCheck }) => {
  const piece = (
    <FontAwesomeIcon
      className={styles.root}
      icon={icon}
      cursor={available ? "pointer" : "cursor"}
      color={
        pieceColor === "white"
          ? inCheck
            ? "#d85656"
            : "#c7c7c7"
          : inCheck
          ? "#560000"
          : "black"
      }
      size="2x"
    />
  );
  if (!available) {
    return <div>{piece}</div>;
  } else
    return (
      <Draggable isDragDisabled={!available} draggableId={id} index={0}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {piece}
            </div>
          );
        }}
      </Draggable>
    );
});
