var TaskType = require('../../models/taskType');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
    "title": "Task Type Schema",
    "type": "object",
    "properties": {
		"_id": {
			"type":"string",
		},
		"name": {
			"type":"string",
		},
		"purpose": {
			"type":"string",
		},
		"process" : {
			"type":"string",
		},
		"outcomes": {
			"type":"string",
		},
		"tips": {
			"type":"string",
		},
		"reminders": {
			"type":"string",
		},
		"taskCategoryId": {
			"type":"string",
		},
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
                "entity": {
                  "type": "string",
                },
                "attributes": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type":"string"
                      },
                      "value": {
                        "type":"string"
                      },
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
                "_id": {
                  "type": "string",
                },
                "name": {
                  "type": "string",
                },
                "entity": {
                  "type": "string",
                },
                "type": {
                  "type": "string",
                },
                "attributes": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "_id": {
                        "type": "string",
                      },
                      "name": {
                        "type": "string",
                      },
                      "value": {
                        "type": "string",
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
    "title": "Task Type Schema",
    "type": "object",
    "properties": {
		"name": {
			"type":"string",
		},
		"purpose": {
			"type":"string",
		},
		"process" : {
			"type":"string",
		},
		"outcomes": {
			"type":"string",
		},
		"tips": {
			"type":"string",
		},
		"reminders": {
			"type":"string",
		},
		"taskCategoryId": {
			"type":"string",
		},
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
                "entity": {
                  "type": "string",
                },
                "attributes": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type":"string"
                      },
                      "value": {
                        "type":"string"
                      },
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
                "_id": {
                  "type": "string",
                },
                "name": {
                  "type": "string",
                },
                "entity": {
                  "type": "string",
                },
                "type": {
                  "type": "string",
                },
                "attributes": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "_id": {
                        "type": "string",
                      },
                      "name": {
                        "type": "string",
                      },
                      "value": {
                        "type": "string",
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
