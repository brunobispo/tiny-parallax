import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Layer, Frame, ranges, Viewport } from "src";
import { Example } from "stories/Example";
import Ruler from "stories/Ruler";

export default {
  title: "Docs / Ranges",
  render(args) {
    return (
      <Viewport className="viewport">
        <Frame className="frame">
          <Ruler {...args} />
          <Layer {...args}>
            <Example />
          </Layer>
        </Frame>
      </Viewport>
    );
  },
} satisfies Meta<ComponentProps<typeof Layer>>;

export const PredefinedRanges: StoryObj<typeof Layer> = {
  args: {
    range: ranges.inView,
  },
  argTypes: {
    range: {
      description: "The range of the animation.",
      control: {
        type: "select",
      },
      options: Object.keys(ranges).filter(
        (key) => key !== "frameRef" && key !== "viewportRef"
      ),
      mapping: ranges,
      table: {
        defaultValue: { summary: "inView" },
      },
    },
  },
};

export const FrameRef: StoryObj<{ enter: number; exit: number }> = {
  args: {
    enter: 0.5,
    exit: 0.5,
  },
  argTypes: {
    enter: {
      description:
        "The percentage of the element that must enter the viewport for the animation to start.",
      control: {
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    exit: {
      description:
        "The percentage of the element that must leave the viewport for the animation to end.",
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
          <Ruler range={ranges.frameRef(args.enter, args.exit)} />
          <Layer range={ranges.frameRef(args.enter, args.exit)}>
            <Example />
          </Layer>
        </Frame>
      </Viewport>
    );
  },
};

export const ViewportRef: StoryObj<{ threshold: number; pivot: number }> = {
  args: {
    threshold: 0.3,
    pivot: 0.5,
  },
  argTypes: {
    threshold: {
      description: "The percentage of the viewport to complete the animation.",
      control: {
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    pivot: {
      description: "The point of the element to be aligned in the viewport.",
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
          <Layer range={ranges.viewportRef(args.threshold, args.pivot)}>
            <Ruler range={ranges.viewportRef(args.threshold, args.pivot)} />
            <Example />
          </Layer>
        </Frame>
      </Viewport>
    );
  },
};
