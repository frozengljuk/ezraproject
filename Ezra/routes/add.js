'use strict';
var express = require('express');
var router = express.Router();

router.get('/add', function (req, res) {
    res.statusCode = 200;
    res.end('added');
});

module.exports = router;
