import { useState } from "react";
import { UseParallaxOptions, useParallax } from "src";

export function useParallaxValue<T>(
  fn: (rate: number) => T,
  options?: UseParallaxOptions
): T {
  const [value, setValue] = useState(() => fn(0));
  useParallax((rate) => setValue(fn(rate)), options);
  return value;
}
