import React from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import cx from "classnames";

import styles from "./Square.module.scss";

const Square = ({ children, coords, handleOnClick }) => {
  const isGreen = () => {
    const isEven = n => n % 2 === 0;
    const evenRow = isEven(Number(coords[0]));
    const evenSquare = isEven(Number(coords[1]));
    return evenRow ? !evenSquare : evenSquare;
  };
  const className = cx({
    [styles.square]: true,
    [styles.green]: isGreen()
  });
  return (
    <Droppable droppableId={coords}>
      {(provided, snapshot) => {
        return (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className={className} onClick={() => handleOnClick(coords)}>
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
  coords: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func
};

export default Square;
