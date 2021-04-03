const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  const { name, lastName, email, password } = req.body;
  try {
    const newUser = new User({ name, lastName, email, password });
    // pour faire sign up voir si email exist in db,sinn decypter pw and save it
    //before hashing the pw and save it ,check if the email exist(in the error handling say to the user that email exist ,check again if you have done rgister with same email)
    //(express validator checks only if the email exists,the pw)
    //   check if the email exist
    const searchedUser = await User.findOne({ email });
    // si le user exist do return and sort
    if (searchedUser) {
      //bad request
      return res.status(400).send({ msg: "email already exist" });
    }
    // hash password
    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    console.log(hashedPassword);
    newUser.password = hashedPassword;

    // save the user
    const newUserToken = await newUser.save();
    // generate a token
    const payload = {
      _id: newUserToken._id,
      name: newUserToken.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });
    res.status(200).send({
      user: newUserToken,
      msg: "user is saved",
      token: ` Bearer ${token}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "can not save the user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //   find if the user exist
    const searchedUser = await User.findOne({ email });
    // if thhe email not exist
    if (!searchedUser) {
      return res.status(400).send({ msg: "bad Credential" });
    }
    // sinn check password are equals(comparer entre pw envoyé par user et pw hashed(encrypted))throgh bcrypt
    const match = await bcrypt.compare(password, searchedUser.password);
    //si match not true ,il m'envoi bad credential sinn send the user
    if (!match) {
      return res.status(400).send({ msg: "bad Credential" });
    }
    // generate a token
    const payload = {
      _id: searchedUser._id,
      name: searchedUser.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });
    //si les passwords sont equals send  the user
    res
      .status(200)
      .send({ user: searchedUser, msg: "success", token: ` Bearer ${token}` });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "can not get the user" });
  }
};

exports.current = (req, res) => {
  res.status(200).send({ user: req.user });
};
