require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/routes");
const passport = require("passport");
const session = require("express-session");

app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening: ${PORT}`));
