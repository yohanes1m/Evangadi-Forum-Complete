import { Route, Routes, useNavigate } from "react-router-dom";
import { React, useState, useEffect, createContext } from "react";
import Login from "./Components/Login/Login";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Answer from "./Pages/Answers/Answer";
import AskQuestion from "./Pages/Question/AskQuestion/AskQuestion";
import Signup from "./Components/SignUp/Signup";
import Header from "./Components/Header/Header";
import Landing from "./Pages/Landing/Landing";
import axiosBase from "./utility/axios";
import About from "./Components/About/About";
export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  async function checkUser() {
    try {
      const { data } = await axiosBase.get("/users/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       setUser(data);
    } catch (error) {
      console.log(error.response?.data?.message || "An error occurred");

      navigate("/");
    }
  }

  useEffect(() => {
    checkUser();
  }, [token]);

  return (
    <>
      <AppState.Provider value={{ user, setUser }}>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/question/:question_id" element={<Answer />} />
          <Route path="/About" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/question" element={<AskQuestion />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
        <Footer />
      </AppState.Provider>
    </>
  );
}

export default App;
