

import React from "react";
import styles from "./about.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutContent}>
          <h2 className={styles.aboutTitle}>About</h2>
          <h1 className={styles.networkTitle}>Evangadi Networks</h1>
          <p className={styles.aboutDescription}>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>
          <p className={styles.aboutDescription}>
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <button className={styles.createAccount}>
            <Link to="/"> CREATE A NEW ACCOUNT  </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default About;



