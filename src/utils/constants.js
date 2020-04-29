import defaultBoard from "boards/defaultBoard";
import withoutPartners from "boards/withoutPartners";
import royalFrontline from "boards/royalFrontline";

export const GAME_MODES = {
  onePlayer: {
    technicalName: "onePlayer",
    pretty: "One player"
  },
  twoPlayer: {
    technicalName: "twoPlayer",
    pretty: "Two player"
  },
  onlinePlay: {
    technicalName: "onlinePlay",
    pretty: "Online play"
  }
};

export const GAME_TYPES = {
  standard: {
    technicalName: "standard",
    pretty: "Standard chess"
  },
  trapdoor: {
    technicalName: "trapdoor",
    pretty: "Trapdoor chess"
  },
  trivia: {
    technicalName: "trivia",
    pretty: "Trivia chess"
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
  [GAME_MODES.onePlayer.technicalName]: [
    GAME_TYPES.standard.technicalName,
    GAME_TYPES.trapdoor.technicalName,
    GAME_TYPES.trivia.technicalName
  ],
  [GAME_MODES.twoPlayer.technicalName]: [
    GAME_TYPES.standard.technicalName,
    GAME_TYPES.trivia.technicalName
  ],
  [GAME_MODES.onlinePlay.technicalName]: [
    GAME_TYPES.standard.technicalName,
    GAME_TYPES.trapdoor.technicalName,
    GAME_TYPES.trivia.technicalName
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
    pretty: "Mini battle",
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

export const GAME_SETTINGS = {
  gameType: {
    pretty: "Game",
    options: GAME_TYPES
  },
  boardVariant: {
    pretty: "Board",
    options: BOARDS
  },
  trapdoorsAmount: {
    pretty: "Amount of trapdoors per player",
    options: TRAPDOOR_AMOUNTS
  },
  triviaCategory: {
    pretty: "Question category",
    options: TRIVIA_CATEGORIES
  },
  triviaDifficulty: {
    pretty: "Question difficulty",
    options: TRIVIA_DIFFICULTIES
  }
}