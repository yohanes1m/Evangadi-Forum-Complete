const express = require("express");
const { getAnswer, postAnswer } = require("../controller/answerController");
const router = express.Router();



router.post("/", postAnswer)
// Get Answers for a Question
router.get("/:question_id", getAnswer);

module.exports = router;
