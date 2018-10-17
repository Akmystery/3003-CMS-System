const mongoose = require('mongoose');

const meteringStations = mongoose.Schema({
	stationID: String,
    name: String,
    location: {
        latitude: Number,
        longitude: Number
    }
}, {
	timestamps: false
});

module.exports = mongoose.model('meteringStations', meteringStations);
