var bcrypt = require('bcrypt-nodejs');

var User = require('../models/user');

function sendAuthorizationFailedJson(res) {
	res.status(401).json({
		success: false,
		message: 'Authentication failed.'
	});
}

module.exports = function (app) {
	// authenticate and assign tokens at /authenticate
	app.post('/login', function(req, res) {
		var email = req.headers['email'];
		var password = req.headers['password'];

		if (!email || !password) {
			return sendAuthorizationFailedJson(res);
		}

		User.findOne({
			"email": email
		}, function(err, user) {
			if (err) {
				throw err;
			}
			if (!user) {
				return sendAuthorizationFailedJson(res);
			} else if (user) {
				if (!user.validPassword(password)) {
					return sendAuthorizationFailedJson(res);
				} else {
					user.generateToken(function (token) {
						res.json({
							success: true,
							message: 'Authentication succeeded.',
							accessToken: token
						});
					});
				}
			}
		});
	});

	// verify token or send invalid authorization
	app.use('/api', function(req, res, next) {
		var email = req.headers['email'];
		var token = req.headers['access-token'];

		if (!email || !token) {
			return sendAuthorizationFailedJson(res);
		}

		User.getUserFromEmail(email, function(user) {
			if (!user) {
				return sendAuthorizationFailedJson(res);
			}

			console.log(user.isValidToken(token));

			if (user.isValidToken(token)) {
				next();
			} else {
				return sendAuthorizationFailedJson(res);
			}
		});
	});
}
