import { getKingStatus } from "piece-validation/getKingStatus";
import board from "src/boards/defaultBoard";
import {
  inCheckBoard,
  inCheckmateBoard,
  inCheckCanTakeThreatWithKing,
  inCheckmateBoard2,
  inCheckBothSides,
  inCheckCanBlockThreat, inCheckCanTakeThreatWithNonKing
} from "piece-validation/tests/mockData";

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
      expect(getKingStatus(inCheckCanTakeThreatWithKing, "black")).toBe("check");
    });
    it("when opponent would be in check if own king's threat took the king", () => {
      expect(getKingStatus(inCheckBothSides, "black")).toBe("check");
    });
    it("when king is threatened by a piece which can be taken by non king piece", () => {
      expect(getKingStatus(inCheckCanTakeThreatWithNonKing, "black")).toBe("check");
    });
    it("when king is threatened by a travelling piece which can be blocked", () => {
      expect(getKingStatus(inCheckCanBlockThreat, "black")).toBe("check");
    });
  });
  describe("it should return 'checkmate'", () => {
    it("when king is in checkmate, cannot take any threats", () => {
      expect(getKingStatus(inCheckmateBoard, "black")).toBe("checkmate");
    });
    it("when king is in checkmate, can take a threat, however which is defended by another threat", () => {
      expect(getKingStatus(inCheckmateBoard2, "black")).toBe("checkmate");
    });

  });
});
