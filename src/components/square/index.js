import React from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";

import styles from "./Square.module.scss";

const Square = ({ children, coords, handleOnClick }) => {
  return (
    <Droppable droppableId={coords}>
      {(provided, snapshot) => {
        return (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div
              className={styles.square}
              onClick={() => handleOnClick(coords)}
            >
              {children}
            </div>
            {/*{provided.placeholder}*/}
          </div>
        );
      }}
    </Droppable>
  );
};

Square.defaultProps = {
  handleOnClick: () => {}
};

Square.propTypes = {
  coords: PropTypes.object.isRequired,
  handleOnClick: PropTypes.func
};

export default Square;
