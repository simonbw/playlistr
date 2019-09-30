import React, { useState, useEffect } from "react";
import "../";
import classNames from "classnames";

interface Props {
  interval?: number;
  initial?: number;
}

export default function Ellipses({ interval = 1000, initial = 0 }: Props) {
  const [phase, setPhase] = useState(initial);

  useEffect(() => {
    const intervalHandle = setInterval(
      () => setPhase(phase => (phase + 1) % 4),
      interval
    );
    return () => clearInterval(intervalHandle);
  }, [interval]);

  return (
    <span className="Ellipsis">
      <span className={classNames({ active: phase >= 1 })}>.</span>
      <span className={classNames({ active: phase >= 2 })}>.</span>
      <span className={classNames({ active: phase >= 3 })}>.</span>
    </span>
  );
}
