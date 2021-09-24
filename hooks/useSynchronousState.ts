import { MutableRefObject, useRef, useState } from "react";

export const useSynchronousState = <T>(
  initialState: T | (() => T)
): [T, (newState: T | ((arg0: T) => T)) => void, MutableRefObject<T>] => {
  const [state, setState] = useState(initialState);
  const stateRef = useRef<T>(
    typeof initialState === "function"
      ? (initialState as () => T)()
      : initialState
  );

  const setSyncState = (newState: T | ((arg0: T) => T)) => {
    if (typeof newState === "function") {
      const result = (newState as (arg0: T) => T)(stateRef.current);
      stateRef.current = result;
      // stateRef.current must be assigned before setState
      setState(result);
      return result;
    } else {
      // here it is
      stateRef.current = newState;
      setState(newState);
      return newState;
    }
  };
  return [state, setSyncState, stateRef];
};
