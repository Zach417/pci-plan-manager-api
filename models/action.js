var restful = require('node-restful');
var mongoose = restful.mongoose;

var parameterSchema = new mongoose.Schema({
    name: String,
    type: String,
    required: Boolean,
    label: String,
});

var attributeSchema = new mongoose.Schema({
    name: String,
    value: mongoose.Schema.Types.Mixed,
});

var stepSchema = new mongoose.Schema({
	name: String,
	entity: String,
	type: String,
	attributes: [attributeSchema],
});

var actionSchema = new mongoose.Schema({
	name: String,
	description: String,
	parameters: [parameterSchema],
    steps: [stepSchema],
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
