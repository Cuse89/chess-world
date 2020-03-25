import React, { memo } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import cx from "classnames";

import styles from "./Square.module.scss";

const Square = memo(({ children, coords, handleOnClick, isGreen }) => {
  return (
    <Droppable droppableId={coords}>
      {(provided, snapshot) => {
        const className = cx({
          [styles.root]: true,
          [styles.green]: isGreen,
          [styles.highlighted]: snapshot.isDraggingOver
        });
        return (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className={className} onClick={() => handleOnClick(coords)}>
              {children}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
});

Square.defaultProps = {
  handleOnClick: () => {}
};

Square.propTypes = {
  coords: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func
};

export default Square;
