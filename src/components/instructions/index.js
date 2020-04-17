import React, { useContext } from "react";
import PropTypes from "prop-types";
import { GAME_MODES, GAME_TYPES } from "utils/constants";
import Context from "context";

import styles from "./Instructions.module.scss";

const Instructions = () => {
  const { gameSettings } = useContext(Context);
  const { gameType, gameMode } = gameSettings;
  return (
    <div>
      {gameType === GAME_TYPES.STANDARD.TECHNICAL_NAME && (
        <div>
          <h3 className={styles.title}>{GAME_TYPES.STANDARD.PRETTY}</h3>
          Just a good old game of chess. No thrills.
        </div>
      )}
      {gameType === GAME_TYPES.TRAPDOOR.TECHNICAL_NAME && (
        <div>
          <h3 className={styles.title}>{GAME_TYPES.TRAPDOOR.PRETTY}</h3>
          <h4>Before the game:</h4>
          <ul>
            <li>
              <b>Set Trapdoors</b> - click on an empty tile to set a trapdoor.
              Choose carefully!
            </li>
          </ul>
          <h4>During the game:</h4>
          <ul>
            <li>
              <b>Where are they?</b> The thing about trapdoors is, you can't see
              them! Unless they're your own of course.
            </li>
            <li>
              <b>Don't fall in!</b> - If you land on a trapdoor, say good bye to
              your piece. This includes your own trapdoors.
            </li>
            <li>
              <b>Remember - </b>If your king falls down a trapdoor its{" "}
              <b>game over</b>.
            </li>
          </ul>
        </div>
      )}
      {gameType === GAME_TYPES.TRIVIA.TECHNICAL_NAME && (
        <div>
          <h3 className={styles.title}>{GAME_TYPES.TRIVIA.PRETTY}</h3>
          <ul>
            <li>
              In order to take an opponents' piece you must answer a trivia
              question correctly. Get it wrong? You're staying where you are.
            </li>
            {gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME && (
              <li>
                In order for the computer to take your piece, you must answer a
                question incorrectly.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Instructions;
