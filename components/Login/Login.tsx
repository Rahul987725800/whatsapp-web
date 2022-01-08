import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useMutation } from "urql";
import styles from "./Login.module.scss";
import { setUser } from "store/reducers/generalReducer";
import { useRouter } from "next/router";
interface LoginProps {}

const createUserMutation = `
  mutation ($data: createUserInput) {
    createUser(data: $data) {
      _id
      name
      phone
      profile {
        _id
        about
        profilePhotoUrl
        status
        userId
      }
    }
  }
`;

function Login({}: LoginProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [createUserResult, createUser] = useMutation(createUserMutation);
  const login = async (name: string, phone: string) => {
    const response = await createUser({
      data: {
        name: name !== "" ? name : phone,
        phone,
      },
    });
    if (response.data) {
      console.log(response.data.createUser);
      dispatch(setUser(response.data.createUser));
      router.push("/");
    }
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    login(name, phone);
  };
  return (
    <div className={styles.Login}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.formInput}
            name="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            placeholder="Phone*"
          />
          <input
            className={styles.formInput}
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name (Optional)"
          />

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.styledButton}>
              Submit
            </button>
          </div>
        </form>
        <div className={styles.testInfo}>
          <p>If you want to test, you can login with dummy user</p>
          <div className={styles.buttons}>
            <button
              className={styles.styledButton}
              onClick={() => {
                login("dummy 1", "88888");
              }}
            >
              dummy 1
            </button>
            <button
              className={styles.styledButton}
              onClick={() => {
                login("dummy 2", "00000");
              }}
            >
              dummy 2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
