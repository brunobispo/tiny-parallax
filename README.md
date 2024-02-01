# tiny-parallax

Creating scroll-based animations often involves complex calculations and event handling. The `tiny-parallax` library simplifies this process by computing a parallax rate as elements move within the viewport. This rate can be utilized to dynamically adjust styles, enabling fluid and responsive transitions that are easily managed through CSS.

## Live Demo

Experience the capabilities of `tiny-parallax` firsthand with our live demo:

[View Demo](https://brunobispo.github.io/tiny-parallax)

## Getting Started

To incorporate `tiny-parallax` into your project, install the package via npm:

```bash
npm install tiny-parallax --save
```

## How to Use

### In a React Application

#### CSS-Based Animation

```jsx
import { Frame, Layer } from "tiny-parallax";

const App = () => (
  <Frame>
    <Layer>
      <h1 style={{ opacity: "var(--parallax-rate)" }}>Hello, World!</h1>
    </Layer>
  </Frame>
);
```

This example demonstrates how to animate an element using CSS variables that are dynamically updated by `tiny-parallax`.

#### Imperative Animation

```jsx
import { useRef } from "react";
import { Frame, Layer, useParallax } from "tiny-parallax";

const Video = () => {
  const video = useRef();

  useParallax((rate) => {
    if (video.current.duration)
      video.current.currentTime = rate * video.current.duration;
  });

  return (
    <video
      ref={video}
      src="https://assets.allsamplefiles.com/mp4/ns/60s/sample-file-sd.mp4"
    />
  );
};

const App = () => (
  <Frame>
    <Video />
  </Frame>
);
```

This example showcases an imperative approach to animation, where the current time of a video is controlled by the parallax rate.

## Ranges

To specify the range within the viewport in which the frame should animate, utilize the `range` property. For instance, the setup below initiates the animation when the element enters the bottom of the screen and concludes it when the center of the frame aligns with the viewport's center:

```jsx
import { Frame, Layer } from "tiny-parallax";

const App = () => (
  <Frame>
    <Layer range={(viewport, element) => [0, viewport / 2 + element / 2]}>
      <h1 style={{ opacity: "var(--parallax-rate)" }}>Hello, World!</h1>
    </Layer>
  </Frame>
);
```

For added convenience, the library offers a selection of predefined range functions that simplify the process of establishing animation boundaries. To delve deeper into these functions, examine the source code found at [src/core/ranges.ts](src/core/ranges.ts).
Explore the [Ranges storybook](https://brunobispo.github.io/tiny-parallax?path=/story/docs-ranges--predefined-ranges&args=range:inView) for a visual guide and a better grasp of the predefined ranges.
