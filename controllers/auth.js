const passport = require("passport");
const pool = require("../db/pool");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM users WHERE username= $1;`,
        [username]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

exports.checkLoginInfo = (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  });
};
