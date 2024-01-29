import { screen, render, waitFor } from "@testing-library/react";
import { Frame, Layer } from "src";

describe("Layer", () => {
  it("set the CSS variable when initialized", async () => {
    render(
      <Frame>
        <Layer data-testid="layer">
          <div style={{ width: "10vw", height: "10vh" }}>ELEMENT</div>
        </Layer>
      </Frame>
    );

    await waitFor(() =>
      expect(
        screen.getByTestId("layer").style.getPropertyValue("--parallax-rate")
      ).toEqual("0")
    );
  });

  it("uses its own element when display is not contents", async () => {
    render(
      <Layer data-testid="layer" style={{ display: "block" }}>
        <div style={{ width: "10vw", height: "10vh" }}>ELEMENT</div>
      </Layer>
    );

    await waitFor(() =>
      expect(
        screen.getByTestId("layer").style.getPropertyValue("--parallax-rate")
      ).toEqual("0")
    );
  });

  it("updates the CSS variable when scrolling", async () => {
    render(
      <Frame>
        <Layer data-testid="layer">
          <div style={{ width: "10vw", height: "10vh" }}>ELEMENT</div>
        </Layer>
      </Frame>
    );

    window.scrollTo(0, document.scrollingElement!.scrollHeight);

    await waitFor(() =>
      expect(
        screen.getByTestId("layer").style.getPropertyValue("--parallax-rate")
      ).toEqual("1")
    );
  });
});
