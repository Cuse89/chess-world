import { mirrorBoard } from "utils/helpers";
import defaultBoard from "lineups/defaultBoard";
import { mirroredBoard } from "utils/tests/mockData";

test("mirrorBoard should work as expected", () => {
  expect(mirrorBoard(defaultBoard)).toEqual(mirroredBoard)
})