const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const fetch = require("node-fetch");

const register = require("../controllers/register");
const signin = require("../controllers/signin");
const image = require("../controllers/image");
const profile = require("../controllers/profile");

require("dotenv").config();

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, bcrypt, db);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, bcrypt, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res, fetch);
});

app.get("/", (req, res) => {
  res.send(JSON.stringify({ message: "it's working" }));
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
