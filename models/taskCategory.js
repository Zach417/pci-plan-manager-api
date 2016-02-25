var restful = require('node-restful');
var mongoose = restful.mongoose;

var taskCategorySchema = new mongoose.Schema({
	name: String,
	icon: String,
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

module.exports = restful.model('TaskCategory', taskCategorySchema);
