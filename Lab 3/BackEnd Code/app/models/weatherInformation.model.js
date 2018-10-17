const mongoose = require('mongoose');

const WeatherInformation = mongoose.Schema({
	stationID: String,
    temperature: Number,
    rainfall: Number,
    humidity: Number,
    windDirection: Number,
    windSpeed: Number
}, {
	timestamps: true
});

module.exports = mongoose.model('WeatherInformation', WeatherInformation);
