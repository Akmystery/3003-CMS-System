const SMSAPIController = require('../controllers/smsAPI.controller.js');

exports.processSMSResponse = SMSAPIController.processSMSResponse;

exports.sendSMSControler = (messageBody) => {
    SMSAPIController.sendSMS(messageBody);
}