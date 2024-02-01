import { useContext, useEffect, useState } from "react";
import { RangeFunction, ranges } from "src";
import { FrameContext, ViewportContext } from "src/react/context";

interface RulerProps {
  range?: RangeFunction;
}

function Ruler({ range = ranges.entireInView }: RulerProps) {
  const frame = useContext(FrameContext);
  const [[top, bottom], setPosition] = useState<[number, number]>([0, 0]);
  const viewport = useContext(ViewportContext);
  const viewportElement =
    viewport instanceof Element ? viewport : document.body;

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!frame) return;

      const frameRect = frame.getBoundingClientRect();
      const viewportRect = viewportElement.getBoundingClientRect();

      const [start, end] = range(viewportRect.height, frameRect.height);
      setPosition([
        viewportRect.top + viewportRect.height - end,
        start + window.innerHeight - viewportRect.bottom,
      ]);
    });

    observer.observe(viewportElement);
    if (frame) observer.observe(frame);

    return () => observer.disconnect();
  }, [viewportElement, frame, range]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="ruler" style={{ top, bottom }}></div>;
}

export default Ruler;
