import { useContext } from "react";
import { AppState } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import AllQuestions from "../Question/AllQuestions/AllQuestions";
import classes from "./Home.module.css";

function Home() {
  const { user } = useContext(AppState);
  console.log(user.username);
  
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
  }
  return (
    <div className={classes.outerContainer}>
      <div>
        <div className={classes.container}>
          <div className={classes.askQuestion}>
            <div>
              <Link to="/question">
                <button
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "#fff",
                    fontWeight: "bold",
                    padding: "8px 16px",
                    borderRadius: "5px",
                  }}
                >
                  Ask Question
                </button>
              </Link>
            </div>
            <h3 className={classes.welcome}>
              Welcome:
              <span style={{ fontWeight: "bold" }}> {user?.username}</span>
            </h3>
          </div>
          <div>
            <input
              type="text"
              placeholder="search question"
              style={{
                width: "100%",
                border: "1px solid gray",
                borderRadius: "2px",
                padding: "5px",
                marginTop: "20px",
              }}
            />
          </div>
          <AllQuestions />
        </div>
      </div>
    </div>
  );
}

export default Home;
