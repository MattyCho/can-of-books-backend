'use strict';

const getKey = require('../lib/getKey.js');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const Book = {};

Book.getBooks = async (req, res) => {
  const email = req.query.email;

  await User.find({ email }, (err, user) => {
    if (err) {
      res.send('invalid user')
    } else {
      res.send(user[0].books);
    }
  })
}

Book.addBook = async (req, res) => {
  const { email, name, description, status, img } = req.body;
  const newBook = { name, description, status};

  await User.findOne({ email }, (err, user) => {
    if (user) {
      user.books.push(newBook);
      user.save().then(() => {
        res.send(user.books)
      })
    } else {
      let newUser = new User({ email, books: {name, description, status}})
      newUser.save()
      .then(user => res.json(user.books))
      .catch(err => console.error(err))
    }
  })
}

Book.deleteBook = async (req, res) => {
  const id = req.query.id;
  const email = req.query.email;
  await User.findOne({ email }, (err, user) => {
    const filtered = user.books.filter(book => book.id !== id);
    user.books = filtered;
    user.save();
    res.send(filtered);
  })
}

Book.updateBook = async (req, res) => {
  const id = req.query.id;
  const email = req.query.email;
  const newName = req.query.name
  const newDescription = req.query.description
  const newStatus = req.query.status
  console.log('update route');
  console.log(id);
  console.log(email);
  console.log(newName);
  console.log(newDescription);
  console.log(newStatus);

  await User.findOne({ email }, (err, user) => {
    const bookArr = user.books.map((book, i) => {
      console.log(book._id);
      return book._id == id ? book = { _id: id, name: newName, description: newDescription, status: newStatus } : book;
    });

    console.log(bookArr);
    user.books = bookArr;
    user.save();
    res.send(bookArr);
  });
}

module.exports = Book;
