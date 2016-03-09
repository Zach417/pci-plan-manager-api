var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect("mongodb://172.31.16.142/planmanager");

app.use(function (req, res, next) {
    console.log(req.method + req.path);
	next();
});

require('./config/passport')(app);
require('./config/lusca') (app);
require('./config/bodyParser') (app);

require('./config/authentication') (app);
require('./config/registration') (app);

app.use('/', require('./router'));

app.listen(80); // Production
//app.listen(8080); // Development
console.log('Magic happens on port 80');
