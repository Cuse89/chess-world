import React, { memo } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./Square.module.scss";

const Square = memo(
  ({
    children,
    coords,
    handleOnClick,
    isGreen,
    isDraggingOver,
    position,
    showPositions
  }) => {
    const className = cx({
      [styles.root]: true,
      [styles.green]: isGreen,
      [styles.highlighted]: isDraggingOver
    });
    const positionClassName = pos =>
      cx({
        [styles.position]: true,
        [styles.letter]: isNaN(pos),
        [styles.number]: !isNaN(pos),
        [styles.white]: isGreen,
        [styles.dark]: !isGreen
      });
    return (
      <div className={className} onClick={() => handleOnClick(coords)}>
        {showPositions && (
          <p className={positionClassName(position[0])}>{position[0]}</p>
        )}
        {showPositions && position.length > 1 && (
          <p className={positionClassName(position[1])}>{position[1]}</p>
        )}
        {children}
      </div>
    );
  }
);

Square.defaultProps = {
  handleOnClick: () => {},
  showPositions: true
};

Square.propTypes = {
  coords: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func,
  showPositions: PropTypes.bool
};

export default Square;
