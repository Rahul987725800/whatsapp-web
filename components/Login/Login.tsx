import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useMutation, useQuery } from "urql";
import styles from "./Login.module.scss";
import { setUser } from "store/reducers/generalReducer";
import { useRouter } from "next/router";
interface LoginProps {}
const getUserQuery = `
query($phone: String) {
  getUser(phone: $phone) {
    name
    phone
  }
}
`;
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
  const [firstDummyUserResult] = useQuery({
    query: getUserQuery,
    variables: {
      phone: "88888",
    },
  });
  const [secondDummyUserResult] = useQuery({
    query: getUserQuery,
    variables: {
      phone: "00000",
    },
  });
  const login = async (phone: string, name?: string) => {
    // console.log({ phone, name });
    const response = await createUser({
      data: {
        name: name ? name : phone,
        phone,
      },
    });
    // console.log(response);
    if (response.data) {
      console.log(response.data.createUser);
      dispatch(setUser(response.data.createUser));
      router.push("/");
    }
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    login(phone, name);
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
                login(firstDummyUserResult.data.getUser.phone);
              }}
            >
              {firstDummyUserResult.fetching
                ? "Loading..."
                : firstDummyUserResult.data?.getUser.name}
            </button>
            <button
              className={styles.styledButton}
              onClick={() => {
                login(secondDummyUserResult.data.getUser.phone);
              }}
            >
              {secondDummyUserResult.fetching
                ? "Loading..."
                : secondDummyUserResult.data?.getUser.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
