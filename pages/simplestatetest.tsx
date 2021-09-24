import { useSimpleState } from "hooks/useSimpleState";
import faker from "faker";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useRerender } from "hooks/useRerender";
const SimpleStateTestPage: NextPage = () => {
  const count = useSimpleState(0);
  const names = useSimpleState<string[]>([]);
  const reRender = useRerender();
  useEffect(() => {
    console.log("in useEffect count is " + count.value);
    return () => {
      console.log("in cleanup count is " + count.value);
    };
  }, [count.value]);
  useEffect(() => {
    console.log("in useEffect names is " + names.value);
    return () => {
      console.log("in cleanup names is " + names.value);
    };
  }, [names.value]);
  return (
    <div>
      <p>{count.value}</p>
      <button
        onClick={() => {
          count.value++;

          console.log("inside on click", count.value);
        }}
      >
        increment
      </button>
      <button
        onClick={() => {
          // names.value = [...names.value, faker.name.findName()];
          /*
          or we can do
          names.value.push("string")
          names.value = names.value;
          // we must asign the value to update the state
          */
          names.value.push(faker.name.findName());
          // reRender()
          // agr sirf push kiya hai to reRender() call krna pdega
          console.log(names.value);
          count.value++;
          // we need just one assignment
        }}
      >
        add name
      </button>
      {names.value.map((v, i) => (
        <p key={i}>{v}</p>
      ))}
    </div>
  );
};

export default SimpleStateTestPage;
