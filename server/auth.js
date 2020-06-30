var express = require('express');
var _ = require('lodash');
var router = express.Router();
var { users, books } = require('./database');

var filteredUser = user => _.omit(user, ['password']);

router.route('/login')
  .post(function (req, res) {
    const user = _.find(users, o => o.name == req.body.name && o.password == req.body.password);
    if (!user) {
      res.status(500).send('User don\'t exist. You may enter wrong user bname or password.');
    } else res.json(filteredUser(user));
  });

router.route('/logout')
  .post(function (req, res) {
    res.json({});
  });

router.route('/register')
  .post(function (req, res) {
    if (!req.body.name || !req.body.password) {
      res.status(500).send('You must enter username and password.');
      return;
    }
    const user = {
      name: req.body.name,
      password: req.body.password
    };
    users.push(user);
    res.json(filteredUser(user));
  });

router.route('/edit')
  .post(function (req, res) {
    const index = _.findIndex(users, o => o.name == req.body.name);
    users[index] = req.body;
    res.json(filteredUser(users[index]));
  });

router.route('/info')
  .post(function (req, res) {
    const index = _.findIndex(users, o => o.name == req.body.name);
    res.json(filteredUser(users[index]));
  });

router.route('/cancel')
  .post(function (req, res) {
    const book = _.find(books, o => o.id == req.body.bookId);
    const bookResIdx = _.findIndex(book.reservations, o => o.user == req.body.user);
    book.reservations.splice(bookResIdx, 1);
    const user = _.find(users, o => o.name == req.body.user);
    const userResIdx = _.findIndex(user.reservations, o => o.bookId == req.body.bookId);
    user.reservations.splice(userResIdx, 1);
    res.json(filteredUser(user));
  });

module.exports = router;