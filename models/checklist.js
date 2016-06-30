var restful = require('node-restful');
var mongoose = restful.mongoose;

var documentSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  planId: String,
  items: [{
    label: String,
    response: String,
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

module.exports = restful.model('Document', documentSchema);
