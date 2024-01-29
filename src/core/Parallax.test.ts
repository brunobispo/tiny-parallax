import { Parallax, ranges } from "src";
import { waitFor } from "@testing-library/dom";

describe("Parallax", () => {
  let element: HTMLElement;
  let parallax: Parallax;

  beforeEach(() => {
    element = document.createElement("div");
    element.style.height = "10vh";
    element.style.width = "10vw";
    element.textContent = "ELEMENT";
    document.body.append(element);
  });

  afterEach(() => {
    parallax.remove();
    element.remove();
  });

  it("triggers the callback when is initialized", () => {
    const fn = vi.fn();
    parallax = new Parallax(fn, undefined, element);
    expect(fn).toHaveBeenCalledWith(0);
  });

  it("calculates the rate based on the range", async () => {
    let rate: number;

    parallax = new Parallax(
      (r) => (rate = Math.round(r * 100)),
      undefined,
      element,
      {
        range: (v, e) => [e, v - e],
        clamp: false,
      }
    );

    window.scrollTo(0, element.clientHeight - 10);
    await waitFor(() => expect(rate).toBe(-2));

    window.scrollTo(0, element.clientHeight + 10);
    await waitFor(() => expect(rate).toBe(2));

    const windowHeight = document.scrollingElement!.clientHeight;
    window.scrollTo(0, windowHeight - element.clientHeight - 10);
    await waitFor(() => expect(rate).toBe(98));

    window.scrollTo(0, windowHeight - element.clientHeight + 10);
    await waitFor(() => expect(rate).toBe(102));
  });

  it("clamps the rate", async () => {
    let rate: number;

    parallax = new Parallax((r) => (rate = r), undefined, element, {
      range: ranges.entireInView,
      clamp: true,
    });
    window.scrollTo(0, document.scrollingElement!.clientHeight + 10);

    await waitFor(() => expect(rate).toBe(1));
  });

  it("applies the offset", async () => {
    let rate: number;

    parallax = new Parallax((r) => (rate = r), undefined, element, {
      range: ranges.entireInView,
      offset: 0.1,
    });
    element.scrollIntoView({ block: "start" });

    await waitFor(() => expect(rate).toBe(0.9));
  });

  it("applies the speed", async () => {
    let rate: number;

    parallax = new Parallax((r) => (rate = r), undefined, element, {
      range: ranges.entireInView,
      speed: 0.2,
    });
    element.scrollIntoView({ block: "start" });

    await waitFor(() => expect(rate).toBe(0.2));
  });

  it.each`
    scrollPosition | expected
    ${"start"}     | ${1}
    ${"center"}    | ${0.5}
    ${"end"}       | ${0}
  `(
    "triggers when scrolling vertically to $scrollPosition",
    async ({ scrollPosition, expected }) => {
      let rate: number;

      new Parallax((r) => (rate = r), undefined, element, {
        range: ranges.entireInView,
      });
      element.scrollIntoView({ block: scrollPosition });

      await waitFor(() => expect(rate).toBeCloseTo(expected));
    }
  );

  it.each`
    scrollPosition | expected
    ${"start"}     | ${1}
    ${"center"}    | ${0.5}
    ${"end"}       | ${0}
  `(
    "triggers when scrolling horizontally to $scrollPosition",
    async ({ scrollPosition, expected }) => {
      let rate: number;

      new Parallax((r) => (rate = r), undefined, element, {
        direction: "horizontal",
        range: ranges.entireInView,
      });
      element.scrollIntoView({ inline: scrollPosition });

      await waitFor(() => expect(rate).toBeCloseTo(expected));
    }
  );
});
