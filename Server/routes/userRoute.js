const express = require("express");
const router = express.Router();

// authentication middleware
const authMiddleware = require("../middleWare/authMiddleware");

const { login, signUp, checkUser } = require("../controller/userController");

router.post("/register", signUp);

// login user
router.post("/login", login);

// check user
router.get("/check", authMiddleware, checkUser);

module.exports = router;
