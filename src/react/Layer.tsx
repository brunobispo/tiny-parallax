import { HTMLAttributes, useContext, useState } from "react";
import { ParallaxOptions, useParallax } from "src";
import { FrameContext, OptionsContext } from "src/react/context";
import * as utils from "src/utils";

interface LayerProps extends ParallaxOptions, HTMLAttributes<HTMLDivElement> {
  cssVariable?: string;
}

export function Layer({
  children,
  offset,
  speed,
  clamp,
  direction,
  range,
  cssVariable = "--parallax-rate",
  style,
  ...htmlAttrs
}: LayerProps) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const frameCtx = useContext(FrameContext);
  const optionsCtx = useContext(OptionsContext);
  const options = utils.mergeOptions(optionsCtx, {
    offset,
    speed,
    direction,
    range,
    clamp,
  });

  useParallax(
    (rate) => {
      if (ref) ref.style.setProperty(cssVariable, rate.toString());
    },
    {
      offset,
      speed,
      clamp,
      direction,
      range,
      element: frameCtx ?? ref ?? undefined,
    }
  );

  return (
    <div ref={setRef} style={{ display: "contents", ...style }} {...htmlAttrs}>
      <OptionsContext.Provider value={options}>
        {children}
      </OptionsContext.Provider>
    </div>
  );
}
