var express = require('express');
var router = express.Router();

var Document = require('../../models/document');

Document.methods(['get', 'put', 'post', 'delete']);
Document.register(router, '/document');

module.exports = router;