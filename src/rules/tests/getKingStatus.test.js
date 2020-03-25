import { getKingStatus } from "rules/getKingStatus";
import board from "lineups/defaultBoard";
import {
  inCheckBoard,
  inCheckmateBoard,
  inCheckCanTakeThreatBoard,
  inCheckmateBoard2
} from "rules/tests/mockData";

describe("getKingStatus", () => {
  describe("it should return false", () => {
    it("on default starting board", () => {
      expect(getKingStatus(board, "white", "white")).toBe(false);
    });
  });
  describe("it should return 'check'", () => {
    it("when king can escape without taking threat, and also take threat ", () => {
      expect(getKingStatus(inCheckBoard, "black", "white")).toBe("check");
    });
    it("when king can escape by taking threat only", () => {
      expect(getKingStatus(inCheckCanTakeThreatBoard, "black", "white")).toBe(
        "check"
      );
    });
  });
  describe("it should return 'checkmate'", () => {
    it("when king is in checkmate, cannot take any threats", () => {
      expect(getKingStatus(inCheckmateBoard, "black", "white")).toBe(
        "checkmate"
      );
    });
    it("when king is in checkmate, can take a threat, however which is defended by another threat", () => {
      expect(getKingStatus(inCheckmateBoard2, "black", "white")).toBe(
        "checkmate"
      );
    });
  });
});
