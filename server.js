const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image')
const profile = require('./controllers/profile')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});

const app = express();

app.use(bodyParser.json())
app.use(cors())

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, bcrypt, db) })
app.post('/register', (req, res) => { register.handleRegister(req, res, bcrypt, db) })

app.get('/', (req, res) => { res.send(database.users) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

const DATABASE_URL = process.env.DATABASE_URL
app.listen(DATABASE_URL, () => { console.log(`server is listening on port ${DATABASE_URL}`) })

console.log(DATABASE_URL)
