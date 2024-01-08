import { RangeFunction } from "src/types";

/**
 * Creates a range function that maps the element and viewport sizes to a range.
 * @param enter The percentage of the element that must enter the viewport for the animation to start.
 * @param exit The percentage of the element that must leave the viewport for the animation to end.
 */
export function frameRef(enter: number, exit = enter): RangeFunction {
  return (viewport, element) => [
    element * enter,
    viewport + element * (1 - exit),
  ];
}

/**
 * Creates a range function that maps the element and viewport sizes to a range.
 * @param threshold The percentage of the viewport to complete the animation.
 * @param pivot The point of the element to be aligned in the viewport.
 */
export function viewportRef(threshold: number, pivot = 0): RangeFunction {
  return (viewport, element) => [0, viewport * threshold + element * pivot];
}

/*
 * Starts the animation when the frame starts to enter the viewport
 * and completes when the frame leaves the viewport completely.
 */
export const inView = viewportRef(1, 1);

/*
 * Starts the animation when the frame enters the viewport and is fully visible,
 * and completes when the frame begins to leave the viewport.
 */
export const entireInView = frameRef(1);

/*
 * Starts the animation once the frame starts to enter the viewport,
 * and completes when the center of the frame reaches the center of the viewport
 */
export const middle = viewportRef(0.5, 0.5);

/*
 * Starts the animation once the frame starts to enter the viewport,
 * and completes when the top of the frame reaches the top of the viewport
 */
export const top = viewportRef(1, 0);

/*
 * Starts the animation once the frame starts to enter the viewport,
 * and completes when the bottom of the frame reaches the bottom of the viewport
 */
export const bottom = viewportRef(0, 1);
