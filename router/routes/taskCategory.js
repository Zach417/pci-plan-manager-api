var TaskCategory = require('../../models/taskCategory');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
    "title": "Task Category Schema",
    "type": "object",
    "properties": {
		"_id": {
			"type":"string",
		},
		"name": {
			"type":"string",
		},
		"icon": {
			"type":"string",
		},
		"description": {
			"type":"string",
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
    "title": "Task Category Schema",
    "type": "object",
    "properties": {
		"name": {
			"type":"string",
		},
		"icon": {
			"type":"string",
		},
		"description": {
			"type":"string",
		},
	},
}

function findOne (user, id, callback) {
	TaskCategory
		.findOne({"_id": id})
		.exec(function (err, result) {
			return callback(result);
		});
}

function findMany (user, callback) {
	TaskCategory
		.find()
		.sort([['name', 'ascending']])
		.exec(function (err, result) {
    		return callback(result);
    	});
}

module.exports = new RestFilter({
	path : "/task-category",
	model: TaskCategory,
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
