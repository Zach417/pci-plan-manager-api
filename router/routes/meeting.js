var express = require('express');
var router = express.Router();

var Meeting = require('../../models/meeting');

Meeting.methods(['get', 'put', 'post', 'delete']);
Meeting.register(router, '/meeting');

module.exports = router;