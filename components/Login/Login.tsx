import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setCount, setMessage } from "../../store/reducers/messageReducer";
import { useMutation } from "urql";
import styles from "./Login.module.scss";
import { setUser } from "store/reducers/generalReducer";
import { useRouter } from "next/router";
interface LoginProps {}
const createUserMutation = `
  mutation ($data: createUserInput) {
    createUser(data: $data) {
      name
      phone
    }
  }
`;

function Login({}: LoginProps) {
  const router = useRouter();
  const message = useAppSelector((state) => state.message.message);
  const count = useAppSelector((state) => state.message.count);
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [createUserResult, createUser] = useMutation(createUserMutation);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await createUser({
      data: {
        name,
        phone,
      },
    });
    if (response.data) {
      const fetchedUser = {
        name: response.data.createUser.name,
        phone: response.data.createUser.phone,
      };
      console.log({ fetchedUser });
      dispatch(setUser(fetchedUser));
      router.push("/");
    }
  };
  return (
    <div className={styles.Login}>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
        />
        <input
          name="phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="Phone"
        />
        <button type="submit">submit</button>
      </form>
      <p>{message}</p>
      <button
        onClick={() => {
          console.log("clicked");
          dispatch(setMessage("message changed"));
        }}
      >
        change
      </button>
      <button
        onClick={() => {
          dispatch(setCount(count + 1));
        }}
      >
        {count}
      </button>
    </div>
  );
}

export default Login;
