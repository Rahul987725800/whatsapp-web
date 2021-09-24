import { useState } from "react";

export const useRerender = () => {
  const [state, setState] = useState(false);
  const reRerender = () => {
    setState((prev) => !prev);
  };
  return reRerender;
};
