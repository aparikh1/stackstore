var mongoose = require('mongoose');

var schema = new mongoose.Schema({

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},

    productId: { type: String, required: true },

    category: { type: String, required: true },

    shortSummary: { type: String, required: true },

    description: { type: String, required: true },
    
    stars: {
    	type: Number,
    	min: 1,
    	max: 5
    },

    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Review', schema);