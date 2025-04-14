const { Router } = require("express");
const signupController = require("../controllers/sign-up");
const renders = require("../controllers/rendering");
const passport = require("passport");
const auth = require("../controllers/auth");

const mainRouter = Router();

mainRouter.get("/", renders.getMainPage);
mainRouter.get("/sign-up", renders.getSignupPage);

mainRouter.get("/log-in", renders.getLoginPage);

mainRouter.post("/sign-up", signupController.addNewUser);
// MOVING TO A CONTROLLER
mainRouter.post("/log-in", auth.checkLoginInfo);

// mainRouter.post(
//   "/log-in",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/log-in",
//   })
// );

module.exports = mainRouter;
