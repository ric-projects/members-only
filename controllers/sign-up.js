const pool = require("../db/pool");
const db = require("../db/queries");

exports.addNewUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.addNewUser(req.body.username, hashedPassword);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
