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

Animate with CSS:

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

To animate imperatively:

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

To define the range within the viewport that the frame should animate through, use the range property. This setup starts the animation when the element enters the bottom edge of the screen and completes it once the center of the frame aligns with the center of the viewport:

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

Additionally, you can utilize the library's built-in range functions to easily define animation boundaries. For more details, refer to the source code in [src/core/ranges.ts](src/core/ranges.ts).