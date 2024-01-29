import { RefObject, useContext, useEffect } from "react";
import {
  FrameContext,
  OptionsContext,
  ViewportContext,
} from "src/react/context";
import { FrameElement, ParallaxOptions, ViewportElement } from "src";
import { Parallax } from "src/core/Parallax";
import * as utils from "src/utils";

export interface UseParallaxOptions extends ParallaxOptions {
  viewport?: ViewportElement;
  element?: FrameElement | RefObject<FrameElement> | null;
}

/**
 * Calculates the parallax rate of an element
 * and calls the provided function with the rate.
 *
 * @param fn - A function that is called with the calculated rate.
 * @param options - Options that configure the parallax calculation.
 */
export function useParallax(
  fn: (rate: number) => void,
  optionsArgs: UseParallaxOptions = {}
) {
  const optionsCtx = useContext(OptionsContext);
  const options = utils.mergeOptions(optionsCtx, optionsArgs);
  const frameCtx = useContext(FrameContext);
  const viewportCtx = useContext(ViewportContext);
  const viewport = options.viewport ?? viewportCtx ?? undefined;

  useEffect(() => {
    const element =
      options.element && "current" in options.element
        ? options.element.current
        : options.element ?? frameCtx;

    if (element) {
      const parallax = new Parallax(fn, viewport, element, options);
      return () => parallax.remove();
    }
  }, [options, options.element, frameCtx, viewport]); // eslint-disable-line react-hooks/exhaustive-deps
}
