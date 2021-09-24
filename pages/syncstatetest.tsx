import { useSynchronousState } from "hooks/useSynchronousState";
import React from "react";

function Syncstatetest() {
  const [count, setCount, syncCount] = useSynchronousState(() => 5);

  return (
    <div>
      <h1>async {count}</h1>
      <h1>sync {syncCount.current}</h1>
      <button
        onClick={() => {
          const returnValue = setCount(count + 1);
          console.log({
            count,
            syncCount: syncCount.current,
            returnValue,
          });
        }}
      >
        increment
      </button>
      <button
        onClick={() => {
          setCount((prev) => prev - 1);
        }}
      >
        decrement
      </button>
    </div>
  );
}

export default Syncstatetest;
