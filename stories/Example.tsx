import { useParallaxValue } from "src";

export function Example() {
  const rate = useParallaxValue((rate) => Math.round(rate * 100));
  return (
    <div className="example">
      {rate}%
      <div className="card" />
    </div>
  );
}
