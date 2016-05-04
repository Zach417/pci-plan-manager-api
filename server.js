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
require('./config/resetPassword') (app);

app.use('/', require('./router'));


switch (process.env.NODE_ENV) {
  case 'development':
    console.log('Magic happens on port 8080');
    return app.listen(8080);

  case 'production':
    console.log('Magic happens on port 80');
    return app.listen(80);

  default:
    console.log('NODE_ENV not set. Defaulting to production settings.');
    console.log('Magic happens on port 80');
    return app.listen(80);
}
