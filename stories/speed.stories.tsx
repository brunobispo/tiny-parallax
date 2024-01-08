import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Layer, Frame, Viewport } from "src";
import { Example } from "stories/Example";

export default {
  title: "Docs / Speed",
  argTypes: {
    speed: {
      description: "Reduce the speed of the animation by a percentage.",
      control: {
        type: "range",
        min: 0,
        max: 2,
        step: 0.01,
      },
    },
  },
  render(args) {
    return (
      <Viewport className="viewport">
        <Frame className="frame">
          <Layer>
            <Example />
          </Layer>
          <Layer {...args}>
            <Example />
          </Layer>
        </Frame>
      </Viewport>
    );
  },
} satisfies Meta<ComponentProps<typeof Layer>>;

export const Speed: StoryObj<typeof Layer> = {
  args: { speed: 0.2 },
};
