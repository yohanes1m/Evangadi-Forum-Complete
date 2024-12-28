const express = require("express");

const router = express.Router();

// question controller

const {
  getSingleQuestion,
  postQuestion,
  allQuestion,
} = require("../controller/questionController");

// post question
router.post("/", postQuestion);

// get all question
router.get("/", allQuestion);

// router.post("/ask-question", askQuestion);

// get single question

router.get("/:question_id", getSingleQuestion);

module.exports = router;
