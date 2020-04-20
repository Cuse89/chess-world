import { getKingStatus } from "piece-validation/getKingStatus";
import board from "boards/defaultBoard";
import {
  inCheckBoard,
  inCheckmateBoard,
  inCheckCanTakeThreatWithKing,
  inCheckmateBoard2,
  inCheckBothSides,
  inCheckCanBlockThreat,
  inCheckCanTakeThreatWithNonKing,
  inCheckCanBlockMultipleThreats,
  inCheckCannotBlockMultipleThreats,
  checkMateCannotDefendThreatsInSingleMove
} from "piece-validation/tests/mockData";

describe("getKingStatus", () => {
  describe("it should return false", () => {
    it("on default starting board", () => {
      expect(getKingStatus(board, "white")).toBe(false);
    });
  });
  describe("it should return 'check'", () => {
    it("when king can escape without taking threat, and also take threat ", () => {
      expect(getKingStatus(inCheckBoard, "black", "white", "default")).toBe(
        "check"
      );
    });
    it("when king can escape by taking threat only", () => {
      expect(
        getKingStatus(inCheckCanTakeThreatWithKing, "black", "white", "default")
      ).toBe("check");
    });
    it("when opponent would be in check if own king's threat took the king", () => {
      expect(getKingStatus(inCheckBothSides, "black", "white", "default")).toBe(
        "check"
      );
    });
    it("when king is threatened by a piece which can be taken by non king piece", () => {
      expect(
        getKingStatus(
          inCheckCanTakeThreatWithNonKing,
          "black",
          "white",
          "default"
        )
      ).toBe("check");
    });
    it("when king is threatened by a single travelling piece which can be blocked", () => {
      expect(
        getKingStatus(inCheckCanBlockThreat, "black", "white", "default")
      ).toBe("check");
    });

  });
  describe("it should return 'checkmate'", () => {
    it("when king is in check, cannot take any threats", () => {
      expect(getKingStatus(inCheckmateBoard, "black", "white", "default")).toBe(
        "checkmate"
      );
    });
    it("when king is in check, has multiple direct threats, all can be taken however not in a single move", () => {
      expect(getKingStatus(checkMateCannotDefendThreatsInSingleMove, "black", "white", "default")).toBe(
        "checkmate"
      );
    });

    it("when king is in check, can take a threat, however which is defended by another threat", () => {
      expect(
        getKingStatus(inCheckmateBoard2, "black", "white", "default")
      ).toBe("checkmate");
    });
    it("when king is in check, can block a travelling threat, but not all travelling threats", () => {
      expect(
        getKingStatus(inCheckCannotBlockMultipleThreats, "black", "white", "default")
      ).toBe("checkmate");
    });
    it("when king is in check with travelling and non travelling threats, and can only defend against one", () => {
      expect(
        getKingStatus(inCheckCannotBlockMultipleThreats, "black", "white", "default")
      ).toBe("checkmate");
    });
  });
});
