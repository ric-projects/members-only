const pool = require("../db/pool");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const validatePassword = [
  body("fullName").trim().isAlpha().withMessage(`Invalid chars.`).escape(),
  body("username").trim().isEmail().withMessage(`Invalid email.`).escape(),
  body("password")
    .trim()
    .isAlphanumeric()
    .isLength({ min: 3 })
    .withMessage(`Password is less than 3 chars.`)
    .escape(),
  body("passwordConf")
    .trim()
    .isAlphanumeric()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Passwords do not match.`)
    .escape(),
];

exports.addNewUser = [
  validatePassword,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.error(errors);
      return res.status(400).send({ errors: errors.array() });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.addNewUser(
      req.body.fullName,
      req.body.username,
      hashedPassword,
      req.body.isAdmin
    );
    res.redirect("/");
  },
];

exports.changePermissions = async (req, res) => {
  if (req.body.pass === "cats" && res.locals.currentUser.status === false) {
    await db.changePermissions(res.locals.currentUser.user_id, "club");
  }
  res.redirect("/");
};
