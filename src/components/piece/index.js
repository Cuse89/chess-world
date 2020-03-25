import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { Draggable } from "react-beautiful-dnd";

export const Piece = memo(
  ({ className, icon, available, pieceColor, inCheck }) => (
    <Draggable isDragDisabled={!available} draggableId={className} index={0}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <FontAwesomeIcon
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
          </div>
        );
      }}
    </Draggable>
  )
);
