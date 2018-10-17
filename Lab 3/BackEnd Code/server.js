const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}, function (err, db) {
	if (err) {
		throw err;
	}
	db.dropCollection("meteringstations");
	db.dropCollection("weatherinformations");
	db.dropCollection("psistations");
	db.dropCollection("psiinformations");
	db.dropCollection("dengueinformations");
});

require('./main.controller.js')(app);

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});

module.exports = app; // for testing