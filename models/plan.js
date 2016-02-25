var restful = require('node-restful');
var mongoose = restful.mongoose;

var planSchema = new mongoose.Schema({
	id: String,
    name: String,
    planType: String,
	namedFiduciary: {
		groupId: {
			type: mongoose.Schema.ObjectId,
			ref: 'Group',
			unique: false,
			dropDups: false,
		},
	},
    description: String,
	createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        unique: false,
        dropDups: false,
    },
    createdOn: Date,
	modifiedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        unique: false,
        dropDups: false,
    },
    modifiedOn: Date,
});

module.exports = restful.model('Plan', planSchema);
