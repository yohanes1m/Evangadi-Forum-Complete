const dbconnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");
//post questions
async function postQuestion(req, res) {
  const { title, description } = req.body;
  const userid = req.user.userid;

  //   console.log(questionId);

  //   console.log(userid);
  //   Missing or invalid fields.
  if (!title || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please provide all required fields",
    });
  } 
  try {
    const questionId = uuidv4();
    await dbconnection.query(
      "insert into questions (title,description, userid , questionid) values (?,?,?,?)",
      [title, description, userid, questionId]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Question created successfully" });
  } catch (error) {
    // console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An unexpected error occurred.",
    });
  }
}

// fetch a single question
async function getSingleQuestion(req, res) {
  try {
    const question_id = req.params.question_id;
    const fetchSingleQuestion = `SELECT questions.*, users.username 
                                 FROM questions 
                                 LEFT JOIN users ON questions.userid = users.userid 
                                 WHERE questionid = ? 
                                 `;

    // Fetch data from the database
    const questions = await dbconnection.query(fetchSingleQuestion, [
      question_id,
    ]);

    // Assuming the query result returns an array of results
    return res.status(StatusCodes.OK).json({ questions: questions[0] });
  } catch (error) {
    // Log the full error stack for better debugging
    console.error(error.stack);
    return res
      .status(500)
      .json({ message: "Something went wrong, try again later!" });
  }
}
//get all questions
async function allQuestion(req, res) {
  try {
    const query = `
    SELECT questionid, questions.userid, title, description, users.username, created_at FROM questions 
    JOIN users ON questions.userid = users.userid
    ORDER BY questions.created_at DESC;
`;

    const [results] = await dbconnection.execute(query);
    if (results.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "No questions found.",
      });
    }
    return res.status(StatusCodes.OK).json({
      questions: results.map((question) => ({
        question_id: question.questionid,
        title: question.title,
        content: question.description,
        user_name: question.username,
        created_at: question.created_at,
      })),
    });
  } catch (error) {
    console.log(error);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "An unexpected error occurred." });
  }
}
module.exports = { getSingleQuestion, postQuestion, allQuestion };
