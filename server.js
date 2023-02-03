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
        user: 'tjrelly',
        password: 'mdLzVwxhTwGd1RgMjo4qi9jdg7eFTNQV',
        database: 'smartbrain_dfrt'
    }
});

const app = express();

app.use(bodyParser.json())
app.use(cors())

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, bcrypt, db) })
app.post('/register', (req, res) => { register.handleRegister(req, res, bcrypt, db) })

app.get('/', (req, res) => { res.send("it's working") })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`server is listening on port ${port}`) })

console.log(port)
