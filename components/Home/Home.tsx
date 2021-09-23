import React from "react";
import styles from "./Home.module.scss";
interface HomeProps {}
function Home({}: HomeProps) {
  return <div className={styles.Home}>Home Changed</div>;
}

export default Home;
