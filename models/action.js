var restful = require('node-restful');
var mongoose = restful.mongoose;

var actionSchema = new mongoose.Schema({
	name: String,
    pages: [{
        label: String,
        description: String,
        html: String,
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
