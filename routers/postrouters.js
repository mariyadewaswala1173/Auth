const express = require("express");    // for authentication
const jwt = require("jsonwebtoken");                // for authentication
const User = require("../database");              // to connect with database
const bcrypt = require("bcrypt");                 // to secure password in database
const router = express.Router();


router.post("/signup", async (req, res) => {
    const { username,email, pass } = req.body;
  
    const securePass = await bcrypt.hash(pass,10);
  
    let data = await User.findOne({ email });
    if (data) {
      return res.redirect("/login");
    }
    
  
    data = await User.create({ username,email, pass : securePass });
  
    const jwtdata = jwt.sign({ _id: data._id }, "abc");
  
    res.cookie("token", jwtdata, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 1000),
    });
    res.redirect("/");
  });
  
module.exports = router;