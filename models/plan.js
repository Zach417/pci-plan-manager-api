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
  planSponsorName: String,
	assetValue: Number,
  planStartDate: Date,
  participantEntryFrequency: String, //Annual, semi-annual, quarterly
  employerContributions: Boolean,
  employerContributionSchedule: String, //Pay Period, Plan Year
  isSafeHarbor: Boolean,
  allowsLoans: Boolean,
  isAuditable: Boolean,
  isInvestmentDelegated: Boolean,
  investmentDelegationType: String, // 3(21), 3(38)
  hasAutomaticEnrollment: Boolean,
  hasAutomaticEscalation: Boolean,
  hasQdiaFund: Boolean,

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
