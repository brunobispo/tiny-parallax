import type { Meta } from "@storybook/react";
import { ReactNode } from "react";
import { Frame, Layer, RangeFunction, useParallaxValue } from "src";

const Header = (props: { children: ReactNode }) => {
  // initiates stick animation when the frame aligns with the viewport's top edge and continue until it's 100 pixels above the visible area
  const stickRange: RangeFunction = (v) => [v, v + 100];

  // triggers the leave animation when the frame bottom edge is 50px from the viewport's top edge
  const leaveRange: RangeFunction = (v, e) => [v + e - 50, v + e - 50];

  const hasBegin = useParallaxValue((rate) => rate > 0, { range: stickRange });
  const hasEnd = useParallaxValue((rate) => rate === 1, { range: stickRange });
  const hasLeft = useParallaxValue((rate) => rate === 1, { range: leaveRange });

  return (
    <Layer range={stickRange} cssVariable="--stick-rate">
      <div style={{ height: "10rem" }}>
        <div
          style={{
            top: 0,
            width: "100%",
            paddingInline: "3rem",
            marginInline: "-3rem",
            position: hasBegin ? "fixed" : "relative",
            backgroundColor: hasEnd ? "white" : "transparent",
            transform: hasLeft ? `translateY(-100%)` : undefined,
            transition:
              "background-color 0.2s ease-out, transform 0.2s ease-out",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: `calc(13em - var(--stick-rate, 0) * 7rem)`,
            }}
          >
            {props.children}
          </h2>
        </div>
      </div>
    </Layer>
  );
};

export default {
  title: "Examples / Sticky",
  parameters: {
    layout: "fullscreen",
  },
  render() {
    return (
      <main style={{ margin: "3rem" }}>
        {Array.from({ length: 3 }, (_, index) => (
          <Frame key={index}>
            <Header>Lorem {index}</Header>

            {Array.from({ length: 5 }, (_, index) => (
              <p key={index}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                ac risus nec odio aliquet aliquet. Sed sit amet nisl vel nisl
                ultricies cursus. Sed auctor, lectus vitae ultrices ultrices,
                nisl nunc ultricies diam, vitae commodo nunc magna quis purus.
                Nulla facilisi. Sed ut dolor ut odio gravida aliquam. Nullam
                quis velit euismod, luctus odio eget, aliquet neque. Cras
                tincidunt, tortor ut aliquam aliquet, velit risus molestie
                massa, non tincidunt nibh odio eget nunc. Duis quis nisl
                tristique, lacinia ex eget, aliquam eros. Donec vitae
                sollicitudin nisl. Donec et magna vitae nisl luctus
                sollicitudin. Quisque et nisl vitae nisl viverra congue. Donec
                auctor, felis sed ultrices ultrices, velit nisl ultrices nunc,
                sit amet ultricies eros nisl sed est. Sed id nunc euismod,
                imperdiet velit eu, fringilla leo. Nullam id quam non nisl
                aliquet ultricies. Nullam et eros eu eros ultrices aliquam.
                Donec ac risus nec odio aliquet aliquet. Sed sit amet nisl vel
                nisl ultricies cursus. Sed auctor, lectus vitae ultrices
                ultrices, nisl nunc ultricies diam, vitae commodo nunc magna
                quis purus. Nulla facilisi. Sed ut dolor ut odio gravida
                aliquam. Nullam quis velit euismod, luctus odio eget, aliquet
                neque. Cras tincidunt, tortor ut aliquam aliquet,
              </p>
            ))}
          </Frame>
        ))}
      </main>
    );
  },
} satisfies Meta;

export const Sticky = {};
