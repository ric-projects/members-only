const { Router } = require("express");
const signupController = require("../controllers/sign-up");
const renders = require("../controllers/rendering");
// const passport = require("passport");
const auth = require("../controllers/auth");

const mainRouter = Router();

mainRouter.get("/", renders.getMainPage);
mainRouter.get("/sign-up", renders.getSignupPage);

mainRouter.get("/log-in", renders.getLoginPage);
mainRouter.get("/log-out", auth.logoutUser);

mainRouter.post("/sign-up", signupController.addNewUser);
mainRouter.post("/log-in", auth.checkLoginInfo);

module.exports = mainRouter;
