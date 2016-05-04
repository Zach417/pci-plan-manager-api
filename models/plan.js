var restful = require('node-restful');
var mongoose = restful.mongoose;

var planSchema = new mongoose.Schema({
  id: String,
  name: String,
  planType: String,
  namedFiduciary: {
    groupId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Group',
      unique: false,
      dropDups: false,
    },
  },
  description: String,

	// new fields to add
	assetValue: Number,
  participantEntryFrequency: String, //Annual, semi-annual, quarterly
	duties: {
		investment: {
			isDelegated: Boolean,
			delegationType: String, // 3(21), 3(38)
		},
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

module.exports = restful.model('Plan', planSchema);
