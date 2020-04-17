import defaultBoard from "boards/defaultBoard";
import withoutPartners from "boards/withoutPartners";
import royalFrontline from "boards/royalFrontline";

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

export const TRIVIA_DIFFICULTIES = [
  { pretty: "Random", technicalName: "random" },
  { pretty: "Easy", technicalName: "easy" },
  { pretty: "Medium", technicalName: "medium" },
  { pretty: "Hard", technicalName: "hard" }
];
export const DEFAULT_TRIVIA_DIFFICULTY = "random";
export const TRIVIA_CATEGORIES = [
  { pretty: "Random", id: "random" },
  { pretty: "General Knowledge", id: 9 },
  { pretty: "Film", id: 11 },
  { pretty: "Music", id: 12 },
  { pretty: "Television", id: 14 },
  { pretty: "Science & Nature", id: 17 },
  { pretty: "Mathematics", id: 19 },
  { pretty: "Sport", id: 21 },
  { pretty: "Geography", id: 22 },
  { pretty: "History", id: 23 },
  { pretty: "Politics", id: 24 },
  { pretty: "Art", id: 25 },
  { pretty: "Celebrities", id: 26 },
  { pretty: "Animals", id: 27 }
];
export const DEFAULT_TRIVIA_CATEGORY = "random";

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

export const BOARDS = {
  default: {
    technicalName: "default",
    pretty: "Default",
    whitePawnStartingRow: 6,
    board: defaultBoard
  },
  withoutPartners: {
    technicalName: "withoutPartners",
    pretty: "Mini Battle",
    whitePawnStartingRow: 5,
    board: withoutPartners
  },
  royalFrontline: {
    technicalName: "royalFrontline",
    pretty: "Royal front line",
    whitePawnStartingRow: 7,
    board: royalFrontline

  }
};
