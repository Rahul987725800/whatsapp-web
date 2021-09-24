import React, { useEffect, useState } from "react";
export const useLocalStorageState = <T>(
  initialState: T | (() => T),
  key: string
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) {
      setState(JSON.parse(jsonValue));
    }
  }, [key]);

  useEffect(() => {
    const jsonValue = JSON.stringify(state);
    localStorage.setItem(key, jsonValue);
  }, [key, state]);

  return [state, setState];
};
