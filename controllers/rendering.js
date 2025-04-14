const pool = require("../db/pool");
const db = require("../db/queries");

exports.getSignupPage = async (req, res) => {
  res.render("sign-up", {});
};

exports.getMainPage = async (req, res) => {
  res.render("index", {});
};

exports.getLoginPage = (req, res) => {
  res.render("log-in", {});
};
