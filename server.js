import express from "express"
import json from "body-parser"
import bcrypt from "bcrypt-nodejs"
import cors from "cors"
import knex from "knex"

import handleRegister from "./controllers/register.js"
import handleSignIn from "./controllers/signin.js"
import handleApiCall from "./controllers/image.js"
import handleImage from "./controllers/image.js"
import handleProfile from "./controllers/profile.js"

require("dotenv").config()

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
})

const app = express()

app.use(json())
app.use(cors())

app.post("/signin", (req, res) => {
  handleSignIn(req, res, bcrypt, db)
})

app.post("/register", (req, res) => {
  handleRegister(req, res, bcrypt, db)
})

app.post("/imageurl", (req, res) => {
  handleApiCall(req, res)
})

app.get("/", (req, res) => {
  res.send(JSON.stringify({ message: "it's working" }))
})

app.get("/profile/:id", (req, res) => {
  handleProfile(req, res, db)
})

app.put("/image", (req, res) => {
  handleImage(req, res, db)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})
