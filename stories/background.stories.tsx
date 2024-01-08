import type { Meta } from "@storybook/react";
import { Frame, Layer } from "src";
import imageSrc from "./image.jpg";

export default {
  title: "Examples / Background",
  parameters: {
    layout: "fullscreen",
  },
  render() {
    return (
      <main style={{ paddingBlock: "100vh" }}>
        <Frame>
          <Layer>
            <div style={{ height: "30rem", overflow: "hidden" }}>
              <img
                alt="Random image"
                src={imageSrc}
                style={{
                  height: "60rem",
                  transform:
                    "translateY(calc((1 - var(--parallax-rate)) * -15rem))",
                }}
              />
            </div>
          </Layer>
        </Frame>
      </main>
    );
  },
} satisfies Meta;

export const Background = {};
