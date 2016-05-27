var restful = require('node-restful');
var mongoose = restful.mongoose;

var taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  ownerId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    unique: false,
    dropDups: false,
  },
  planId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Plan',
    unique: false,
    dropDups: false,
  },
  taskTypeId: {
    type: mongoose.Schema.ObjectId,
    ref: 'TaskType',
    unique: false,
    dropDups: false,
  },
  dateDue: Date,
  dateCompleted: Date,
  completedBy: String,
  completionComments: String,
  peopleInvolvedComments: String,
  meetings: [{
    id: String
  }],
  documents: [{
    id: String
  }],
  people: [{
    id: String
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

module.exports = restful.model('Task', taskSchema);
