import React from "react";
import styles from "components/create-game/CreateGame.module.scss";
import { TRAPDOOR_AMOUNTS } from "utils/constants";
import DashboardButton from "components/dashboard-button";

const TrapdoorOptions = ({ updateGameSettings, trapdoorsAmount }) => (
  <div>
    <h4>Amount of trapdoors per player</h4>
    <div className={styles.trapdoors}>
      {TRAPDOOR_AMOUNTS.map(amount => (
        <DashboardButton
          key={`trapdoor-button-${amount}`}
          displayText={amount}
          onClick={() => updateGameSettings({ trapdoorsAmount: amount })}
          selected={amount === trapdoorsAmount}
          fullLength
          spaceBottom
          spaceRight
        />
      ))}
    </div>
  </div>
);

export default TrapdoorOptions;
