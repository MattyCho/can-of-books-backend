'use strict';

const mongoose = require('mongoose');
// const bookSchema = require('./Books.js');

const bookSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String}
})

const userSchema = new mongoose.Schema({
  email: {type: String},
  books: [bookSchema]
})

module.exports = mongoose.model('users', userSchema);
