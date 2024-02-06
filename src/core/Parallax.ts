import type {
  FrameElement,
  ParallaxOptions,
  RateHandler,
  Rect,
  ViewportElement,
} from "src/types";
import * as ranges from "src/core/ranges";
import * as utils from "src/utils";

const elementParallax = new WeakMap<FrameElement, Set<Parallax>>();
const viewportElement = new WeakMap<ViewportElement, Set<FrameElement>>();
const rects = new WeakMap<ViewportElement, Rect>();
const animationFrames = new WeakMap<FrameElement, number>();

export class Parallax {
  public config: Required<ParallaxOptions>;

  /**
   * Creates a new parallax instance.
   *
   * @param fn The function to call with the rate.
   * @param viewport The viewport element.
   * @param element The element to parallax.
   * @param options The parallax options.
   */
  constructor(
    public fn: RateHandler,
    public viewport: ViewportElement = window,
    public element: FrameElement,
    options: ParallaxOptions = {}
  ) {
    this.config = utils.mergeOptions(options, {
      offset: 0,
      clamp: true,
      direction: "vertical",
      range: ranges.inView,
      speed: 1,
    });

    if (!viewportElement.has(this.viewport)) {
      this.viewport.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    const elements = viewportElement.get(this.viewport) ?? new Set();
    elements.add(this.element);
    viewportElement.set(this.viewport, elements);

    const parallaxes = elementParallax.get(this.element) ?? new Set();
    parallaxes.add(this);
    elementParallax.set(this.element, parallaxes);

    calculateElement(this.element);
    calculateViewport(this.viewport);
    this.update();
  }

  /**
   * Removes the parallax instance.
   */
  remove() {
    const elements = viewportElement.get(this.viewport);
    const parallaxes = elementParallax.get(this.element);

    parallaxes?.delete(this);

    if (parallaxes?.size === 0 && elements) {
      elements.delete(this.element);
      if (elements.size === 0) {
        viewportElement.delete(this.viewport);
        this.viewport.removeEventListener("scroll", handleScroll);
      }
    }
  }

  /**
   * Updates the parallax instance.
   */
  update() {
    const viewportRect = rects.get(this.viewport);
    const frameRect = rects.get(this.element);

    if (!viewportRect || !frameRect) return;

    const { range, offset, speed, clamp, direction } = this.config;
    const viewportStart = utils.getStart(viewportRect, direction);
    const viewportEnd = utils.getEnd(viewportRect, direction);
    const elementStart = utils.getStart(frameRect, direction);
    const elementEnd = utils.getEnd(frameRect, direction);

    const [start, end] = range(
      Math.abs(viewportEnd - viewportStart),
      Math.abs(elementEnd - elementStart)
    );

    const inRange = viewportStart - elementEnd - start;
    const rangeSize = end - start;
    const stageRate = inRange / rangeSize;

    let rate = (stageRate - offset) * speed;
    if (clamp) rate = utils.clamp(rate, 0, 1);

    this.fn(rate);
  }
}

/**
 * Handles scroll events
 */
function handleScroll(event: Event) {
  const viewport = event.currentTarget as ViewportElement;
  const elements = viewportElement.get(viewport);

  for (const element of elements ?? []) calculateElement(element);
  calculateViewport(viewport);
  animate(viewport);
}

/**
 * Calculates the element's size and position.
 */
function calculateElement(element: FrameElement) {
  rects.set(element, element.getBoundingClientRect());
}

/**
 * Calculates the viewport's size and position.
 */
function calculateViewport(viewport: ViewportElement) {
  if (viewport instanceof Element) {
    rects.set(viewport, viewport.getBoundingClientRect());
  } else {
    rects.set(viewport, {
      top: 0,
      left: 0,
      bottom: document.documentElement.clientHeight,
      right: document.documentElement.clientWidth,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  }
}

/**
 * Animates all parallax elements in the viewport.
 */
function animate(viewport: ViewportElement) {
  const viewportRect = rects.get(viewport);
  const elements = viewportElement.get(viewport);

  if (!viewportRect) return;

  for (const element of elements ?? []) {
    const animation = animationFrames.get(element);
    if (animation) cancelAnimationFrame(animation);

    animationFrames.set(
      element,
      requestAnimationFrame(() => {
        const parallaxes = elementParallax.get(element);
        for (const parallax of parallaxes ?? []) parallax.update();
      })
    );
  }
}
