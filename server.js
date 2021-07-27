'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const mongoose = require('mongoose');
const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb://localhost:27017/cats-database', mongooseOptions);
const User = require('./models/User.js');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3333;

const client = jwksClient({
  jwksUri: 'https://dev-3y13wdvq.us.auth0.com/.well-known/jwks.json'
});

function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

app.get('/auth-test', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, function(err, user) {
    if (err) {
      res.send('invalid token - you cannot access this route');
    } else {
      res.json({ 'token': token })
    }
  });
});

//seeding the DB
const test = new User({email: 'test@test.net', books: [ {name: 'Book Name', description: 'Description of Book', status: "what is status?"} ]})
test.save();

app.get('/books', getUserBooks);

function getUserBooks(req, res) {
  User.find({})
    .then(userBooks => {
      console.log(userBooks);
      res.json(userBooks)
    })
};

app.listen(PORT, () => console.log(`listening on ${PORT}`));
