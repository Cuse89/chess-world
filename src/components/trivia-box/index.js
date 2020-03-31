import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DashboardButton from "components/dashboard-button";

import styles from "./TriviaBox.module.scss";

const TriviaBox = ({
  difficulty,
  categoryId,
  onAnswerCorrect,
  onAnswerIncorrect
}) => {
  const [trivia, setTrivia] = useState({});
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {
    if (trivia.question) {
      getMixedOptions();
    }
  }, [trivia]);

  useEffect(() => {
    if (answer) {
      handleAnswerQuestion();
    }
  }, [answer]);

  function getQuestion() {
    fetch(
      `https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${difficulty}&category=${categoryId}&amount=1`,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(response => setTrivia(response.results[0]))
      .catch(err => console.log(err));
  }

  function handleAnswerQuestion() {
    const answeredCorrect = answer === trivia.correct_answer;
    setTimeout(() => {
      if (answeredCorrect) {
        onAnswerCorrect();
      } else {
        onAnswerIncorrect();
      }
    }, 1500)

  }

  function getMixedOptions() {
    const randomIndex = Math.floor(
      Math.random() * trivia.incorrect_answers.length + 1
    );
    let options = [...trivia.incorrect_answers];
    options.splice(randomIndex, 0, trivia.correct_answer);
    setOptions(options);
  }

  function getOptionType(option) {
    if (answer) {
      return option === trivia.correct_answer ? "accept" : "error";
    }
    return "default";
  }

  if (trivia.question) {
    return (
      <div className={styles.root}>
        <div
          className={styles.question}
          dangerouslySetInnerHTML={{ __html: trivia.question }}
        />
        {options.map((option, i) => (
          <DashboardButton
            key={i}
            displayText={option}
            onClick={() => !answer && setAnswer(option)}
            fullLength
            spaceBottom
            useHtml
            type={getOptionType(option)}
            notAvailable={answer}
          />
        ))}
      </div>
    );
  }
  return null;
};

TriviaBox.defaultProps = {
  difficulty: "easy",
  categoryId: 9
};

TriviaBox.propTypes = {
  difficulty: PropTypes.string,
  categoryId: PropTypes.number
};

export default TriviaBox;
