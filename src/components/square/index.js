import React, { memo } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./Square.module.scss";

const Square = memo(
  ({ children, coords, handleOnClick, isGreen, isDraggingOver }) => {
    const className = cx({
      [styles.root]: true,
      [styles.green]: isGreen,
      [styles.highlighted]: isDraggingOver
    });
    return (
      <div className={className} onClick={() => handleOnClick(coords)}>
        {children}
      </div>
    );
  }
);

Square.defaultProps = {
  handleOnClick: () => {}
};

Square.propTypes = {
  coords: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func
};

export default Square;
