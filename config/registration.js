var bcrypt = require('bcrypt-nodejs');

var User = require('../models/user');

function sendAuthorizationFailedJson(res) {
	res.status(401).json({
		success: false,
		message: 'Authentication failed.'
	});
}

module.exports = function (app) {
	app.post('/register', function(req, res) {
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
			if (user) {
				return res.json({
					success: false,
					message: "There is already a user with that email address.",
				});
			} else if (!user) {
				user = new User();
				user.email = email;
				user.password = user.generateHash(password);
				user.token = {};
				user.save(function (err) {
					if (err) {
						console.log(err);
					}
				});

				if (!user.validPassword(password)) {
					return sendAuthorizationFailedJson(res);
				} else {
					var token = user.generateToken();
					res.json({
						success: true,
						message: 'User successfully registered.',
						accessToken: token
					});
				}
			}
		});
	});
}