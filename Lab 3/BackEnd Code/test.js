process.env.NODE_ENV = 'test';

let Emergency = require('./app/models/emergencyForm.model.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server.js');
let should = chai.should();

chai.use(chaiHttp);

describe('Emergency Database', () => {
    beforeEach((done) => {
        Emergency.remove({}, (err) => {
            done();
        });
    });
    describe('GET emergency', () => {
        it('it should GET all the emergencies', (done) => {
            chai.request(server)
                .get('/getemergencies')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe('POST emergency', () => {
        it('it should not POST an emergency successfully', (done) => {
            let emergency = {
                name: "Hardit",
                mobile: 9397054324,
                postcode: "623814",
                bldgNumber: "045-04-654",
                emergencyType: "WaterEmergencie",
                location: {
                    latitude: 1.3521974,
                    longitude: 103.6853002
                }
            }
            chai.request(server)
                .post('/emergency')
                .send(emergency)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('mobile');
                    res.body.should.have.property('postcode');
                    res.body.should.have.property('bldgNumber');
                    res.body.should.have.property('emergencyType');
                    res.body.should.have.property('location');
                    done();
                });
        });
    });
    describe('GET emergency/:emergencyID', () => {
        it('it should GET an emergency by the given id', (done) => {
            let emergency = new Emergency({
                name: "Hardit",
                mobile: 9397054324,
                postcode: "623814",
                bldgNumber: "045-04-654",
                emergencyType: "WaterEmergencie",
                location: {
                    latitude: 1.3521974,
                    longitude: 103.6853002
                }
            });
            emergency.save((err, emergency) => {
                chai.request(server)
                    .get('/getEmergency/' + emergency.id)
                    .send(emergency)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('mobile');
                        res.body.should.have.property('postcode');
                        res.body.should.have.property('bldgNumber');
                        res.body.should.have.property('emergencyType');
                        res.body.should.have.property('location');
                        res.body.should.have.property('_id').eql(emergency.id);
                        done();
                    });
            });

        });
    });
    describe('PUT emergency/:emergencyID', () => {
        it('it should UPDATE an emergency given the id', (done) => {
            let emergency = new Emergency({
                name: "Tristan",
                mobile: 9397054324,
                postcode: "623814",
                bldgNumber: "045-04-654",
                emergencyType: "ForestFire",
                location: {
                    latitude: 1.3521974,
                    longitude: 103.6853002
                }
            });
            emergency.save((err, emergency) => {
                chai.request(server)
                    .put('/emergency/' + emergency.id)
                    .send({
                        name: "Tristan",
                        mobile: 9397054324,
                        postcode: "623814",
                        bldgNumber: "045-04-654",
                        emergencyType: "ForestFire",
                        location: {
                            latitude: 1.3521974,
                            longitude: 103.6853002
                        }
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('mobile');
                        res.body.should.have.property('postcode');
                        res.body.should.have.property('bldgNumber');
                        res.body.should.have.property('emergencyType');
                        res.body.should.have.property('location');
                        res.body.should.have.property('_id').eql(emergency.id);
                        res.body.should.have.property('name').eql(emergency.name);
                        res.body.should.have.property('emergencyType').eql(emergency.emergencyType);
                        done();
                    });
            });
        });
    });
    describe('DELETE emergency/:emergencyID', () => {
        it('it should DELETE an emergency given the id', (done) => {
            let emergency = new Emergency({
                name: "Tristan",
                mobile: 9397054324,
                postcode: "623814",
                bldgNumber: "045-04-654",
                emergencyType: "ForestFire",
                location: {
                    latitude: 1.3521974,
                    longitude: 103.6853002
                }
            });
            emergency.save((err, emergency) => {
                chai.request(server)
                    .delete('/emergency/' + emergency.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Emergency deleted successfully!');
                        done();
                    });
            });
        });
    });
});

describe('Weather Information', () => {
    describe('GET weatherStationsList', () => {
        it('it should GET a list of all the weather stations', (done) => {
            chai.request(server)
                .get('/weatherStationsList')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('id');
                    res.body[0].should.have.property('name');
                    res.body[0].should.have.property('location');
                    res.body[0].should.have.property('device_id');
                    done();
                });
        });
    });
    describe('GET weatherStationInformation', () => {
        it('it should GET information from all weather stations', (done) => {
            chai.request(server)
                .get('/weatherStationInformation')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('stationID');
                    res.body[0].should.have.property('temperature');
                    res.body[0].should.have.property('rainfall');
                    res.body[0].should.have.property('humidity');
                    res.body[0].should.have.property('windDirection');
                    res.body[0].should.have.property('windSpeed');
                    done();
                });
        });

    });
    describe('GET weatherStationInformation/:stationID', () => {
        it('it should GET information from a weather station by the given id', (done) => {

            let tempFunction = (stationID) => {
                chai.request(server)
                    .get('/weatherStationInformation/' + stationID)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body[0].should.have.property('stationID').eql(stationID);
                        res.body[0].should.have.property('temperature');
                        res.body[0].should.have.property('rainfall');
                        res.body[0].should.have.property('humidity');
                        res.body[0].should.have.property('windDirection');
                        res.body[0].should.have.property('windSpeed');
                        done();
                    });
            }

            chai.request(server)
                .get('/weatherStationsList')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    tempFunction(res.body[0].id);ZX

                });
        });

    });
});

describe('PSI Information', () => {
    describe('GET PSI Stations List', () => {
        it('it should GET a list of all the PSI stations', (done) => {
            chai.request(server)
                .get('/PSIStationsList')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('_id');
                    res.body[0].should.have.property('name');
                    res.body[0].should.have.property('location');
                    done();
                });
        });
    });
    describe('GET weatherStationInformation', () => {
        it('it should GET information from all PSI stations', (done) => {
            chai.request(server)
                .get('/PSIStationInformation')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('_id');
                    res.body[0].should.have.property('values');
                    res.body[0].should.have.property('dataType');
                    done();
                });
        });

    });
});

describe('Dengue Information', () => {
    describe('GET Dengue Information', () => {
        it('it should GET a list of all dengue clusters', (done) => {
            chai.request(server)
                .get('/DengueInformation')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('_id');
                    res.body[0].should.have.property('description');
                    res.body[0].should.have.property('caseSize');
                    res.body[0].should.have.property('lat');
                    done();
                });
        });
    });
});