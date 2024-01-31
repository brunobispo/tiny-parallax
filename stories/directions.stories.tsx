import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Layer, Frame, Viewport } from "src";
import { Example } from "stories/Example";

export default {
  title: "Docs / Directions",
} satisfies Meta<ComponentProps<typeof Layer>>;

export const Vertical: StoryObj<typeof Layer> = {
  render() {
    return (
      <Viewport className="viewport" direction="vertical">
        <Frame className="frame">
          <Layer>
            <Example />
          </Layer>
        </Frame>
      </Viewport>
    );
  },
};

export const Horizontal: StoryObj<typeof Layer> = {
  render() {
    return (
      <Viewport className="viewport horizontal" direction="horizontal">
        <Frame className="frame">
          <Layer>
            <Example />
          </Layer>
        </Frame>
      </Viewport>
    );
  },
};
