var express = require('express');
var _ = require('lodash');
var router = express.Router();
var { users } = require('./database');

var filteredUsers = () => users.map(user => _.omit(user, ['password']));

router.route('/')
  .post(function (req, res) {
    res.json(filteredUsers());
  });

router.route('/add')
  .post(function (req, res) {
    users.push(req.body);
    res.json(filteredUsers());
  });

router.route('/del')
  .post(function (req, res) {
    users.splice(req.body.idx, 1);
    res.json(filteredUsers());
  });

router.route('/edit')
  .post(function (req, res) {
    var idx = req.body.idx;
    delete req.body.idx;
    if (req.body.password === '') {
      delete req.body.password;
    }
    users.splice(idx, 1, req.body);
    res.json(filteredUsers());
  });


module.exports = router;