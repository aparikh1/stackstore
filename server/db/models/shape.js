var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Shape', schema);