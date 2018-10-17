const mongoose = require('mongoose');

const psiInformation = mongoose.Schema({
    dataType: String,
    values: {
        west: Number,
        national: Number,
        east: Number,
        central: Number,
        south: Number,
        north: Number
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('psiInformation', psiInformation);