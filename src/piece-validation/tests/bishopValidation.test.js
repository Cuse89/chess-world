import { bishopValidation } from "piece-validation/bishopValidation";
import { testBoard } from "piece-validation/tests/mockData";

const testBoardRow3 = testBoard("white", "bishop", 3);
const testBoardRow4 = testBoard("white", "bishop", 4);

const tests = [
  {
    it: "return false when moving forwards",
    sourceCoords: "34",
    destinationCoords: "24",
    board: testBoardRow3,
    expect: false
  },
  {
    it: "return false when moving backwards",
    sourceCoords: "34",
    destinationCoords: "44",
    board: testBoardRow3,
    expect: false
  },
  {
    it: "return false when moving left",
    sourceCoords: "34",
    destinationCoords: "33",
    board: testBoardRow3,
    expect: false
  },
  {
    it: "return false when moving right",
    sourceCoords: "34",
    destinationCoords: "35",
    board: testBoardRow3,
    expect: false
  },
  {
    it: "return false when blocked by opposition and going diagonally forward left",
    sourceCoords: "34",
    destinationCoords: "01",
    board: testBoardRow3,
    expect: false
  },
  {
    it: "return false when blocked by opposition and going diagonally forward right",
    sourceCoords: "34",
    destinationCoords: "07",
    board: testBoardRow3,
    expect: false
  },
  {
    it: "returns false when blocked by own piece going diagonally backwards left",
    sourceCoords: "44",
    destinationCoords: "71",
    board: testBoardRow4,
    expect: false
  },
  {
    it: "returns false when blocked by own piece going diagonally backwards right",
    sourceCoords: "44",
    destinationCoords: "77",
    board: testBoardRow4,
    expect: false
  },
  {
    it: "returns true when going diagonally and landing on empty square",
    sourceCoords: "44",
    destinationCoords: "55",
    board: testBoardRow4,
    expect: true
  },
  {
    it: "returns true when going diagonally and landing on opposition",
    sourceCoords: "44",
    destinationCoords: "11",
    board: testBoardRow4,
    expect: true
  },
];

describe("bishopValidation", () => {
  tests.forEach(testObj => {
    const {sourceCoords, destinationCoords, board} = testObj;
    it(testObj.it, () => {
      expect(
        bishopValidation({
          sourceCoords,
          destinationCoords,
          board,
        })
      ).toBe(testObj.expect);
    });
  });
});
