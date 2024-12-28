import React, { useState, useEffect, useContext } from "react";
import logo from "../../assets/Images/logo.png";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utility/axios";
import { AppState } from "../../App";
const Header = () => {
  const {user,setUser} = useContext(AppState);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({});
    navigate("/");
  };
  return (
    <div className={styles.HeaderContainer}>
      <div className={styles.HeaderWrapper}>
        <div className={styles.logo}>
          <Link to={token ? `/home` : `/`}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className={styles.RightWrapper}>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="#">How it works</Link>
            </li>
            <li onClick={handleLogout}>
              <button className={styles.logout} onClick={handleLogout}>
                {token ? "Logout" : "Sign Up"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
  );
};

export default Header;
