import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FaUserAlt } from "react-icons/fa";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { MdNavigateNext } from "react-icons/md";
import axios from "../../../utility/axios";
import { Link, useNavigate } from "react-router-dom";
import classes from "./AllQuestions.module.css";

function AllQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // To handle redirects if token is missing

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios({
          url: `/question`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);

        setQuestions(response?.data?.questions);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch questions.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [token, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Placeholder or spinner while data is loading
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there was a problem fetching data
  }

  return (
    <>
      {questions?.map((question) => (
        <Link
          to={`/question/${question.question_id}`}
          key={question.questionid}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className={classes.groupEach_Questions}>
            <div className={classes.each_Questions}>
              <div className={classes.question}>
                {/* Profile icon with circular border */}
                <div className={classes.profile}>
                  <FaUserAlt />
                </div>
                <div className={classes.question_title}>{question.title}</div>
              </div>

              {/* Navigation arrow */}
              <MdNavigateNext
                style={{
                  fontSize: "24px", // Corrected textSize to fontSize
                  fontWeight: "bold", // Changed font to fontWeight
                  marginRight: "20px",
                  transition: "all 0.5s ease", // Simplified transition
                }}
              />
            </div>
            <p>{question?.user_name}</p>
          </div>
        </Link>
      ))}
    </>
  );
}

export default AllQuestions;
