const express = require("express");

const createEmergencyReport = require("./routes/create_emergency_report");
const createTrafficProblemReport = require("./routes/create_traffic_problem_report");
const getEmgrMarks = require("./routes/get_emgr_marks");
const getTfprMarks = require("./routes/get_tfpr_mark");

const app = express();
const port = 8080;

app.use("/get-emgr-marks", getEmgrMarks);
app.use("/get-tfpr-marks", getTfprMarks);
app.use("/create-emergency-report", createEmergencyReport);
app.use("/create-traffic-problem-report", createTrafficProblemReport);

app.listen(8080, () => console.log(`Server running on port ${port} !`));
