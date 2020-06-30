var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/books', require('./books'));

module.exports = router;