var express = require('express');
var router = express.Router();

var StringMap = require('../../models/stringmap');

StringMap.methods(['get', 'put', 'post', 'delete']);
StringMap.register(router, '/stringmap');

module.exports = router;