const { Router } = require("express");
const signupController = require("../controllers/sign-up");
const renders = require("../controllers/rendering");

const mainRouter = Router();

mainRouter.get("/", renders.getMainPage);
mainRouter.get("/sign-up", renders.getSignupPage);

mainRouter.post("/sign-up", signupController.addNewUser);

module.exports = mainRouter;
