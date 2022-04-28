import { Rook } from "../Classes/PieceClasses/Rook";
import { Colour } from "../Types";
import { Capture } from "../Classes/CaptureClasses";

describe("Capture", () => {
  test("canCapture", () => {
    const r1 = new Rook(Colour[0], "d", 3);
    const r2 = new Rook(Colour[1], "d", 6);
    const positions = ["d3", "d6"];
    const capture = new Capture(r1, r2, positions);
  });
});
