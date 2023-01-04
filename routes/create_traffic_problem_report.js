const { Router } = require("express");
const bodyParser = require("body-parser");
const db = require("../db");

const router = Router();
router.use(bodyParser.json());

router.post("/", (req, res) => {
  const bodyReport = req.body;
  let insertTrafficProblemReport = `INSERT INTO traffic_problem_report (problem_category, other_info, lnt, lng, img, create_at)
                               VALUES('${bodyReport.problemCategory}', '${bodyReport.otherInfo}', ${bodyReport.lnt}, ${bodyReport.lng}, '${bodyReport.img}', '${bodyReport.img}', '${bodyReport.createAt}')`;

  db.query(insertTrafficProblemReport, (err, result) => {
    if (err) {
      console.log(err.stack);
    }

    res.send("success insert traffic problem report report!");
  });
});

module.exports = router;
