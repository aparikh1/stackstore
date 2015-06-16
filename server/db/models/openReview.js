var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	itemId: {
		type: String,
		required: true
	},
	orderCompletedDate: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('OpenReview', schema);