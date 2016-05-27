var Task = require('../../models/task');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
  "title": "Task Schema",
  "type": "object",
  "properties": {
		"_id": { "type":"string" },
		"name": { "type":"string" },
		"description": { "type":"string" },
		"ownerId" : { "type":"string" },
		"planId": { "type":"string" },
		"taskTypeId": { "type":"string" },
		"dateDue": { "type":"date" },
		"dateCompleted": { "type":"date" },
		"completedBy": { "type":"string" },
		"completionComments": { "type":"string" },
		"peopleInvolvedComments": { "type":"string" },
		"createdBy": { "type":"string" },
		"createdOn": { "type":"date" },
		"modifiedBy": { "type":"string" },
		"modifiedOn": { "type":"date" },
	},
}

var writeFilterSchema = {
  "title": "Task Schema",
  "type": "object",
  "properties": {
		"name": { "type":"string" },
		"description": { "type":"string" },
		"ownerId" : { "type":"string" },
		"planId": { "type":"string" },
		"taskTypeId": { "type":"string" },
		"dateDue": { "type":"date" },
		"dateCompleted": { "type":"date" },
		"completedBy": { "type":"string" },
		"completionComments": { "type":"string" },
		"peopleInvolvedComments": { "type":"string" },
	},
}

function findOne (user, id, callback) {
	Task
		.findOne({"_id": id})
		.where({
			$or: [
				{"planId": {$in : user.plans}},
				{"ownerId": user._id},
				{"createdBy": user._id}
			]
		})
		.exec(function (err, result) {
			return callback(result);
		});
}

function findMany (user, callback) {
	Task
		.find()
		.sort([['dateDue', 'ascending']])
		.where({
			$or: [
				{"planId": {$in : user.plans}},
				{"ownerId": user._id},
				{"createdBy": user._id}
			]
		})
		.exec(function (err, result) {
    		return callback(result);
    	});
}

module.exports = new RestFilter({
	path : "/task",
	model: Task,
	readFilterSchema: readFilterSchema,
	writeFilterSchema: writeFilterSchema,
	findOne: findOne,
	findMany: findMany,
	securityRoles: {
		create: UserSecurity.isActiveUser,
		read: UserSecurity.isActiveUser,
		update: UserSecurity.isActiveUser,
		destroy: UserSecurity.isActiveUser,
	}
});
