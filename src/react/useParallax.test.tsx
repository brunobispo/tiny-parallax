import { fireEvent, render, waitFor } from "@testing-library/react";
import { useRef } from "react";
import { Frame, RateHandler, Viewport, ranges, useParallax } from "src";

const Component = (props: { fn: RateHandler }) => {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(props.fn, { element: ref });

  return (
    <div ref={ref} style={{ width: "10vw", height: "10vh" }}>
      ELEMENT
    </div>
  );
};

describe("useParallax", () => {
  describe("when it is descendant of a Frame", () => {
    const Component = (props: { fn: RateHandler }) => {
      useParallax(props.fn);
      return <div style={{ width: "10vw", height: "10vh" }}>ELEMENT</div>;
    };

    it("triggers the callback", async () => {
      const fn = vi.fn();

      render(
        <Frame>
          <Component fn={fn} />
        </Frame>
      );

      await waitFor(() => expect(fn).toHaveBeenCalled());
    });
  });

  it("uses a custom viewport as reference", async () => {
    const fn = vi.fn();

    render(
      <Viewport
        style={{ height: "50vh", top: "50vh" }}
        range={ranges.entireInView}
      >
        <Frame>
          <Component fn={fn} />
        </Frame>
      </Viewport>
    );

    await waitFor(() => expect(fn).toHaveBeenCalledWith(1));
  });

  it("triggers the callback", async () => {
    const fn = vi.fn();

    render(<Component fn={fn} />);

    await waitFor(() => expect(fn).toHaveBeenCalled());
  });

  it("stop listening when the component unmounts", async () => {
    const fn = vi.fn();
    const { unmount } = render(<Component fn={fn} />);

    unmount();
    fn.mockClear();
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    await new Promise((resolve) => requestAnimationFrame(resolve));

    await waitFor(() => expect(fn).not.toHaveBeenCalled());
  });
});
