import { MutableRefObject, useRef, useState } from "react";
import { useRerender } from "./useRerender";
class SimpleState<T> {
  private state: MutableRefObject<T>;
  private reRender: () => void;
  constructor(initialStateRef: MutableRefObject<T>, reRerender: () => void) {
    this.state = initialStateRef;
    this.reRender = reRerender;
  }
  get value() {
    return this.state.current;
  }
  set value(newState: T) {
    this.state.current = newState;
    this.reRender();
  }
}
export const useSimpleState = <T>(initialState: T) => {
  const reRender = useRerender();
  const initialStateRef = useRef(initialState);
  const stateRef = useRef(new SimpleState(initialStateRef, reRender));
  return stateRef.current;
};
