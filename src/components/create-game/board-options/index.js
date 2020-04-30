import React, { Fragment } from "react";
import DashboardButton from "components/dashboard-button";
import { BOARDS, GAME_SETTINGS, GAME_TYPES } from "utils/constants";
import styles from "./BoardOptions.module.scss";

const boards = [BOARDS.default, BOARDS.withoutPartners, BOARDS.royalFrontline];

const BoardOptions = ({ onChange, selectedBoard, gameType }) => {
  const getButton = boardDetails => {
    if (
      !(
        GAME_TYPES[gameType].doesNotUseBoard &&
        GAME_TYPES[gameType].doesNotUseBoard.includes(
          boardDetails.technicalName
        )
      )
    ) {
      return (
        <DashboardButton
          key={`board-button-${boardDetails.technicalName}`}
          onClick={() => onChange({ boardVariant: boardDetails.technicalName })}
          selected={boardDetails.technicalName === selectedBoard}
          fullLength
          spaceBottom
          spaceRight
        >
          {boardDetails.pretty}
        </DashboardButton>
      );
    }
  };

  return (
    <Fragment>
      <h4>{GAME_SETTINGS.boardVariant.pretty}:</h4>
      <div className={styles.options}>
        {boards.map(boardDetails => getButton(boardDetails))}
      </div>
    </Fragment>
  );
};
export default BoardOptions;
