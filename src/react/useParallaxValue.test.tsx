import { render, waitFor } from "@testing-library/react";
import { useRef } from "react";
import { useParallaxValue } from "src";

const Component = () => {
  const ref = useRef<HTMLDivElement>(null);
  const percentage = useParallaxValue((rate) => Math.round(rate * 100), {
    element: ref,
  });

  return (
    <div ref={ref} style={{ width: "10vw", height: "10vh" }}>
      {percentage}%
    </div>
  );
};

describe("useParallaxValue", () => {
  it("return the initial value", async () => {
    const { container } = render(<Component />);

    await waitFor(() => expect(container.textContent).toBe("0%"));
  });

  it("return the transformed rate", async () => {
    const { container } = render(<Component />);

    window.scrollTo(0, 100);

    await waitFor(() => expect(container.textContent).toBe("13%"));
  });
});
