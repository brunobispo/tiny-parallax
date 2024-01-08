export type ParallaxOptions = {
  offset?: number;
  speed?: number;
  direction?: Direction;
  range?: RangeFunction;
  clamp?: boolean;
};

export interface Rect {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

export interface RangeFunction {
  (viewport: number, element: number): [start: number, end: number];
}

export interface RateHandler {
  (rate: number): void;
}

export type FrameElement = Element;

export type ViewportElement = Element | Window;

export type Direction = "vertical" | "horizontal";
