import React, { Fragment } from "react";
import { TRAPDOOR_AMOUNTS } from "utils/constants";
import DashboardButton from "components/dashboard-button";
import styles from "./TrapdoorOptions.module.scss";

const TrapdoorOptions = ({ onChange, trapdoorsAmount }) => (
  <Fragment>
    <h4>Amount of trapdoors per player:</h4>
    <div className={styles.options}>
      {TRAPDOOR_AMOUNTS.map(amount => (
        <DashboardButton
          key={`trapdoor-button-${amount}`}
          onClick={() => onChange({ trapdoorsAmount: amount })}
          selected={amount === trapdoorsAmount}
          fullLength
          spaceBottom
          spaceRight
        >
          {amount}
        </DashboardButton>
      ))}
    </div>
  </Fragment>
);

export default TrapdoorOptions;
