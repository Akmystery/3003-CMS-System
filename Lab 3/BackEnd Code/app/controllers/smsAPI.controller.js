const TwilioConfig = require('../../config/twilio.config.js');
const Twilio = require('twilio')(TwilioConfig.accountSid, TwilioConfig.authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const EmergencyController = require('../controllers/emergency.controller.js');


exports.processSMSResponse = (req, res) => {
    const twiml = new MessagingResponse();
    console.log(req.body.Body);

    let message = req.body.Body.split(' ');
    console.log(message);
    if (message[0] === "Solved") {
        EmergencyController.setEmergencyToSolved(message[1]);
        twiml.message("Bravo captain!");
        res.writeHead(200, {
            'Content-Type': 'text/xml'
        });
        res.end(twiml.toString());
    } else {
        twiml.message(req.body.Body);
        res.writeHead(200, {
            'Content-Type': 'text/xml'
        });
        res.end(twiml.toString());
    }
}

exports.sendSMS = (message) => {
    Twilio.messages
        .create({
            body: message,
            from: TwilioConfig.sender,
            to: TwilioConfig.receiver
        })
        .then(message => console.log(message.sid))
        .done();
}