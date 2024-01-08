import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Layer, Frame } from "src";

function Particle() {
  const [[x, y]] = useState(() => [Math.random(), Math.random()]);
  const [depth] = useState(() => Math.random());

  return (
    <Layer speed={depth}>
      <div
        className="particle"
        style={
          {
            left: `${x * 100}%`,
            top: `${y * 100}%`,
            "--depth": depth,
          } as React.CSSProperties
        }
      />
    </Layer>
  );
}

export default {
  title: "Examples / Performance",
  parameters: {
    layout: "fullscreen",
  },
  render() {
    return (
      <Frame
        style={{ height: "300vh", position: "relative", overflow: "hidden" }}
      >
        {new Array(1000).fill(null).map((_, index) => (
          <Particle key={index} />
        ))}
      </Frame>
    );
  },
} satisfies Meta;

type Story = StoryObj;

export const Default: Story = {};
