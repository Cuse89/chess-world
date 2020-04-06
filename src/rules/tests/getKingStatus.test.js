import { getKingStatus } from "rules/getKingStatus";
import board from "lineups/defaultBoard";
import {
  inCheckBoard,
  inCheckmateBoard,
  inCheckCanTakeThreatBoard,
  inCheckmateBoard2, inCheckBothSides
} from "rules/tests/mockData";

describe("getKingStatus", () => {
  describe("it should return false", () => {
    it("on default starting board", () => {
      expect(getKingStatus(board, "white")).toBe(false);
    });
  });
  describe("it should return 'check'", () => {
    it("when king can escape without taking threat, and also take threat ", () => {
      expect(getKingStatus(inCheckBoard, "black")).toBe("check");
    });
    it("when king can escape by taking threat only", () => {
      expect(getKingStatus(inCheckCanTakeThreatBoard, "black")).toBe(
        "check"
      );
    });
    it("when opponent would be in check if own king's threat took the king", () => {
      expect(getKingStatus(inCheckBothSides, "black")).toBe(("check"))
    })
  });
  describe("it should return 'checkmate'", () => {
    it("when king is in checkmate, cannot take any threats", () => {
      expect(getKingStatus(inCheckmateBoard, "black")).toBe(
        "checkmate"
      );
    });
    it("when king is in checkmate, can take a threat, however which is defended by another threat", () => {
      expect(getKingStatus(inCheckmateBoard2, "black")).toBe(
        "checkmate"
      );
    });
  });
});
