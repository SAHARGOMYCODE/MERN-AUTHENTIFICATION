const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const controllers = require("../controllers/user");

const {
  loginRules,
  registerRules,
  validation,
} = require("../middleware/validator");

const isAuth = require("../middleware/passport");

// router.get("/", (req, res) => {
//   res.send("hello world");
// });

//@method POST
//@desc POST A USER
// @PATH  http://localhost:5000/user/register
// @Params  Body
// register
router.post("/register", registerRules(), validation, controllers.register);

//@method POST
//@desc POST A USER
// @PATH  http://localhost:5000/user/login
// @Params  Body
// register
// login
router.post("/login", loginRules(), validation, controllers.login);

//@method POST
//@desc GET A USER
// @PATH  http://localhost:5000/user/current
// @Params  Body
// get current user
router.get("/current", isAuth(), controllers.current);

module.exports = router;
