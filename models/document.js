var restful = require('node-restful');
var mongoose = restful.mongoose;

var documentSchema = new mongoose.Schema({
	name: String,
	description: String,
	ownerId: String,
	planId: String,
	documentType: Number, // Uses "DocumentType" String Map
	tasks: [{
		taskId: String
	}],
	approvals: [{
		approvedBy: String,
		approvedOn: Date
	}],
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

module.exports = restful.model('Document', documentSchema);