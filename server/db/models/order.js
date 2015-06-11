var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');

var schema = new mongoose.Schema({
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	status: {
		type: String,
		default: 'Created'
	},
	items:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Cake'
	}],
	trackingInfo: String,
	orderDate: {
		type: Date,
		default: Date.now
	}
});

schema.plugin(deepPopulate, {
	populate: {
	    'items': 'Cake'
	}
});

schema.pre('save', function (next) {
	this.items.forEach(function (item){
		console.log(item);//set price based on price of cake items
	})
});

module.exports = mongoose.model('Order', schema);