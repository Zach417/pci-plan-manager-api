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
    "planSponsorName": { "type":"string" },
  	"assetValue": { "type":"number" },
    "planStartDate": { "type":"date" },
    "participantEntryFrequency": { "type":"string" }, //Annual, semi-annual, quarterly
    "employerContributions": { "type":"boolean" },
    "employerContributionSchedule": { "type":"string" }, //Pay Period, Plan Year
    "isSafeHarbor": { "type":"boolean" },
    "allowsLoans": { "type":"boolean" },
    "isAuditable": { "type":"boolean" },
    "isInvestmentDelegated": { "type":"boolean" },
    "investmentDelegationType": { "type":"string" }, // 3(21), 3(38)
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
  	"planType": { "type":"string" },
  	"description": { "type":"string" },
    "planSponsorName": { "type":"string" },
  	"assetValue": { "type":"number" },
    "planStartDate": { "type":"date" },
    "participantEntryFrequency": { "type":"string" }, //Annual, semi-annual, quarterly
    "employerContributions": { "type":"boolean" },
    "employerContributionSchedule": { "type":"string" }, //Pay Period, Plan Year
    "isSafeHarbor": { "type":"boolean" },
    "allowsLoans": { "type":"boolean" },
    "isAuditable": { "type":"boolean" },
    "isInvestmentDelegated": { "type":"boolean" },
    "investmentDelegationType": { "type":"string" }, // 3(21), 3(38)
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
