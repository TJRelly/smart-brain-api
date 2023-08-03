const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt-nodejs")
const cors = require("cors")
const knex = require("knex")
const register = require("./controllers/register.js")
const signin = require("./controllers/signin.js")
const image = require("./controllers/image.js")

require("dotenv").config()

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
})

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send(JSON.stringify({ message: "it's working" }))
})

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db)
})

app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, bcrypt, db)
})
app.post("/register", (req, res) => {
  register.handleRegister(req, res, bcrypt, db)
})

app.put("/image", (req, res) => {
  image.handleImage(req, res, db)
  console.log(req)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})
