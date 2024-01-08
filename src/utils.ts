import { Direction, Rect } from "src/types";

export function getStart(rect: Rect, direction: Direction) {
  switch (direction) {
    case "vertical":
      return rect.bottom;
    case "horizontal":
      return rect.right;
  }
}

export function getEnd(rect: Rect, direction: Direction) {
  switch (direction) {
    case "vertical":
      return rect.top;
    case "horizontal":
      return rect.left;
  }
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function mergeOptions<T extends object, D extends object>(
  options: T,
  defaults: D
) {
  const present = Object.fromEntries(
    Object.entries(options).filter(([, value]) => value !== undefined)
  ) as T;
  return { ...defaults, ...present };
}
