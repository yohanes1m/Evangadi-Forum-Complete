import React, { useContext, useState } from "react";
import About from "../../Components/About/About";
import Login from "../../Components/Login/Login";
import Signup from "../../Components/SignUp/Signup";
import styles from "./Landing.module.css";
import { AppState } from "../../App";

const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [transitionDirection, setTransitionDirection] =
    useState("slide-in-right");
 
  const toggleForm = () => {
    if (isLogin) {
      setTransitionDirection("slide-out-left");
      setTimeout(() => {
        setIsLogin(false);
        setTransitionDirection("slide-in-right");
      }, 300);
    } else {
      setTransitionDirection("slide-out-right");
      setTimeout(() => {
        setIsLogin(true);
        setTransitionDirection("slide-in-left");
      }, 300);
    }
  };

  return (
    <div className={styles.outer_container}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div
            className={`${styles.left_inner} ${styles[transitionDirection]}`}
          >
            {isLogin ? (
              <Login  toggleForm={toggleForm} />
            ) : (
              <Signup  toggleForm={toggleForm} />
            )}
          </div>
        </div>
        <div className={styles.right}>
          <About />
        </div>
      </div>
    </div>
  );
};

export default Landing;
