import React, { useState } from "react";
import styles from "./Login.module.scss";
interface LoginProps {}
function Login({}: LoginProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(phone);
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
      </form>
    </div>
  );
}

export default Login;
