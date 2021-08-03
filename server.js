'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

const Book = require('./modules/book.js');
const User = require('./models/User.js');


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3333;

app.get('/books', Book.getBooks);

app.post('/books', Book.addBook);

app.put('/books', Book.updateBook)

app.delete('/books', Book.deleteBook);

app.use('*', (req, res) => {
  res.status(404).send('Route not found');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
