const APIController = require('./weatherAPI.controller.js');
const MeteringStations = require('../models/meteringStations.model.js');
const WeatherInformation = require('../models/weatherInformation.model.js');

let stationList = [];
let temperatureList = null;
let humidityList = null;
let rainfallList = null;
let windDirectionList = null;
let windSpeedList = null;

function concat(object1, object2) {
    object1.forEach(function (itm) {
        var unique = true;
        object2.forEach(function (itm2) {
            if (itm.id == itm2.id) unique = false;
        });
        if (unique) object2.push(itm);
    });
    return object2;
}

function findElement(list, ID) {
    let a = null;
    list.forEach((item) => {
        if (item.station_id == ID) {
            a = item.value;
            return item.value;
        }
    });
    return a;
}

exports.initialize = () => {
    APIController.getTemperature(function (data, err) {
        if (err) {
            console.log(err);
        } else {
            stationList = concat(stationList, data.metadata.stations);
            temperatureList = data.items[0].readings;
            saveToDatabase();
        }
    });

    APIController.getHumidity(function (data, err) {
        if (err) {
            console.log(err);
        } else {
            stationList = concat(stationList, data.metadata.stations);
            humidityList = data.items[0].readings;
            saveToDatabase();
        }
    });

    APIController.getRainfall(function (data, err) {
        if (err) {
            console.log(err);
        } else {
            stationList = concat(stationList, data.metadata.stations);
            rainfallList = data.items[0].readings;
            saveToDatabase();
        }
    });

    APIController.getWindDirection(function (data, err) {
        if (err) {
            console.log(err);
        } else {
            stationList = concat(stationList, data.metadata.stations);
            windDirectionList = data.items[0].readings;
            saveToDatabase();
        }
    });

    APIController.getWindSpeed(function (data, err) {
        if (err) {
            console.log(err);
        } else {
            stationList = concat(stationList, data.metadata.stations);
            windSpeedList = data.items[0].readings;
            saveToDatabase();
        }
    });
}

function saveToDatabase() {
    if (temperatureList != null && humidityList != null && rainfallList != null && windDirectionList != null && windSpeedList != null) {
        stationList.forEach(currentStation => {
            let newStation = new MeteringStations({
                stationID: currentStation.id,
                name: currentStation.name,
                location: {
                    latitude: currentStation.location.latitude,
                    longitude: currentStation.location.longitude
                }
            });
            newStation.save();

            let weatherInformation = new WeatherInformation({
                stationID: currentStation.id,
                temperature: findElement(temperatureList, currentStation.id),
                rainfall: findElement(rainfallList, currentStation.id),
                humidity: findElement(humidityList, currentStation.id),
                windDirection: findElement(windDirectionList, currentStation.id),
                windSpeed: findElement(windSpeedList, currentStation.id)
            });
            weatherInformation.save();
        });
    }
}

exports.updateDatabase = () => {
    console.log('Updated WeatherDB');
}

exports.getLatestStations = (req, res) => {
    res.send(stationList);
}

exports.getAllStationInformation = (req, res) => {
    WeatherInformation.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving stations"
            });
        });
}

exports.getStationInformation = (req, res) => {
    WeatherInformation.find({
            stationID: req.params.stationID
        })
        .then(station => {
            if (!station) {
                return res.status(404).send({
                    message: "Station not found with id " + req.params.stationID
                });
            }
            res.send(station);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Station not found with id " + req.params.stationID
                });
            }
            return res.status(500).send({
                message: "Error retrieving station with id " + req.params.stationID
            });
        });
};