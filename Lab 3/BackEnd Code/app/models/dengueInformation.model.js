const mongoose = require('mongoose');

const DengueInformation = mongoose.Schema({
    description: String,
    caseSize: Number,
    lat: String
}, {
	timestamps: true
});

module.exports = mongoose.model('DengueInformation', DengueInformation);
