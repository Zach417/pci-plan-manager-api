var restful = require('node-restful');
var mongoose = restful.mongoose;

var attributeSchema = new mongoose.Schema({
  name: String,
  comparisonType: String,
  value: mongoose.Schema.Types.Mixed,
});

var conditionSchema = new mongoose.Schema({
  name: String,
  entity: String,
  attributes: [attributeSchema],
});

var stepSchema = new mongoose.Schema({
  name: String,
  type: String,
  entity: String,
  attributes: [attributeSchema],
  recursion: String,
  completionWindow: String,
});

var conditionSetSchema = new mongoose.Schema({
  conditions: [conditionSchema],
  steps: [stepSchema],
});

var taskTypeSchema = new mongoose.Schema({
  name: String,
  purpose: String,
  process: String,
  outcomes: String,
  conditionSets: [conditionSetSchema],
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
