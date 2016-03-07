var restful = require('node-restful');
var mongoose = restful.mongoose;

var actionSchema = new mongoose.Schema({
	name: String,
	description: String,
	parameters: [{
	    name: String,
	    type: String,
	    required: Boolean,
	    label: String,
	}],
    actions: [{
		name: String,
		entity: String,
		type: String,
		attributes: mongoose.Schema.Types.Mixed,
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

module.exports = restful.model('Action', actionSchema);
