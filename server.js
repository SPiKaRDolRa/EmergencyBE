const express = require("express");

const app = express();

// const { Client } = require("pg");
// const client = new Client();
// await client.connect();

app.listen(8080, () => console.log("Server running on port 8080 !"));
