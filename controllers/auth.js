const passport = require("passport");
// const pool = require("../db/pool");
// const LocalStrategy = require("passport-local").Strategy;
// const session = require("express-session");

exports.checkLoginInfo = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
});

exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
