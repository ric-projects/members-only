const pool = require("../db/pool");
const db = require("../db/queries");

exports.getSignupPage = async (req, res) => {
  res.render("sign-up", {});
};

exports.getMainPage = async (req, res) => {
  const rows = await db.getAllMessages();
  res.render("index", { rows });
};

exports.getLoginPage = (req, res) => {
  res.render("log-in", {});
};

exports.getJoinClubPage = (req, res) => {
  res.render("join-the-club", {});
};

exports.newMessagePage = (req, res) => {
  res.render("new-msg", {});
};
