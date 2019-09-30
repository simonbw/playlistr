import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * A hook to do something on every animation frame while the component is mounted.
 */
export function useAnimationFrame(
  callback: (elapsedTime: number) => void,
  isActive: boolean = true
) {
  const savedCallback = useRef<(elapsedTime: number) => void>(callback);
  const animationFrameHandle = useRef<number>(0);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  function loop() {
    if (savedCallback.current) {
      savedCallback.current(1 / 60); // TODO: Actual elapsed time
    }
    animationFrameHandle.current = window.requestAnimationFrame(loop);
  }

  useLayoutEffect(() => {
    if (!isActive) {
      return;
    }
    animationFrameHandle.current = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(animationFrameHandle.current);
  }, [isActive]);
}
