
require("dotenv").config();
const express = require("express");
const mysql2 = require("mysql2");
const dbConnection = mysql2.createPool({
  user: process.env.USERS,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  host: "localhost",
  // Uncomment and configure socketPath for macOS if needed
  // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
});


const db = dbConnection.promise();

// Define the table creation queries
const userTable = `CREATE TABLE users(
    userid INT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL, lastname VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    PRIMARY KEY(userid)
);`;

const questionTabel = `CREATE TABLE questions(
    id INT(20) NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL,
    userid INT(20) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    tag VARCHAR(20),
    PRIMARY KEY(id),
    UNIQUE KEY (questionid), 
    FOREIGN KEY(userid) REFERENCES users (userid) 
);`;

const answerTable = `CREATE TABLE answers(
    answerid VARCHAR(100) NOT NULL,
    userid INT(20) NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    answer VARCHAR(200) NOT NULL,
    PRIMARY KEY(answerid),
    FOREIGN KEY(questionid) REFERENCES questions (questionid),
    FOREIGN KEY(userid) REFERENCES users (userid) 
);`;


const app = express();
app.use(express.json());

// Endpoint to create tables
app.get("/create-tables", async (req, res) => {
  try {
    // Create the users table
    await db.query(userTable);
    console.log("Users table created or already exists.");

    // Create the questions table
    await db.query(questionTabel);
    console.log("Questions table created or already exists.");

    // Create the answers table
    await db.query(answerTable);
    console.log("Answers table created or already exists.");

    res.status(200).json({
      message: "Tables created successfully!",
    });
  } catch (error) {
    console.error("Error creating tables:", error);
    res.status(500).json({ message: "Error creating tables",
      error: error.message,
    });
  }
});


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


module.exports = db;
