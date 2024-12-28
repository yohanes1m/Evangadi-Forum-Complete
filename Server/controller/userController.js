const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbConnection = require("../db/dbConfig");

async function signUp(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  //   return res.json({
  //     message: req.body,
  //   });
  
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPasssword = await bcrypt.hash(password, salt);
    if (!username || !firstname || !lastname || !email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          message: "Please provide all required fields",
          error: "bad request",
        });
    }
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password must be at least 8 characters." });
    }

    const [user] = await dbConnection.query(
      "select username, userid from users where username=? or email=?",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "User already registered." });
    }
    await dbConnection.query(
      "insert into users (username,firstname,lastname,email,password) values(?,?,?,?,?)",
      [username, firstname, lastname, email, hashPasssword]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully!" });
  } catch (err) {
    console.log(err);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
}
async function login(req, res) {
  const { email, password } = req.body;

  // check if email and password are provided
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }
  try {
    // Query the database for the user by email
    const [existingUser] = await dbConnection.query(
      "select username, userid, password from users where email = ? ",
      [email]
    );

    // check if user doesn't exist
    if (existingUser.length === 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "unregistered email" });
    }

    // check if password matches
    const isMatch = await bcrypt.compare(password, existingUser[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Incorrect password" });
    }

    const username = existingUser[0].username;
    const userid = existingUser[0].userid;
    const token = jwt.sign({ userid, username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: "Login successful", token, username });
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error, try agian later" });
  }
}

// check user
async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;

  res.status(StatusCodes.OK).json({ message: "Valid User", username, userid });
}

module.exports = { login, signUp, checkUser };
