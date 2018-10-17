var request = require('request');

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