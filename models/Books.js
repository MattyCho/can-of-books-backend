'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true}
})

module.exports = mongoose.model('books', bookSchema);
