import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Layer, Frame, Viewport } from "src";
import { Example } from "stories/Example";

export default {
  title: "Docs / Offset",
  argTypes: {
    offset: {
      description: "Delay the animation by a percentage of available range.",
      control: {
        type: "range",
        min: 0,
        max: 1,
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

export const Offset: StoryObj<typeof Layer> = {
  args: { offset: 0.1 },
};
