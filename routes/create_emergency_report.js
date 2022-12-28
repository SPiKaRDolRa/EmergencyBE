const { Router } = require("express");
const bodyParser = require("body-parser");
const db = require("../db");

const router = Router();
router.use(bodyParser.json());

router.post("/", (req, res) => {
  const bodyReport = req.body;
  let insertEmergencyReport = `INSERT INTO emergency_report (victim_vehicle, has_parties, party_vehicle, accident_info, lnt, lng, img)
                               VALUES('${bodyReport.victimVechicle}', ${bodyReport.hasParties}, '${bodyReport.partyVehicle}', '${bodyReport.accidentInfo}', ${bodyReport.lnt}, ${bodyReport.lng}, '${bodyReport.img}')`;

  db.query(insertEmergencyReport, (err, result) => {
    if (err) {
      console.log(err.stack);
    }

    res.send("success insert emergency report!");
  });
});

module.exports = router;
