import { mirrorBoard } from "utils/helpers";
import defaultBoard from "src/boards/defaultBoard";
import { mirroredBoard } from "utils/tests/mockData";

test("mirrorBoard should work as expected", () => {
  expect(mirrorBoard(defaultBoard)).toEqual(mirroredBoard)
})