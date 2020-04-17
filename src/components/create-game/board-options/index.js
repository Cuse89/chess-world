import React, { Fragment } from "react";
import DashboardButton from "components/dashboard-button";
import defaultBoard from "boards/defaultBoard";
import withoutPartners from "boards/withoutPartners";
import styles from "./BoardOptions.module.scss";

const boards = [defaultBoard, withoutPartners];

const BoardOptions = ({ onChange, selectedBoard }) => (
  <Fragment>
    <h4>Board:</h4>
    <div className={styles.options}>
      {boards.map(boardDetails => (
        <DashboardButton
          key={`board-button-${boardDetails.technicalName}`}
          onClick={() =>
            onChange({
              boardSettings: {
                board: boardDetails.board,
                technicalName: boardDetails.technicalName
              }
            })
          }
          selected={boardDetails.technicalName === selectedBoard.technicalName}
          fullLength
          spaceBottom
          spaceRight
        >
          {boardDetails.pretty}
        </DashboardButton>
      ))}
    </div>
  </Fragment>
);
export default BoardOptions;