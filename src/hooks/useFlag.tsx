import { useState, useEffect } from "react";

/**
 * Returns false until value is ever true, then returns true.
 */
export function useFlag(value: boolean): boolean {
  const [state, setState] = useState(value);
  useEffect(() => {
    if (value) {
      setState(true);
    }
  }, [value]);
  return state;
}
