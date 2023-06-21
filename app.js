const express = require("express");
const cookieParser = require("cookie-parser");     // for authentication
const jwt = require("jsonwebtoken");                // for authentication

const path = require("path");
const getrouter = require("./routers/getrouters");
const postrouter = require("./routers/postrouters");
const app = express();

const staticpath = path.join(__dirname,"public");
app.use(express.static(staticpath));  // to import css

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('',postrouter);
app.use('',getrouter);

app.set("view engine", "hbs");



app.listen(1256);

// npm i cookie-parser
// npm i jsonwebtoken
// npm i bcrypt  // for password 