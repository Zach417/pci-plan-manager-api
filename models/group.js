var restful = require('node-restful');
var mongoose = restful.mongoose;

var groupSchema = new mongoose.Schema({
	name: String,
    members: [{
        name: String,
        title: String,
        type: String,
        userId: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			unique: true,
			dropDups: true,
        },
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

module.exports = restful.model('Group', groupSchema);
