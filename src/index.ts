import * as ranges from "src/core/ranges";
import { Parallax } from "src/core/Parallax";
import { Layer } from "src/react/Layer";
import { Frame } from "src/react/Frame";
import { useParallax } from "src/react/useParallax";
import { type UseParallaxOptions } from "src/react/useParallax";
import { useParallaxValue } from "src/react/useParallaxValue";
import { Viewport } from "src/react/Viewport";

import type {
  Direction,
  FrameElement,
  ParallaxOptions,
  RangeFunction,
  RateHandler,
  Rect,
  ViewportElement,
} from "src/types";

export type {
  Direction,
  FrameElement,
  ParallaxOptions,
  RangeFunction,
  RateHandler,
  Rect,
  ViewportElement,
  UseParallaxOptions,
};

export {
  Parallax,
  ranges,
  Frame,
  Layer,
  useParallax,
  useParallaxValue,
  Viewport,
};
