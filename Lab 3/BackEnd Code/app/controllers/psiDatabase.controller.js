const APIController = require('./psiAPI.controller.js');
const PSIStation = require('../models/psiStation.model.js');
const PSIInformation = require('../models/psiInformation.model.js');

exports.initialize = () => {
    APIController.getPSIData(function (data, err) {
        if (err) {
            console.log(err);
        } else {
            saveStations(data.region_metadata); //TODO: This converting of data should ideally happen in the API controller code, rectify this.
            savePSIInformation(data.items[0].readings);
        }
    });
}

exports.updateDatabase = () => {
    APIController.getPSIData(function (data, err) {
        if (err) {
            console.log(err);
        } else {
            savePSIInformation(data.items[0].readings);
        }
    });
}

exports.getAllStationInformation = (req, res) => {
    PSIInformation.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving information"
            });
        });
}

exports.getLatestStations = (req, res) => {
    PSIStation.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving stations"
            });
        });
}

function saveStations(stationList) {
    stationList.forEach(element => {
        let station = new PSIStation({
            name: element.name,
            location: element.label_location
        });

        station.save();
    });
}

function savePSIInformation(psiData) {
    Object.keys(psiData).forEach(key => {
        PSIInformation.findOneAndUpdate({
            dataType: key
        }, {
            $set: {
                values: {
                    west: psiData[key].west,
                    national: psiData[key].national,
                    east: psiData[key].east,
                    central: psiData[key].central,
                    south: psiData[key].south,
                    north: psiData[key].north
                }
            }
        }, {
            upsert: true
        }, function (err, doc) {
            if (err) {
                throw err;
            } 
        });
    });

}