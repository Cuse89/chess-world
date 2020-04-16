import React, { Fragment } from "react";
import { TRIVIA_CATEGORIES, TRIVIA_DIFFICULTIES } from "utils/constants";
import DashboardButton from "components/dashboard-button";
import styles from "./TriviaOptions.module.scss";

const TriviaOptions = ({ onChange, triviaDifficulty, triviaCategory }) => (
  <Fragment>
    <h4>Question difficulty:</h4>
    <div className={styles.options}>
      {TRIVIA_DIFFICULTIES.map(difficulty => (
        <DashboardButton
          key={`trivia-difficulty-${difficulty.technicalName}`}
          onClick={() =>
            onChange({ triviaDifficulty: difficulty.technicalName })
          }
          selected={difficulty.technicalName === triviaDifficulty}
          fullLength
          spaceBottom
          spaceRight
        >
          {difficulty.pretty}
        </DashboardButton>
      ))}
    </div>
    <h4>Question category:</h4>
    <div className={styles.options}>
      {TRIVIA_CATEGORIES.map(category => (
        <DashboardButton
          key={`trivia-category-${category.id}`}
          onClick={() => onChange({ triviaCategory: category.id })}
          selected={category.id === triviaCategory}
          fullLength
          spaceBottom
          spaceRight
        >
          {category.pretty}
        </DashboardButton>
      ))}
    </div>
  </Fragment>
);

export default TriviaOptions;
