const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5434,
  user: "keycloak",
  password: "100504",
  database: "keycloak",
});

module.exports = pool;
