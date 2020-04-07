import { rookValidation } from "piece-validation/rookValidation";
import { testBoard } from "piece-validation/tests/mockData";

const testBoardRow3 = testBoard("white", "rook", 3);

const tests = [
  {
    it: "returns false when moving diagonally",
    sourceCoords: "34",
    destinationCoords: "25",
    board: testBoardRow3,
    expect: false
  },
  {
    it: "returns true when moving forwards into empty space",
    sourceCoords: "34",
    destinationCoords: "24",
    board: testBoardRow3,
    expect: true
  },
  {
    it: "returns true when moving backwards into empty space",
    sourceCoords: "34",
    destinationCoords: "44",
    board: testBoardRow3,
    expect: true
  },
  {
    it: "returns true when moving left into empty space",
    sourceCoords: "34",
    destinationCoords: "33",
    board: testBoardRow3,
    expect: true
  },
  {
    it: "returns true when moving right into empty space",
    sourceCoords: "34",
    destinationCoords: "35",
    board: testBoardRow3,
    expect: true
  },
  {
    it: "returns false when blocked by opposition, moving forward",
    sourceCoords: "34",
    destinationCoords: "04",
    board: testBoardRow3,
    expect: false
  },
  {
    it: "returns false when blocked by opposition, moving backwards",
    sourceCoords: "34",
    destinationCoords: "74",
    board: testBoardRow3,
    expect: false
  },
  {
    it: "returns false when blocked by opposition, moving left",
    sourceCoords: "34",
    destinationCoords: "30",
    board: testBoardRow3,
    expect: false
  },
  {
    it: "returns false when blocked by opposition, moving right",
    sourceCoords: "34",
    destinationCoords: "37",
    board: testBoardRow3,
    expect: false
  },
  {
    it: "returns true when moving forward and landing on opposition",
    sourceCoords: "34",
    destinationCoords: "14",
    board: testBoardRow3,
    expect: true
  },
  {
    it: "returns true when moving backward and landing on opposition",
    sourceCoords: "34",
    destinationCoords: "64",
    board: testBoardRow3,
    expect: true
  },
  {
    it: "returns true when moving left and landing on opposition",
    sourceCoords: "34",
    destinationCoords: "32",
    board: testBoardRow3,
    expect: true
  },
  {
    it: "returns true when moving forward and landing on opposition",
    sourceCoords: "34",
    destinationCoords: "36",
    board: testBoardRow3,
    expect: true
  }
];

describe("rookValidation", () => {
  tests.forEach(testObj => {
    const { sourceCoords, destinationCoords, board } = testObj;
    it(testObj.it, () => {
      expect(
        rookValidation({
          sourceCoords,
          destinationCoords,
          board,
          player: "white"
        })
      ).toBe(testObj.expect);
    });
  });
});
