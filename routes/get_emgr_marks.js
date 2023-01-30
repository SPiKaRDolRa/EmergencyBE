const { Router } = require("express");
const db = require("../db");
const dayjs = require("dayjs");

const router = Router();

router.get("/", (req, res) => {
  let queryAllMarks = "SELECT * FROM emergency_report";

  const tranformRes = (res) => {
    res.map((data) => {
      data.create_at = dayjs(data.create_at).format("YYYY-MM-DD HH:mm:ss");
    });
  };

  db.query(queryAllMarks, (err, result) => {
    if (err) {
      console.log(err.stack);
    }

    tranformRes(result.rows);

    res.json(result.rows);
  });
});

module.exports = router;
