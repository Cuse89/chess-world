export const GAME_MODES = {
  ONE_PLAYER: {
    TECHNICAL_NAME: "onePlayer",
    PRETTY: "One Player"
  },
  TWO_PLAYER: {
    TECHNICAL_NAME: "twoPlayer",
    PRETTY: "Two Player"
  },
  ONLINE_PLAY: {
    TECHNICAL_NAME: "onlinePlay",
    PRETTY: "Online Play"
  }
};

export const GAME_TYPES = {
  STANDARD: {
    TECHNICAL_NAME: "standard",
    PRETTY: "Standard Chess"
  },
  TRAPDOOR: {
    TECHNICAL_NAME: "trapdoor",
    PRETTY: "Trapdoor Chess"
  },
  TRIVIA: {
    TECHNICAL_NAME: "trivia",
    PRETTY: "Trivia Chess"
  }
};

export const DEFAULT_TURN = "white";
export const DEFAULT_FALLEN = {
  white: [],
  black: []
};

export const EMPTY_SQUARE = {
  player: "",
  pieceId: ""
};

export const TRAPDOOR_AMOUNTS = [1, 2, 3, 4];
export const DEFAULT_TRAPDOOR_AMOUNT = 1;

export const GAME_MODE_HAS_GAME_TYPE = {
  [GAME_MODES.ONE_PLAYER.TECHNICAL_NAME]: [
    GAME_TYPES.STANDARD.TECHNICAL_NAME,
    GAME_TYPES.TRAPDOOR.TECHNICAL_NAME,
    GAME_TYPES.TRIVIA.TECHNICAL_NAME
  ],
  [GAME_MODES.TWO_PLAYER.TECHNICAL_NAME]: [
    GAME_TYPES.STANDARD.TECHNICAL_NAME,
    GAME_TYPES.TRIVIA.TECHNICAL_NAME
  ],
  [GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME]: [
    GAME_TYPES.STANDARD.TECHNICAL_NAME,
    GAME_TYPES.TRAPDOOR.TECHNICAL_NAME,
    GAME_TYPES.TRIVIA.TECHNICAL_NAME
  ]
};

export const TRAPDOOR = {
  AMOUNTS: [1, 2, 3, 4],
  DEFAULT_AMOUNT: 1
};
