import type { Meta } from "@storybook/react";
import { useRef } from "react";
import { Frame, useParallax } from "src";
import videoSrc from "./video.mp4";

function Player() {
  const video = useRef<HTMLVideoElement>(null);

  useParallax((rate) => {
    if (video.current?.duration)
      video.current.currentTime = rate * video.current.duration;
  });

  return (
    <video
      ref={video}
      style={{ width: "100%" }}
      src={videoSrc}
      autoPlay
      playsInline
      onCanPlay={() => video.current?.pause()}
    />
  );
}

export default {
  title: "Examples / Video",
  parameters: {
    layout: "fullscreen",
  },
  render() {
    return (
      <main style={{ paddingBlock: "100vh" }}>
        <Frame>
          <Player />
        </Frame>
      </main>
    );
  },
} satisfies Meta;

export const Video = {};
