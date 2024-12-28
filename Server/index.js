const express = require("express");

const app = express();

const port = 5500;

// cors middleware
const cors = require("cors");
app.use(cors());
const env = require("dotenv").config();
//db connection

const dbconnection = require("./db/dbConfig");

// authentication middleware

const authMiddleware = require("./middleWare/authMiddleware");

// json middleware to extract json data
app.use(express.json());

// user routes middleware file

const userRoutes = require("./routes/userRoute");

// user routes middleware
app.use("/api/users", userRoutes);

// question route file
const questionsRoutes = require("./routes/questionRoute");
// question route middleware

app.use("/api/question", authMiddleware, questionsRoutes);
// answer middleware file
const answerRoute = require("./routes/answerRoute");
// answer route middleware
app.use("/api/answer", authMiddleware, answerRoute);

// starter function
async function start() {
  try {
    const result = await dbconnection.execute("select 'test'");
    await app.listen(port);
    console.log("database connection established");
    console.log(`listening on port ${port}`);
  } catch (error) {
    console.log(error);
  }
}
start();
