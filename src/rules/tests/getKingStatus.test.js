import { getKingStatus } from "../getKingStatus";
import board from "../../lineups/defaultBoard";
import { inCheckBoard, inCheckmateBoard, inCheckCanTakeThreatBoard, inCheckmateBoard2 } from "./mockData";

describe("getKingStatus", () => {
  describe("it should return false", () => {
    it("on default starting board", () => {
      expect(getKingStatus("white", board)).toBe(false);
    });
  });
  describe("it should return 'check'", () => {
    it("when king can escape without taking threat, and also take threat ", () => {
      expect(getKingStatus("black", inCheckBoard)).toBe("check");
    });
    it("when king can escape by taking threat only", () => {
      expect(getKingStatus("black", inCheckCanTakeThreatBoard)).toBe("check");
    });
  });
  describe("it should return 'checkmate'", () => {
    it("when king is in checkmate, cannot take any threats", () => {
      expect(getKingStatus("black", inCheckmateBoard)).toBe("checkmate");
    });
    it("when king is in checkmate, can take a threat, however which is defended by another threat", () => {
      expect(getKingStatus("black", inCheckmateBoard2)).toBe("checkmate");
    });
  });



});
