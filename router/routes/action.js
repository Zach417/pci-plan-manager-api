var Action = require('../../models/action');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
    "title": "Plan Schema",
    "type": "object",
    "properties": {
		"_id": {
			"type":"string",
		},
		"name": {
			"type":"string",
		},
		"pages": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "label": {
                        "type": "string",
                    },
                    "description": {
                        "type": "string",
                    },
                    "html": {
                        "type": "string",
                    },
                },
            },
		},
		"createdBy": {
			"type":"string",
		},
		"createdOn": {
			"type":"date",
		},
		"modifiedBy": {
			"type":"string",
		},
		"modifiedOn": {
			"type":"date",
		},
	},
}

var writeFilterSchema = {
    "title": "Plan Schema",
    "type": "object",
    "properties": {
        "name": {
            "type":"string",
        },
        "pages": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "label": {
                        "type": "string",
                    },
                    "description": {
                        "type": "string",
                    },
                    "html": {
                        "type": "string",
                    },
                },
            },
        },
	},
}

function findOne (user, id, callback) {
	Action
		.findOne({"_id": id})
		.exec(function (err, result) {
			return callback(result);
		});
}

function findMany (user, callback) {
	Action
		.find()
		.sort([['name', 'ascending']])
		.exec(function (err, result) {
			return callback(result);
		});
}

module.exports = new RestFilter({
	path : "/action",
	model: Action,
	readFilterSchema: readFilterSchema,
	writeFilterSchema: writeFilterSchema,
	findOne: findOne,
	findMany: findMany,
	securityRoles: {
		create: UserSecurity.isAdmin,
		read: UserSecurity.isActiveUser,
		update: UserSecurity.isAdmin,
		destroy: UserSecurity.isAdmin,
	}
});
