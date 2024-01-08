import { createContext } from "react";
import { FrameElement, ParallaxOptions, ViewportElement } from "src/types";

export const FrameContext = createContext<FrameElement | null>(null);
export const ViewportContext = createContext<ViewportElement | null>(null);
export const OptionsContext = createContext<ParallaxOptions>({});
