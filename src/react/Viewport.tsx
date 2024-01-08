import { HTMLAttributes, useContext, useState } from "react";
import { ParallaxOptions } from "src";
import { OptionsContext, ViewportContext } from "src/react/context";
import * as utils from "src/utils";

interface ViewportProps
  extends HTMLAttributes<HTMLDivElement>,
    ParallaxOptions {}

/**
 * A Viewport is a container that can be used to define a coordinate reference for Layer.
 */
export function Viewport({
  children,
  offset,
  speed,
  direction,
  range,
  clamp,
  ...htmlAttributes
}: ViewportProps) {
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
      <ViewportContext.Provider value={ref}>
        <OptionsContext.Provider value={options}>
          {children}
        </OptionsContext.Provider>
      </ViewportContext.Provider>
    </div>
  );
}
