import { HTMLAttributes, useContext, useState } from "react";
import { FrameContext, OptionsContext } from "src/react/context";
import { ParallaxOptions } from "src/types";
import * as utils from "src/utils";

interface FrameProps extends HTMLAttributes<HTMLDivElement>, ParallaxOptions {}

/**
 * A Frame is a container that can be used to define a coordinate reference for Layer.
 */
export function Frame({
  children,
  offset,
  speed,
  direction,
  range,
  clamp,
  ...htmlAttributes
}: FrameProps) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const optionsCtx = useContext(OptionsContext);
  const options = utils.mergeOptions(optionsCtx, {
    offset,
    speed,
    direction,
    range,
    clamp,
  });

  return (
    <div ref={setRef} {...htmlAttributes}>
      <FrameContext.Provider value={ref}>
        <OptionsContext.Provider value={options}>
          {children}
        </OptionsContext.Provider>
      </FrameContext.Provider>
    </div>
  );
}
