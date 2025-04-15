const pool = require("../db/pool");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateMessage = [
  body("title").trim().isAlphanumeric().withMessage(`Invalid chars.`),
  body("msg").trim(),
];

exports.postNewMessage = [
  validateMessage,
  async (req, res) => {
    const { title, msg } = req.body;
    await db.postNewMsg(title, msg, res.locals.currentUser.user_id);
    res.redirect("/");
  },
];

exports.delMessage = async (req, res) => {
  const msg_id = Number(req.params.msgid);
  await db.delMessage(msg_id);
  res.redirect("/");
};
