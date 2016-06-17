var restful = require('node-restful');
var mongoose = restful.mongoose;

var meetingSchema = new mongoose.Schema({
  name: String,
  description: String,
  startTime: Date,
  endTime: Date,
	taskId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Task',
    unique: false,
    dropDups: false,
  },
	planId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Plan',
    unique: false,
    dropDups: false,
  },
  meetingType: String,
  people: [{
    name: String,
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

module.exports = restful.model('Meeting', meetingSchema);
