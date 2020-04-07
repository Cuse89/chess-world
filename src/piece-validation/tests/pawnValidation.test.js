import { pawnValidation } from "piece-validation/pawnValidation";
import defaultBoard from "lineups/defaultBoard";
import { testBoard } from "piece-validation/tests/mockData";

const testBoardRow5 = testBoard("black", "pawn", 5);

const tests = [
  {
    it: "returns true when moving white pawn 1 forwards",
    sourceCoords: "61",
    destinationCoords: "51",
    board: defaultBoard,
    expect: true
  },
  {
    it: "returns true when moving black pawn 1 forwards",
    sourceCoords: "11",
    destinationCoords: "21",
    board: defaultBoard,
    expect: true,
    player: "black"
  },
  {
    it: "returns true when white pawn attacks player",
    sourceCoords: "65",
    destinationCoords: "54",
    board: testBoardRow5,
    expect: true
  },
  {
    it: "returns true when black pawn attacks player",
    sourceCoords: "56",
    destinationCoords: "67",
    board: testBoardRow5,
    expect: true,
    player: "black"
  },
  {
    it: "returns false when pawn goes diagonally to empty square",
    sourceCoords: "60",
    destinationCoords: "51",
    board: testBoardRow5,
    expect: false
  },
  {
    it: "returns true when white pawn moves forward 2 spaces on first move",
    sourceCoords: "60",
    destinationCoords: "40",
    board: testBoardRow5,
    expect: true
  },
  {
    it: "returns true when black pawn moves forward 2 spaces on first move",
    sourceCoords: "10",
    destinationCoords: "30",
    board: testBoardRow5,
    expect: true,
    player: "black"
  },
  {
    it: "returns false when pawn moves forward 2 spaces not on first move",
    sourceCoords: "50",
    destinationCoords: "30",
    board: testBoard("white", "pawn", "5"),
    expect: false,
  },
  {
    it: "returns false when pawn moves backwards 1 space",
    sourceCoords: "60",
    destinationCoords: "70",
    board: testBoardRow5,
    expect: false,
  },
];

describe("pawnValidation", () => {
  tests.forEach(testObj => {
    const {sourceCoords, destinationCoords, board, player} = testObj;
    it(testObj.it, () => {
      expect(
        pawnValidation({
          sourceCoords,
          destinationCoords,
          board,
          player: player || "white",
          baselinePlayer: "white"
        })
      ).toBe(testObj.expect);
    });
  });
});
