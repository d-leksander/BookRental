var express = require('express');
var router = express.Router();
var _ = require('lodash');
var { books, users } = require('./database');

router.route('/')
  .post(function (req, res) {
    res.json(books);
  });

router.route('/add')
  .post(function (req, res) {
    const lastBook = _.maxBy(books, o => o.id);
      //const lastBook = 1;
    req.body.id = lastBook.id + 1;
    books.push(req.body);
    res.json(books);
  });

router.route('/del')
  .post(function (req, res) {
    books.splice(req.body.idx, 1);
    res.json(books);
  });

router.route('/edit')
  .post(function (req, res) {
    const idx = _.findIndex(books, o => o.id == req.body.id);
    books.splice(idx, 1, req.body);
    res.json(books);
  });

router.route('/order')
  .post(function (req, res) {
    const book = _.find(books, o => o.id == req.body.bookId);
    book.reservations.push(_.omit(req.body, ['bookId']));
    const user = _.find(users, o => o.name == req.body.user);
    user.reservations.push(_.omit(req.body, ['user']));
    res.json(books);
  });

router.route('/rate')
  .post(function (req, res) {
    const book = _.find(books, o => o.id == req.body.bookId);
    book.rates.push(req.body.rate);
    book.rate = _.mean(book.rates);
    res.json(books);
  });

module.exports = router;
