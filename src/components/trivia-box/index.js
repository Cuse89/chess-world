import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DashboardButton from "components/dashboard-button";

import styles from "./TriviaBox.module.scss";

const TriviaBox = ({
  difficulty,
  category,
  onAnswerCorrect,
  onAnswerIncorrect,
  sessionToken
}) => {
  const [trivia, setTrivia] = useState({});
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const getQuestion = () => {
      const difficultyParams =
        difficulty === "random" ? "" : `&difficulty=${difficulty}`;
      const categoryParams =
        category === "random" ? "" : `&category=${category}`;
      const tokenParams = sessionToken ? `&token=${sessionToken}` : "";
      fetch(
        `https://opentdb.com/api.php?&type=multiple&amount=1${difficultyParams}${categoryParams}${tokenParams}`,
        {
          method: "GET"
        }
      )
        .then(res => res.json())
        .then(response => setTrivia(response.results[0]))
        .catch(err => console.log(err));
    };
    getQuestion();
  }, [difficulty, category]);

  useEffect(() => {
    const getMixedOptions = () => {
      const randomIndex = Math.floor(
        Math.random() * trivia.incorrect_answers.length + 1
      );
      let options = [...trivia.incorrect_answers];
      options.splice(randomIndex, 0, trivia.correct_answer);
      setOptions(options);
    };
    if (trivia.question) {
      getMixedOptions();
    }
  }, [trivia]);

  useEffect(() => {
    const handleAnswerQuestion = () => {
      const answeredCorrect = answer === trivia.correct_answer;
      setTimeout(() => {
        if (answeredCorrect) {
          onAnswerCorrect();
        } else {
          onAnswerIncorrect();
        }
      }, 1500);
    };
    if (answer) {
      handleAnswerQuestion();
    }
    // eslint-disable-next-line
  }, [answer]);

  const getOptionType = option => {
    if (answer) {
      return option === trivia.correct_answer ? "accept" : "error";
    }
    return "default";
  };

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
            onClick={() => !answer && setAnswer(option)}
            fullLength
            spaceBottom
            useHtml
            type={getOptionType(option)}
            disabled={answer}
          >
            {option}
          </DashboardButton>
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
