var restful = require('node-restful');
var mongoose = restful.mongoose;

var stringMapSchema = new mongoose.Schema({
	name: String,
	description: String,
	options: [{
		value: String,
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

module.exports = restful.model('StringMap', stringMapSchema);