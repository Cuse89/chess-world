import { knightValidation } from "rules/knightValidation";
import { testBoard } from "rules/tests/mockData";

const testBoardRow3 = testBoard("white", "knight", 3);

const tests = [
  {
    it: "returns false when not moving like a knight",
    sourceCoords: "34",
    destinationCoords: "25",
    board: testBoardRow3,
    expect: false
  },
  {
    it: "returns false when not moving like a knight",
    sourceCoords: "34",
    destinationCoords: "77",
    board: testBoardRow3,
    expect: false
  },
  {
    it: "returns false when not moving like a knight",
    sourceCoords: "34",
    destinationCoords: "36",
    board: testBoardRow3,
    expect: false
  },
  {
    it: "returns true when moving like a knight into empty space - no jump",
    sourceCoords: "34",
    destinationCoords: "53",
    board: testBoardRow3,
    expect: true
  },
  {
    it: "returns true when moving like a knight into empty space - with jump",
    sourceCoords: "24",
    destinationCoords: "03",
    board: testBoard("white", "knight", 2),
    expect: true
  },
  {
    it: "returns true when moving like a knight onto opposition",
    sourceCoords: "34",
    destinationCoords: "13",
    board: testBoardRow3,
    expect: true
  },
  {
    it: "returns false when moving like a knight onto own piece",
    sourceCoords: "44",
    destinationCoords: "63",
    board: testBoard("white", "knight", 4),
    expect: false
  },
];

describe("knightValidation", () => {
  tests.forEach(testObj => {
    const {sourceCoords, destinationCoords, board } = testObj;
    it(testObj.it, () => {
      expect(
        knightValidation({
          sourceCoords,
          destinationCoords,
          board,
          player: "white"
        })
      ).toBe(testObj.expect);
    });
  });
});
