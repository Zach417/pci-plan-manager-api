var TaskType = require('../../models/taskType');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var string = { "type":"string" };

var readFilterSchema = {
  "title": "Task Type Schema",
  "type": "object",
  "properties": {
		"_id": string,
		"name": string,
		"purpose": string,
		"process" : string,
		"outcomes": string,
		"tips": string,
		"reminders": string,
		"taskCategoryId": string,
    "conditionSets": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "conditions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "entity": string,
                "attributes": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "value": string,
                      "comparisonType": string,
                      "value": string,
                    },
                  },
                },
              },
            },
          },
          "steps": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "_id": string,
                "name": string,
                "entity": string,
                "type": string,
                "recursion": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "_id": string,
                      "value": string,
                      "conditions": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "entity": string,
                            "attributes": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "value": string,
                                  "comparisonType": string,
                                  "value": string,
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                "attributes": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "_id": string,
                      "name": string,
                      "value": string,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
		"createdBy": string,
		"createdOn": { "type":"date" },
		"modifiedBy": string,
		"modifiedOn": { "type":"date" },
	},
}

var writeFilterSchema = {
  "title": "Task Type Schema",
  "type": "object",
  "properties": {
		"name": string,
		"purpose": string,
		"process" : string,
		"outcomes": string,
		"tips": string,
		"reminders": string,
		"taskCategoryId": string,
    "conditionSets": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "conditions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "entity": string,
                "attributes": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": string,
                      "comparisonType": string,
                      "value": string,
                    },
                  },
                },
              },
            },
          },
          "steps": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "_id": string,
                "name": string,
                "entity": string,
                "type": string,
                "attributes": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "_id": string,
                      "name": string,
                      "value": string,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
	},
}

function findOne (user, id, callback) {
	TaskType
		.findOne({"_id": id})
		.exec(function (err, result) {
			return callback(result);
		});
}

function findMany (user, callback) {
	TaskType
		.find()
		.sort([['name', 'ascending']])
		.exec(function (err, result) {
    		return callback(result);
    	});
}

module.exports = new RestFilter({
	path : "/task-type",
	model: TaskType,
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
