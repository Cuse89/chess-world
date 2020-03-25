import { kingValidation } from "rules/kingValidation";
import { inCheckmateBoard2, testBoard } from "rules/tests/mockData";

const testBoardRow3 = testBoard("white", "king", 3);
const testBoardRow2 = testBoard("white", "king", 2);
const testBoardRow5 = testBoard("white", "king", 5);


const tests = [
  {
    it: "returns true when moving forward 1 space",
    sourceCoords: "34",
    destinationCoords: "24",
    board: testBoardRow3,
    expect: true
  },
  {
    it: "returns true when moving backwards 1 space",
    sourceCoords: "34",
    destinationCoords: "44",
    board: testBoardRow3,
    expect: true
  },
  {
    it: "returns true when moving left 1 space",
    sourceCoords: "34",
    destinationCoords: "33",
    board: testBoardRow3,
    expect: true
  },
  {
    it: "returns true when moving right 1 space",
    sourceCoords: "34",
    destinationCoords: "35",
    board: testBoardRow3,
    expect: true
  },
  {
    it: "returns true when moving forward 1 space landing on opposition",
    sourceCoords: "24",
    destinationCoords: "14",
    board: testBoardRow2,
    expect: true
  },
  {
    it: "returns true when moving right 1 space landing on opposition",
    sourceCoords: "20",
    destinationCoords: "21",
    board: inCheckmateBoard2,
    expect: true,
    player: "black"
  },
  {
    it: "returns false when moving 2 spaces",
    sourceCoords: "34",
    destinationCoords: "54",
    board: testBoardRow3,
    expect: false,
  },
  {
    it: "returns false when trying to jump piece",
    sourceCoords: "34",
    destinationCoords: "04",
    board: testBoardRow3,
    expect: false,
  },
  {
    it: "returns false when moving 1 space into onto own player",
    sourceCoords: "54",
    destinationCoords: "64",
    board: testBoardRow5,
    expect: false,
  },
];

describe("kingValidation", () => {
  tests.forEach(testObj => {
    const {sourceCoords, destinationCoords, board, player} = testObj;
    it(testObj.it, () => {
      expect(
        kingValidation({
          sourceCoords,
          destinationCoords,
          board,
          player: player || "white"
        })
      ).toBe(testObj.expect);
    });
  });
});
