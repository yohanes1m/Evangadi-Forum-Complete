import React from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosBase from "../../utility/axios";
import classes from "./Login.module.css";

const Login = ({ toggleForm }) => {
  const emailDom = useRef();
  const passwordDom = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email  format

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const emailvalue = emailDom.current.value;
    const passwordvalue = passwordDom.current.value;
    if (!emailvalue || !passwordvalue) {
      return alert("Please fill all fields");
    }
    if (!emailRegex.test(emailvalue)) {
      return alert("Please enter a valid email address");
    }
    try {
      const { data } = await axiosBase.post("/users/login", {
        email: emailvalue,
        password: passwordvalue,
      });
      console.log("Login successful");
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed";
      setErrorMessage(errorMsg);
      console.log(errorMsg);
    }
  }

  return (
    <section className={classes.body}>
      <div className={classes.loginContainer}>
        <h1>Login to your account</h1>
        <p>
          Don't have an account?{" "}
          <span
            onClick={() => {
              toggleForm();
            }}
            style={{
              color: "#DA7000",
              cursor: "pointer",
            }}
          >
            Create new account
          </span>
          {/* <Link to="/signup">Create new account</Link> */}
        </p>
        {errorMessage && (
          <span style={{ color: "red", paddingBottom: "10px" }}>
            {errorMessage}
          </span>
        )}
        <form className={classes.loginForm} onSubmit={handleSubmit}>
          <div className={classes.inputContainer}>
            <input
              ref={emailDom}
              type="email"
              placeholder="Email address"
              required
            />
          </div>
          <br />
          <div className={classes.inputContainer}>
            <input
              ref={passwordDom}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <span
              className={classes.togglePassword}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
          <div className={classes.forgotPasswordContainer}>
            <Link to="/forgot-password" className={classes.forgotPassword}>
              Forgot password?
            </Link>
          </div>
          <button type="submit">Login </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
