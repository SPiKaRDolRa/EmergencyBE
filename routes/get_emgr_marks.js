const { Router } = require("express");
const db = require("../db");

const router = Router();

router.get("/", (req, res) => {
  let queryAllMarks = "SELECT * FROM emergency_report";

  db.query(queryAllMarks, (err, result) => {
    if (err) {
      console.log(err.stack);
    }

    res.json(result.rows);
  });
});

module.exports = router;
