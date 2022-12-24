const express = require("express");

const { Client } = require("pg");
const client = new Client();
await client.connect();
