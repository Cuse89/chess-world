import React, { Fragment } from "react";
import DashboardButton from "components/dashboard-button";
import defaultBoard from "lineups/defaultBoard";
import withoutPartners from "lineups/withoutPartners";
import styles from "./BoardOptions.module.scss";

const boards = [
  { lineup: defaultBoard, pretty: "Default", id: 1 },
  { lineup: withoutPartners, pretty: "5x7 - single pieces only", id: 2 }
];

const BoardOptions = ({ onChange, selectedBoard }) => (
  <Fragment>
    <h4>Board:</h4>
    <div className={styles.options}>
      {boards.map(board => (
        <DashboardButton
          key={`board-button-${board.id}`}
          onClick={() => onChange({ lineup: board.lineup })}
          selected={board.lineup === selectedBoard}
          fullLength
          spaceBottom
          spaceRight
        >
          {board.pretty}
        </DashboardButton>
      ))}
    </div>
  </Fragment>
);
export default BoardOptions;