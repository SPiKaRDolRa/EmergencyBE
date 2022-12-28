const { Router } = require("express");
const db = require("../db");

const router = Router();

router.get("/", (req, res) => {
  let queryAllMarks = "SELECT * FROM traffic_problem_report";

  db.query(queryAllMarks, (err, result) => {
    if (err) {
      console.log(err.stack);
    }

    res.json(result.rows);
  });
});

module.exports = router;
