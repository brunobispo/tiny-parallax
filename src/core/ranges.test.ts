import * as ranges from "./ranges";

describe("ranges", () => {
  describe("frameRef", () => {
    it.each`
      enter  | exit         | viewport | element | expected
      ${0}   | ${0}         | ${1000}  | ${100}  | ${[0, 1000]}
      ${0.5} | ${0}         | ${1000}  | ${100}  | ${[50, 1000]}
      ${0}   | ${0.5}       | ${1000}  | ${100}  | ${[0, 1050]}
      ${0.5} | ${0.5}       | ${1000}  | ${100}  | ${[50, 1050]}
      ${0.5} | ${undefined} | ${1000}  | ${100}  | ${[50, 1050]}
    `(
      "enter $enter and exit $exit return $expected",
      ({ enter, exit, viewport, element, expected }) => {
        expect(ranges.frameRef(enter, exit)(viewport, element)).toEqual(
          expected
        );
      }
    );
  });

  describe("viewportRef", () => {
    it.each`
      threshold | pivot        | viewport | element | expected
      ${0}      | ${0}         | ${1000}  | ${100}  | ${[0, 0]}
      ${0}      | ${undefined} | ${1000}  | ${100}  | ${[0, 0]}
      ${0.5}    | ${0}         | ${1000}  | ${100}  | ${[0, 500]}
      ${0.5}    | ${0.5}       | ${1000}  | ${100}  | ${[0, 550]}
      ${0}      | ${0.5}       | ${1000}  | ${100}  | ${[0, 50]}
    `(
      "enter $enter and exit $exit return $expected",
      ({ threshold, pivot, viewport, element, expected }) => {
        expect(ranges.viewportRef(threshold, pivot)(viewport, element)).toEqual(
          expected
        );
      }
    );
  });
});
