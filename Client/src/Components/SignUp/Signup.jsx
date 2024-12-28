import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosBase from "../../utility/axios";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
const Signup = ({  toggleForm }) => {
  const [showpassword, setShowpassword] = useState(false);

  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    const userValue = userNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    const firstnameValue = firstNameDom.current.value;
    const lastnameValue = lastNameDom.current.value;
   
    try {
      await axiosBase.post("/users/register", {
        username: userValue,
        email: emailValue,
        password: passwordValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
      });
      alert("User registered successfully. Please login");
      toggleForm()
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed");
    }
  }
  return (
    <section>
      <div className={classes.signcard}>
        <div className="card-body">
          <div className="text-center">
            <b>Join the network</b>
          </div>
          <div className="text-center mb-3">
            Already have an account?{" "}
            <span
              onClick={() => {
               toggleForm();
              }}
              style={{
                color: "#E6A055",
                cursor: "pointer",
              }}
            >
              Login here
            </span>
          </div>
          {errorMessage && (
            <span
              style={{ color: "red", position: "relative", padding: "0 60px" }}
            >
              {errorMessage}
            </span>
          )}
          
          <form onSubmit={handleSubmit}>
            <input
              ref={userNameDom}
              placeholder="Username"
              type="text"
              name="username"
              id=""
              className="form-control"
              required
            />
            <br />
            <div className="row">
              <div class="col-md-6">
                <input
                  ref={firstNameDom}
                  placeholder="Firstname"
                  type="text"
                  name="firstname"
                  id=""
                  className={`form-control ${classes.first_name}`}
                  required
                />
              </div>
              <div class="col-md-6">
                <input
                  ref={lastNameDom}
                  placeholder="Lastname"
                  type="text"
                  name="lastname"
                  id=""
                  className="form-control"
                  required
                />
              </div>
            </div>
            <br />
            <input
              ref={emailDom}
              placeholder="Email Address"
              type="email"
              name="email"
              id=""
              className="form-control"
              required
            />
            <br />
            <div className={classes.password_container}>
              <input
                ref={passwordDom}
                placeholder="Password"
                type={showpassword ? "text" : "password"}
                name="password"
                id=""
                className="form-control"
                required
              />
              <br />
              <div
                className={classes.password}
                onClick={() => setShowpassword((prev) => !prev)}
              >
                {showpassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </div>

            <p>
              I agree to the{" "}
              <Link
                to={"https://www.evangadi.com/legal/privacy/"}
                style={{ color: "#ff8500" }}
              >
                privacy policy{" "}
              </Link>
              and{" "}
              <Link
                to={"https://www.evangadi.com/legal/terms/"}
                style={{ color: "#ff8500" }}
              >
                terms of service
              </Link>
            </p>
            <p>
              <button type="submit" className={classes.btnsignup}>
                Agree and Join
              </button>
            </p>
            <p>
              <Link
                style={{ color: "#ff8500", textDecoration: "none" }}
                to="/"
                onClick={() => {
                 toggleForm();
                }}
              >
                Already have account?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
