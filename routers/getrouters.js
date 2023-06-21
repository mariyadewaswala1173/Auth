const express = require("express");    // for authentication
const jwt = require("jsonwebtoken");                // for authentication
const User = require("../database");
const bcrypt = require("bcrypt");                 // to secure password in database
const router = express.Router();

const isAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const decode = jwt.verify(token, "abc");
    req.user = await User.findById(decode._id);
    next();
  } else {
    res.render("login");
  }
};

router.get("/", isAuth, (req, res) => {
  res.render("index", {
    myUser: req.user.username,
  });
});

router.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  // const securePass = await bcrypt.hash(pass,10);

  let data = await User.findOne({ email });
  // console.log(data);
  // console.log(email);
  if (!data) {
    return res.redirect("/signup");
  }
  const isPass = await bcrypt.compare(pass, data.pass);

  if (!isPass) {
    return res.render("login", {
      errorMSG: "Incorrect Password",
    });
  }

  const jwtdata = jwt.sign({ _id: data._id }, "abc");  // here abc is a secret key

  res.cookie("token", jwtdata, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});


module.exports = router;