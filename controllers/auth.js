const passport = require("passport");

exports.checkLoginInfo = passport.authenticate("local", {
  successRedirect: "/",
  failureMessage: true,
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
