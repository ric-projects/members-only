const { Router } = require("express");
const signupController = require("../controllers/sign-up");
const renders = require("../controllers/rendering");
// const passport = require("passport");
const auth = require("../controllers/auth");
const messageHandler = require("../controllers/messageHandler");

const mainRouter = Router();

mainRouter.get("/", renders.getMainPage);
mainRouter.get("/sign-up", renders.getSignupPage);

mainRouter.get("/log-in", renders.getLoginPage);
mainRouter.get("/log-out", auth.logoutUser);

mainRouter.post("/sign-up", signupController.addNewUser);
mainRouter.post("/log-in", auth.checkLoginInfo);

mainRouter.get("/join-the-club", renders.getJoinClubPage);
mainRouter.post("/join-the-club", signupController.changePermissions);

mainRouter.get("/new-msg", renders.newMessagePage);
mainRouter.post("/new-msg", messageHandler.postNewMessage);

mainRouter.get("/delmsg/:msgid", messageHandler.delMessage);

module.exports = mainRouter;
