var request = require('request');

exports.getTemperature = function (callback){
    request('https://api.data.gov.sg/v1/environment/air-temperature', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.parse(body);          
            return callback(result, false);
        } else {            
            return callback(null, error);
        }
    });
}

exports.getHumidity = function (callback){
    request('https://api.data.gov.sg/v1/environment/relative-humidity', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.parse(body);          
            return callback(result, false);
        } else {            
            return callback(null, error);
        }
    });
}

exports.getRainfall = function (callback){
    request('https://api.data.gov.sg/v1/environment/rainfall', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.parse(body);          
            return callback(result, false);
        } else {            
            return callback(null, error);
        }
    });
}

exports.getWindDirection = function (callback){
    request('https://api.data.gov.sg/v1/environment/wind-direction', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.parse(body);          
            return callback(result, false);
        } else {            
            return callback(null, error);
        }
    });
}

exports.getWindSpeed = function (callback){
    request('https://api.data.gov.sg/v1/environment/wind-speed', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.parse(body);          
            return callback(result, false);
        } else {            
            return callback(null, error);
        }
    });
}

exports.getPSIData = (callback) => {
    request('https://api.data.gov.sg/v1/environment/psi', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.parse(body);          
            return callback(result, false);
        } else {            
            return callback(null, error);
        }
    });
}