const { Pool } = require("pg");

const pool = new Pool({
  user: "sos_02",
  host: "34.87.159.210",
  database: "postgres",
  password: "DF@fHVt(P+oQp>5_",
  port: "5432",
});

// Test connect pg
pool.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
