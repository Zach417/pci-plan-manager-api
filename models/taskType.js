var restful = require('node-restful');
var mongoose = restful.mongoose;

var taskTypeSchema = new mongoose.Schema({
	name: String,
    purpose: String,
    process: String,
    outcomes: String,
    tips: String,
    reminders: String,
    taskCategoryId: {
        type: mongoose.Schema.ObjectId,
        ref: 'TaskCategory',
        unique: false,
        dropDups: false,
    },
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

module.exports = restful.model('TaskType', taskTypeSchema);