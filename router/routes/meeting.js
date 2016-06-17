var Model = require('../../models/meeting');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
  "title": "Plan Schema",
  "type": "object",
  "properties": {
		"_id": { "type":"string" },
		"name": { "type":"string" },
		"description": { "type":"string" },
		"startTime": { "type":"date" },
		"endTime": { "type":"date" },
		"meetingType": { "type":"string" },
		"taskId": { "type":"string" },
		"planId": { "type":"string" },
    "people": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
    		  "name": { "type":"string" },
        },
      },
    },
		"createdBy": { "type":"string" },
		"createdOn": { "type":"date" },
		"modifiedBy": { "type":"string" },
		"modifiedOn": { "type":"date" },
	},
}

var writeFilterSchema = {
  "title": "Plan Schema",
  "type": "object",
  "properties": {
    "name": { "type":"string" },
		"description": { "type":"string" },
		"startTime": { "type":"date" },
		"endTime": { "type":"date" },
		"meetingType": { "type":"string" },
		"taskId": { "type":"string" },
		"planId": { "type":"string" },
    "people": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
    		  "name": { "type":"string" },
        },
      },
    },
	},
}

function findOne (user, id, callback) {
	Model
		.findOne({"_id": id})
		.where({
      $or: [
        {"planId": { $in : user.plans }},
				{"createdBy": user._id}
      ]
    })
		.exec(function (err, result) {
			return callback(result);
		});
}

function findMany (user, callback) {
	Model
		.find()
		.sort([['name', 'ascending']])
		.where({
      $or: [{
        {"planId": { $in : user.plans }},
				{"createdBy": user._id}
      }]
    })
		.exec(function (err, result) {
			return callback(result);
		});
}

module.exports = new RestFilter({
	path : "/document",
	model: Model,
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
