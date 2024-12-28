
import React, { useRef, useState } from "react";
import axios from "../Utility/axiosConfig";
import { Link } from "react-router-dom";
import clasees from "./ForgotPassword.module.css";


const ResetPassword = () => {
      const emailDom = useRef();
      const [errorMessage, setErrorMessage] = useState("");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const [isSubmitting, setIsSubmitting] = useState(false)
      const [message, setMessage] = useState("")


      const handleSubmit = async (e) => {
            e.preventDefault()
            const emailValue = emailDom.current.value

            if (!emailValue || !emailRegex.test(emailValue)) {
                  return setErrorMessage("Please enter a valid email address")
            }
            setIsSubmitting(true)
            setErrorMessage("")
            setMessage("")

            try {
                  await axios.post("/users/forgot-password", {
                        email: emailValue
                  })
                  setMessage("Password reset link sent to your email address")
                  emailDom.current.value = ""
                  


            } catch (error) {
                  setErrorMessage(error.response?.data?.message || "Password reset failed")
            } finally {
                  setIsSubmitting(false)
      }}


      return (
            <section>
                  <div className={clasees.forgotPasswordContainer}>
                        <h2>Reset Password</h2>
                        <p>
                              Enter your email address, and we’ll send you a link to reset your password.
                        </p>
                        {message && <p className={clasees.successMessage}>{message}</p>}
                        {errorMessage && <p className={clasees.errorMessage}>{errorMessage}</p>}
                        <form onSubmit={handleSubmit}>
                              <div className={clasees.inputContainer}>
                                    <input
                                          ref={emailDom}
                                          type="email" 
                                          placeholder="Email address"
                                          required
                                          />
                              </div>
                              <button type="submit" disabled={isSubmitting} >
                                    {isSubmitting ? "Sending..." : "Send reset link"}
                              </button>
                        </form>
                        <br />
                        <p>
                              Remembered your password? <Link to="/login">Go back to Login</Link>
                        </p>
                  </div>
            </section>
      )
}

export default ResetPassword