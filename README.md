# react-tiny-parallax

Creating scroll-based animations often involves complex calculations and event handling. The `react-tiny-parallax` library simplifies this process by computing a parallax rate as elements move within the viewport. This rate can be utilized to dynamically adjust styles, enabling fluid and responsive transitions that are easily managed through CSS.

## Live Demo

Experience the capabilities of `react-tiny-parallax` firsthand with our live demo:

[View Demo](https://brunobispo.github.io/react-tiny-parallax)

## Getting Started

To incorporate `react-tiny-parallax` into your project, install the package via npm:

```bash
npm install react-tiny-parallax --save
```

## How to Use

### In a React Application

#### CSS-Based Animation

```jsx
import { Frame, Layer } from "react-tiny-parallax";

const App = () => (
  <Frame>
    <Layer>
      <h1 style={{ opacity: "var(--parallax-rate)" }}>Hello, World!</h1>
    </Layer>
  </Frame>
);
```

This example demonstrates how to animate an element using CSS variables that are dynamically updated by `react-tiny-parallax`.

#### Imperative Animation

```jsx
import { useRef } from "react";
import { Frame, Layer, useParallax } from "react-tiny-parallax";

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
import { Frame, Layer } from "react-tiny-parallax";

const App = () => (
  <Frame>
    <Layer range={(viewport, element) => [0, viewport / 2 + element / 2]}>
      <h1 style={{ opacity: "var(--parallax-rate)" }}>Hello, World!</h1>
    </Layer>
  </Frame>
);
```

For convenience, the library includes predefined range functions to easily set up animation thresholds. For in-depth information, consult the source code at [src/core/ranges.ts](src/core/ranges.ts).
