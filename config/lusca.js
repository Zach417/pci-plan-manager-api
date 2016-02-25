var lusca = require('lusca');
//var session = require('express-session');

module.exports = function(app) {
/*
	app.use(session({
		secret: 'sUKS7z8YdKT24xSWz5zp',
		cookie: {
			httpOnly: true,
			secure: true
		},
		saveUninitialized: false,
		resave: true
	}));
*/

	app.use(lusca({
	    csrf: false,
	    csp: {
			'default-src': '\'self\''
	    },
	    xframe: 'SAMEORIGIN',
	    p3p: 'ABCDEF',
	    hsts: {
	    	maxAge: 31536000,
	    	includeSubDomains: true, 
	    	reload: true
	    },
	    xssProtection: true
	}));
}