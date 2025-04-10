const { Pool } = require("pg");

module.exports = new Pool({
  database: "members_only",
  // connectionString: process.env.PG_CONN_STRING,
  // ssl:true,
});
