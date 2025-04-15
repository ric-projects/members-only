const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query(
    `SELECT msg_id, title, date, text, username, full_name FROM messages 
      LEFT OUTER JOIN users ON author_id=user_id;`
  );
  return rows;
}

async function newMessage(title, date, text, author_id) {
  await pool.query(
    `INSERT INTO messages (title, date, text, author_id)
      VALUES ($1, $2, $3, $4);`,
    [title, date, text, author_id]
  );
}

async function delMessage(msg_id) {
  await pool.query(`DELETE FROM messages WHERE id=($1);`, [msg_id]);
}

async function addNewUser(
  full_name,
  username,
  password,
  status = false,
  admin = false
) {
  await pool.query(
    `INSERT INTO users (full_name, username, password, status, admin)
    VALUES ($1, $2, $3, $4, $5);`,
    [full_name, username, password, status, admin]
  );
}

async function changePermissions(user_id, type) {
  switch (type) {
    case "club":
      await pool.query(`UPDATE users SET status=($2) WHERE user_id=($1);`, [
        user_id,
        true,
      ]);
      return;
    case "admin":
      await pool.query(`UPDATE users SET admin=($2) WHERE user_id=($1);`, [
        user_id,
        true,
      ]);
      break;
  }
}

async function postNewMsg(title, text, author_id) {
  const date = new Date();
  await pool.query(
    `INSERT INTO messages (title, date, text, author_id)
    VALUES ($1, $2, $3, $4);`,
    [title, date, text, author_id]
  );
}

async function getAllMessages() {
  const { rows } = await pool.query(
    `SELECT title, date, text, username FROM messages JOIN users ON author_id=user_id;`
  );
  return rows;
}

module.exports = {
  getAllMessages,
  newMessage,
  delMessage,
  addNewUser,
  changePermissions,
  postNewMsg,
  getAllMessages,
};
