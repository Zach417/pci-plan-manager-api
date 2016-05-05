var Plan = require('../../models/plan');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
  "title": "Plan Schema",
  "type": "object",
  "properties": {
		"_id": { "type":"string" },
		"name": { "type":"string" },
		"planType": { "type":"string" },
		"description": { "type":"string" },
    "duties": {
      "type": "object",
      "properties": {
        "investment": {
          "type": "object",
          "properties": {
      		  "isDelegated": { "type":"boolean" },
        		"delegationType": { "type":"string" },
          },
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
  	"_id": { "type":"string" },
  	"name": { "type":"string" },
  	"planType": { "type":"string" },
  	"description": { "type":"string" },
    "duties": {
      "type": "object",
      "properties": {
        "investment": {
          "type": "object",
          "properties": {
      		  "isDelegated": { "type":"boolean" },
        		"delegationType": { "type":"string" },
          },
        },
      },
    },
	},
}

function findOne (user, id, callback) {
	Plan
		.findOne({"_id": id})
		.where({$or: [{"_id": {$in : user.plans}}]})
		.exec(function (err, result) {
			return callback(result);
		});
}

function findMany (user, callback) {
	Plan
		.find()
		.sort([['name', 'ascending']])
		.where({$or: [{"_id": {$in : user.plans}}]})
		.exec(function (err, result) {
			return callback(result);
		});
}

module.exports = new RestFilter({
	path : "/plan",
	model: Plan,
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
