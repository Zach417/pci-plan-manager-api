var express = require('express');
var router = express.Router();

var userRole = require('../../models/userRole');

userRole.methods(['get', 'put', 'post', 'delete']);
userRole.register(router, '/userrole');

module.exports = router;