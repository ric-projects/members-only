require("dotenv").config();
const { Client } = require("pg");

console.log(`User is: ` + process.env.USER);

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  full_name VARCHAR(255),
  username VARCHAR(255),
  password VARCHAR(255),
  status BOOLEAN NOT NULL,
  admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages (
  msg_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR (255),
  date TIMESTAMP,
  text VARCHAR (255),
  author_id INTEGER NOT NULL
);

ALTER TABLE messages
  ADD CONSTRAINT Fk_author_id
  FOREIGN KEY(author_id)
  REFERENCES users(user_id)
  ON UPDATE CASCADE
  ON DELETE SET NULL;

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    // connectionString: process.env.PG_CONN_STRING,
    // ssl:true,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}
main();
