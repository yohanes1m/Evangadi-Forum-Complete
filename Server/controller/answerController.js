const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");

// post answer
const postAnswer = async (req, res) => {
  const { questionid, answer } = req.body;

  if (!questionid || !answer) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please provide answer.",
    });
  }

  try {
    const createdBy = req.user.userid;

    await dbConnection.query(
      "INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)",
      [questionid, createdBy, answer]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Answer posted successfully" });
  } catch (error) {
    console.error("Error posting answer:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An unexpected error occurred.",
    });
  }
};

// Get Answers for a Question
async function getAnswer(req, res) {
  const questionid = req.params.question_id;

  try {
    const [rows] = await dbConnection.query(
      `SELECT 
            a.answerid AS answer_id, 
            a.answer AS content, 
            u.username AS user_name,
            a.created_at
         FROM 
            answers a 
         LEFT JOIN 
            users u ON a.userid = u.userid
         WHERE 
            a.questionid = ? 
            ORDER BY a.created_at DESC`,
      [questionid]
    );

    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question could not be found.",
      });
    }

    return res.status(StatusCodes.OK).json({ answers: rows });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

module.exports = {
  getAnswer,
  postAnswer,
};
