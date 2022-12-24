const express = require("express");
const testRoute = require("./routes/test-route");

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World! From GCP");
});

app.use("/test-route", testRoute);

app.app.listen(8080, () => console.log(`Server running on port ${port} !`));
