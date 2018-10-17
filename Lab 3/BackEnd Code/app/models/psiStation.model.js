const mongoose = require('mongoose');

const psiStations = mongoose.Schema({
	name: String,
    location: {
        latitude: Number,
        longitude: Number
    }
}, {
	timestamps: false
});

module.exports = mongoose.model('psiStations', psiStations);
